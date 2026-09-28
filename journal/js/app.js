import {
  dayKey, fromKey, addDays, diffDays, startOfMonth, addMonths, daysInMonth, formatLong, formatShort, formatTime,
  relativeLabel, timeFromDate, parseQuick, extractActions, extractTags,
} from './dates.js';
import { db, uid, requestPersistence, exportAll, importAll, storageEstimate } from './db.js';
import { addFiles, formatBytes, FILE_EMOJI } from './files.js';
import * as ins from './insights.js';
import { Recorder, canRecord, canLiveTranscribe, dictate, cloudTranscribe, formatDuration } from './voice.js';
import * as gcal from './gcal.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const isTyping = () => /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;

const ICONS = {
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  tasks: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  settings: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  play: '<path d="M7 4v16l13-8z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="currentColor" stroke="none"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2.5"/>',
  star: '<path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  sparkles: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M5 21h14"/>',
  edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"/>',
  arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
  note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  flame: '<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z"/>',
  offline: '<path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 5.2-2.8M19 12.9a10 10 0 0 0-2.3-1.6M12 20h.01"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

const MOODS = [
  { v: 1, e: '😞', label: 'Awful' },
  { v: 2, e: '😕', label: 'Low' },
  { v: 3, e: '😐', label: 'Okay' },
  { v: 4, e: '🙂', label: 'Good' },
  { v: 5, e: '😄', label: 'Great' },
];

const PROMPTS = [
  'What is one thing you want to remember about today?',
  'What gave you energy today, and what drained it?',
  'What are you looking forward to?',
  'What went better than expected?',
  'What is on your mind right now?',
  'What did you learn today?',
  'Who made your day better, and how?',
  'What would make tomorrow a great day?',
  'What is something you are avoiding? Why?',
  'Describe a small moment you enjoyed.',
  'What are you proud of this week?',
  'What is worrying you, and what is in your control?',
  'What would you tell yourself from a year ago?',
  'What did you do today just for you?',
  'What surprised you today?',
  'If today had a title, what would it be?',
  'What is one thing you can let go of?',
  'How did you take care of your body today?',
  'What conversation is still on your mind?',
  'What does a good week look like right now?',
  'What are you curious about lately?',
  'What habit is serving you well? Which one is not?',
  'Where did you feel most like yourself today?',
  'What is one decision you need to make soon?',
  'What are three things that went well?',
  'What would you do today if you were not afraid?',
  'What made you laugh recently?',
  'What is something you want to do more of?',
];

const DEFAULT_SETTINGS = {
  clientId: '',
  showCalendars: null,
  writeCalendar: 'primary',
  syncTasks: true,
  syncVoice: true,
  driveAudio: false,
  reminderMinutes: 10,
  lang: navigator.language || 'en-US',
  liveTranscribe: true,
  openaiKey: '',
  cloudAlways: false,
  dateOrder: /^en-US|^en-PH|^en-CA/i.test(navigator.language || '') ? 'MDY' : 'DMY',
  theme: 'auto',
  prompts: true,
  gratitude: true,
  health: true,
  celebrate: true,
  backupMedia: true,
  weekStart: 1,
};

const state = {
  settings: { ...DEFAULT_SETTINGS },
  calendars: [],
  events: new Map(), // 'YYYY-MM' -> { at, list }
  route: { view: 'day', date: dayKey() },
  today: dayKey(),
  taskFilter: 'open',
};

// ---------------------------------------------------------------------------
// Settings & theme
// ---------------------------------------------------------------------------

async function loadSettings() {
  state.settings = { ...DEFAULT_SETTINGS, ...(await db.getKV('settings', {})) };
  state.calendars = await db.getKV('calendars', []);
  applyTheme();
}

async function saveSettings(patch) {
  Object.assign(state.settings, patch);
  await db.setKV('settings', state.settings);
  applyTheme();
}

function applyTheme() {
  const t = state.settings.theme;
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
}

const parseOpts = () => ({ dateOrder: state.settings.dateOrder });

// ---------------------------------------------------------------------------
// Toasts & sheets
// ---------------------------------------------------------------------------

function toast(msg, { action, onAction, error = false, ms = 4500 } = {}) {
  const el = document.createElement('div');
  el.className = 'toast' + (error ? ' error' : '');
  el.innerHTML = `<span class="grow">${esc(msg)}</span>${action ? `<button type="button">${esc(action)}</button>` : ''}`;
  const close = () => el.remove();
  if (action) el.querySelector('button').onclick = () => { close(); onAction?.(); };
  $('#toasts').appendChild(el);
  setTimeout(close, ms);
}

function reportError(e) {
  console.error(e);
  if (e instanceof gcal.AuthNeededError) {
    toast(e.message, { action: 'Reconnect', onAction: () => connectGoogle() , error: true, ms: 8000 });
  } else toast(e.message || String(e), { error: true, ms: 7000 });
}

let activeSheet = null;
function openSheet(html, { onClose, label = 'Dialog' } = {}) {
  closeSheet();
  const root = $('#sheet-root');
  const backdrop = document.createElement('div');
  backdrop.className = 'backdrop';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-label', label);
  sheet.innerHTML = `<div class="grab"></div>${html}`;
  root.append(backdrop, sheet);
  const lastFocus = document.activeElement;
  const close = () => {
    if (activeSheet !== handle) return;
    activeSheet = null;
    backdrop.remove();
    sheet.remove();
    onClose?.();
    lastFocus?.focus?.();
  };
  const handle = { el: sheet, close };
  backdrop.onclick = () => { if (!sheet.dataset.locked) close(); };
  $$('[data-close]', sheet).forEach((b) => (b.onclick = close));
  activeSheet = handle;
  setTimeout(() => (sheet.querySelector('[autofocus]') || sheet.querySelector('button, input, textarea'))?.focus(), 30);
  return handle;
}
function closeSheet() { activeSheet?.close(); }

function confirmSheet(title, body, okLabel = 'Delete') {
  return new Promise((resolve) => {
    let ok = false;
    const s = openSheet(`
      <div class="sheet-head"><h2>${esc(title)}</h2></div>
      <p class="muted">${esc(body)}</p>
      <div class="btn-row" style="justify-content:flex-end;margin-top:14px">
        <button class="btn ghost" data-close>Cancel</button>
        <button class="btn primary" id="ok">${esc(okLabel)}</button>
      </div>`, { onClose: () => resolve(ok), label: title });
    $('#ok', s.el).onclick = () => { ok = true; s.close(); };
  });
}

function download(name, content, type) {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

// ---------------------------------------------------------------------------
// Google Calendar glue
// ---------------------------------------------------------------------------

const connected = () => gcal.isConnected();

async function connectGoogle({ drive = state.settings.driveAudio } = {}) {
  try {
    await gcal.connect(state.settings.clientId, { interactive: true, drive });
    await loadCalendars();
    toast('Google Calendar connected');
    state.events.clear();
    await syncPending();
    render();
    return true;
  } catch (e) {
    reportError(e);
    if (!state.settings.clientId) openSettings('google');
    return false;
  }
}

async function loadCalendars() {
  const cals = await gcal.listCalendars();
  state.calendars = cals;
  await db.setKV('calendars', cals);
  if (!state.settings.showCalendars) {
    const primary = cals.find((c) => c.primary);
    await saveSettings({ showCalendars: primary ? [primary.id] : cals.slice(0, 1).map((c) => c.id) });
  }
}

function visibleCalendars() {
  const ids = state.settings.showCalendars || ['primary'];
  const known = state.calendars.filter((c) => ids.includes(c.id));
  return known.length ? known : [{ id: 'primary', color: null }];
}

const monthOf = (key) => key.slice(0, 7);

function reviveEvents(list) {
  return list.map((e) => ({ ...e, start: new Date(e.start), end: new Date(e.end) }));
}

async function loadMonthEvents(month, { force = false } = {}) {
  let cached = state.events.get(month);
  if (!cached) {
    const stored = await db.getKV('ev:' + month, null);
    if (stored) {
      cached = { at: 0, list: reviveEvents(stored) };
      state.events.set(month, cached);
    }
  }
  if (!connected()) return cached?.list || [];
  if (!force && cached && Date.now() - cached.at < 120000) return cached.list;
  const first = month + '-01';
  const from = addDays(first, -7);
  const to = addDays(first, daysInMonth(first) + 6);
  try {
    const list = await gcal.listEvents(visibleCalendars(), from, to);
    state.events.set(month, { at: Date.now(), list });
    db.setKV('ev:' + month, list.map((e) => ({ ...e, start: e.start.toISOString(), end: e.end.toISOString() })));
    return list;
  } catch (e) {
    if (!(e instanceof gcal.AuthNeededError)) console.warn(e);
    return cached?.list || [];
  }
}

function cachedEventsFor(key) {
  return (state.events.get(monthOf(key))?.list || []).filter((e) => e.days.includes(key));
}

function invalidateEvents(key) {
  const m = state.events.get(monthOf(key));
  if (m) m.at = 0;
}

function taskEventOpts(task) {
  return {
    title: (task.done ? '✅ ' : '') + task.title,
    description: [task.notes, 'Added from Daybook'].filter(Boolean).join('\n\n'),
    date: task.date,
    time: task.time,
    duration: task.duration || 30,
    reminderMinutes: task.done ? null : state.settings.reminderMinutes,
    daybook: 'task:' + task.id,
  };
}

const wantsTaskSync = (t) => state.settings.syncTasks && t.sync !== false && t.date && t.time;

/** Create, update or remove the calendar event that mirrors a task. */
async function syncTask(task) {
  const cal = task.gcalCalendarId || state.settings.writeCalendar;
  try {
    if (!wantsTaskSync(task)) {
      if (task.gcalEventId && connected()) {
        await gcal.deleteEvent(cal, task.gcalEventId);
        task.gcalEventId = null;
      }
      task.needsSync = !!task.gcalEventId;
    } else if (!connected()) {
      task.needsSync = true;
    } else if (task.gcalEventId) {
      await gcal.updateEvent(cal, task.gcalEventId, taskEventOpts(task));
      task.needsSync = false;
    } else {
      const ev = await gcal.createEvent(cal, taskEventOpts(task));
      task.gcalEventId = ev.id;
      task.gcalCalendarId = cal;
      task.gcalLink = ev.htmlLink;
      task.needsSync = false;
    }
  } catch (e) {
    task.needsSync = true;
    reportError(e);
  }
  await db.put('tasks', task);
  if (task.date) invalidateEvents(task.date);
  return task;
}

async function syncVoice(note) {
  if (!state.settings.syncVoice) return note;
  if (!connected()) { note.needsSync = true; await db.put('voice', note); return note; }
  const cal = note.gcalCalendarId || state.settings.writeCalendar;
  try {
    const start = new Date(note.createdAt);
    const attachments = [];
    if (state.settings.driveAudio && note.blob && !note.driveLink) {
      if (!gcal.hasDriveScope()) await gcal.connect(state.settings.clientId, { interactive: true, drive: true });
      const f = await gcal.uploadToDrive(note.blob, `${note.title || 'Voice note'} ${dayKey(start)}.${note.mime?.includes('mp4') ? 'm4a' : 'webm'}`);
      note.driveLink = f.webViewLink;
      note.driveFileId = f.id;
      note.driveMime = f.mimeType;
    }
    if (note.driveLink) attachments.push({ fileUrl: note.driveLink, title: note.title || 'Voice note', mimeType: note.driveMime || note.mime });
    const opts = {
      title: '🎙 ' + (note.title || 'Voice note'),
      description: (note.transcript || '(no transcript)') + (note.driveLink ? `\n\nAudio: ${note.driveLink}` : '') + '\n\nRecorded in Daybook',
      date: dayKey(start),
      time: timeFromDate(start),
      duration: Math.max(15, Math.ceil((note.duration || 0) / 60)),
      reminderMinutes: null,
      daybook: 'voice:' + note.id,
      attachments,
      colorId: '8',
    };
    if (note.gcalEventId) await gcal.updateEvent(cal, note.gcalEventId, opts);
    else {
      const ev = await gcal.createEvent(cal, opts);
      note.gcalEventId = ev.id;
      note.gcalCalendarId = cal;
      note.gcalLink = ev.htmlLink;
    }
    note.needsSync = false;
  } catch (e) {
    note.needsSync = true;
    reportError(e);
  }
  await db.put('voice', note);
  invalidateEvents(note.date);
  return note;
}

let syncing = false;
async function syncPending() {
  if (syncing || !connected()) return;
  syncing = true;
  try {
    const tasks = (await db.all('tasks')).filter((t) => t.needsSync);
    for (const t of tasks) await syncTask(t);
    const notes = (await db.all('voice')).filter((n) => n.needsSync);
    for (const n of notes) await syncVoice(n);
    if (tasks.length + notes.length) toast(`Synced ${plural(tasks.length + notes.length, 'item')} to Google Calendar`);
  } finally {
    syncing = false;
  }
}

// ---------------------------------------------------------------------------
// Data operations
// ---------------------------------------------------------------------------

async function getEntry(date) {
  return (await db.get('entries', date)) || { date, text: '', mood: null, gratitude: ['', '', ''], prompt: null, tags: [], createdAt: new Date().toISOString() };
}

async function addTask(parsed, { defaultDate = null, source = 'manual', notes = '' } = {}) {
  const task = {
    id: uid(),
    title: parsed.title,
    date: parsed.date || defaultDate,
    time: parsed.time || null,
    duration: parsed.duration || null,
    priority: parsed.priority || 0,
    tags: parsed.tags || [],
    notes,
    done: false,
    source,
    createdAt: new Date().toISOString(),
  };
  await db.put('tasks', task);
  if (wantsTaskSync(task)) syncTask(task).then(() => refreshSchedule());
  return task;
}

async function addEvent(parsed, { defaultDate }) {
  const date = parsed.date || defaultDate;
  if (!connected()) {
    const t = await addTask({ ...parsed, date }, { source: 'event' });
    toast('Saved as a timed to-do. Connect Google Calendar to create real events.', { action: 'Connect', onAction: connectGoogle });
    return t;
  }
  try {
    await gcal.createEvent(state.settings.writeCalendar, {
      title: parsed.title,
      date,
      time: parsed.time,
      duration: parsed.duration || 60,
      reminderMinutes: parsed.time ? state.settings.reminderMinutes : null,
      description: 'Added from Daybook',
    });
    toast(`Added “${parsed.title}” to Google Calendar`);
    await loadMonthEvents(monthOf(date), { force: true });
  } catch (e) { reportError(e); }
}

async function toggleTask(id) {
  const t = await db.get('tasks', id);
  if (!t) return;
  t.done = !t.done;
  t.doneAt = t.done ? new Date().toISOString() : null;
  await db.put('tasks', t);
  if (t.gcalEventId) syncTask(t);
  return t;
}

async function deleteTask(id) {
  const t = await db.get('tasks', id);
  if (!t) return;
  await db.delete('tasks', id);
  if (t.gcalEventId && connected()) gcal.deleteEvent(t.gcalCalendarId || state.settings.writeCalendar, t.gcalEventId).catch(reportError);
  toast(`Deleted “${t.title}”`, {
    action: 'Undo',
    onAction: async () => {
      const restored = { ...t, gcalEventId: null };
      await db.put('tasks', restored);
      if (wantsTaskSync(restored)) await syncTask(restored);
      render();
    },
  });
}

async function moveTask(id, date) {
  const t = await db.get('tasks', id);
  if (!t) return;
  t.date = date;
  await db.put('tasks', t);
  if (t.gcalEventId || wantsTaskSync(t)) await syncTask(t);
}

async function loadEverything() {
  const [entries, voice, files, tasks] = await Promise.all([db.all('entries'), db.all('voice'), db.all('files'), db.all('tasks')]);
  const days = ins.activityDays({ entries, voice, files });
  const info = ins.streakInfo(days, state.today);
  return { entries, voice, files, tasks, days, info, totals: ins.totals({ entries, voice, files, tasks }) };
}

async function computeStreak() {
  const { days, info } = await loadEverything();
  return { streak: info.current, days, info };
}

const entryHasContent = ins.entryCounts;
const daySeed = () => Math.floor(fromKey(state.today) / 86400000);

/**
 * Called after anything is logged. Celebrates the first log of the day and
 * unlocks achievements. Deliberately generous: every small thing counts.
 */
let activityBusy = false;
async function onActivity() {
  if (activityBusy) return;
  activityBusy = true;
  try {
    const all = await loadEverything();
    const earned = await db.getKV('achievements', {});
    const fresh = ins.evaluateAchievements({ ...all.totals, ...all.info }, earned);
    if (fresh.length) {
      fresh.forEach((a) => (earned[a.id] = state.today));
      await db.setKV('achievements', earned);
    }
    let delay = 0;
    if (all.info.loggedToday && (await db.getKV('celebrated', null)) !== state.today) {
      await db.setKV('celebrated', state.today);
      if (state.settings.celebrate) confetti();
      toast(ins.celebration(all.info, daySeed()), { ms: 6000 });
      delay = 1200;
      renderMotivation();
    }
    fresh.forEach((a, i) => setTimeout(() => toast(`🏅 Unlocked: ${a.icon} ${a.name}`, { action: 'See all', onAction: () => go('#/insights'), ms: 7000 }), delay + i * 900));
    if (state.route.view === 'day' && state.route.date === state.today) {
      const chip = $('#streak-chip');
      if (chip) chip.innerHTML = `${icon('flame', 'sm')} ${all.info.current}-day streak`;
    }
  } finally {
    activityBusy = false;
  }
}

function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.createElement('canvas');
  c.className = 'confetti';
  c.width = innerWidth * devicePixelRatio;
  c.height = innerHeight * devicePixelRatio;
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  ctx.scale(devicePixelRatio, devicePixelRatio);
  const colors = ['#b5552f', '#2a78d6', '#d69a12', '#1f8a3a', '#e34948', '#9cc3f0'];
  const bits = [...Array(90)].map(() => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 80, y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 12 - 4, r: Math.random() * 6 + 4,
    a: Math.random() * 6, va: (Math.random() - 0.5) * 0.4, c: colors[Math.floor(Math.random() * colors.length)],
  }));
  const start = performance.now();
  const frame = (now) => {
    const t = now - start;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const b of bits) {
      b.vy += 0.35; b.x += b.vx; b.y += b.vy; b.a += b.va; b.vx *= 0.99;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.a);
      ctx.globalAlpha = Math.max(0, 1 - t / 1800);
      ctx.fillStyle = b.c;
      ctx.fillRect(-b.r / 2, -b.r / 4, b.r, b.r / 2);
      ctx.restore();
    }
    if (t < 1800) requestAnimationFrame(frame);
    else c.remove();
  };
  requestAnimationFrame(frame);
}

function promptFor(date, entry) {
  if (entry?.prompt) return entry.prompt;
  let h = 0;
  for (const c of date) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return PROMPTS[h % PROMPTS.length];
}

function isoWeek(key) {
  const d = fromKey(key);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const w1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - w1) / 86400000 - 3 + ((w1.getDay() + 6) % 7)) / 7);
}

// ---------------------------------------------------------------------------
// Routing & chrome
// ---------------------------------------------------------------------------

const NAV = [
  { view: 'day', label: 'Today', icon: 'book', key: 't' },
  { view: 'calendar', label: 'Calendar', icon: 'calendar', key: 'c' },
  { view: 'tasks', label: 'To-do', icon: 'tasks', key: 'd' },
  { view: 'notes', label: 'Voice notes', icon: 'mic', key: 'v' },
  { view: 'insights', label: 'Insights', icon: 'sparkles', key: 'i' },
  { view: 'search', label: 'Search', icon: 'search', key: '/' },
];

function parseRoute() {
  const [, view = 'day', arg = ''] = location.hash.replace(/^#/, '').split('/');
  if (view === 'day') return { view, date: /^\d{4}-\d{2}-\d{2}$/.test(arg) ? arg : state.today };
  if (view === 'calendar') return { view, month: /^\d{4}-\d{2}$/.test(arg) ? arg : monthOf(state.today) };
  if (view === 'search') return { view, q: decodeURIComponent(arg || '') };
  if (['tasks', 'notes', 'insights'].includes(view)) return { view };
  return { view: 'day', date: state.today };
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

function renderChrome() {
  const r = state.route;
  const current = r.view === 'day' && r.date !== state.today ? '' : r.view;
  $('#nav').innerHTML = NAV.map((n) => `
    <button class="nav-item" data-action="goto" data-hash="#/${n.view}" ${n.view === current || (n.view === 'day' && r.view === 'day') ? 'aria-current="page"' : ''}>
      ${icon(n.icon)}<span>${n.label}</span><kbd>${n.key}</kbd>
    </button>`).join('') + `
    <button class="btn primary record-cta" data-action="record">${icon('mic')} Record voice note <kbd style="background:none;color:inherit;border-color:currentColor">r</kbd></button>`;
  $('#sidebar-foot').innerHTML = `
    <button class="nav-item" data-action="settings">${icon('settings')}<span>Settings</span></button>
    <button class="nav-item" data-action="help">${icon('help')}<span>Shortcuts & tips</span><kbd>?</kbd></button>`;
  const tabs = ['day', 'calendar', 'tasks', 'insights'].map((v) => NAV.find((n) => n.view === v));
  $('#tabbar').innerHTML = `
    ${tab(tabs[0])}${tab(tabs[1])}
    <div class="tab-record"><button class="fab" data-action="record" aria-label="Record voice note">${icon('mic')}</button></div>
    ${tab(tabs[2])}${tab(tabs[3])}`;
  function tab(n) {
    return `<button class="tab" data-action="goto" data-hash="#/${n.view}" ${n.view === r.view ? 'aria-current="page"' : ''}>${icon(n.icon)}<span>${n.label}</span></button>`;
  }
}

function renderTopbar() {
  const r = state.route;
  const offline = navigator.onLine ? '' : `<span class="chip muted" title="You are offline. Everything still saves on this device.">${icon('offline', 'sm')} Offline</span>`;
  let center = '';
  if (r.view === 'day') {
    center = `
      <button class="iconbtn" data-action="prev-day" aria-label="Previous day">${icon('left')}</button>
      <div class="title"><button data-action="pick-date" aria-label="Pick a date">${esc(formatShort(r.date))}</button></div>
      <button class="iconbtn" data-action="next-day" aria-label="Next day">${icon('right')}</button>`;
  } else {
    const titles = { calendar: 'Calendar', tasks: 'To-do', notes: 'Voice notes', search: 'Search', insights: 'Insights' };
    center = `<div class="title">${titles[r.view]}</div>`;
  }
  const todayBtn = r.view === 'day' && r.date !== state.today ? `<button class="pill-today" data-action="goto" data-hash="#/day">Today</button>` : '';
  $('#topbar').innerHTML = `
    <button class="iconbtn" data-action="goto" data-hash="#/search" aria-label="Search">${icon('search')}</button>
    ${center}
    ${todayBtn}${offline}
    <button class="iconbtn" data-action="settings" aria-label="Settings">${icon('settings')}</button>
    <input type="date" id="date-picker" class="sr-only" tabindex="-1" aria-hidden="true">`;
}

let renderToken = 0;
async function render() {
  state.today = dayKey();
  state.route = parseRoute();
  renderChrome();
  renderTopbar();
  const token = ++renderToken;
  const main = $('#main');
  const views = { day: renderDay, calendar: renderCalendar, tasks: renderTasks, notes: renderNotes, search: renderSearch, insights: renderInsightsView };
  try {
    await views[state.route.view](main, token);
  } catch (e) {
    reportError(e);
  }
}

const stale = (token) => token !== renderToken;

// ---------------------------------------------------------------------------
// Task row
// ---------------------------------------------------------------------------

function taskRow(t, { showDate = false } = {}) {
  const overdue = !t.done && t.date && t.date < state.today;
  const when = [];
  if (showDate && t.date) when.push(relativeLabel(t.date, state.today));
  if (t.time) when.push(formatTime(t.time));
  const synced = t.gcalEventId ? `<span class="chip blue" title="In Google Calendar">${icon('calendar', 'sm')}</span>` : t.needsSync && wantsTaskSync(t) && state.settings.clientId ? `<span class="chip muted" title="Will sync to Google Calendar when connected">${icon('refresh', 'sm')}</span>` : '';
  return `
    <li class="task${t.done ? ' done' : ''}${overdue ? ' overdue' : ''}" data-id="${t.id}">
      <button class="check" data-action="toggle-task" data-id="${t.id}" aria-label="${t.done ? 'Mark not done' : 'Mark done'}: ${esc(t.title)}">${icon('check', 'sm')}</button>
      <div class="task-main">
        <div class="task-title">${t.priority ? `<span class="star" aria-label="Priority">★</span> ` : ''}${esc(t.title)}</div>
        <div class="task-meta">
          ${when.length ? `<span class="chip muted when">${icon('clock', 'sm')} ${esc(when.join(' · '))}</span>` : ''}
          ${t.duration ? `<span class="chip muted">${t.duration} min</span>` : ''}
          ${(t.tags || []).map((g) => `<span class="chip muted">#${esc(g)}</span>`).join('')}
          ${t.source === 'voice' ? `<span class="chip muted" title="Captured from a voice note">${icon('mic', 'sm')}</span>` : ''}
          ${synced}
        </div>
      </div>
      <div class="task-actions">
        ${!t.done && t.date !== state.today ? `<button class="iconbtn" data-action="task-today" data-id="${t.id}" aria-label="Move to today" title="Move to today">${icon('arrow', 'sm')}</button>` : ''}
        <button class="iconbtn" data-action="edit-task" data-id="${t.id}" aria-label="Edit" title="Edit">${icon('edit', 'sm')}</button>
      </div>
    </li>`;
}

function sortTasks(list) {
  return list.sort((a, b) => (a.done - b.done) || (b.priority - a.priority) || ((a.time || '99') < (b.time || '99') ? -1 : (a.time || '99') > (b.time || '99') ? 1 : 0) || a.createdAt.localeCompare(b.createdAt));
}

function quickAddHTML(id, placeholder, hint) {
  return `
    <form class="qa" data-qa="${id}" autocomplete="off">
      <label class="quickadd">
        ${icon('plus')}
        <input id="${id}" name="q" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}" enterkeyhint="done">
        <button class="btn primary sm" type="submit">Add</button>
      </label>
      <div class="qa-preview" id="${id}-preview"></div>
      ${hint ? `<div class="small muted" style="margin:6px 2px 0">${hint}</div>` : ''}
    </form>`;
}

function previewChips(p, defaultDate) {
  const chips = [];
  const date = p.date || defaultDate;
  if (date) chips.push(`<span class="chip">${icon('calendar', 'sm')} ${esc(relativeLabel(date, state.today))}</span>`);
  if (p.time) chips.push(`<span class="chip">${icon('clock', 'sm')} ${esc(formatTime(p.time))}${p.duration ? ` · ${p.duration} min` : ''}</span>`);
  if (p.priority) chips.push('<span class="chip">★ Priority</span>');
  p.tags.forEach((t) => chips.push(`<span class="chip muted">#${esc(t)}</span>`));
  return chips.join('');
}

function bindQuickAdd(root, id, { defaultDate, onSubmit }) {
  const form = $(`[data-qa="${id}"]`, root);
  if (!form) return;
  const input = form.q;
  const preview = $(`#${id}-preview`, root);
  input.addEventListener('input', () => {
    const v = input.value.trim();
    preview.innerHTML = v ? previewChips(parseQuick(v, new Date(), parseOpts()), defaultDate) : '';
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    const p = parseQuick(v, new Date(), parseOpts());
    if (!p.title) p.title = v;
    input.value = '';
    preview.innerHTML = '';
    await onSubmit(p);
    input.focus();
  });
}

// ---------------------------------------------------------------------------
// Day view
// ---------------------------------------------------------------------------

async function renderDay(main, token) {
  const date = state.route.date;
  const isToday = date === state.today;
  const [entry, tasks, voice, { streak }] = await Promise.all([
    getEntry(date), db.byDate('tasks', date), db.byDate('voice', date), computeStreak(),
  ]);
  const coarse = matchMedia('(pointer: coarse)').matches;
  let carried = [];
  if (isToday) carried = (await db.byDateRange('tasks', '0000-01-01', addDays(date, -1))).filter((t) => !t.done);
  if (stale(token)) return;

  const d = fromKey(date);
  const s = state.settings;
  const rel = relativeLabel(date, state.today);
  main.innerHTML = `
    <div class="day-head" id="day-head">
      <div class="kicker">
        <span>${esc(rel === formatShort(date) ? d.toLocaleDateString(undefined, { weekday: 'long' }) : rel)}</span>
        ${streak ? `<a class="chip" id="streak-chip" href="#/insights" title="Days in a row with anything logged">${icon('flame', 'sm')} ${streak}-day streak</a>` : ''}
      </div>
      <h1>${esc(d.toLocaleDateString(undefined, { day: 'numeric', month: 'long' }))}</h1>
      <div class="sub">${esc(d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric' }))} · Week ${isoWeek(date)}</div>
    </div>

    ${isToday ? '<div id="motivation"></div>' : ''}

    <section class="card" id="schedule-card" aria-labelledby="h-sched">
      <div class="card-head"><h2 id="h-sched">${icon('calendar')} Schedule</h2>
        <button class="iconbtn" data-action="refresh-events" aria-label="Refresh calendar" title="Refresh">${icon('refresh', 'sm')}</button>
      </div>
      <div class="card-body">
        <div id="schedule-body"><div class="empty">Loading…</div></div>
        <div style="margin-top:12px">${quickAddHTML('qa-event', 'Add to schedule… e.g. “Lunch with Sam 1pm”', '')}</div>
      </div>
    </section>

    <section class="card" id="todo-card" aria-labelledby="h-todo">
      <div class="card-head"><h2 id="h-todo">${icon('tasks')} To-do <span class="count" id="todo-count"></span></h2></div>
      <div class="card-body">
        ${quickAddHTML('qa-task', 'Add a to-do… e.g. “Call mum 5pm !”', 'Type naturally: <em>tomorrow</em>, <em>fri 3pm</em>, <em>for 30 min</em>, <em>!</em> for priority, <em>#tag</em>.')}
        <ul class="tasks" id="day-tasks"></ul>
        ${carried.length ? `
          <div class="carry">
            <div class="group-label danger">${plural(carried.length, 'unfinished to-do')} from earlier
              <button class="btn sm" data-action="carry-all" style="margin-left:auto">Move all to today</button></div>
            <ul class="tasks">${sortTasks(carried).map((t) => taskRow(t, { showDate: true })).join('')}</ul>
          </div>` : ''}
      </div>
    </section>

    <section class="card" id="journal-card" aria-labelledby="h-journal">
      <div class="card-head"><h2 id="h-journal">${icon('edit')} Journal</h2><span class="save-state" id="save-state"></span></div>
      <div class="card-body">
        <div class="moods" role="group" aria-label="How are you feeling?">
          ${MOODS.map((m) => `<button class="mood" data-action="set-mood" data-v="${m.v}" aria-pressed="${entry.mood === m.v}" style="--mc:var(--mood-${m.v})"><span class="e" aria-hidden="true">${m.e}</span>${m.label}</button>`).join('')}
        </div>
        ${s.health ? `
          <div class="health" role="group" aria-label="Body check-in">
            <label class="hitem">😴 <span>Slept</span>
              <select id="h-sleep" aria-label="Hours slept last night">
                <option value="">–</option>
                ${[3, 4, 5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10, 11, 12].map((h) => `<option value="${h}" ${entry.sleep === h ? 'selected' : ''}>${h}h</option>`).join('')}
              </select></label>
            <span class="hitem">🏃 <span>Moved</span>
              <span class="seg">
                <button data-action="set-moved" data-v="yes" aria-pressed="${entry.moved === true}">Yes</button>
                <button data-action="set-moved" data-v="no" aria-pressed="${entry.moved === false}">Not today</button>
              </span></span>
          </div>` : ''}
        ${s.prompts ? `<div class="prompt"><span id="prompt-text">${esc(promptFor(date, entry))}</span>
          <button class="iconbtn" data-action="shuffle-prompt" aria-label="Another prompt" title="Another prompt">${icon('refresh', 'sm')}</button></div>` : ''}
        <div class="paper">
          <textarea id="journal-text" placeholder="${isToday ? 'Dear diary…' : 'Write about this day…'}" aria-label="Journal entry" spellcheck="true">${esc(entry.text)}</textarea>
          ${canLiveTranscribe ? `<button class="iconbtn dictate" data-action="dictate" aria-label="Dictate into journal" title="Dictate">${icon('mic')}</button>` : ''}
        </div>
        ${s.gratitude ? `
          <div class="subhead">Three good things</div>
          <ol class="gratitude">
            ${[0, 1, 2].map((i) => `<li><input data-g="${i}" value="${esc(entry.gratitude?.[i] || '')}" aria-label="Good thing ${i + 1}" placeholder="${i === 0 ? 'Something that went well…' : ''}"></li>`).join('')}
          </ol>` : ''}
        <div class="tags" id="entry-tags" style="margin-top:10px"></div>
      </div>
      <div class="card-foot"><span id="word-count"></span><span style="margin-left:auto">Use <b>#tags</b> to group entries</span></div>
    </section>

    <section class="card" id="files-card" aria-labelledby="h-files">
      <div class="card-head"><h2 id="h-files">📷 Photos & files <span class="count" id="files-count"></span></h2>
        ${coarse ? `<button class="btn sm" data-action="camera">Camera</button>` : ''}
        <button class="btn sm primary" data-action="add-files">${icon('plus', 'sm')} Add</button></div>
      <div class="card-body">
        <div class="gallery" id="gallery"></div>
        <input type="file" id="file-input" multiple hidden>
        <input type="file" id="camera-input" accept="image/*,video/*" capture="environment" hidden>
      </div>
    </section>

    <section class="card" id="voice-card" aria-labelledby="h-voice">
      <div class="card-head"><h2 id="h-voice">${icon('mic')} Voice notes <span class="count">${voice.length || ''}</span></h2>
        <button class="btn sm primary" data-action="record">${icon('mic', 'sm')} Record</button></div>
      <div class="card-body">
        ${voice.length ? `<ul class="vnotes">${voice.sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map(noteRow).join('')}</ul>` :
          `<div class="empty">${isToday ? 'Tap the mic to talk through your day, capture an idea or dictate a to-do. It will be transcribed, dated and saved to your calendar.' : 'No voice notes on this day.'}</div>`}
      </div>
      <div class="card-foot"><a href="#/notes">All voice notes →</a></div>
    </section>

    <div id="otd"></div>`;

  // Tasks
  const renderDayTasks = async () => {
    const list = sortTasks(await db.byDate('tasks', date));
    $('#day-tasks').innerHTML = list.length ? list.map((t) => taskRow(t)).join('') : `<li class="empty">Nothing planned${isToday ? ' yet. What matters most today?' : '.'}</li>`;
    const open = list.filter((t) => !t.done).length;
    $('#todo-count').textContent = list.length ? `${list.length - open}/${list.length} done` : '';
  };
  await renderDayTasks();

  bindQuickAdd(main, 'qa-task', {
    defaultDate: date,
    onSubmit: async (p) => { await addTask(p, { defaultDate: date }); await renderDayTasks(); refreshSchedule(); },
  });
  bindQuickAdd(main, 'qa-event', {
    defaultDate: date,
    onSubmit: async (p) => { await addEvent(p, { defaultDate: date }); await renderDayTasks(); refreshSchedule(); },
  });

  bindJournal(main, date, entry);
  bindFileInputs(main, date);
  renderGallery(date);
  refreshSchedule();
  renderOnThisDay(date, token);
  if (isToday) renderMotivation();
}

// ---------------------------------------------------------------------------
// Motivation card (today only)
// ---------------------------------------------------------------------------

async function renderMotivation() {
  const box = $('#motivation');
  if (!box) return;
  const { info, totals } = await loadEverything();
  const dots = info.last7.map((d) => `
    <span class="wd${d.logged ? ' on' : ''}${d.date === state.today ? ' today' : ''}" title="${esc(formatShort(d.date))}${d.logged ? ': logged' : ''}">
      <i>${d.logged ? '✓' : ''}</i><small>${esc(fromKey(d.date).toLocaleDateString(undefined, { weekday: 'narrow' }))}</small>
    </span>`).join('');
  const week = `<div class="week" aria-label="Last 7 days: ${info.last7.filter((d) => d.logged).length} logged">${dots}</div>`;
  if (info.loggedToday) {
    const facts = ins.funFacts(totals, info);
    const fact = facts.length ? facts[daySeed() % facts.length] : null;
    box.innerHTML = `
      <section class="card motivate done">
        <div class="card-body" style="padding-top:14px">
          <div class="mot-row">
            <div class="mot-flame" aria-hidden="true">🔥</div>
            <div class="grow"><b>${info.current > 1 ? `${info.current} days in a row` : 'Today counts'} ✓</b>
              <div class="small muted">${info.best > info.current ? `Best: ${plural(info.best, 'day')} · ` : ''}${plural(info.total, 'day')} journaled in total</div></div>
            ${week}
          </div>
          ${fact ? `<div class="fact"><span aria-hidden="true">${fact.emoji}</span> ${esc(fact.text)}</div>` : ''}
          <a class="small" href="#/insights">See your insights →</a>
        </div>
      </section>`;
    return;
  }
  const n = ins.nudge(info, daySeed());
  box.innerHTML = `
    <section class="card motivate">
      <div class="card-body" style="padding-top:14px">
        <div class="mot-row">
          <div class="grow"><b class="mot-title">${esc(n.title)}</b><div class="small muted">${esc(n.body)}</div></div>
          ${week}
        </div>
        <form id="oneline" class="quickadd" style="margin-top:12px" autocomplete="off">
          ${icon('edit')}
          <input name="line" placeholder="Today in one line…" aria-label="Today in one line" enterkeyhint="done">
          <button class="btn primary sm" type="submit">Save</button>
        </form>
        <div class="quick-log">
          ${MOODS.map((m) => `<button class="ql" data-action="set-mood" data-v="${m.v}" aria-label="Mood: ${m.label}" title="${m.label}">${m.e}</button>`).join('')}
          <span class="sep"></span>
          <button class="ql" data-action="add-files" aria-label="Add a photo" title="Add a photo">📷</button>
          <button class="ql" data-action="record" aria-label="Record a voice note" title="Voice note">🎙️</button>
        </div>
      </div>
    </section>`;
  $('#oneline', box).onsubmit = (e) => {
    e.preventDefault();
    const v = e.target.line.value.trim();
    if (!v) return;
    $('#main').journal?.append(v);
    e.target.line.value = '';
  };
}

// ---------------------------------------------------------------------------
// Photos, videos & files
// ---------------------------------------------------------------------------

const urlPool = new Map();
function poolURL(scope, blob) {
  if (!blob) return '';
  const url = URL.createObjectURL(blob);
  if (!urlPool.has(scope)) urlPool.set(scope, []);
  urlPool.get(scope).push(url);
  return url;
}
function releaseURLs(scope) {
  (urlPool.get(scope) || []).forEach((u) => URL.revokeObjectURL(u));
  urlPool.delete(scope);
}

function fileTile(f) {
  const thumb = f.thumb ? poolURL('gallery', f.thumb) : f.kind === 'image' ? poolURL('gallery', f.blob) : '';
  return `
    <button class="tile ${f.kind}" data-action="open-file" data-id="${f.id}" aria-label="${esc(f.caption || f.name)}">
      ${thumb ? `<img src="${thumb}" alt="" loading="lazy">` : `<span class="fi">${FILE_EMOJI[f.kind] || '📎'}</span><span class="fn">${esc(f.name)}</span>`}
      ${f.kind === 'video' ? `<span class="badge">▶ ${f.duration ? formatDuration(f.duration) : ''}</span>` : ''}
      ${f.caption ? `<span class="cap">${esc(f.caption)}</span>` : ''}
    </button>`;
}

async function renderGallery(date) {
  const g = $('#gallery');
  if (!g) return;
  releaseURLs('gallery');
  const files = (await db.byDate('files', date)).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  $('#files-count').textContent = files.length || '';
  g.innerHTML = files.length ? files.map(fileTile).join('') + `<button class="tile add" data-action="add-files" aria-label="Add more">${icon('plus')}</button>`
    : `<button class="dropzone" data-action="add-files">${icon('upload')}<span><b>Add photos, videos or files</b><br><span class="small muted">${matchMedia('(pointer: coarse)').matches ? 'Tap to choose from your library' : 'Click, drag them here, or paste a photo'}</span></span></button>`;
}

function bindFileInputs(main, date) {
  for (const id of ['#file-input', '#camera-input']) {
    const input = $(id, main);
    if (input) input.onchange = async () => { if (input.files.length) await attachFiles(date, input.files); input.value = ''; };
  }
}

async function attachFiles(date, fileList) {
  const n = fileList.length;
  if (!n) return;
  if (n > 1) toast(`Adding ${n} files…`, { ms: 2000 });
  try {
    const saved = await addFiles(date, fileList);
    const photos = saved.filter((f) => f.kind === 'image').length;
    const videos = saved.filter((f) => f.kind === 'video').length;
    const other = saved.length - photos - videos;
    const parts = [photos && plural(photos, 'photo'), videos && plural(videos, 'video'), other && plural(other, 'file')].filter(Boolean);
    toast(`Added ${parts.join(', ')} to ${relativeLabel(date, state.today)}`);
    if (state.route.view === 'day' && state.route.date === date) renderGallery(date);
    onActivity();
  } catch (e) {
    if (e?.name === 'QuotaExceededError') toast('Your device is out of storage for Daybook. Back up and remove some large videos.', { error: true, ms: 9000 });
    else reportError(e);
  }
}

async function openFile(id) {
  const f = await db.get('files', id);
  if (!f) return;
  const siblings = (await db.byDate('files', f.date)).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const idx = siblings.findIndex((x) => x.id === id);
  const url = URL.createObjectURL(f.blob);
  const entry = await getEntry(f.date);
  let media = '';
  if (f.kind === 'image') media = `<img class="viewer-media" src="${url}" alt="${esc(f.caption || f.name)}">`;
  else if (f.kind === 'video') media = `<video class="viewer-media" src="${url}" controls playsinline></video>`;
  else if (f.kind === 'audio') media = `<audio src="${url}" controls></audio>`;
  else media = `<div class="callout"><span style="font-size:32px">${FILE_EMOJI[f.kind] || '📎'}</span><span class="grow"><b>${esc(f.name)}</b><br><span class="small">${formatBytes(f.size)}</span></span><a class="btn sm" href="${url}" target="_blank" rel="noopener">Open</a></div>`;
  const s = openSheet(`
    <div class="sheet-head">
      <h2 style="font-size:17px">${esc(relativeLabel(f.date, state.today))}${siblings.length > 1 ? ` <span class="small muted" style="font-family:var(--sans)">${idx + 1} of ${siblings.length}</span>` : ''}</h2>
      ${siblings.length > 1 ? `<button class="iconbtn" id="f-prev" aria-label="Previous">${icon('left')}</button><button class="iconbtn" id="f-next" aria-label="Next">${icon('right')}</button>` : ''}
      <button class="iconbtn" data-close aria-label="Close">${icon('x')}</button>
    </div>
    <div class="viewer">${media}</div>
    <label class="field"><span>Caption</span><input class="input" id="f-cap" value="${esc(f.caption)}" placeholder="What’s happening here?"></label>
    <div class="small muted">${esc(f.name)} · ${formatBytes(f.size)}${f.width ? ` · ${f.width}×${f.height}` : ''}</div>
    <div class="btn-row" style="margin-top:12px">
      ${f.kind === 'image' ? `<button class="btn" id="f-cover">${entry.coverId === f.id ? '★ Calendar cover' : '☆ Use as calendar cover'}</button>` : ''}
      <label class="btn">${icon('calendar', 'sm')} Move to <input type="date" id="f-date" value="${f.date}" style="border:0;background:none;width:9.5em"></label>
      <button class="btn ghost" id="f-dl">${icon('download', 'sm')}</button>
      <button class="btn ghost danger" id="f-del" style="margin-left:auto">${icon('trash', 'sm')} Delete</button>
    </div>`, { label: 'Photo or file', onClose: () => { URL.revokeObjectURL(url); render(); } });
  const saveCap = debounce(async () => { const cur = await db.get('files', id); if (cur) { cur.caption = $('#f-cap', s.el).value; await db.put('files', cur); } }, 400);
  $('#f-cap', s.el).addEventListener('input', saveCap);
  const nav = (d) => () => { const next = siblings[(idx + d + siblings.length) % siblings.length]; s.close(); openFile(next.id); };
  if ($('#f-prev', s.el)) { $('#f-prev', s.el).onclick = nav(-1); $('#f-next', s.el).onclick = nav(1); }
  const cover = $('#f-cover', s.el);
  if (cover) cover.onclick = async () => {
    const e = await getEntry(f.date);
    e.coverId = e.coverId === f.id ? null : f.id;
    await db.put('entries', e);
    cover.textContent = e.coverId === f.id ? '★ Calendar cover' : '☆ Use as calendar cover';
  };
  $('#f-date', s.el).onchange = async (e) => {
    if (!e.target.value) return;
    const cur = await db.get('files', id);
    cur.date = e.target.value;
    await db.put('files', cur);
    toast(`Moved to ${relativeLabel(cur.date, state.today)}`);
    s.close();
    onActivity();
  };
  $('#f-dl', s.el).onclick = () => download(f.name, f.blob);
  $('#f-del', s.el).onclick = async () => {
    s.close();
    if (!(await confirmSheet('Delete this file?', 'It will be removed from this device.'))) return;
    await db.delete('files', id);
    toast('Deleted');
    render();
  };
}

async function refreshSchedule({ force = false } = {}) {
  if (state.route.view !== 'day') return;
  const date = state.route.date;
  const body = $('#schedule-body');
  if (!body) return;
  const draw = async () => {
    const tasks = (await db.byDate('tasks', date)).filter((t) => t.time);
    const taskIds = new Set((await db.all('tasks')).map((t) => 'task:' + t.id));
    const voiceIds = new Set((await db.byDateRange('voice', addDays(date, -1), addDays(date, 1))).map((v) => 'voice:' + v.id));
    const events = cachedEventsFor(date).filter((e) => !e.daybook || (!taskIds.has(e.daybook) && !voiceIds.has(e.daybook)));
    if (state.route.date !== date || !$('#schedule-body')) return;
    body.innerHTML = scheduleHTML(date, events, tasks);
  };
  await draw();
  if (connected()) {
    await loadMonthEvents(monthOf(date), { force });
    await draw();
  }
}

function scheduleHTML(date, events, tasks) {
  const allDay = events.filter((e) => e.allDay || e.days.length > 1 && !(dayKey(e.start) === date));
  const timed = [
    ...events.filter((e) => !allDay.includes(e)).map((e) => ({ kind: 'event', at: timeFromDate(e.start), e })),
    ...tasks.map((t) => ({ kind: 'task', at: t.time, t })),
  ].sort((a, b) => a.at.localeCompare(b.at));

  let html = '';
  if (!connected()) {
    const cta = state.settings.clientId
      ? `<button class="btn sm primary" data-action="connect">${gcal.wasEverConnected() ? 'Reconnect' : 'Connect'} Google</button>`
      : `<button class="btn sm" data-action="settings" data-section="google">Set up</button>`;
    html += `<div class="callout" style="margin-bottom:10px">${icon('calendar')}<span class="grow">${gcal.wasEverConnected() ? 'Your Google session expired. Reconnect to see today’s events.' : 'Connect Google Calendar to see your events here and sync to-dos and voice notes.'}</span>${cta}</div>`;
  }
  if (allDay.length) {
    html += `<div class="allday">${allDay.map((e) => `<a class="chip" style="--c:${esc(e.color || 'var(--blue)')}" href="${esc(e.link)}" target="_blank" rel="noopener">${esc(e.title)}</a>`).join('')}</div>`;
  }
  if (!timed.length) {
    html += `<div class="empty">${allDay.length ? 'No timed events.' : 'A clear day. Add something below or type a time into a to-do.'}</div>`;
    return html;
  }
  const isToday = date === state.today;
  const nowT = timeFromDate(new Date());
  let nowPlaced = !isToday;
  html += '<ul class="timeline">';
  for (const item of timed) {
    if (!nowPlaced && item.at > nowT) {
      html += `<li class="now-line" aria-label="Now"><span>NOW</span><i></i></li>`;
      nowPlaced = true;
    }
    if (item.kind === 'event') {
      const e = item.e;
      const past = isToday && e.end < new Date();
      html += `
        <li class="tl-item${past ? ' past' : ''}">
          <div class="tl-time">${esc(formatTime(item.at))}<small>${esc(formatTime(timeFromDate(e.end)))}</small></div>
          <div class="tl-body" style="--c:${esc(e.color || 'var(--blue)')}">
            <b>${esc(e.title)}</b>
            <div class="small">${e.location ? esc(e.location) + ' · ' : ''}<a href="${esc(e.link)}" target="_blank" rel="noopener">Open</a>${e.meet ? ` · <a href="${esc(e.meet)}" target="_blank" rel="noopener">Join call</a>` : ''}</div>
          </div>
        </li>`;
    } else {
      const t = item.t;
      html += `
        <li class="tl-item task-item${t.done ? ' past' : ''}">
          <div class="tl-time">${esc(formatTime(t.time))}${t.duration ? `<small>${t.duration} min</small>` : ''}</div>
          <div class="tl-body"><b>${t.done ? '✅ ' : ''}${esc(t.title)}</b><div class="small">To-do${t.gcalEventId ? ' · in Google Calendar' : ''} · <a href="#" data-action="edit-task" data-id="${t.id}">Edit</a></div></div>
        </li>`;
    }
  }
  if (!nowPlaced) html += `<li class="now-line" aria-label="Now"><span>NOW</span><i></i></li>`;
  html += '</ul>';
  return html;
}

function bindJournal(main, date, entry) {
  const ta = $('#journal-text', main);
  const saveState = $('#save-state', main);
  const wc = $('#word-count', main);
  const tagsEl = $('#entry-tags', main);

  const grow = () => {
    ta.style.height = 'auto';
    ta.style.height = Math.max(228, Math.ceil((ta.scrollHeight - 4) / 32) * 32 + 4) + 'px';
  };
  const meta = () => {
    const words = (ta.value.match(/\S+/g) || []).length;
    wc.textContent = words ? plural(words, 'word') : '';
    const tags = extractTags(ta.value + ' ' + (entry.gratitude || []).join(' '));
    tagsEl.innerHTML = tags.map((t) => `<a class="chip muted" href="#/search/${encodeURIComponent('#' + t)}">#${esc(t)}</a>`).join('');
  };
  const persist = debounce(async () => {
    entry.text = ta.value;
    entry.gratitude = $$('[data-g]', main).map((i) => i.value);
    entry.tags = extractTags(entry.text + ' ' + entry.gratitude.join(' '));
    entry.updatedAt = new Date().toISOString();
    await db.put('entries', entry);
    saveState.innerHTML = `${icon('check', 'sm')} Saved`;
    onActivity();
  }, 500);
  // Time spent writing: count gaps between keystrokes shorter than 30s.
  let lastKey = 0;
  const trackTime = () => {
    const now = Date.now();
    if (lastKey && now - lastKey < 30000) entry.writeSeconds = (entry.writeSeconds || 0) + (now - lastKey) / 1000;
    lastKey = now;
    if (!entry.firstWriteAt) entry.firstWriteAt = new Date().toISOString();
  };
  const onInput = () => { trackTime(); saveState.textContent = 'Saving…'; grow(); meta(); persist(); };
  const saveNow = async () => { entry.updatedAt = new Date().toISOString(); await db.put('entries', entry); onActivity(); };
  $('#h-sleep', main)?.addEventListener('change', (e) => { entry.sleep = e.target.value === '' ? null : Number(e.target.value); saveNow(); });
  ta.addEventListener('input', onInput);
  $$('[data-g]', main).forEach((i) => i.addEventListener('input', onInput));
  // Flush pending saves when leaving the page.
  window.addEventListener('pagehide', () => persist(), { once: true });
  requestAnimationFrame(grow);
  meta();

  main.journal = {
    entry,
    async setMood(v) {
      entry.mood = entry.mood === v ? null : v;
      if (!entry.firstWriteAt) entry.firstWriteAt = new Date().toISOString();
      await saveNow();
      $$('.mood', main).forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.v) === entry.mood)));
    },
    async setMoved(v) {
      entry.moved = entry.moved === v ? null : v;
      await saveNow();
      $$('[data-action="set-moved"]', main).forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.v === 'yes') === entry.moved && entry.moved != null)));
    },
    async shufflePrompt() {
      const cur = promptFor(date, entry);
      let next;
      do next = PROMPTS[Math.floor(Math.random() * PROMPTS.length)]; while (next === cur);
      entry.prompt = next;
      await db.put('entries', entry);
      $('#prompt-text').textContent = next;
    },
    append(text) {
      const sep = ta.value && !/\s$/.test(ta.value) ? (/[.!?]$/.test(ta.value.trim()) ? ' ' : '. ') : '';
      ta.value += sep + text;
      onInput();
    },
    textarea: ta,
  };
}

async function renderOnThisDay(date, token) {
  const d = fromKey(date);
  const targets = [
    { label: 'A week ago', key: addDays(date, -7) },
    { label: 'A month ago', key: dayKey(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate())) },
    ...[1, 2, 3, 4, 5].map((y) => ({ label: y === 1 ? 'A year ago' : `${y} years ago`, key: dayKey(new Date(d.getFullYear() - y, d.getMonth(), d.getDate())) })),
  ];
  const found = [];
  for (const t of targets) {
    const e = await db.get('entries', t.key);
    const photos = (await db.byDate('files', t.key)).filter((f) => f.kind === 'image' && f.thumb);
    if ((e && (e.text || '').trim()) || photos.length) found.push({ ...t, e: e || { text: '' }, photos });
  }
  if (stale(token) || !found.length) return;
  releaseURLs('otd');
  $('#otd').innerHTML = `
    <section class="card" aria-labelledby="h-otd">
      <div class="card-head"><h2 id="h-otd">${icon('sparkles')} On this day</h2></div>
      <div class="card-body onthisday">
        ${found.slice(0, 3).map((f) => `
          <button data-action="goto" data-hash="#/day/${f.key}">
            <span class="when">${esc(f.label)} · ${esc(formatShort(f.key))}${f.e.mood ? ' ' + MOODS[f.e.mood - 1].e : ''}</span>
            ${esc((f.e.text || '').trim().slice(0, 220))}${(f.e.text || '').trim().length > 220 ? '…' : ''}
            ${f.photos.length ? `<span class="otd-photos">${f.photos.slice(0, 4).map((p) => `<img src="${poolURL('otd', p.thumb)}" alt="">`).join('')}</span>` : ''}
          </button>`).join('')}
      </div>
    </section>`;
}

// ---------------------------------------------------------------------------
// Voice notes
// ---------------------------------------------------------------------------

function noteRow(n) {
  const t = new Date(n.createdAt);
  return `
    <li class="vnote" data-action="open-note" data-id="${n.id}">
      <button class="play" data-action="play-note" data-id="${n.id}" aria-label="Play ${esc(n.title || 'voice note')}">${icon('play', 'sm')}</button>
      <div class="vnote-main">
        <div class="vnote-title">${esc(n.title || 'Voice note')}</div>
        ${n.transcript ? `<div class="vnote-text">${esc(n.transcript)}</div>` : `<div class="vnote-text muted"><i>${n.transcribing ? 'Transcribing…' : 'No transcript'}</i></div>`}
        <div class="vnote-meta">
          <span>${esc(t.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }))}</span>
          <span>${formatDuration(n.duration)}</span>
          ${n.gcalEventId ? `<span class="chip blue">${icon('calendar', 'sm')} In calendar</span>` : n.needsSync && state.settings.syncVoice && state.settings.clientId ? '<span class="chip muted">Pending sync</span>' : ''}
          ${(n.tags || []).map((g) => `<span class="chip muted">#${esc(g)}</span>`).join('')}
        </div>
        <div class="progress" hidden><i></i></div>
      </div>
    </li>`;
}

const player = { audio: null, id: null, url: null };
async function playNote(id, btn) {
  if (player.id === id && player.audio && !player.audio.paused) {
    player.audio.pause();
    return;
  }
  stopPlayer();
  const n = await db.get('voice', id);
  if (!n?.blob) return toast('Audio for this note is not on this device.', { error: true });
  player.url = URL.createObjectURL(n.blob);
  player.audio = new Audio(player.url);
  player.id = id;
  const row = btn.closest('.vnote');
  const bar = row && $('.progress', row);
  if (bar) bar.hidden = false;
  player.audio.ontimeupdate = () => { if (bar && player.audio.duration) $('i', bar).style.width = (player.audio.currentTime / player.audio.duration) * 100 + '%'; };
  player.audio.onplay = () => { btn.classList.add('playing'); btn.innerHTML = icon('pause', 'sm'); };
  player.audio.onpause = () => { btn.classList.remove('playing'); btn.innerHTML = icon('play', 'sm'); };
  player.audio.onended = () => { stopPlayer(); if (bar) bar.hidden = true; };
  player.audio.play().catch(reportError);
}
function stopPlayer() {
  if (player.audio) { player.audio.pause(); player.audio.onpause?.(); }
  if (player.url) URL.revokeObjectURL(player.url);
  player.audio = player.id = player.url = null;
}

function autoTitle(transcript, when) {
  const clean = (transcript || '').replace(/#\S+/g, '').trim();
  if (!clean) return `Voice note ${when.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`;
  const first = clean.split(/(?<=[.!?])\s/)[0];
  const words = first.split(/\s+/).slice(0, 7).join(' ');
  return words.replace(/[.,;:!?]+$/, '') + (first.split(/\s+/).length > 7 ? '…' : '');
}

const spokenTags = (s) => (s || '').replace(/\bhash ?tag\s+(\w+)/gi, '#$1');

function openRecorder() {
  if (!canRecord) {
    toast('Recording is not supported in this browser. Try Chrome, Edge or Safari.', { error: true });
    return;
  }
  const bars = 36;
  const s = openSheet(`
    <div class="recorder">
      <div class="rec-status" id="rec-status"><i></i><span>Starting…</span></div>
      <div class="rec-time" id="rec-time">0:00</div>
      <div class="wave" id="wave">${'<i></i>'.repeat(bars)}</div>
      <div class="live" id="live" aria-live="polite">${state.settings.liveTranscribe && canLiveTranscribe
        ? '<span class="placeholder">Start talking… your words appear here. Try “remind me to call the dentist tomorrow at 10”.</span>'
        : `<span class="placeholder">${canLiveTranscribe ? 'Live transcription is off.' : 'Live transcription is not available in this browser.'} ${state.settings.openaiKey ? 'The note will be transcribed after you stop.' : 'Audio will still be saved.'}</span>`}</div>
      <div class="rec-controls">
        <div><button class="round" id="rec-cancel" aria-label="Discard">${icon('trash')}</button><label>Discard</label></div>
        <div><button class="stop" id="rec-stop" aria-label="Stop and save">${icon('stop')}</button><label>Save</label></div>
        <div><button class="round" id="rec-pause" aria-label="Pause">${icon('pause')}</button><label id="rec-pause-l">Pause</label></div>
      </div>
    </div>`, { label: 'Recording', onClose: () => { if (rec?.running) rec.cancel(); clearInterval(timer); } });
  s.el.dataset.locked = '1';

  const levels = new Array(bars).fill(0);
  const waveBars = $$('#wave i', s.el);
  let lastPush = 0;
  let rec = null;
  let timer = null;

  rec = new Recorder({
    lang: state.settings.lang,
    liveTranscribe: state.settings.liveTranscribe,
    onTranscript: (final, interim) => {
      $('#live', s.el).innerHTML = `${esc(final)} <span class="interim">${esc(interim)}</span>`;
      $('#live', s.el).scrollTop = 1e6;
    },
    onLevel: (l) => {
      const now = performance.now();
      if (now - lastPush < 60) return;
      lastPush = now;
      levels.shift();
      levels.push(l);
      waveBars.forEach((b, i) => (b.style.height = Math.max(4, levels[i] * 56) + 'px'));
    },
  });

  const startedAt = new Date();
  rec.start().then(() => {
    $('#rec-status span', s.el).textContent = 'Recording';
    timer = setInterval(() => ($('#rec-time', s.el).textContent = formatDuration(rec.elapsed())), 250);
  }).catch((e) => {
    s.close();
    toast(e.name === 'NotAllowedError' ? 'Microphone access was blocked. Allow it in your browser settings to record.' : 'Could not start recording: ' + e.message, { error: true, ms: 8000 });
  });

  $('#rec-cancel', s.el).onclick = () => { rec.cancel(); s.close(); toast('Recording discarded'); };
  $('#rec-pause', s.el).onclick = () => {
    const status = $('#rec-status', s.el);
    if (rec.paused) {
      rec.resume();
      status.classList.remove('paused');
      $('span', status).textContent = 'Recording';
      $('#rec-pause', s.el).innerHTML = icon('pause');
      $('#rec-pause-l', s.el).textContent = 'Pause';
    } else {
      rec.pause();
      status.classList.add('paused');
      $('span', status).textContent = 'Paused';
      $('#rec-pause', s.el).innerHTML = icon('mic');
      $('#rec-pause-l', s.el).textContent = 'Resume';
    }
  };
  $('#rec-stop', s.el).onclick = async () => {
    $('#rec-stop', s.el).disabled = true;
    clearInterval(timer);
    const result = await rec.stop();
    s.close();
    if (result.duration < 0.8 && !result.transcript) return toast('That was too short to save.');
    const transcript = spokenTags(result.transcript);
    const note = {
      id: uid(),
      date: dayKey(startedAt),
      createdAt: startedAt.toISOString(),
      duration: result.duration,
      mime: result.mime,
      blob: result.blob,
      transcript,
      title: autoTitle(transcript, startedAt),
      tags: extractTags(transcript),
      transcribing: false,
    };
    const needsCloud = state.settings.openaiKey && (state.settings.cloudAlways || !transcript);
    if (needsCloud) note.transcribing = true;
    await db.put('voice', note);
    toast('Voice note saved');
    onActivity();
    render();
    openNote(note.id, { fresh: true });
    if (needsCloud) await runCloudTranscription(note.id);
    else syncVoice(note).then(() => refreshOpenNote(note.id));
  };
}

async function runCloudTranscription(id) {
  const note = await db.get('voice', id);
  if (!note?.blob) return;
  note.transcribing = true;
  await db.put('voice', note);
  refreshOpenNote(id);
  try {
    const text = spokenTags(await cloudTranscribe(note.blob, { apiKey: state.settings.openaiKey, lang: state.settings.lang }));
    const hadAutoTitle = !note.titleEdited;
    note.transcript = text;
    if (hadAutoTitle) note.title = autoTitle(text, new Date(note.createdAt));
    note.tags = extractTags(text);
  } catch (e) {
    reportError(e);
  }
  note.transcribing = false;
  await db.put('voice', note);
  await syncVoice(note);
  refreshOpenNote(id);
  render();
}

let openNoteId = null;
let refreshOpenNote = () => {};

async function openNote(id, { fresh = false } = {}) {
  const n = await db.get('voice', id);
  if (!n) return;
  const url = n.blob ? URL.createObjectURL(n.blob) : null;
  const when = new Date(n.createdAt);
  let dirty = false;
  const s = openSheet(`
    <div class="sheet-head">
      <h2><input class="input" id="n-title" value="${esc(n.title)}" aria-label="Title" style="font:600 19px var(--serif);border-color:transparent;background:none;padding-left:0"></h2>
      <button class="iconbtn" data-close aria-label="Close">${icon('x')}</button>
    </div>
    <div class="small muted">${esc(formatLong(n.date))} · ${esc(when.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }))} · ${formatDuration(n.duration)}</div>
    ${url ? `<audio controls src="${url}" preload="metadata"></audio>` : ''}
    <label class="field"><span>Transcript</span>
      <textarea class="input" id="n-text" rows="6" style="font:16px/1.5 var(--serif)" placeholder="${n.transcribing ? 'Transcribing…' : 'No transcript yet. Type one, or use cloud transcription.'}">${esc(n.transcript)}</textarea>
    </label>
    <div id="n-actions"></div>
    <div id="n-sync" class="small muted" style="margin:10px 0"></div>
    <div class="btn-row" style="margin-top:8px">
      <button class="btn" id="n-journal">${icon('book', 'sm')} Add to journal</button>
      ${state.settings.openaiKey && n.blob ? `<button class="btn" id="n-cloud">${icon('sparkles', 'sm')} Transcribe (high accuracy)</button>` : ''}
      ${n.blob ? `<button class="btn ghost" id="n-dl">${icon('download', 'sm')} Audio</button>` : ''}
      <button class="btn ghost danger" id="n-del" style="margin-left:auto">${icon('trash', 'sm')} Delete</button>
    </div>`, {
    label: 'Voice note',
    onClose: async () => {
      openNoteId = null;
      if (url) URL.revokeObjectURL(url);
      if (dirty) {
        const cur = await db.get('voice', id);
        if (cur) await syncVoice(cur);
      }
      render();
    },
  });
  openNoteId = id;

  const drawActions = async () => {
    const cur = await db.get('voice', id);
    if (!cur) return;
    const acts = extractActions(cur.transcript, new Date(cur.createdAt), parseOpts());
    const done = new Set(cur.addedActions || []);
    $('#n-actions', s.el).innerHTML = acts.length ? `
      <div class="subhead" style="margin-top:6px">${icon('sparkles', 'sm')} Found in this note</div>
      <div class="suggestions">
        ${acts.map((a, i) => {
          const key = a.parsed.title.toLowerCase();
          const added = done.has(key);
          return `<div class="suggestion${added ? ' added' : ''}">
            <span class="grow"><b>${esc(a.parsed.title)}</b>
              <span class="small muted">${a.kind === 'event' ? 'Event' : 'To-do'}${a.parsed.date ? ' · ' + esc(relativeLabel(a.parsed.date, state.today)) : ''}${a.parsed.time ? ' · ' + esc(formatTime(a.parsed.time)) : ''}</span></span>
            <button class="btn sm ${added ? '' : 'primary'}" data-i="${i}" ${added ? 'disabled' : ''}>${added ? icon('check', 'sm') + ' Added' : a.kind === 'event' ? 'Add event' : 'Add to-do'}</button>
          </div>`;
        }).join('')}
      </div>` : '';
    $$('#n-actions [data-i]', s.el).forEach((b) => (b.onclick = async () => {
      const a = acts[Number(b.dataset.i)];
      b.disabled = true;
      if (a.kind === 'event') await addEvent(a.parsed, { defaultDate: cur.date });
      else {
        await addTask(a.parsed, { source: 'voice', notes: `From voice note “${cur.title}”` });
        toast(`Added to-do “${a.parsed.title}”`);
      }
      const latest = await db.get('voice', id);
      latest.addedActions = [...new Set([...(latest.addedActions || []), a.parsed.title.toLowerCase()])];
      await db.put('voice', latest);
      drawActions();
    }));
    const sync = $('#n-sync', s.el);
    if (cur.gcalEventId) sync.innerHTML = `${icon('calendar', 'sm')} Saved to Google Calendar${cur.gcalLink ? ` · <a href="${esc(cur.gcalLink)}" target="_blank" rel="noopener">Open event</a>` : ''}${cur.driveLink ? ` · <a href="${esc(cur.driveLink)}" target="_blank" rel="noopener">Audio in Drive</a>` : ''}`;
    else if (!state.settings.syncVoice) sync.textContent = 'Calendar sync for voice notes is off (Settings).';
    else if (cur.needsSync) sync.innerHTML = `Will be added to Google Calendar when you connect. <a href="#" id="n-connect">Connect now</a>`;
    else sync.textContent = connected() ? 'Saving to Google Calendar…' : '';
    const nc = $('#n-connect', s.el);
    if (nc) nc.onclick = (e) => { e.preventDefault(); connectGoogle(); };
    const ta = $('#n-text', s.el);
    if (cur.transcribing) { ta.placeholder = 'Transcribing…'; }
    if (!dirty && document.activeElement !== ta && ta.value !== (cur.transcript || '')) ta.value = cur.transcript || '';
    if (document.activeElement !== $('#n-title', s.el)) $('#n-title', s.el).value = cur.title || '';
  };
  refreshOpenNote = (nid) => { if (nid === openNoteId) drawActions(); };
  drawActions();

  const saveNote = debounce(async () => {
    const cur = await db.get('voice', id);
    if (!cur) return;
    cur.transcript = $('#n-text', s.el).value;
    cur.title = cur.titleEdited ? $('#n-title', s.el).value.trim() || cur.title : autoTitle(cur.transcript, new Date(cur.createdAt));
    cur.tags = extractTags(spokenTags(cur.transcript));
    await db.put('voice', cur);
    dirty = true;
    drawActions();
  }, 500);
  $('#n-text', s.el).addEventListener('input', saveNote);
  $('#n-title', s.el).addEventListener('input', async () => {
    const cur = await db.get('voice', id);
    if (cur) { cur.titleEdited = true; await db.put('voice', cur); }
    saveNote();
  });
  $('#n-journal', s.el).onclick = async () => {
    const cur = await db.get('voice', id);
    const entry = await getEntry(cur.date);
    const time = new Date(cur.createdAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    entry.text = (entry.text ? entry.text.replace(/\s+$/, '') + '\n\n' : '') + `🎙 ${time} — ${cur.transcript || cur.title}`;
    entry.updatedAt = new Date().toISOString();
    await db.put('entries', entry);
    toast('Added to your journal for ' + relativeLabel(cur.date, state.today));
  };
  const cloud = $('#n-cloud', s.el);
  if (cloud) cloud.onclick = () => { cloud.disabled = true; runCloudTranscription(id); };
  const dl = $('#n-dl', s.el);
  if (dl) dl.onclick = () => download(`${n.title || 'voice-note'}.${n.mime?.includes('mp4') ? 'm4a' : n.mime?.includes('ogg') ? 'ogg' : 'webm'}`, n.blob);
  $('#n-del', s.el).onclick = async () => {
    s.close();
    if (!(await confirmSheet('Delete voice note?', 'The recording and transcript will be removed from this device and from Google Calendar.'))) return;
    const cur = await db.get('voice', id);
    await db.delete('voice', id);
    if (cur?.gcalEventId && connected()) gcal.deleteEvent(cur.gcalCalendarId || state.settings.writeCalendar, cur.gcalEventId).catch(reportError);
    toast('Voice note deleted');
    render();
  };
  if (fresh) $('#n-text', s.el).blur();
}

// ---------------------------------------------------------------------------
// Tasks view
// ---------------------------------------------------------------------------

async function renderTasks(main, token) {
  const all = await db.all('tasks');
  if (stale(token)) return;
  const f = state.taskFilter;
  const today = state.today;
  const endOfWeek = addDays(today, 7);
  let html = `
    <div class="day-head"><h1>To-do</h1><div class="sub">${plural(all.filter((t) => !t.done).length, 'open item')}</div></div>
    <div class="card"><div class="card-body" style="padding-top:14px">
      ${quickAddHTML('qa-all', 'Add a to-do… e.g. “Renew passport next friday !”', 'No date = <b>Someday</b>. Timed to-dos appear in Google Calendar.')}
    </div></div>
    <div class="btn-row" role="tablist" style="margin:6px 0">
      <button class="btn sm ${f === 'open' ? 'primary' : ''}" data-action="task-filter" data-f="open" role="tab" aria-selected="${f === 'open'}">Open</button>
      <button class="btn sm ${f === 'done' ? 'primary' : ''}" data-action="task-filter" data-f="done" role="tab" aria-selected="${f === 'done'}">Completed</button>
    </div>`;
  if (f === 'open') {
    const open = all.filter((t) => !t.done);
    const groups = [
      { label: 'Overdue', cls: 'danger', items: open.filter((t) => t.date && t.date < today) },
      { label: 'Today', items: open.filter((t) => t.date === today) },
      { label: 'Tomorrow', items: open.filter((t) => t.date === addDays(today, 1)) },
      { label: 'Next 7 days', items: open.filter((t) => t.date > addDays(today, 1) && t.date <= endOfWeek) },
      { label: 'Later', items: open.filter((t) => t.date > endOfWeek) },
      { label: 'Someday', items: open.filter((t) => !t.date) },
    ];
    const any = groups.some((g) => g.items.length);
    html += any ? groups.filter((g) => g.items.length).map((g) => `
      <div class="group-label ${g.cls || ''}">${g.label} <span class="muted">${g.items.length}</span>
        ${g.label === 'Overdue' ? '<button class="btn sm" data-action="carry-all" style="margin-left:auto">Move all to today</button>' : ''}</div>
      <div class="card"><div class="card-body" style="padding-top:4px;padding-bottom:4px"><ul class="tasks" style="margin:0">
        ${sortTasks(g.items).sort((a, b) => (a.date || '').localeCompare(b.date || '')).map((t) => taskRow(t, { showDate: g.label !== 'Today' && g.label !== 'Tomorrow' })).join('')}
      </ul></div></div>`).join('') : `<div class="callout" style="margin-top:14px">${icon('check')}<span class="grow">All clear. Add a to-do above, or say one in a voice note: “I need to…”</span></div>`;
  } else {
    const done = all.filter((t) => t.done).sort((a, b) => (b.doneAt || '').localeCompare(a.doneAt || '')).slice(0, 200);
    html += done.length ? `<div class="card"><div class="card-body"><ul class="tasks">${done.map((t) => taskRow(t, { showDate: true })).join('')}</ul></div></div>
      <div class="btn-row"><button class="btn sm ghost danger" data-action="clear-done">Clear completed</button></div>` : '<div class="empty">Nothing completed yet.</div>';
  }
  main.innerHTML = html;
  bindQuickAdd(main, 'qa-all', { defaultDate: null, onSubmit: async (p) => { await addTask(p); toast(`Added “${p.title}”${p.date ? ' for ' + relativeLabel(p.date, today) : ''}`); render(); } });
}

function openTaskEditor(id) {
  db.get('tasks', id).then((t) => {
    if (!t) return;
    const s = openSheet(`
      <div class="sheet-head"><h2>Edit to-do</h2><button class="iconbtn" data-close aria-label="Close">${icon('x')}</button></div>
      <form id="tform">
        <label class="field"><span>Title</span><input class="input" name="title" value="${esc(t.title)}" required></label>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          <label class="field"><span>Date</span><input class="input" type="date" name="date" value="${esc(t.date || '')}"></label>
          <label class="field"><span>Time</span><input class="input" type="time" name="time" value="${esc(t.time || '')}"></label>
          <label class="field"><span>Length</span><select class="input" name="duration">
            ${[['', '—'], [15, '15 min'], [30, '30 min'], [45, '45 min'], [60, '1 hour'], [90, '1.5 hours'], [120, '2 hours'], [180, '3 hours']].map(([v, l]) => `<option value="${v}" ${String(t.duration || '') === String(v) ? 'selected' : ''}>${l}</option>`).join('')}
          </select></label>
        </div>
        <label class="switch"><span class="text"><b>★ Priority</b><small>Shows at the top of the list</small></span><input type="checkbox" name="priority" ${t.priority ? 'checked' : ''}></label>
        <label class="switch"><span class="text"><b>Show in Google Calendar</b><small>Needs a date and a time${state.settings.syncTasks ? '' : ' (sync is off in Settings)'}</small></span><input type="checkbox" name="sync" ${t.sync !== false ? 'checked' : ''}></label>
        <label class="field"><span>Notes</span><textarea class="input" name="notes" rows="3">${esc(t.notes || '')}</textarea></label>
        ${t.gcalLink ? `<p class="small"><a href="${esc(t.gcalLink)}" target="_blank" rel="noopener">${icon('external', 'sm')} Open in Google Calendar</a></p>` : ''}
        <div class="btn-row" style="margin-top:10px">
          <button type="button" class="btn ghost danger" id="t-del">${icon('trash', 'sm')} Delete</button>
          <button type="button" class="btn ghost" id="t-tmrw">Tomorrow</button>
          <span style="flex:1"></span>
          <button type="button" class="btn ghost" data-close>Cancel</button>
          <button class="btn primary" type="submit">Save</button>
        </div>
      </form>`, { label: 'Edit to-do' });
    const form = $('#tform', s.el);
    form.onsubmit = async (e) => {
      e.preventDefault();
      t.title = form.title.value.trim() || t.title;
      t.date = form.date.value || null;
      t.time = form.time.value || null;
      t.duration = Number(form.duration.value) || null;
      t.priority = form.priority.checked ? 1 : 0;
      t.sync = form.sync.checked;
      t.notes = form.notes.value;
      t.tags = extractTags(t.title + ' ' + t.notes);
      await db.put('tasks', t);
      s.close();
      if (t.gcalEventId || wantsTaskSync(t)) await syncTask(t);
      render();
    };
    $('#t-del', s.el).onclick = async () => { s.close(); await deleteTask(t.id); render(); };
    $('#t-tmrw', s.el).onclick = async () => { s.close(); await moveTask(t.id, addDays(state.today, 1)); toast('Moved to tomorrow'); render(); };
  });
}

// ---------------------------------------------------------------------------
// Notes view
// ---------------------------------------------------------------------------

async function renderNotes(main, token) {
  const notes = (await db.all('voice')).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (stale(token)) return;
  const total = notes.reduce((s, n) => s + (n.duration || 0), 0);
  const groups = new Map();
  for (const n of notes) {
    if (!groups.has(n.date)) groups.set(n.date, []);
    groups.get(n.date).push(n);
  }
  main.innerHTML = `
    <div class="day-head"><h1>Voice notes</h1><div class="sub">${plural(notes.length, 'note')} · ${formatDuration(total)} recorded</div></div>
    <button class="btn primary" data-action="record" style="width:100%;min-height:52px;margin:8px 0 4px">${icon('mic')} New voice note</button>
    ${!canLiveTranscribe ? `<div class="callout" style="margin-top:10px">${icon('help')}<span class="grow">This browser can’t transcribe live. Audio still records. For transcripts use Chrome, Edge or Safari, or add an OpenAI key in Settings.</span></div>` : ''}
    ${notes.length ? [...groups].map(([date, list]) => `
      <div class="group-label"><a href="#/day/${date}" style="color:inherit;text-decoration:none">${esc(relativeLabel(date, state.today))}</a></div>
      <div class="card"><div class="card-body" style="padding-top:2px;padding-bottom:2px"><ul class="vnotes">${list.map(noteRow).join('')}</ul></div></div>`).join('')
      : '<div class="empty" style="margin-top:14px">No voice notes yet. Tap record and just talk: ideas, reflections, to-dos (“remind me to…”) and plans (“meeting with Alex on Friday at 2pm”) are picked up automatically.</div>'}`;
}

// ---------------------------------------------------------------------------
// Calendar view + insights
// ---------------------------------------------------------------------------

async function renderCalendar(main, token) {
  const month = state.route.month;
  const first = month + '-01';
  const startDow = (fromKey(first).getDay() - state.settings.weekStart + 7) % 7;
  const gridStart = addDays(first, -startDow);
  const days = Math.ceil((startDow + daysInMonth(first)) / 7) * 7;
  const gridEnd = addDays(gridStart, days - 1);

  const draw = async () => {
    const [entries, tasks, voice, files] = await Promise.all([
      db.all('entries'), db.byDateRange('tasks', gridStart, gridEnd), db.byDateRange('voice', gridStart, gridEnd), db.byDateRange('files', gridStart, gridEnd),
    ]);
    releaseURLs('calendar');
    const entryMap = new Map(entries.map((e) => [e.date, e]));
    const events = state.events.get(month)?.list || [];
    const dows = [...Array(7)].map((_, i) => fromKey(addDays(gridStart, i)).toLocaleDateString(undefined, { weekday: 'short' }));
    let cells = '';
    for (let i = 0; i < days; i++) {
      const k = addDays(gridStart, i);
      const e = entryMap.get(k);
      const evs = events.filter((x) => x.days.includes(k) && !(x.daybook && x.daybook.startsWith('voice:')));
      const tk = tasks.filter((t) => t.date === k);
      const vn = voice.filter((v) => v.date === k);
      const fl = files.filter((f) => f.date === k);
      const photos = fl.filter((f) => f.kind === 'image' && f.thumb);
      const cover = photos.find((f) => f.id === e?.coverId) || photos[0];
      const label = [formatLong(k), e?.mood ? `mood ${MOODS[e.mood - 1].label}` : '', entryHasContent(e) ? 'journal entry' : '', evs.length ? plural(evs.length, 'event') : '', tk.length ? plural(tk.length, 'to-do') : '', vn.length ? plural(vn.length, 'voice note') : '', fl.length ? plural(fl.length, 'photo or file') : ''].filter(Boolean).join(', ');
      cells += `
        <button class="dcell${k.slice(0, 7) !== month ? ' other' : ''}${k === state.today ? ' today' : ''}${cover ? ' has-photo' : ''}" data-action="goto" data-hash="#/day/${k}" aria-label="${esc(label)}"${cover ? ` style="--photo:url('${poolURL('calendar', cover.thumb)}')"` : ''}>
          <span class="n">${fromKey(k).getDate()}</span>
          ${e?.mood ? `<span class="mood-dot" aria-hidden="true">${MOODS[e.mood - 1].e}</span>` : ''}
          <span class="evs">${evs.slice(0, 3).map((x) => `<div style="--c:${esc(x.color || 'var(--blue)')}">${esc(x.allDay ? x.title : formatTime(timeFromDate(x.start)) + ' ' + x.title)}</div>`).join('')}${evs.length > 3 ? `<div>+${evs.length - 3} more</div>` : ''}</span>
          <span class="marks" aria-hidden="true">
            ${evs.length ? '<i class="ev"></i>' : ''}${entryHasContent(e) ? '<i class="jr"></i>' : ''}${vn.length ? '<i class="vn"></i>' : ''}${tk.length ? '<i class="tk"></i>' : ''}${fl.length ? '<i class="ph"></i>' : ''}
          </span>
        </button>`;
    }
    if (stale(token)) return;
    $('#month-grid').innerHTML = dows.map((d) => `<div class="dow">${esc(d)}</div>`).join('') + cells;
  };

  const monthName = fromKey(first).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  main.innerHTML = `
    <div class="month-head">
      <h1>${esc(monthName)}</h1>
      <button class="iconbtn" data-action="goto" data-hash="#/calendar/${addMonths(first, -1).slice(0, 7)}" aria-label="Previous month">${icon('left')}</button>
      ${month !== monthOf(state.today) ? `<button class="pill-today" data-action="goto" data-hash="#/calendar">Today</button>` : ''}
      <button class="iconbtn" data-action="goto" data-hash="#/calendar/${addMonths(first, 1).slice(0, 7)}" aria-label="Next month">${icon('right')}</button>
    </div>
    ${!connected() ? `<div class="callout" style="margin:8px 0">${icon('calendar')}<span class="grow">Connect Google Calendar to see your events on this calendar.</span>${state.settings.clientId ? '<button class="btn sm primary" data-action="connect">Connect</button>' : '<button class="btn sm" data-action="settings" data-section="google">Set up</button>'}</div>` : ''}
    <div class="month" id="month-grid"></div>
    <div class="legend">
      <span><i style="--c:var(--blue)"></i>Google event</span>
      <span><i style="--c:var(--ink-2)"></i>Journal</span>
      <span><i style="--c:var(--accent)"></i>Voice note</span>
      <span><i style="--c:var(--good)"></i>To-do</span>
      <span><i style="--c:var(--star)"></i>Photo / file</span>
    </div>
    <a class="small" href="#/insights" style="display:inline-block;margin:4px 2px">${icon('sparkles', 'sm')} Streaks, patterns & achievements →</a>`;
  await draw();
  if (connected()) {
    await loadMonthEvents(month);
    if (!stale(token)) await draw();
  }
}

function moodStripHTML(entries) {
  const byDate = new Map(entries.map((e) => [e.date, e]));
  const last30 = [...Array(30)].map((_, i) => addDays(state.today, i - 29));
  const moodCells = last30.map((k) => {
    const m = byDate.get(k)?.mood;
    const tipText = `${formatShort(k)} · ${m ? MOODS[m - 1].e + ' ' + MOODS[m - 1].label : 'No mood logged'}`;
    return `<button class="${m ? '' : 'none'}" style="${m ? `--c:var(--mood-${m})` : ''}" data-tip="${esc(tipText)}" data-action="goto" data-hash="#/day/${k}" aria-label="${esc(tipText)}"></button>`;
  }).join('');
  const logged = last30.map((k) => byDate.get(k)?.mood).filter(Boolean);
  const avg = logged.length ? logged.reduce((a, b) => a + b, 0) / logged.length : 0;
  return `
    <div class="subhead" style="margin-top:4px">Mood, last 30 days${logged.length ? ` <span class="small muted" style="font-family:var(--sans)">· average ${MOODS[Math.round(avg) - 1].e} ${MOODS[Math.round(avg) - 1].label}</span>` : ''}</div>
    <div class="moodstrip" role="group" aria-label="Mood for each of the last 30 days">${moodCells}</div>
    <div class="mood-axis"><span>${esc(formatShort(last30[0]))}</span><span>Today</span></div>
    <div class="mood-legend">${MOODS.map((m) => `<span><i style="--c:var(--mood-${m.v})"></i>${m.e} ${m.label}</span>`).join('')}<span><i style="--c:repeating-linear-gradient(135deg, var(--rule) 0 2px, transparent 2px 4px);border:1px solid var(--rule)"></i>Not logged</span></div>
    <details style="margin-top:10px"><summary class="small muted" style="cursor:pointer">Show as table</summary>
      <table class="small" style="width:100%;border-collapse:collapse;margin-top:6px">
        <thead><tr><th style="text-align:left">Date</th><th style="text-align:left">Mood</th><th style="text-align:left">Sleep</th><th style="text-align:left">Moved</th></tr></thead>
        <tbody>${last30.filter((k) => byDate.get(k)?.mood).reverse().map((k) => { const e = byDate.get(k); return `<tr><td>${esc(formatShort(k))}</td><td>${MOODS[e.mood - 1].e} ${MOODS[e.mood - 1].label}</td><td>${e.sleep != null ? e.sleep + 'h' : '–'}</td><td>${e.moved === true ? 'Yes' : e.moved === false ? 'No' : '–'}</td></tr>`; }).join('') || '<tr><td colspan="4" class="muted">No moods logged yet.</td></tr>'}</tbody>
      </table>
    </details>`;
}

function patternHTML(p) {
  const isMood = p.kind === 'mood';
  const fmt = (v) => (isMood ? `${MOODS[Math.min(4, Math.max(0, Math.round(v) - 1))].e} ${v.toFixed(1)}` : `${Math.round(v * 100)}%`);
  const pct = (v) => (isMood ? (v / 5) * 100 : v * 100);
  const better = p.diff > 0.05;
  const same = Math.abs(p.diff) <= 0.05;
  const summary = same ? 'About the same either way, so far.'
    : isMood ? `Your mood averages ${Math.abs(p.diff).toFixed(1)} points ${better ? 'higher' : 'lower'} on “${p.a.label.toLowerCase()}” days.`
    : `You finish ${Math.abs(Math.round(p.diff * 100))}% ${better ? 'more' : 'fewer'} of your to-dos on days you journal.`;
  return `
    <div class="pattern">
      <b>${esc(p.title)}</b>
      <div class="pbar"><span class="pl">${esc(p.a.label)}</span><span class="track"><i style="width:${pct(p.a.value)}%;background:var(--accent)"></i></span><span class="pv">${fmt(p.a.value)}</span></div>
      <div class="pbar"><span class="pl">${esc(p.b.label)}</span><span class="track"><i style="width:${pct(p.b.value)}%;background:var(--ink-3)"></i></span><span class="pv">${fmt(p.b.value)}</span></div>
      <div class="small muted">${esc(summary)} <span title="Number of days in each group">(${p.a.n} vs ${p.b.n} days)</span></div>
    </div>`;
}

async function renderInsightsView(main, token) {
  const all = await loadEverything();
  const earned = await db.getKV('achievements', {});
  if (stale(token)) return;
  const { info, totals: t } = all;
  const facts = ins.funFacts(t, info);
  const pats = ins.patterns({ entries: all.entries, tasks: all.tasks, days: all.days, today: state.today });
  const habitPct = Math.min(100, (info.current / 66) * 100);
  const research = [...ins.RESEARCH];
  // Rotate the research list daily so the top card changes.
  const rot = daySeed() % research.length;
  const researchOrdered = [...research.slice(rot), ...research.slice(0, rot)];
  const unlocked = ins.ACHIEVEMENTS.filter((a) => earned[a.id]);
  const locked = ins.ACHIEVEMENTS.filter((a) => !earned[a.id]);
  const dots = info.last7.map((d) => `
    <span class="wd${d.logged ? ' on' : ''}${d.date === state.today ? ' today' : ''}" title="${esc(formatShort(d.date))}">
      <i>${d.logged ? '✓' : ''}</i><small>${esc(fromKey(d.date).toLocaleDateString(undefined, { weekday: 'narrow' }))}</small>
    </span>`).join('');

  main.innerHTML = `
    <div class="day-head"><h1>Insights</h1><div class="sub">Every small entry adds up. Here’s what yours add up to.</div></div>

    <section class="card hero-card">
      <div class="card-body" style="padding-top:18px">
        <div class="hero">
          <div>
            <div class="hero-num">${info.current}<span aria-hidden="true">🔥</span></div>
            <div class="hero-label">${info.current === 1 ? 'day' : 'days'} in a row</div>
          </div>
          <div class="hero-side">
            <div><b>${info.best}</b> <span class="muted">best streak</span></div>
            <div><b>${info.total}</b> <span class="muted">days journaled</span></div>
            <div class="${info.loggedToday ? 'good-text' : ''}">${info.loggedToday ? '✓ Today counts' : '<a href="#/day">Today’s still open, one line is enough →</a>'}</div>
          </div>
        </div>
        <div class="week" style="margin-top:14px" aria-label="Last 7 days">${dots}</div>
        <div class="habit">
          <div class="small"><b>Habit meter</b> <span class="muted">· ${info.current >= 66 ? 'You’ve passed the 66-day mark. This is part of who you are now.' : `${info.current}/66 days. On average it takes about 66 days for a habit to feel automatic (Lally et al., 2010).`}</span></div>
          <div class="meter" role="meter" aria-valuemin="0" aria-valuemax="66" aria-valuenow="${Math.min(66, info.current)}" aria-label="Progress toward a 66-day habit"><i style="width:${habitPct}%"></i></div>
          <div class="small muted" style="margin-top:4px">Missed a day? Research shows one slip doesn’t undo a habit. Just pick it up again.</div>
        </div>
      </div>
    </section>

    <div class="stats" style="margin-top:14px">
      <div class="stat"><div class="label">Time reflecting</div><div class="value">${esc(ins.formatMinutes(t.minutes))}</div><div class="delta">writing + speaking</div></div>
      <div class="stat"><div class="label">Words written</div><div class="value">${t.words.toLocaleString()}</div><div class="delta">+ ${t.spokenWords.toLocaleString()} spoken</div></div>
      <div class="stat"><div class="label">Good things noted</div><div class="value">${t.gratitudeCount}</div><div class="delta">gratitude items</div></div>
      <div class="stat"><div class="label">Memories saved</div><div class="value">${t.photoCount + t.videoCount}</div><div class="delta">${t.voiceCount} voice notes</div></div>
    </div>

    ${facts.length ? `
      <section class="card"><div class="card-head"><h2>🤓 Fun facts about your journaling</h2></div>
        <div class="card-body"><ul class="facts">${facts.map((f) => `<li><span aria-hidden="true">${f.emoji}</span><span>${esc(f.text)}</span></li>`).join('')}</ul></div></section>` : ''}

    <section class="card"><div class="card-head"><h2>🔍 Your patterns</h2></div>
      <div class="card-body">
        ${pats.found.map(patternHTML).join('')}
        ${pats.pending.length ? `<div class="pending">${pats.pending.map((p) => `
          <div class="small"><b>${esc(p.title)}</b> <span class="muted">unlocks after a few more days of logging (${p.have}/${p.need})</span>
          <div class="meter sm"><i style="width:${(p.have / p.need) * 100}%"></i></div></div>`).join('')}</div>` : ''}
        ${!pats.found.length ? '<p class="small muted">Log your mood, sleep and movement for a few days and Daybook will show you what seems to lift your mood.</p>' : ''}
        <p class="small muted" style="margin-bottom:0">These come from your own entries. They show patterns, not proof of cause, but they’re a good hint about what helps you.</p>
      </div></section>

    <section class="card"><div class="card-body" style="padding-top:14px">${moodStripHTML(all.entries)}</div></section>

    <section class="card"><div class="card-head"><h2>🧪 Why journaling helps</h2></div>
      <div class="card-body">
        <div class="research">${researchOrdered.map((r) => `<div class="rcard"><span class="re" aria-hidden="true">${r.emoji}</span><p>${esc(r.text)}</p><small>${esc(r.source)}</small></div>`).join('')}</div>
        <p class="small muted" style="margin-bottom:0">Findings from published studies. Effects vary from person to person, and journaling complements professional care; it doesn’t replace it.</p>
      </div></section>

    <section class="card"><div class="card-head"><h2>🏅 Achievements <span class="count">${unlocked.length}/${ins.ACHIEVEMENTS.length}</span></h2></div>
      <div class="card-body"><div class="badges">
        ${unlocked.map((a) => `<div class="badge-card on"><span class="be">${a.icon}</span><b>${esc(a.name)}</b><small>${esc(a.desc)}</small><small class="muted">${esc(formatShort(earned[a.id]))}</small></div>`).join('')}
        ${locked.map((a) => `<div class="badge-card"><span class="be" aria-hidden="true">${a.icon}</span><b>${esc(a.name)}</b><small>${esc(a.desc)}</small></div>`).join('')}
      </div></div></section>`;
}

// Tooltip for elements with data-tip (mood strip)
let tipEl = null;
function showTip(target) {
  hideTip();
  tipEl = document.createElement('div');
  tipEl.className = 'tip';
  tipEl.textContent = target.dataset.tip;
  document.body.appendChild(tipEl);
  const r = target.getBoundingClientRect();
  const x = Math.min(Math.max(r.left + r.width / 2, 70), window.innerWidth - 70);
  tipEl.style.left = x + 'px';
  tipEl.style.top = r.top - 4 + 'px';
}
function hideTip() { tipEl?.remove(); tipEl = null; }

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

async function renderSearch(main) {
  const q = state.route.q || '';
  main.innerHTML = `
    <div class="search-bar">
      <label class="quickadd">${icon('search')}<input id="search-q" type="search" value="${esc(q)}" placeholder="Search journal, to-dos, voice notes, photos… or #tag" autofocus aria-label="Search"></label>
    </div>
    <div id="results"></div>`;
  const input = $('#search-q', main);
  const run = debounce(async () => {
    const v = input.value.trim();
    history.replaceState(null, '', '#/search/' + encodeURIComponent(v));
    await drawResults(v);
  }, 180);
  input.addEventListener('input', run);
  input.focus();
  drawResults(q);
}

async function drawResults(q) {
  const out = $('#results');
  if (!out) return;
  if (!q) {
    const entries = await db.all('entries');
    const tags = new Map();
    entries.forEach((e) => (e.tags || []).forEach((t) => tags.set(t, (tags.get(t) || 0) + 1)));
    (await db.all('voice')).forEach((v) => (v.tags || []).forEach((t) => tags.set(t, (tags.get(t) || 0) + 1)));
    out.innerHTML = tags.size ? `<div class="group-label">Your tags</div><div class="tags">${[...tags].sort((a, b) => b[1] - a[1]).map(([t, n]) => `<a class="chip muted" href="#/search/${encodeURIComponent('#' + t)}">#${esc(t)} · ${n}</a>`).join('')}</div>` : '<div class="empty" style="padding:12px 4px">Search everything you have written or said. Use #tags in entries to group them.</div>';
    return;
  }
  const isTag = q.startsWith('#');
  const needle = (isTag ? q.slice(1) : q).toLowerCase();
  const match = (s) => (s || '').toLowerCase().includes(needle);
  const [entries, tasks, voice, files] = await Promise.all([db.all('entries'), db.all('tasks'), db.all('voice'), db.all('files')]);
  const res = [];
  for (const f of files) {
    if (!isTag && (match(f.name) || match(f.caption))) res.push({ date: f.date, kind: `${FILE_EMOJI[f.kind] || '📎'} ${f.kind === 'image' ? 'Photo' : f.kind === 'video' ? 'Video' : 'File'}`, text: f.caption ? `${f.caption} (${f.name})` : f.name, file: f.id });
  }
  for (const e of entries) {
    const text = [e.text, ...(e.gratitude || [])].filter(Boolean).join(' · ');
    if (isTag ? (e.tags || []).includes(needle) : match(text)) res.push({ date: e.date, kind: 'Journal', text, hash: `#/day/${e.date}` });
  }
  for (const v of voice) {
    if (isTag ? (v.tags || []).includes(needle) : match(v.title) || match(v.transcript)) res.push({ date: v.date, kind: '🎙 Voice note', text: `${v.title}: ${v.transcript || ''}`, note: v.id });
  }
  for (const t of tasks) {
    if (isTag ? (t.tags || []).includes(needle) : match(t.title) || match(t.notes)) res.push({ date: t.date || '', kind: t.done ? '✅ To-do' : '☐ To-do', text: t.title, task: t.id });
  }
  res.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const hl = (s) => {
    const snippet = snippetAround(s, needle);
    return esc(snippet).replace(new RegExp(escapeRe(esc(needle)), 'gi'), (m) => `<mark>${m}</mark>`);
  };
  out.innerHTML = res.length ? `<div class="small muted" style="margin:8px 2px">${plural(res.length, 'result')}</div>` + res.map((r) => `
    <button class="result" ${r.hash ? `data-action="goto" data-hash="${r.hash}"` : r.note ? `data-action="open-note" data-id="${r.note}"` : r.file ? `data-action="open-file" data-id="${r.file}"` : `data-action="edit-task" data-id="${r.task}"`}>
      <div class="when">${esc(r.kind)} · ${r.date ? esc(formatShort(r.date)) : 'No date'}</div>
      <div class="txt">${hl(r.text)}</div>
    </button>`).join('') : '<div class="empty" style="padding:12px 4px">No matches.</div>';
}

function snippetAround(s, needle) {
  s = s || '';
  const i = s.toLowerCase().indexOf(needle);
  if (i < 0 || s.length <= 200) return s.slice(0, 200) + (s.length > 200 ? '…' : '');
  const start = Math.max(0, i - 80);
  return (start ? '…' : '') + s.slice(start, start + 200) + (start + 200 < s.length ? '…' : '');
}
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

function openSettings(section) {
  const s = state.settings;
  const isConn = connected();
  const origin = location.origin;
  const langs = ['en-US', 'en-GB', 'en-AU', 'en-NZ', 'en-ZA', 'en-IE', 'en-IN', 'en-CA', 'es-ES', 'es-MX', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'pt-PT', 'nl-NL', 'sv-SE', 'af-ZA', 'hi-IN', 'ja-JP', 'zh-CN'];
  if (!langs.includes(s.lang)) langs.unshift(s.lang);
  const sheet = openSheet(`
    <div class="sheet-head"><h2>Settings</h2><button class="iconbtn" data-close aria-label="Close">${icon('x')}</button></div>

    <section id="set-google">
      <h3>${icon('calendar')} Google Calendar</h3>
      <p class="small muted">Status: <b>${isConn ? 'Connected' : gcal.wasEverConnected() ? 'Session expired (tap Reconnect)' : 'Not connected'}</b></p>
      <label class="field"><span>OAuth Client ID</span>
        <input class="input" id="s-client" value="${esc(s.clientId)}" placeholder="1234-abc.apps.googleusercontent.com" autocomplete="off" spellcheck="false">
        <small>One-time setup (about 5 minutes): create a free “Web application” OAuth client in Google Cloud Console, enable the Google Calendar API, and add <code>${esc(origin)}</code> as an Authorized JavaScript origin. Step-by-step guide is in the README.</small>
      </label>
      <div class="btn-row">
        ${isConn ? '<button class="btn" id="s-disconnect">Disconnect</button><button class="btn" id="s-reload-cals">Refresh calendars</button>' : '<button class="btn primary" id="s-connect">Connect Google Calendar</button>'}
      </div>
      ${state.calendars.length ? `
        <div class="field"><span>Show events from</span>
          ${state.calendars.map((c) => `<label class="switch" style="padding:6px 0"><span class="text"><b style="display:flex;align-items:center;gap:8px"><i style="width:10px;height:10px;border-radius:50%;background:${esc(c.color || 'var(--blue)')};display:inline-block"></i>${esc(c.name)}</b></span><input type="checkbox" data-cal="${esc(c.id)}" ${(s.showCalendars || []).includes(c.id) ? 'checked' : ''}></label>`).join('')}
        </div>
        <label class="field"><span>Save new events, to-dos and voice notes to</span>
          <select class="input" id="s-write">${state.calendars.filter((c) => c.writable).map((c) => `<option value="${esc(c.id)}" ${(s.writeCalendar === c.id || (s.writeCalendar === 'primary' && c.primary)) ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>
        </label>` : ''}
      <label class="switch"><span class="text"><b>Put timed to-dos in Google Calendar</b><small>To-dos with a date and time become calendar events, with a reminder.</small></span><input type="checkbox" id="s-synctasks" ${s.syncTasks ? 'checked' : ''}></label>
      <label class="switch"><span class="text"><b>Save voice notes to Google Calendar</b><small>Each note becomes an event at the time you recorded it, with the transcript.</small></span><input type="checkbox" id="s-syncvoice" ${s.syncVoice ? 'checked' : ''}></label>
      <label class="switch"><span class="text"><b>Attach the audio via Google Drive</b><small>Uploads each recording to your Drive and attaches it to the calendar event so you can play it from Calendar. Asks for Drive permission (only files this app creates).</small></span><input type="checkbox" id="s-drive" ${s.driveAudio ? 'checked' : ''}></label>
      <label class="field"><span>Reminder before timed to-dos and events</span>
        <select class="input" id="s-remind">${[[0, 'At start time'], [5, '5 minutes'], [10, '10 minutes'], [15, '15 minutes'], [30, '30 minutes'], [60, '1 hour']].map(([v, l]) => `<option value="${v}" ${s.reminderMinutes === v ? 'selected' : ''}>${l}</option>`).join('')}</select>
      </label>
      <div class="field"><span>Daily journaling reminder</span>
        <div class="btn-row"><input class="input" type="time" id="s-nudge-time" value="21:00" style="width:auto"><button class="btn" id="s-nudge">Add to Google Calendar</button></div>
        <small>Creates a repeating 10-minute “Journal” event so your phone reminds you every day.</small>
      </div>
    </section>

    <section id="set-voice">
      <h3>${icon('mic')} Voice & transcription</h3>
      <label class="field"><span>Language</span>
        <select class="input" id="s-lang">${langs.map((l) => `<option ${l === s.lang ? 'selected' : ''}>${l}</option>`).join('')}</select>
      </label>
      <label class="switch"><span class="text"><b>Live transcription</b><small>${canLiveTranscribe ? 'Free, built into your browser. Words appear as you speak.' : 'Not supported in this browser. Use Chrome, Edge or Safari.'}</small></span><input type="checkbox" id="s-live" ${s.liveTranscribe ? 'checked' : ''} ${canLiveTranscribe ? '' : 'disabled'}></label>
      <label class="field"><span>OpenAI API key (optional, for high-accuracy transcription)</span>
        <input class="input" id="s-openai" type="password" value="${esc(s.openaiKey)}" placeholder="sk-…" autocomplete="off">
        <small>Used only to send your recording to OpenAI’s Whisper for a more accurate transcript. Stored on this device only, never in backups. Costs about $0.006 per minute.</small>
      </label>
      <label class="switch"><span class="text"><b>Always use high-accuracy transcription</b><small>Otherwise it’s used only when live transcription didn’t catch anything.</small></span><input type="checkbox" id="s-cloudalways" ${s.cloudAlways ? 'checked' : ''}></label>
    </section>

    <section>
      <h3>${icon('book')} Journal</h3>
      <label class="switch"><span class="text"><b>Daily writing prompt</b></span><input type="checkbox" id="s-prompts" ${s.prompts ? 'checked' : ''}></label>
      <label class="switch"><span class="text"><b>“Three good things”</b><small>A short gratitude list under each entry.</small></span><input type="checkbox" id="s-grat" ${s.gratitude ? 'checked' : ''}></label>
      <label class="switch"><span class="text"><b>Sleep & movement check-in</b><small>Two taps a day. Insights will show how they relate to your mood.</small></span><input type="checkbox" id="s-health" ${s.health ? 'checked' : ''}></label>
      <label class="switch"><span class="text"><b>Celebrations</b><small>A little confetti the first time you log each day.</small></span><input type="checkbox" id="s-celebrate" ${s.celebrate ? 'checked' : ''}></label>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <label class="field"><span>Theme</span><select class="input" id="s-theme">${[['auto', 'Automatic'], ['light', 'Light'], ['dark', 'Dark']].map(([v, l]) => `<option value="${v}" ${s.theme === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
        <label class="field"><span>Week starts</span><select class="input" id="s-week"><option value="1" ${s.weekStart === 1 ? 'selected' : ''}>Monday</option><option value="0" ${s.weekStart === 0 ? 'selected' : ''}>Sunday</option></select></label>
        <label class="field"><span>Dates like 3/4</span><select class="input" id="s-order"><option value="DMY" ${s.dateOrder === 'DMY' ? 'selected' : ''}>3 April</option><option value="MDY" ${s.dateOrder === 'MDY' ? 'selected' : ''}>March 4</option></select></label>
      </div>
    </section>

    <section>
      <h3>${icon('download')} Your data</h3>
      <p class="small muted">Everything is stored privately on this device. Back up regularly, and use the backup to move to a new phone.</p>
      <p class="small" id="s-usage"></p>
      <label class="switch"><span class="text"><b>Include photos & videos in backups</b><small>Makes the backup file much bigger if you have videos.</small></span><input type="checkbox" id="s-bmedia" ${s.backupMedia ? 'checked' : ''}></label>
      <div class="btn-row">
        <button class="btn" id="s-export">${icon('download', 'sm')} Back up (JSON)</button>
        <button class="btn" id="s-md">${icon('note', 'sm')} Export journal (Markdown)</button>
        <label class="btn">${icon('upload', 'sm')} Restore<input type="file" id="s-import" accept="application/json,.json" hidden></label>
      </div>
      <div class="btn-row" style="margin-top:10px"><button class="btn ghost danger" id="s-wipe">Erase everything on this device</button></div>
    </section>`, { label: 'Settings', onClose: () => render() });
  const el = sheet.el;

  if (section) setTimeout(() => $(`#set-${section}`, el)?.scrollIntoView({ block: 'start' }), 50);

  $('#s-client', el).addEventListener('change', (e) => saveSettings({ clientId: e.target.value.trim() }));
  const conn = $('#s-connect', el);
  if (conn) conn.onclick = async () => {
    await saveSettings({ clientId: $('#s-client', el).value.trim() });
    if (await connectGoogle()) openSettings('google');
  };
  const disc = $('#s-disconnect', el);
  if (disc) disc.onclick = () => { gcal.disconnect(); toast('Disconnected from Google'); openSettings('google'); };
  const rel = $('#s-reload-cals', el);
  if (rel) rel.onclick = async () => { try { await loadCalendars(); openSettings('google'); } catch (e) { reportError(e); } };
  $$('[data-cal]', el).forEach((c) => c.addEventListener('change', async () => {
    await saveSettings({ showCalendars: $$('[data-cal]', el).filter((x) => x.checked).map((x) => x.dataset.cal) });
    state.events.clear();
  }));
  $('#s-write', el)?.addEventListener('change', (e) => saveSettings({ writeCalendar: e.target.value }));
  $('#s-synctasks', el).onchange = (e) => saveSettings({ syncTasks: e.target.checked });
  $('#s-syncvoice', el).onchange = (e) => saveSettings({ syncVoice: e.target.checked });
  $('#s-drive', el).onchange = async (e) => {
    await saveSettings({ driveAudio: e.target.checked });
    if (e.target.checked && connected() && !gcal.hasDriveScope()) {
      try { await gcal.connect(s.clientId, { interactive: true, drive: true }); toast('Drive access granted'); } catch (err) { reportError(err); }
    }
  };
  $('#s-remind', el).onchange = (e) => saveSettings({ reminderMinutes: Number(e.target.value) });
  $('#s-nudge', el).onclick = async () => {
    if (!connected() && !(await connectGoogle())) return;
    try {
      await gcal.createEvent(state.settings.writeCalendar, {
        title: '✍️ Journal', description: 'A few minutes to reflect in Daybook.\n\n' + location.origin + location.pathname,
        date: state.today, time: $('#s-nudge-time', el).value || '21:00', duration: 10, reminderMinutes: 0, recurrence: ['RRULE:FREQ=DAILY'],
      });
      toast('Daily reminder added to Google Calendar');
    } catch (e) { reportError(e); }
  };
  $('#s-lang', el).onchange = (e) => saveSettings({ lang: e.target.value });
  $('#s-live', el).onchange = (e) => saveSettings({ liveTranscribe: e.target.checked });
  $('#s-openai', el).onchange = (e) => saveSettings({ openaiKey: e.target.value.trim() });
  $('#s-cloudalways', el).onchange = (e) => saveSettings({ cloudAlways: e.target.checked });
  $('#s-prompts', el).onchange = (e) => saveSettings({ prompts: e.target.checked });
  $('#s-grat', el).onchange = (e) => saveSettings({ gratitude: e.target.checked });
  $('#s-health', el).onchange = (e) => saveSettings({ health: e.target.checked });
  $('#s-celebrate', el).onchange = (e) => saveSettings({ celebrate: e.target.checked });
  $('#s-bmedia', el).onchange = (e) => saveSettings({ backupMedia: e.target.checked });
  Promise.all([storageEstimate(), db.all('files')]).then(([est, files]) => {
    const media = files.reduce((a, f) => a + (f.size || 0), 0);
    const u = $('#s-usage', el);
    if (u) u.textContent = `Photos & files: ${formatBytes(media)}${est?.quota ? ` · Total used ${formatBytes(est.usage)} of ${formatBytes(est.quota)} available` : ''}`;
  });
  $('#s-theme', el).onchange = (e) => saveSettings({ theme: e.target.value });
  $('#s-week', el).onchange = (e) => saveSettings({ weekStart: Number(e.target.value) });
  $('#s-order', el).onchange = (e) => saveSettings({ dateOrder: e.target.value });
  $('#s-export', el).onclick = async () => {
    const data = await exportAll({ includeMedia: state.settings.backupMedia });
    download(`daybook-backup-${state.today}.json`, JSON.stringify(data), 'application/json');
    await db.setKV('lastBackup', new Date().toISOString());
  };
  $('#s-md', el).onclick = exportMarkdown;
  $('#s-import', el).onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const counts = await importAll(JSON.parse(await file.text()));
      toast(`Restored ${counts.entries} entries, ${counts.tasks} to-dos, ${counts.voice} voice notes and ${counts.files} photos/files`);
      sheet.close();
    } catch (err) { reportError(err); }
  };
  $('#s-wipe', el).onclick = async () => {
    sheet.close();
    if (!(await confirmSheet('Erase everything?', 'All journal entries, to-dos, voice notes, photos and files on this device will be permanently deleted. Google Calendar events are not touched. Make a backup first.', 'Erase'))) return;
    await Promise.all(['entries', 'tasks', 'voice', 'files'].map((n) => db.clear(n)));
    await db.setKV('achievements', {});
    toast('All data erased');
    render();
  };
}

async function exportMarkdown() {
  const [entries, tasks, voice, files] = await Promise.all([db.all('entries'), db.all('tasks'), db.all('voice'), db.all('files')]);
  const dates = new Set([...entries.filter(entryHasContent).map((e) => e.date), ...voice.map((v) => v.date), ...tasks.filter((t) => t.date).map((t) => t.date), ...files.map((f) => f.date)]);
  let md = `# Daybook journal\n\nExported ${new Date().toLocaleString()}\n`;
  for (const d of [...dates].sort()) {
    const e = entries.find((x) => x.date === d);
    const ts = tasks.filter((t) => t.date === d);
    const vs = voice.filter((v) => v.date === d).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    md += `\n## ${formatLong(d)}${e?.mood ? ' ' + MOODS[e.mood - 1].e : ''}\n`;
    const health = [e?.sleep != null ? `😴 ${e.sleep}h sleep` : '', e?.moved === true ? '🏃 moved' : e?.moved === false ? 'rest day' : ''].filter(Boolean).join(' · ');
    if (health) md += `\n_${health}_\n`;
    if (e?.text?.trim()) md += `\n${e.text.trim()}\n`;
    const g = (e?.gratitude || []).filter((x) => x && x.trim());
    if (g.length) md += `\n**Three good things**\n${g.map((x, i) => `${i + 1}. ${x}`).join('\n')}\n`;
    if (ts.length) md += `\n**To-do**\n${ts.map((t) => `- [${t.done ? 'x' : ' '}] ${t.time ? formatTime(t.time) + ' ' : ''}${t.title}`).join('\n')}\n`;
    const fs = files.filter((f) => f.date === d);
    if (fs.length) md += `\n**Photos & files**\n${fs.map((f) => `- ${f.name}${f.caption ? ` — ${f.caption}` : ''}`).join('\n')}\n`;
    if (vs.length) md += `\n**Voice notes**\n${vs.map((v) => `- ${new Date(v.createdAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} — ${v.transcript || v.title}`).join('\n')}\n`;
  }
  download(`daybook-${state.today}.md`, md, 'text/markdown');
}

function openHelp() {
  openSheet(`
    <div class="sheet-head"><h2>Shortcuts & tips</h2><button class="iconbtn" data-close aria-label="Close">${icon('x')}</button></div>
    <div class="help-grid">
      <kbd>r</kbd><span>Record a voice note</span>
      <kbd>n</kbd><span>New to-do</span>
      <kbd>j</kbd><span>Write in today’s journal</span>
      <kbd>t</kbd><span>Go to today</span>
      <kbd>← →</kbd><span>Previous / next day (or swipe on your phone)</span>
      <kbd>c</kbd><span>Calendar</span>
      <kbd>d</kbd><span>All to-dos</span>
      <kbd>v</kbd><span>Voice notes</span>
      <kbd>i</kbd><span>Insights, streaks & achievements</span>
      <kbd>/</kbd><span>Search</span>
    </div>
    <section>
      <h3>Talk naturally</h3>
      <p class="small">In a voice note, say things like <i>“remind me to pay rent on Friday”</i> or <i>“dentist appointment tomorrow at 2:30pm”</i>. Daybook spots them and offers one-tap buttons to add them as to-dos or calendar events. Say <i>“hashtag work”</i> to tag a note.</p>
      <h3>Small counts</h3>
      <p class="small">A mood tap, one line, a photo or a 10-second voice note all count toward your streak. On busy days, just do the smallest thing.</p>
      <h3>Photos & files</h3>
      <p class="small">Add photos, videos, PDFs or any file to a day: tap <b>Add</b>, drag files onto the page, or paste a screenshot. Star a photo to make it that day’s cover in the calendar.</p>
      <h3>Type naturally</h3>
      <p class="small">To-dos understand <i>today, tomorrow, fri, next monday, 14 oct, 3pm, 15:30, in 2 hours, for 45 min</i>, <b>!</b> for priority and <b>#tags</b>.</p>
      <h3>Install it</h3>
      <p class="small">On iPhone: Share → <b>Add to Home Screen</b>. On Android/Chrome: menu → <b>Install app</b>. It works offline and your data stays on your device.</p>
    </section>`, { label: 'Help' });
}

async function maybeWelcome() {
  if (await db.getKV('welcomed', false)) return;
  await db.setKV('welcomed', true);
  const s = openSheet(`
    <div class="sheet-head"><h2>Welcome to Daybook</h2></div>
    <p style="font:17px/1.5 var(--serif)">Your journal, to-do list, schedule and voice notes on one page a day.</p>
    <ul class="small" style="padding-left:18px;line-height:1.7">
      <li><b>Write</b> in the journal, log your mood and three good things.</li>
      <li><b>Talk</b>: tap the mic. Notes are transcribed, dated and saved to your calendar, and to-dos you mention are picked up.</li>
      <li><b>Plan</b>: type to-dos naturally (“call mum fri 5pm”). Timed ones go to Google Calendar.</li>
      <li><b>Remember</b>: add photos, videos and files to any day.</li>
      <li><b>Small counts</b>: a mood tap or one line keeps your streak going. Insights show how journaling, sleep and movement relate to how you feel.</li>
      <li><b>Private</b>: everything is stored on this device. Only calendar items go to Google.</li>
    </ul>
    <div class="btn-row" style="justify-content:flex-end;margin-top:12px">
      <button class="btn" id="w-google">${icon('calendar', 'sm')} Set up Google Calendar</button>
      <button class="btn primary" data-close>Start writing</button>
    </div>`, { label: 'Welcome' });
  $('#w-google', s.el).onclick = () => { s.close(); openSettings('google'); };
}

// ---------------------------------------------------------------------------
// Global events
// ---------------------------------------------------------------------------

let dictation = null;

const actions = {
  goto: (el) => go(el.dataset.hash),
  record: () => openRecorder(),
  settings: (el) => openSettings(el.dataset.section),
  help: () => openHelp(),
  connect: () => connectGoogle(),
  'refresh-events': () => (connected() ? refreshSchedule({ force: true }) : connectGoogle()),
  'prev-day': () => go('#/day/' + addDays(state.route.date, -1)),
  'next-day': () => go('#/day/' + addDays(state.route.date, 1)),
  'pick-date': () => {
    const p = $('#date-picker');
    p.value = state.route.date;
    p.onchange = () => p.value && go('#/day/' + p.value);
    try { p.showPicker(); } catch { p.click(); }
  },
  'toggle-task': async (el) => {
    const t = await toggleTask(el.dataset.id);
    if (!t) return;
    if (t.done) toast(`Done: ${t.title}`, { action: 'Undo', onAction: async () => { await toggleTask(t.id); render(); } });
    softRefresh();
  },
  'edit-task': (el, e) => { e.preventDefault(); openTaskEditor(el.dataset.id); },
  'task-today': async (el) => { await moveTask(el.dataset.id, state.today); toast('Moved to today'); softRefresh(); },
  'carry-all': async () => {
    const list = (await db.byDateRange('tasks', '0000-01-01', addDays(state.today, -1))).filter((t) => !t.done);
    for (const t of list) await moveTask(t.id, state.today);
    toast(`Moved ${plural(list.length, 'to-do')} to today`);
    render();
  },
  'clear-done': async () => {
    const done = (await db.all('tasks')).filter((t) => t.done);
    if (!(await confirmSheet('Clear completed?', `Remove ${plural(done.length, 'completed to-do')}? Their calendar events stay.`, 'Clear'))) return;
    for (const t of done) await db.delete('tasks', t.id);
    render();
  },
  'task-filter': (el) => { state.taskFilter = el.dataset.f; render(); },
  'set-mood': async (el) => {
    const j = $('#main').journal;
    if (!j) return;
    await j.setMood(Number(el.dataset.v));
    if (el.classList.contains('ql')) toast(`Mood logged: ${MOODS[Number(el.dataset.v) - 1].e}`);
  },
  'set-moved': (el) => $('#main').journal?.setMoved(el.dataset.v === 'yes'),
  'add-files': () => {
    if (state.route.view !== 'day') { go('#/day'); setTimeout(() => $('#file-input')?.click(), 200); return; }
    $('#file-input')?.click();
  },
  camera: () => $('#camera-input')?.click(),
  'open-file': (el) => openFile(el.dataset.id),
  'shuffle-prompt': () => $('#main').journal?.shufflePrompt(),
  dictate: (el) => {
    if (dictation) { dictation.stop(); return; }
    const j = $('#main').journal;
    try {
      el.classList.add('on');
      dictation = dictate({
        lang: state.settings.lang,
        onText: (text) => j?.append(spokenTags(text)),
        onEnd: () => { el.classList.remove('on'); dictation = null; },
      });
      toast('Listening… tap the mic again to stop.');
    } catch (e) { el.classList.remove('on'); reportError(e); }
  },
  'open-note': (el) => openNote(el.dataset.id),
  'play-note': (el, e) => { e.stopPropagation(); playNote(el.dataset.id, el); },
};

async function softRefresh() {
  // Re-render without losing the journal textarea's focus/scroll position.
  const y = window.scrollY;
  if (state.route.view === 'day' && document.activeElement?.id === 'journal-text') return refreshSchedule();
  await render();
  window.scrollTo(0, y);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const fn = actions[el.dataset.action];
  if (!fn) return;
  if (el.tagName === 'A') e.preventDefault();
  if (el.dataset.action === 'play-note') return fn(el, e);
  // Clicking a button inside a clickable row should only trigger the button.
  const inner = e.target.closest('button, a, input');
  if (inner && inner !== el && el.contains(inner) && !inner.dataset.action) return;
  fn(el, e);
});

document.addEventListener('pointerover', (e) => { const t = e.target.closest('[data-tip]'); if (t) showTip(t); });
document.addEventListener('pointerout', (e) => { if (e.target.closest('[data-tip]')) hideTip(); });
document.addEventListener('focusin', (e) => { const t = e.target.closest?.('[data-tip]'); if (t) showTip(t); else hideTip(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeSheet && !activeSheet.el.dataset.locked) { activeSheet.close(); return; }
  if (activeSheet || isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if (k === 'r') { e.preventDefault(); openRecorder(); }
  else if (k === 't') go('#/day');
  else if (k === 'c') go('#/calendar');
  else if (k === 'd') go('#/tasks');
  else if (k === 'v') go('#/notes');
  else if (k === 'i') go('#/insights');
  else if (k === '/') { e.preventDefault(); go('#/search'); }
  else if (k === '?') openHelp();
  else if (k === 'n') {
    e.preventDefault();
    const f = $('#qa-task') || $('#qa-all');
    if (f) f.focus(); else { go('#/day'); setTimeout(() => $('#qa-task')?.focus(), 150); }
  } else if (k === 'j') {
    e.preventDefault();
    if (state.route.view !== 'day') { go('#/day'); setTimeout(() => $('#journal-text')?.focus(), 150); } else $('#journal-text')?.focus();
  } else if (state.route.view === 'day' && k === 'ArrowLeft') actions['prev-day']();
  else if (state.route.view === 'day' && k === 'ArrowRight') actions['next-day']();
});

// Drag & drop and paste files onto a day.
let dragDepth = 0;
const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes('Files');
document.addEventListener('dragenter', (e) => {
  if (state.route.view !== 'day' || !hasFiles(e)) return;
  dragDepth++;
  document.body.classList.add('dropping');
  document.body.dataset.dropLabel = `Drop to add to ${relativeLabel(state.route.date, state.today)}`;
});
document.addEventListener('dragleave', () => { if (--dragDepth <= 0) { dragDepth = 0; document.body.classList.remove('dropping'); } });
document.addEventListener('dragover', (e) => { if (state.route.view === 'day' && hasFiles(e)) e.preventDefault(); });
document.addEventListener('drop', (e) => {
  dragDepth = 0;
  document.body.classList.remove('dropping');
  if (state.route.view !== 'day' || !e.dataTransfer?.files?.length) return;
  e.preventDefault();
  attachFiles(state.route.date, e.dataTransfer.files);
});
document.addEventListener('paste', (e) => {
  if (state.route.view !== 'day' || activeSheet) return;
  const files = [...(e.clipboardData?.files || [])];
  if (!files.length) return;
  e.preventDefault();
  attachFiles(state.route.date, files);
});

// Swipe between days on touch screens.
let touch = null;
document.addEventListener('touchstart', (e) => {
  if (state.route.view !== 'day' || activeSheet || e.touches.length !== 1 || e.target.closest('input, textarea, .moods, audio')) { touch = null; return; }
  touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
}, { passive: true });
document.addEventListener('touchend', (e) => {
  if (!touch) return;
  const dx = e.changedTouches[0].clientX - touch.x;
  const dy = e.changedTouches[0].clientY - touch.y;
  if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2 && Date.now() - touch.t < 600) {
    actions[dx < 0 ? 'next-day' : 'prev-day']();
  }
  touch = null;
}, { passive: true });

window.addEventListener('hashchange', () => { closeSheet(); stopPlayer(); releaseURLs('gallery'); releaseURLs('calendar'); render(); window.scrollTo(0, 0); });
window.addEventListener('scroll', () => $('#topbar')?.classList.toggle('scrolled', window.scrollY > 4), { passive: true });
window.addEventListener('online', () => { renderTopbar(); syncPending(); });
window.addEventListener('offline', renderTopbar);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  const before = state.today;
  if (dayKey() !== before && state.route.view === 'day' && state.route.date === before && !location.hash.includes(before)) render();
  else if (state.route.view === 'day') refreshSchedule();
});
gcal.onAuthChange(() => { if (state.route.view === 'day') refreshSchedule(); });

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

async function boot() {
  await loadSettings();
  requestPersistence();
  await render();
  if (new URLSearchParams(location.search).get('action') === 'record') {
    history.replaceState(null, '', location.pathname + location.hash);
    openRecorder();
  } else maybeWelcome();
  syncPending();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch((e) => console.warn('SW registration failed', e));
  }
  // Nudge a backup every couple of weeks.
  const last = await db.getKV('lastBackup', null);
  const count = (await db.all('entries')).length;
  if (count > 5 && (!last || Date.now() - new Date(last) > 14 * 86400000)) {
    toast('It’s been a while since your last backup.', { action: 'Back up', onAction: async () => { download(`daybook-backup-${state.today}.json`, JSON.stringify(await exportAll({ includeMedia: state.settings.backupMedia })), 'application/json'); await db.setKV('lastBackup', new Date().toISOString()); }, ms: 9000 });
  }
}

boot();
