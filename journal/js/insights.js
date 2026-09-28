// Motivation & insights: streaks, milestones, fun comparisons, research facts and
// personal patterns. Pure functions only, so they can be unit tested.

import { addDays, diffDays } from './dates.js';

// ---------------------------------------------------------------------------
// Activity & streaks
// ---------------------------------------------------------------------------

/** Anything counts, however small: a word, a mood, a photo, a voice note, a sleep log. */
export function entryCounts(e) {
  if (!e) return false;
  return !!(
    (e.text || '').trim() ||
    e.mood ||
    (e.gratitude || []).some((g) => g && g.trim()) ||
    e.sleep != null ||
    typeof e.moved === 'boolean'
  );
}

export function activityDays({ entries = [], voice = [], files = [] }) {
  const days = new Set();
  for (const e of entries) if (entryCounts(e)) days.add(e.date);
  for (const v of voice) days.add(v.date);
  for (const f of files) days.add(f.date);
  return days;
}

/** Current streak counts today if logged, otherwise the run ending yesterday (today is still open). */
export function streakInfo(days, today) {
  const loggedToday = days.has(today);
  let k = loggedToday ? today : addDays(today, -1);
  let current = 0;
  while (days.has(k)) { current++; k = addDays(k, -1); }
  let best = 0;
  let run = 0;
  let prev = null;
  for (const d of [...days].sort()) {
    run = prev && diffDays(d, prev) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  const last7 = [...Array(7)].map((_, i) => {
    const d = addDays(today, i - 6);
    return { date: d, logged: days.has(d) };
  });
  return { current, best, total: days.size, loggedToday, last7, atRisk: !loggedToday && current > 0 };
}

// ---------------------------------------------------------------------------
// Totals
// ---------------------------------------------------------------------------

const countWords = (s) => ((s || '').match(/\S+/g) || []).length;

export function totals({ entries = [], voice = [], files = [], tasks = [] }) {
  const writeSeconds = entries.reduce((s, e) => s + (e.writeSeconds || 0), 0);
  const voiceSeconds = voice.reduce((s, v) => s + (v.duration || 0), 0);
  const words = entries.reduce((s, e) => s + countWords(e.text) + (e.gratitude || []).reduce((a, g) => a + countWords(g), 0), 0);
  const spokenWords = voice.reduce((s, v) => s + countWords(v.transcript), 0);
  return {
    writeSeconds,
    voiceSeconds,
    minutes: (writeSeconds + voiceSeconds) / 60,
    words,
    spokenWords,
    voiceCount: voice.length,
    fileCount: files.length,
    photoCount: files.filter((f) => f.kind === 'image').length,
    videoCount: files.filter((f) => f.kind === 'video').length,
    gratitudeCount: entries.reduce((s, e) => s + (e.gratitude || []).filter((g) => g && g.trim()).length, 0),
    moodCount: entries.filter((e) => e.mood).length,
    tasksDone: tasks.filter((t) => t.done).length,
    earlyBird: entries.some((e) => e.firstWriteAt && new Date(e.firstWriteAt).getHours() < 7),
    nightOwl: entries.some((e) => e.firstWriteAt && new Date(e.firstWriteAt).getHours() >= 23),
  };
}

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------

export const ACHIEVEMENTS = [
  { id: 'first', icon: '🌱', name: 'First page', desc: 'Log anything for the first time', test: (s) => s.total >= 1 },
  { id: 'streak3', icon: '🔥', name: 'Warming up', desc: '3 days in a row', test: (s) => s.best >= 3 },
  { id: 'streak7', icon: '📅', name: 'One week strong', desc: '7 days in a row', test: (s) => s.best >= 7 },
  { id: 'streak14', icon: '🌗', name: 'Fortnight', desc: '14 days in a row', test: (s) => s.best >= 14 },
  { id: 'streak30', icon: '🌕', name: 'A full moon cycle', desc: '30 days in a row', test: (s) => s.best >= 30 },
  { id: 'streak66', icon: '🧠', name: 'On autopilot', desc: '66 days in a row, the average time for a habit to become automatic', test: (s) => s.best >= 66 },
  { id: 'streak100', icon: '💯', name: 'Century', desc: '100 days in a row', test: (s) => s.best >= 100 },
  { id: 'streak365', icon: '🌍', name: 'Around the sun', desc: '365 days in a row', test: (s) => s.best >= 365 },
  { id: 'days10', icon: '📓', name: 'Ten pages', desc: 'Journal on 10 different days', test: (s) => s.total >= 10 },
  { id: 'days50', icon: '📚', name: 'Fifty pages', desc: 'Journal on 50 different days', test: (s) => s.total >= 50 },
  { id: 'days100', icon: '🏛️', name: 'The archive', desc: 'Journal on 100 different days', test: (s) => s.total >= 100 },
  { id: 'words1k', icon: '✍️', name: 'A thousand words', desc: 'Write 1,000 words in total', test: (s) => s.words >= 1000 },
  { id: 'words10k', icon: '📜', name: 'Short story', desc: 'Write 10,000 words in total', test: (s) => s.words >= 10000 },
  { id: 'words50k', icon: '📖', name: 'Novelist', desc: 'Write 50,000 words, a NaNoWriMo novel', test: (s) => s.words >= 50000 },
  { id: 'voice1', icon: '🎙️', name: 'Say it out loud', desc: 'Record your first voice note', test: (s) => s.voiceCount >= 1 },
  { id: 'voice25', icon: '📻', name: 'Podcaster', desc: 'Record 25 voice notes', test: (s) => s.voiceCount >= 25 },
  { id: 'photo1', icon: '📷', name: 'Picture this', desc: 'Add your first photo', test: (s) => s.photoCount >= 1 },
  { id: 'photo50', icon: '🖼️', name: 'Gallery', desc: 'Add 50 photos', test: (s) => s.photoCount >= 50 },
  { id: 'grateful30', icon: '🙏', name: 'Grateful heart', desc: 'Write down 30 good things', test: (s) => s.gratitudeCount >= 30 },
  { id: 'mood30', icon: '🧭', name: 'Self-aware', desc: 'Log your mood 30 times', test: (s) => s.moodCount >= 30 },
  { id: 'hour', icon: '⏳', name: 'Hour of reflection', desc: 'Spend 60 minutes journaling in total', test: (s) => s.minutes >= 60 },
  { id: 'early', icon: '🌅', name: 'Early bird', desc: 'Journal before 7am', test: (s) => s.earlyBird },
  { id: 'owl', icon: '🦉', name: 'Night owl', desc: 'Journal after 11pm', test: (s) => s.nightOwl },
];

export function evaluateAchievements(stats, earned = {}) {
  const now = [];
  for (const a of ACHIEVEMENTS) {
    if (!earned[a.id] && a.test(stats)) now.push(a);
  }
  return now;
}

// ---------------------------------------------------------------------------
// Fun comparisons
// ---------------------------------------------------------------------------

const TIME_BENCHMARKS = [
  { min: 4, one: 'soft-boiled egg', many: 'soft-boiled eggs', emoji: '🥚' },
  { min: 18, one: 'TED talk', many: 'TED talks', emoji: '🎤', note: 'TED talks max out at 18 minutes' },
  { min: 90, one: 'full sleep cycle', many: 'full sleep cycles', emoji: '😴', note: 'a sleep cycle lasts about 90 minutes' },
  { min: 121, one: 'marathon run at world-record pace', many: 'world-record marathons', emoji: '🏃' },
  { min: 194, one: 'screening of Titanic', many: 'screenings of Titanic', emoji: '🚢' },
  { min: 686, one: 'Lord of the Rings extended trilogy', many: 'Lord of the Rings extended trilogies', emoji: '💍' },
  { min: 1440, one: 'whole day', many: 'whole days', emoji: '🌍' },
  { min: 4560, one: 'Apollo 11 trip to the Moon', many: 'Apollo 11 trips to the Moon', emoji: '🚀' },
];

const WORD_BENCHMARKS = [
  { words: 272, one: 'Gettysburg Address', many: 'Gettysburg Addresses', emoji: '📜' },
  { words: 7500, one: 'short story', many: 'short stories', emoji: '📄' },
  { words: 17000, one: 'copy of The Little Prince', many: 'copies of The Little Prince', emoji: '🌹' },
  { words: 30000, one: 'copy of Animal Farm', many: 'copies of Animal Farm', emoji: '🐷' },
  { words: 47000, one: 'copy of The Great Gatsby', many: 'copies of The Great Gatsby', emoji: '🥂' },
  { words: 95000, one: 'copy of The Hobbit', many: 'copies of The Hobbit', emoji: '🐉' },
];

function pickBenchmark(value, list, key) {
  let best = null;
  for (const b of list) if (value >= b[key] * 0.8) best = b;
  return best;
}

function fmtMultiple(x) {
  if (x < 1.15) return 'about one';
  if (x < 10) return `${Math.round(x * 10) / 10}`.replace(/\.0$/, '');
  return Math.round(x).toLocaleString();
}

export function formatMinutes(min) {
  min = Math.round(min);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** Playful comparisons based on the user's totals. Returns [{ emoji, text }]. */
export function funFacts(t, streak) {
  const facts = [];
  const minutes = t.minutes;
  if (minutes >= 3) {
    const b = pickBenchmark(minutes, TIME_BENCHMARKS, 'min') || TIME_BENCHMARKS[0];
    const x = minutes / b.min;
    facts.push({ emoji: b.emoji, text: `You’ve spent ${formatMinutes(minutes)} reflecting. That’s ${fmtMultiple(x)} ${x < 1.15 ? b.one : b.many}${b.note ? ` (${b.note})` : ''}.` });
    const beats = Math.round(minutes * 70);
    facts.push({ emoji: '❤️', text: `Your heart has beaten roughly ${beats.toLocaleString()} times while you journaled.` });
  }
  const allWords = t.words + t.spokenWords;
  if (allWords >= 50) {
    const b = pickBenchmark(allWords, WORD_BENCHMARKS, 'words');
    if (b) {
      const x = allWords / b.words;
      facts.push({ emoji: b.emoji, text: `You’ve written and spoken ${allWords.toLocaleString()} words. That’s ${fmtMultiple(x)} ${x < 1.15 ? b.one : b.many}.` });
    } else {
      facts.push({ emoji: '✍️', text: `${allWords.toLocaleString()} words so far. The Gettysburg Address is only 272.` });
    }
  }
  if (t.spokenWords >= 150) {
    facts.push({ emoji: '🗣️', text: `You’ve spoken about ${formatMinutes(t.spokenWords / 150)} of thoughts out loud. People speak about 150 words a minute.` });
  }
  if (streak.total >= 1) {
    const toHabit = 66 - streak.current;
    facts.push(toHabit > 0 && streak.current > 0
      ? { emoji: '🧠', text: `On average a new habit takes about 66 days to feel automatic. You’re ${streak.current} days in, ${toHabit} to go.` }
      : { emoji: '🧠', text: `${streak.total} ${streak.total === 1 ? 'day' : 'days'} journaled in total. Every one of them counts, even the short ones.` });
  }
  if (t.gratitudeCount >= 3) {
    facts.push({ emoji: '🙏', text: `You’ve noticed ${t.gratitudeCount} good things. Writing them down trains your attention to find more.` });
  }
  if (t.photoCount >= 1) {
    facts.push({ emoji: '📷', text: `${t.photoCount} ${t.photoCount === 1 ? 'photo keeps' : 'photos keep'} your memories next to your words.` });
  }
  return facts;
}

// ---------------------------------------------------------------------------
// Research (kept short and honest; effects in studies are modest and averaged)
// ---------------------------------------------------------------------------

export const RESEARCH = [
  { emoji: '🏥', text: 'Students who wrote about emotional experiences for 15–20 minutes on four days made fewer visits to the health centre in the following months.', source: 'Pennebaker & Beall, 1986' },
  { emoji: '🙏', text: 'People who kept a weekly gratitude list felt more optimistic, reported fewer physical complaints and exercised more than those who listed hassles.', source: 'Emmons & McCullough, 2003' },
  { emoji: '😊', text: 'Writing down “three good things” each night for a week raised happiness and lowered depressive symptoms for up to six months.', source: 'Seligman et al., 2005' },
  { emoji: '🧠', text: 'Putting feelings into words (“affect labelling”) calms the brain’s alarm centre, the amygdala.', source: 'Lieberman et al., 2007' },
  { emoji: '😴', text: 'Writing a to-do list for five minutes before bed helped people fall asleep faster than writing about tasks already done.', source: 'Scullin et al., 2018' },
  { emoji: '🩹', text: 'Older adults who did expressive writing healed faster after a small skin biopsy than those who wrote about neutral topics.', source: 'Koschwanez et al., 2013' },
  { emoji: '🫁', text: 'People with asthma or rheumatoid arthritis who wrote about stressful events showed measurable health improvements four months later.', source: 'Smyth et al., 1999' },
  { emoji: '🧩', text: 'Expressive writing improved working memory, freeing mental space once worries were on paper.', source: 'Klein & Boals, 2001' },
  { emoji: '💼', text: 'Laid-off engineers who wrote about their feelings found new jobs sooner than those who didn’t.', source: 'Spera, Buhrfeind & Pennebaker, 1994' },
  { emoji: '📈', text: 'Noticing small wins is one of the strongest everyday boosts to motivation. Tracking progress helps you see them.', source: 'Amabile & Kramer, 2011' },
  { emoji: '🔁', text: 'Missing a single day doesn’t derail forming a habit. Consistency over time matters more than perfection.', source: 'Lally et al., 2010' },
];

// ---------------------------------------------------------------------------
// Personal patterns (correlations in the user's own data)
// ---------------------------------------------------------------------------

const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const MIN_N = 3;

/**
 * Compare averages in the user's own data. Each result:
 *   { id, title, a: { label, value, n }, b: { label, value, n }, kind: 'mood'|'rate', diff }
 * `pending` lists patterns that need more data, with progress.
 */
export function patterns({ entries = [], tasks = [], days = new Set(), today }) {
  const out = [];
  const pending = [];
  const withMood = entries.filter((e) => e.mood);

  const compare = (id, title, groupA, groupB, labelA, labelB) => {
    if (groupA.length >= MIN_N && groupB.length >= MIN_N) {
      const a = avg(groupA.map((e) => e.mood));
      const b = avg(groupB.map((e) => e.mood));
      out.push({ id, title, kind: 'mood', a: { label: labelA, value: a, n: groupA.length }, b: { label: labelB, value: b, n: groupB.length }, diff: a - b });
    } else {
      pending.push({ id, title, have: Math.min(groupA.length, groupB.length), need: MIN_N });
    }
  };

  const slept = withMood.filter((e) => typeof e.sleep === 'number');
  compare('sleep', 'Sleep and mood', slept.filter((e) => e.sleep >= 7), slept.filter((e) => e.sleep < 7), '7+ hours sleep', 'Under 7 hours');

  const moved = withMood.filter((e) => typeof e.moved === 'boolean');
  compare('moved', 'Movement and mood', moved.filter((e) => e.moved), moved.filter((e) => !e.moved), 'Days you moved', 'Days you didn’t');

  compare('gratitude', 'Gratitude and mood',
    withMood.filter((e) => (e.gratitude || []).some((g) => g && g.trim())),
    withMood.filter((e) => !(e.gratitude || []).some((g) => g && g.trim())),
    'Wrote good things', 'Didn’t');

  // To-do completion on journaled vs non-journaled days (past days only).
  const byDay = new Map();
  for (const t of tasks) {
    if (!t.date || t.date >= today) continue;
    const d = byDay.get(t.date) || { total: 0, done: 0 };
    d.total++;
    if (t.done) d.done++;
    byDay.set(t.date, d);
  }
  const jr = [];
  const nj = [];
  for (const [date, d] of byDay) (days.has(date) ? jr : nj).push(d.done / d.total);
  if (jr.length >= MIN_N && nj.length >= MIN_N) {
    const a = avg(jr);
    const b = avg(nj);
    out.push({ id: 'tasks', title: 'Journaling and getting things done', kind: 'rate', a: { label: 'Days you journaled', value: a, n: jr.length }, b: { label: 'Days you didn’t', value: b, n: nj.length }, diff: a - b });
  } else if (byDay.size) {
    pending.push({ id: 'tasks', title: 'Journaling and getting things done', have: Math.min(jr.length, nj.length), need: MIN_N });
  }

  return { found: out, pending };
}

// ---------------------------------------------------------------------------
// Encouragement copy
// ---------------------------------------------------------------------------

const SMALL_WINS = [
  'One sentence is a perfectly good entry.',
  'Small counts. A mood, a photo or a single word keeps the thread going.',
  'You don’t need anything big to write about. Ordinary days are the ones we forget first.',
  'Thirty seconds is enough. Future you will be glad you did.',
  'Not sure what to say? How did you sleep, and what’s one thing you noticed today?',
  'Journaling isn’t about being profound. It’s about showing up for yourself.',
];

export function nudge(streak, seed = 0) {
  const tip = SMALL_WINS[seed % SMALL_WINS.length];
  if (streak.total === 0) return { title: 'Start your first page', body: `It can be as small as one sentence. ${tip}` };
  if (streak.atRisk) return { title: `Keep your ${streak.current}-day streak going 🔥`, body: tip };
  const lastGap = streak.last7.filter((d) => d.logged).length;
  return { title: lastGap ? 'Welcome back 👋' : 'A fresh page, whenever you’re ready', body: `Every day is a new start. ${tip}` };
}

export function celebration(streak, seed = 0) {
  const n = streak.current;
  const lines = [
    'Nice. That’s today on the page.',
    'Logged. Small steps add up.',
    'Done for today. That was all it took.',
    'Another page for future you.',
  ];
  if (n >= 2) return `${n} days in a row! 🔥 ${lines[seed % lines.length]}`;
  return `Today counts ✨ ${lines[seed % lines.length]}`;
}
