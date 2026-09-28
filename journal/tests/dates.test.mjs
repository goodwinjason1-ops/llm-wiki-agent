import test from 'node:test';
import assert from 'node:assert/strict';
import { parseQuick, extractActions, extractTags, addDays, diffDays, addMonths } from '../js/dates.js';

// Monday 28 September 2026, 10:00 local
const NOW = new Date(2026, 8, 28, 10, 0);

test('plain task has no date', () => {
  const r = parseQuick('Buy milk', NOW);
  assert.equal(r.title, 'Buy milk');
  assert.equal(r.date, null);
  assert.equal(r.time, null);
});

test('tomorrow at 5pm with duration, priority and tag', () => {
  const r = parseQuick('Call mum tomorrow at 5pm for 30 min !high #family', NOW);
  assert.equal(r.title, 'Call mum');
  assert.equal(r.date, '2026-09-29');
  assert.equal(r.time, '17:00');
  assert.equal(r.duration, 30);
  assert.equal(r.priority, 1);
  assert.deepEqual(r.tags, ['family']);
});

test('lead-in phrases are stripped', () => {
  const r = parseQuick('remind me to pay the electricity bill on friday', NOW);
  assert.equal(r.title, 'Pay the electricity bill');
  assert.equal(r.date, '2026-10-02');
});

test('weekday that is today means next week', () => {
  assert.equal(parseQuick('gym monday', NOW).date, '2026-10-05');
  assert.equal(parseQuick('gym this monday', NOW).date, '2026-09-28');
});

test('24h and colon times', () => {
  assert.equal(parseQuick('standup 9:15', NOW).time, '09:15');
  assert.equal(parseQuick('review at 15:30', NOW).time, '15:30');
  assert.equal(parseQuick('drinks 7:30pm', NOW).time, '19:30');
  assert.equal(parseQuick('lunch at noon', NOW).time, '12:00');
});

test('bare "at 3" is the afternoon, and a passed time rolls to tomorrow', () => {
  const r = parseQuick('dentist at 3', NOW);
  assert.equal(r.time, '15:00');
  assert.equal(r.date, '2026-09-28');
  assert.equal(parseQuick('coffee at 8am', NOW).date, '2026-09-29');
});

test('month names and numeric dates', () => {
  assert.equal(parseQuick('passport renewal 14 oct', NOW).date, '2026-10-14');
  assert.equal(parseQuick('passport renewal october 14th', NOW).date, '2026-10-14');
  assert.equal(parseQuick('report due 3/10', NOW, { dateOrder: 'DMY' }).date, '2026-10-03');
  assert.equal(parseQuick('report due 10/3', NOW, { dateOrder: 'MDY' }).date, '2026-10-03');
  assert.equal(parseQuick('party 2026-12-31', NOW).date, '2026-12-31');
  // A date well in the past rolls over to next year
  assert.equal(parseQuick('birthday 2 jan', NOW).date, '2027-01-02');
});

test('relative offsets', () => {
  assert.equal(parseQuick('follow up in 3 days', NOW).date, '2026-10-01');
  assert.equal(parseQuick('check oven in 20 minutes', NOW).time, '10:20');
  assert.equal(parseQuick('review in two weeks', NOW).date, '2026-10-12');
});

test('parts of day', () => {
  const r = parseQuick('call the bank tomorrow morning', NOW);
  assert.equal(r.date, '2026-09-29');
  assert.equal(r.time, '09:00');
  assert.equal(r.title, 'Call the bank');
  assert.equal(parseQuick('read tonight', NOW).time, '19:00');
});

test('extractActions finds tasks and events in a voice transcript', () => {
  const t = 'Had a good walk this morning. I need to email Sarah about the invoice tomorrow. ' +
    'Also doctor appointment on Thursday at 2:30pm. The weather was nice.';
  const actions = extractActions(t, NOW);
  assert.equal(actions.length, 2);
  assert.equal(actions[0].kind, 'task');
  assert.equal(actions[0].parsed.title, 'Email Sarah about the invoice');
  assert.equal(actions[0].parsed.date, '2026-09-29');
  assert.equal(actions[1].kind, 'event');
  assert.equal(actions[1].parsed.date, '2026-10-01');
  assert.equal(actions[1].parsed.time, '14:30');
});

test('extractTags', () => {
  assert.deepEqual(extractTags('Great day #work and #Family time, email me@x.com'), ['work', 'family']);
});

test('date arithmetic', () => {
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(diffDays('2026-10-01', '2026-09-28'), 3);
  assert.equal(addMonths('2026-01-31', 1), '2026-02-01');
});

test('filler words are stripped from detected titles', () => {
  const [a] = extractActions('Also dentist appointment on Thursday at 2:30pm.', NOW);
  assert.equal(a.parsed.title, 'Dentist appointment');
});
