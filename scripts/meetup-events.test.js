const test = require('ava');

const { parseEvents } = require('./meetup-events');

const vevent = (overrides = {}) => {
  const lines = {
    UID: 'UID:event_317268597@meetup.com',
    DTSTART: 'DTSTART;TZID=America/New_York:20261117T180000',
    DTEND: 'DTEND;TZID=America/New_York:20261117T200000',
    SUMMARY: 'SUMMARY:Social Pub Night @ East Rock Brewing',
    DESCRIPTION: [
      'DESCRIPTION:NewHaven.IO\\nWelcome to [NewHaven.IO](https://newhaven.io)\\, a',
      '  local community!\\n\\n**What:** Pub night',
    ].join('\r\n'),
    URL: 'URL;VALUE=URI:https://www.meetup.com/newhavenio/events/317268597/',
    STATUS: 'STATUS:CONFIRMED',
    ...overrides,
  };
  return [
    'BEGIN:VEVENT',
    ...Object.values(lines).filter(Boolean),
    'END:VEVENT',
  ].join('\r\n');
};

// Shaped like www.meetup.com/newhavenio/events/ical/, including the VTIMEZONE
// block whose DTSTART must not be mistaken for an event's.
const calendar = (...events) =>
  [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'X-WR-CALNAME:NewHaven.IO',
    'BEGIN:VTIMEZONE',
    'TZID:America/New_York',
    'BEGIN:DAYLIGHT',
    'DTSTART:19700308T020000',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
    ...events,
    'END:VCALENDAR',
    '',
  ].join('\r\n');

test('parses an event', t => {
  t.deepEqual(parseEvents(calendar(vevent())), [
    {
      name: 'Social Pub Night @ East Rock Brewing',
      local_date: '2026-11-17',
      local_time: '18:00',
      duration: 2 * 60 * 60 * 1000,
      plain_text_description:
        'Welcome to NewHaven.IO, a local community!\n\nWhat: Pub night',
      short_link: 'https://www.meetup.com/newhavenio/events/317268597/',
    },
  ]);
});

test('leaves the duration empty when the event has no end', t => {
  const [event] = parseEvents(calendar(vevent({ DTEND: null })));
  t.is(event.duration, null);
});

test('unescapes literal backslashes without creating newlines', t => {
  const [event] = parseEvents(
    calendar(vevent({ SUMMARY: 'SUMMARY:C:\\\\new\\; builds' }))
  );
  t.is(event.name, 'C:\\new; builds');
});

test('drops cancelled events', t => {
  t.deepEqual(
    parseEvents(calendar(vevent({ STATUS: 'STATUS:CANCELLED' }))),
    []
  );
});

test('sorts events soonest first', t => {
  const later = vevent({ DTSTART: 'DTSTART:20261215T180000', DTEND: null });
  const sooner = vevent({ DTSTART: 'DTSTART:20261117T180000', DTEND: null });
  t.deepEqual(
    parseEvents(calendar(later, sooner)).map(event => event.local_date),
    ['2026-11-17', '2026-12-15']
  );
});

test('a calendar with no events is valid', t => {
  t.deepEqual(parseEvents(calendar()), []);
});

test('rejects a response that is not a calendar', t => {
  t.throws(() => parseEvents('<!DOCTYPE html><html></html>'), /Not an iCal/);
});

test('rejects times it cannot read as local', t => {
  t.throws(
    () =>
      parseEvents(calendar(vevent({ DTSTART: 'DTSTART:20261117T230000Z' }))),
    /Unexpected iCal date/
  );
});
