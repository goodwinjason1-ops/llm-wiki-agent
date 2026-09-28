import test from 'node:test';
import assert from 'node:assert/strict';
import { activityDays, streakInfo, totals, evaluateAchievements, funFacts, patterns, formatMinutes, entryCounts } from '../js/insights.js';

const TODAY = '2026-09-28';

test('anything small counts as an entry', () => {
  assert.equal(entryCounts({ text: '  ' }), false);
  assert.equal(entryCounts({ mood: 3 }), true);
  assert.equal(entryCounts({ sleep: 7 }), true);
  assert.equal(entryCounts({ moved: false }), true);
  assert.equal(entryCounts({ gratitude: ['', 'tea', ''] }), true);
});

test('streak includes today, or runs to yesterday while today is open', () => {
  const days = activityDays({
    entries: [{ date: '2026-09-26', text: 'hi' }, { date: '2026-09-27', mood: 4 }],
    voice: [{ date: '2026-09-20' }],
    files: [{ date: '2026-09-21' }],
  });
  let s = streakInfo(days, TODAY);
  assert.equal(s.current, 2);
  assert.equal(s.atRisk, true);
  assert.equal(s.loggedToday, false);
  assert.equal(s.best, 2);
  assert.equal(s.total, 4);
  days.add(TODAY);
  s = streakInfo(days, TODAY);
  assert.equal(s.current, 3);
  assert.equal(s.atRisk, false);
  assert.deepEqual(s.last7.map((d) => d.logged), [false, false, false, false, true, true, true]);
});

test('totals and achievements', () => {
  const t = totals({
    entries: [{ date: TODAY, text: 'one two three', gratitude: ['sun', ''], writeSeconds: 600, mood: 4 }],
    voice: [{ duration: 120, transcript: 'hello there' }],
    files: [{ kind: 'image' }, { kind: 'video' }],
  });
  assert.equal(t.words, 4);
  assert.equal(t.spokenWords, 2);
  assert.equal(t.minutes, 12);
  assert.equal(t.photoCount, 1);
  const got = evaluateAchievements({ ...t, total: 1, best: 1, current: 1 }, { first: '2026-09-01' }).map((a) => a.id);
  assert.ok(got.includes('voice1'));
  assert.ok(got.includes('photo1'));
  assert.ok(!got.includes('first'), 'already earned is not repeated');
  assert.ok(!got.includes('streak3'));
});

test('fun facts pick a sensible comparison', () => {
  const facts = funFacts({ minutes: 200, words: 600, spokenWords: 0, gratitudeCount: 0, photoCount: 0 }, { total: 5, current: 5 });
  assert.match(facts[0].text, /3h 20m/);
  assert.match(facts[0].text, /Titanic/);
  assert.ok(facts.some((f) => /Gettysburg/.test(f.text)));
  assert.ok(facts.some((f) => /66 days/.test(f.text)));
  assert.equal(formatMinutes(59.6), '1h');
});

test('personal patterns need enough data and compare averages', () => {
  const entries = [
    ...[8, 7, 9].map((s, i) => ({ date: `2026-09-0${i + 1}`, mood: 5, sleep: s, moved: true })),
    ...[5, 6, 4].map((s, i) => ({ date: `2026-09-1${i + 1}`, mood: 3, sleep: s, moved: false })),
  ];
  const { found, pending } = patterns({ entries, tasks: [], days: new Set(), today: TODAY });
  const sleep = found.find((p) => p.id === 'sleep');
  assert.equal(sleep.a.value, 5);
  assert.equal(sleep.b.value, 3);
  assert.ok(found.find((p) => p.id === 'moved'));
  assert.ok(pending.find((p) => p.id === 'gratitude'));
});
