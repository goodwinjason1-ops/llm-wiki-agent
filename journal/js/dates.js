// Date helpers and a small natural-language parser for quick-add and voice notes.
// Everything works on local dates; a "day key" is a YYYY-MM-DD string.

export const DAY_MS = 86400000;

const pad = (n) => String(n).padStart(2, '0');

export function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(key, n) {
  const d = fromKey(key);
  d.setDate(d.getDate() + n);
  return dayKey(d);
}

export function diffDays(a, b) {
  return Math.round((fromKey(a) - fromKey(b)) / DAY_MS);
}

export function startOfMonth(key) {
  return key.slice(0, 8) + '01';
}

export function addMonths(key, n) {
  const d = fromKey(startOfMonth(key));
  d.setMonth(d.getMonth() + n);
  return dayKey(d);
}

export function daysInMonth(key) {
  const d = fromKey(key);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function formatLong(key) {
  return fromKey(key).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatShort(key) {
  return fromKey(key).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
}

export function formatTime(hhmm) {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export function relativeLabel(key, today = dayKey()) {
  const n = diffDays(key, today);
  if (n === 0) return 'Today';
  if (n === 1) return 'Tomorrow';
  if (n === -1) return 'Yesterday';
  if (n > 1 && n < 7) return fromKey(key).toLocaleDateString(undefined, { weekday: 'long' });
  return formatShort(key);
}

export function timeFromDate(d) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ---------------------------------------------------------------------------
// Natural-language parsing
// ---------------------------------------------------------------------------

const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const WEEKDAY_RE = '(sun(?:day)?|mon(?:day)?|tue(?:s(?:day)?)?|wed(?:nesday)?|thu(?:r(?:s(?:day)?)?)?|fri(?:day)?|sat(?:urday)?)';
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH_RE = '(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)';
const NUM_WORDS = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, half: 0.5 };

const LEAD_INS = [
  /^\s*(?:please\s+)?(?:remind me to|remind me|remember to|don'?t forget to|i need to|i have to|i must|i should|i'?ve got to|i gotta|need to|have to|todo:?|to do:?|task:?|add task:?|schedule|book)\s+/i,
];

function weekdayIndex(word) {
  const w = word.toLowerCase().slice(0, 3);
  return WEEKDAYS.findIndex((d) => d.startsWith(w));
}

function monthIndex(word) {
  return MONTHS.indexOf(word.toLowerCase().slice(0, 3));
}

function numberFrom(word) {
  if (/^\d+(\.\d+)?$/.test(word)) return Number(word);
  return NUM_WORDS[word.toLowerCase()];
}

function toHHMM(h, m) {
  return `${pad(h)}:${pad(m)}`;
}

// Pull a match out of the working text so the leftovers become the title.
function take(state, re, fn) {
  const m = state.text.match(re);
  if (!m) return false;
  const res = fn(m);
  if (res === false) return false;
  state.text = (state.text.slice(0, m.index) + ' ' + state.text.slice(m.index + m[0].length)).replace(/\s+/g, ' ');
  return true;
}

/**
 * Parse free text like "Call mum tomorrow at 5pm for 30 min !high #family".
 * Returns { title, date, time, duration, priority, tags, hasDate, hasTime }.
 * `opts.dateOrder` is 'DMY' or 'MDY' for numeric dates like 3/4.
 */
export function parseQuick(input, now = new Date(), opts = {}) {
  const dateOrder = opts.dateOrder || 'DMY';
  const today = dayKey(now);
  const state = { text: ' ' + input.trim() + ' ' };
  let date = null;
  let time = null;
  let duration = null;
  let priority = 0;
  const tags = [];

  for (const re of LEAD_INS) state.text = state.text.replace(re, ' ');
  state.text = ' ' + state.text.trim() + ' ';

  // Tags
  take(state, /(?:^|\s)((?:#[\p{L}\p{N}_-]+\s*)+)/u, (m) => {
    m[1].trim().split(/\s+/).forEach((t) => tags.push(t.slice(1).toLowerCase()));
  });

  // Priority
  take(state, /\s(?:!high|!!|!|urgent|important|asap|high priority)(?=\s)/i, () => { priority = 1; });

  // Duration: "for 30 min", "for an hour", "for 1.5 hours", "for 2h"
  take(state, /\sfor\s+(\d+(?:\.\d+)?|an?|one|two|three|four|five|six|half an?)\s*(h|hrs?|hours?|m|mins?|minutes?)(?=\s)/i, (m) => {
    const n = m[1].toLowerCase().startsWith('half') ? 0.5 : numberFrom(m[1]);
    if (n == null) return false;
    duration = Math.round(/^h/i.test(m[2]) ? n * 60 : n);
  });

  // Relative "in 3 days / in 2 weeks / in 2 hours / in 20 minutes"
  take(state, /\sin\s+(\d+|an?|one|two|three|four|five|six|seven|eight|nine|ten)\s+(minutes?|mins?|hours?|hrs?|days?|weeks?|months?)(?=\s)/i, (m) => {
    const n = numberFrom(m[1]);
    const unit = m[2].toLowerCase();
    if (unit.startsWith('min') || unit.startsWith('h')) {
      const d = new Date(now.getTime() + n * (unit.startsWith('h') ? 3600000 : 60000));
      date = dayKey(d);
      time = toHHMM(d.getHours(), d.getMinutes());
    } else if (unit.startsWith('d')) date = addDays(today, n);
    else if (unit.startsWith('w')) date = addDays(today, n * 7);
    else date = dayKey(new Date(now.getFullYear(), now.getMonth() + n, now.getDate()));
  });

  // Explicit times: "at 3pm", "3:30 pm", "15:00", "at 3", "noon", "midnight"
  if (!time) {
    take(state, /\s(?:at\s+|@\s*)?(\d{1,2})(?::|\.)(\d{2})\s*(a\.?m\.?|p\.?m\.?)?(?=\s)/i, (m) => {
      let h = Number(m[1]);
      const min = Number(m[2]);
      if (h > 23 || min > 59) return false;
      if (m[3]) {
        const pm = /^p/i.test(m[3]);
        if (h === 12) h = pm ? 12 : 0;
        else if (pm) h += 12;
      }
      time = toHHMM(h, min);
    }) ||
    take(state, /\s(?:at\s+|@\s*)?(\d{1,2})\s*(a\.?m\.?|p\.?m\.?)(?=\s)/i, (m) => {
      let h = Number(m[1]);
      if (h < 1 || h > 12) return false;
      const pm = /^p/i.test(m[2]);
      if (h === 12) h = pm ? 12 : 0;
      else if (pm) h += 12;
      time = toHHMM(h, 0);
    }) ||
    take(state, /\s(?:at\s+)(\d{1,2})(?:\s+o'?clock)?(?=\s)/i, (m) => {
      let h = Number(m[1]);
      if (h < 1 || h > 23) return false;
      if (h >= 1 && h <= 7) h += 12; // "at 3" almost always means the afternoon
      time = toHHMM(h, 0);
    }) ||
    take(state, /\s(?:at\s+)?(noon|midday|midnight)(?=\s)/i, (m) => {
      time = /mid(?!day)/i.test(m[1]) ? '00:00' : '12:00';
    });
  }

  // Parts of the day: only fill time if none given
  take(state, /\s(?:this\s+|in the\s+)?(morning|afternoon|evening|tonight)(?=\s)/i, (m) => {
    const w = m[1].toLowerCase();
    if (w === 'tonight') date = date || today;
    if (!time) time = { morning: '09:00', afternoon: '14:00', evening: '18:00', tonight: '19:00' }[w];
  });

  // Day words
  if (!date) {
    take(state, /\s(?:on\s+)?(?:the\s+)?day after tomorrow(?=\s)/i, () => { date = addDays(today, 2); }) ||
    take(state, /\s(?:on\s+)?(today|tomorrow|tmrw|tmr|tonight)(?=\s)/i, (m) => {
      date = /^tod|^toni/i.test(m[1]) ? today : addDays(today, 1);
    }) ||
    take(state, new RegExp(`\\s(?:on\\s+)?(next|this|coming)?\\s*${WEEKDAY_RE}(?=\\s)`, 'i'), (m) => {
      const target = weekdayIndex(m[2]);
      if (target < 0) return false;
      let delta = (target - now.getDay() + 7) % 7;
      // "friday" / "next friday" both mean the coming one; the same weekday means a week out.
      if (delta === 0) delta = m[1] && /this/i.test(m[1]) ? 0 : 7;
      date = addDays(today, delta);
    }) ||
    take(state, /\s(?:on\s+)?next week(?=\s)/i, () => { date = addDays(today, 7); }) ||
    // "30 sept", "30th of september", "sept 30", "september 30th"
    take(state, new RegExp(`\\s(?:on\\s+)?(?:the\\s+)?(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?${MONTH_RE}(?=\\s)`, 'i'), (m) => {
      date = resolveMonthDay(now, monthIndex(m[2]), Number(m[1]));
      return date ? undefined : false;
    }) ||
    take(state, new RegExp(`\\s(?:on\\s+)?${MONTH_RE}\\s+(?:the\\s+)?(\\d{1,2})(?:st|nd|rd|th)?(?=\\s)`, 'i'), (m) => {
      date = resolveMonthDay(now, monthIndex(m[1]), Number(m[2]));
      return date ? undefined : false;
    }) ||
    // Numeric: 30/9, 9/30, 30/9/2026, 2026-09-30
    take(state, /\s(?:on\s+)?(\d{4})-(\d{2})-(\d{2})(?=\s)/, (m) => {
      date = `${m[1]}-${m[2]}-${m[3]}`;
    }) ||
    take(state, /\s(?:on\s+)?(\d{1,2})[/.](\d{1,2})(?:[/.](\d{2,4}))?(?=\s)/, (m) => {
      let a = Number(m[1]);
      let b = Number(m[2]);
      let [d, mo] = dateOrder === 'MDY' ? [b, a] : [a, b];
      if (mo > 12 && d <= 12) [d, mo] = [mo, d];
      if (mo < 1 || mo > 12 || d < 1 || d > 31) return false;
      if (m[3]) {
        const y = Number(m[3].length === 2 ? '20' + m[3] : m[3]);
        date = dayKey(new Date(y, mo - 1, d));
      } else date = resolveMonthDay(now, mo - 1, d);
    });
  }

  if (time && !date) {
    // A bare time that has already passed today means tomorrow.
    const [h, m] = time.split(':').map(Number);
    const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
    date = candidate < now ? addDays(today, 1) : today;
  }

  let title = state.text
    .replace(/\s+(?:on|at|by|for|in|this|the)\s*$/i, '')
    .replace(/^\s*(?:(?:oh\s+)?(?:also|and|then|so|plus|to)\s+)+/i, '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/[\s,;:-]+$/g, '')
    .replace(/^[\s,;:-]+/, '')
    .trim();
  if (title) title = title[0].toUpperCase() + title.slice(1);

  return { title, date, time, duration, priority, tags, hasDate: !!date, hasTime: !!time };
}

function resolveMonthDay(now, monthIdx, day) {
  if (monthIdx < 0 || day < 1 || day > 31) return null;
  let d = new Date(now.getFullYear(), monthIdx, day);
  if (d.getMonth() !== monthIdx) return null;
  // Dates more than a week in the past roll over to next year.
  if (d < new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)) d = new Date(now.getFullYear() + 1, monthIdx, day);
  return dayKey(d);
}

// ---------------------------------------------------------------------------
// Action detection in transcripts
// ---------------------------------------------------------------------------

const ACTION_TRIGGERS = /\b(remind me|remember to|don'?t forget|i need to|i have to|i must|i should|i'?ve got to|i gotta|need to|have to|to-?do|schedule|appointment|meeting|call|email|book|pick up|buy|pay|submit|deadline|due)\b/i;

/**
 * Find sentences in a transcript that look like tasks or events.
 * Returns [{ kind: 'task'|'event', sentence, parsed }].
 */
export function extractActions(text, now = new Date(), opts = {}) {
  if (!text) return [];
  const sentences = text
    .split(/(?<=[.!?])\s+|\n+|\s+(?:and then|also|and also)\s+/i)
    .map((s) => s.trim())
    .filter(Boolean);
  const seen = new Set();
  const out = [];
  for (const sentence of sentences) {
    if (!ACTION_TRIGGERS.test(sentence)) continue;
    const parsed = parseQuick(sentence.replace(/[.!?]+$/, ''), now, opts);
    if (!parsed.title || parsed.title.split(' ').length > 16) continue;
    const key = parsed.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const isEvent = parsed.hasTime && /\b(meeting|appointment|call|dinner|lunch|breakfast|session|class|interview|doctor|dentist|party|flight|event)\b/i.test(sentence);
    out.push({ kind: isEvent ? 'event' : 'task', sentence, parsed });
  }
  return out;
}

export function extractTags(text) {
  const tags = new Set();
  for (const m of (text || '').matchAll(/(?:^|\s)#([\p{L}\p{N}_-]+)/gu)) tags.add(m[1].toLowerCase());
  return [...tags];
}
