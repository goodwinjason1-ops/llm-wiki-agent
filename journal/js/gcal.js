// Google Calendar (and optional Drive, for voice-note audio) straight from the browser.
// Uses Google Identity Services' token model: no server, no stored refresh token.

import { dayKey, addDays, fromKey } from './dates.js';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
];
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const TOKEN_KEY = 'daybook.gtoken';
const API = 'https://www.googleapis.com/calendar/v3';

let tokenClient = null;
let clientIdInUse = null;
let gisLoaded = null;
const listeners = new Set();

export const tz = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

function loadGis() {
  if (gisLoaded) return gisLoaded;
  gisLoaded = new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve();
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => { gisLoaded = null; reject(new Error('Could not load Google sign-in. Are you offline?')); };
    document.head.appendChild(s);
  });
  return gisLoaded;
}

function readToken() {
  try {
    const t = JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null');
    return t && t.exp > Date.now() + 60000 ? t : null;
  } catch { return null; }
}

function saveToken(t) {
  try { localStorage.setItem(TOKEN_KEY, JSON.stringify(t)); } catch { /* ignore */ }
}

export function onAuthChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
const emit = () => listeners.forEach((fn) => fn(isConnected()));

export function isConnected() {
  return !!readToken();
}

export function wasEverConnected() {
  try { return localStorage.getItem('daybook.gconnected') === '1'; } catch { return false; }
}

export function hasDriveScope() {
  return !!readToken()?.scope?.includes(DRIVE_SCOPE);
}

/**
 * Get an access token. `interactive` shows Google's consent popup if needed,
 * which must happen inside a click handler.
 */
export async function connect(clientId, { interactive = true, drive = false } = {}) {
  if (!clientId) throw new Error('Add your Google OAuth Client ID in Settings first.');
  const existing = readToken();
  if (existing && (!drive || existing.scope?.includes(DRIVE_SCOPE))) return existing.token;
  await loadGis();
  const scope = [...SCOPES, ...(drive ? [DRIVE_SCOPE] : [])].join(' ');
  return new Promise((resolve, reject) => {
    if (!tokenClient || clientIdInUse !== clientId) {
      clientIdInUse = clientId;
      tokenClient = window.google.accounts.oauth2.initTokenClient({ client_id: clientId, scope, callback: () => {} });
    }
    tokenClient.callback = (resp) => {
      if (resp.error) return reject(new Error(resp.error_description || resp.error));
      const t = { token: resp.access_token, exp: Date.now() + (Number(resp.expires_in) || 3600) * 1000, scope: resp.scope || scope };
      saveToken(t);
      try { localStorage.setItem('daybook.gconnected', '1'); } catch { /* ignore */ }
      emit();
      resolve(t.token);
    };
    tokenClient.error_callback = (err) => reject(new Error(err?.message || err?.type || 'Google sign-in was closed.'));
    tokenClient.requestAccessToken({ scope, prompt: interactive ? '' : 'none', include_granted_scopes: true });
  });
}

export function disconnect() {
  const t = readToken();
  if (t && window.google?.accounts?.oauth2) window.google.accounts.oauth2.revoke(t.token, () => {});
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('daybook.gconnected');
  } catch { /* ignore */ }
  emit();
}

export class AuthNeededError extends Error {}

async function call(path, { method = 'GET', body, query, base = API, headers = {}, raw = false } = {}) {
  const t = readToken();
  if (!t) throw new AuthNeededError('Google session expired. Tap “Reconnect Google”.');
  const url = new URL(base + path);
  if (query) Object.entries(query).forEach(([k, v]) => v != null && url.searchParams.set(k, v));
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${t.token}`, ...(body && !raw ? { 'Content-Type': 'application/json' } : {}), ...headers },
    body: body && !raw ? JSON.stringify(body) : body,
  });
  if (res.status === 401) {
    try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
    emit();
    throw new AuthNeededError('Google session expired. Tap “Reconnect Google”.');
  }
  if (res.status === 204 || res.status === 410) return null;
  if (!res.ok) {
    let msg = `${res.status}`;
    try { msg = (await res.json()).error?.message || msg; } catch { /* ignore */ }
    throw new Error(`Google: ${msg}`);
  }
  return res.json();
}

export async function listCalendars() {
  const data = await call('/users/me/calendarList', { query: { minAccessRole: 'reader' } });
  return (data.items || []).map((c) => ({
    id: c.id, name: c.summaryOverride || c.summary, color: c.backgroundColor, primary: !!c.primary,
    writable: c.accessRole === 'owner' || c.accessRole === 'writer',
  }));
}

function normalise(ev, calendar) {
  const allDay = !!ev.start?.date;
  const start = allDay ? fromKey(ev.start.date) : new Date(ev.start?.dateTime);
  const end = allDay ? fromKey(ev.end.date) : new Date(ev.end?.dateTime);
  const days = [];
  if (allDay) {
    for (let k = ev.start.date; k < ev.end.date; k = addDays(k, 1)) days.push(k);
  } else {
    for (let k = dayKey(start); k <= dayKey(new Date(end - 1)); k = addDays(k, 1)) days.push(k);
  }
  return {
    id: ev.id,
    calendarId: calendar.id,
    color: ev.colorId ? null : calendar.color,
    title: ev.summary || '(No title)',
    description: ev.description || '',
    location: ev.location || '',
    link: ev.htmlLink,
    meet: ev.hangoutLink || ev.conferenceData?.entryPoints?.find((p) => p.entryPointType === 'video')?.uri || '',
    allDay,
    start,
    end,
    days,
    daybook: ev.extendedProperties?.private?.daybook || null,
  };
}

/** Events for every calendar in `calendars` that overlap [fromKey, toKey]. */
export async function listEvents(calendars, fromKeyStr, toKeyStr) {
  const timeMin = fromKey(fromKeyStr).toISOString();
  const timeMax = fromKey(addDays(toKeyStr, 1)).toISOString();
  const results = await Promise.all(calendars.map(async (cal) => {
    const items = [];
    let pageToken;
    do {
      const data = await call(`/calendars/${encodeURIComponent(cal.id)}/events`, {
        query: { timeMin, timeMax, singleEvents: 'true', orderBy: 'startTime', maxResults: 250, pageToken },
      });
      items.push(...(data.items || []).filter((e) => e.status !== 'cancelled').map((e) => normalise(e, cal)));
      pageToken = data.nextPageToken;
    } while (pageToken);
    return items;
  }));
  return results.flat().sort((a, b) => a.start - b.start);
}

function eventBody({ title, description, date, time, duration = 30, reminderMinutes, daybook, attachments, colorId, recurrence }) {
  const body = { summary: title, description: description || '' };
  if (time) {
    const start = `${date}T${time}:00`;
    const endD = new Date(fromKey(date).getTime());
    const [h, m] = time.split(':').map(Number);
    endD.setHours(h, m + (duration || 30), 0, 0);
    const end = `${dayKey(endD)}T${String(endD.getHours()).padStart(2, '0')}:${String(endD.getMinutes()).padStart(2, '0')}:00`;
    body.start = { dateTime: start, timeZone: tz() };
    body.end = { dateTime: end, timeZone: tz() };
  } else {
    body.start = { date };
    body.end = { date: addDays(date, 1) };
  }
  if (reminderMinutes != null && time) {
    body.reminders = { useDefault: false, overrides: [{ method: 'popup', minutes: reminderMinutes }] };
  }
  if (daybook) body.extendedProperties = { private: { daybook } };
  if (attachments?.length) body.attachments = attachments;
  if (colorId) body.colorId = colorId;
  if (recurrence) body.recurrence = recurrence;
  return body;
}

export async function createEvent(calendarId, opts) {
  return call(`/calendars/${encodeURIComponent(calendarId)}/events`, {
    method: 'POST',
    body: eventBody(opts),
    query: opts.attachments?.length ? { supportsAttachments: 'true' } : undefined,
  });
}

export async function updateEvent(calendarId, eventId, opts) {
  return call(`/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`, {
    method: 'PATCH',
    body: eventBody(opts),
    query: opts.attachments?.length ? { supportsAttachments: 'true' } : undefined,
  });
}

export async function deleteEvent(calendarId, eventId) {
  try {
    await call(`/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`, { method: 'DELETE' });
  } catch (e) {
    if (!/404|deleted/i.test(e.message)) throw e;
  }
}

/** Upload an audio blob to the user's Drive (app-created files only) and return its link. */
export async function uploadToDrive(blob, name) {
  const boundary = 'daybook' + Math.random().toString(36).slice(2);
  const meta = JSON.stringify({ name, mimeType: blob.type || 'audio/webm' });
  const body = new Blob([
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n`,
    `--${boundary}\r\nContent-Type: ${blob.type || 'audio/webm'}\r\n\r\n`,
    blob,
    `\r\n--${boundary}--`,
  ]);
  return call('/files', {
    base: 'https://www.googleapis.com/upload/drive/v3',
    method: 'POST',
    query: { uploadType: 'multipart', fields: 'id,webViewLink,mimeType,name' },
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
    raw: true,
  });
}
