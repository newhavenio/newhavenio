/**
 * Builds content/events/meetup.json from our Meetup group's public iCal feed,
 * which needs no API key. Runs at the start of every build (`yarn build`), and
 * .github/workflows/discord-jobs.yml triggers a Netlify build on a schedule to
 * keep the page fresh between code changes.
 *
 * The feed lists upcoming events only. It has no photos or structured venue,
 * so event cards show the placeholder image and no venue link. Meetup formats
 * descriptions as Markdown and prefixes them with the group name.
 *
 * If the feed can't be read outside production (local dev, deploy previews),
 * the script leaves the committed meetup.json alone. In a Netlify production
 * build (CONTEXT=production) it fails instead, so we never deploy stale events
 * silently. Netlify keeps the last good deploy live when a build fails.
 *
 * No dependencies.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const FEED = 'https://www.meetup.com/newhavenio/events/ical/';
const OUTPUT = path.join(__dirname, '..', 'content', 'events', 'meetup.json');

/**
 * Splits iCal text into [{ name, value }] properties. Long values are folded
 * onto continuation lines that start with whitespace. Parameters such as
 * ;TZID=America/New_York are dropped: every time in the feed is local to the
 * group, and dates are read as local times.
 */
const parseProperties = ics =>
  ics
    .replace(/\r?\n[ \t]/g, '')
    .split(/\r?\n/)
    .map(line => line.match(/^([A-Z-]+)(?:;[^:]*)?:(.*)$/))
    .filter(Boolean)
    .map(([, name, value]) => ({ name, value }));

const unescapeText = value =>
  value.replace(/\\([\\;,nN])/g, (_, char) =>
    char.toLowerCase() === 'n' ? '\n' : char
  );

// "20261117T180000" -> { date: "2026-11-17", time: "18:00", ms }. ms is only
// meaningful for comparing times. UTC values aren't handled because Meetup
// sends local ones, so a change there fails loudly rather than showing the
// wrong time.
const parseDateTime = value => {
  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/);
  if (!match) throw new Error(`Unexpected iCal date: ${value}`);
  const [, year, month, day, hour, minute, second] = match;
  return {
    date: `${year}-${month}-${day}`,
    time: `${hour}:${minute}`,
    ms: Date.UTC(year, month - 1, day, hour, minute, second),
  };
};

/** Removes the group name prefix and the Markdown Meetup adds. */
const toPlainText = (description, groupName) => {
  const lines = description.split('\n');
  if (lines[0].trim() === groupName) lines.shift();
  return lines
    .join('\n')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .trim();
};

/** Turns one event's properties into an event record, in EventCard's shape. */
const toEvent = (properties, groupName) => {
  const get = name => {
    const match = properties.find(p => p.name === name);
    return match ? match.value : '';
  };
  const start = parseDateTime(get('DTSTART'));
  const end = get('DTEND') && parseDateTime(get('DTEND'));
  return {
    name: unescapeText(get('SUMMARY')),
    local_date: start.date,
    local_time: start.time,
    duration: end ? end.ms - start.ms : null,
    plain_text_description: toPlainText(
      unescapeText(get('DESCRIPTION')),
      groupName
    ),
    short_link: get('URL'),
    status: get('STATUS'),
  };
};

/** Parses the feed into confirmed events, soonest first. */
const parseEvents = ics => {
  if (!ics.startsWith('BEGIN:VCALENDAR')) {
    throw new Error(`Not an iCal feed: ${ics.slice(0, 100)}`);
  }
  const properties = parseProperties(ics);
  const groupName = (properties.find(p => p.name === 'X-WR-CALNAME') || {})
    .value;

  const events = [];
  let current = null;
  properties.forEach(({ name, value }) => {
    if (name === 'BEGIN' && value === 'VEVENT') current = [];
    else if (name === 'END' && value === 'VEVENT') {
      events.push(toEvent(current, groupName));
      current = null;
    } else if (current) current.push({ name, value });
  });

  return events
    .filter(event => event.status !== 'CANCELLED')
    .map(({ status, ...event }) => event)
    .sort((a, b) =>
      `${a.local_date}T${a.local_time}`.localeCompare(
        `${b.local_date}T${b.local_time}`
      )
    );
};

// Minimal GET. Uses https rather than fetch so it runs on whatever Node version
// the Netlify build image is pinned to.
const get = url =>
  new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { 'User-Agent': 'newhaven.io events sync' } },
        res => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', chunk => {
            body += chunk;
          });
          res.on('end', () => {
            if (res.statusCode === 200) resolve(body);
            else reject(new Error(`${url} -> ${res.statusCode}`));
          });
        }
      )
      .on('error', reject);
  });

const main = async () => {
  let events;
  try {
    events = parseEvents(await get(FEED));
  } catch (err) {
    if (process.env.CONTEXT === 'production') throw err;
    console.warn(`${err.message}; keeping the committed meetup.json.`);
    return;
  }
  fs.writeFileSync(OUTPUT, `${JSON.stringify(events, null, 2)}\n`);
  console.log(
    `Wrote ${events.length} events to ${path.relative(process.cwd(), OUTPUT)}`
  );
};

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { parseEvents };
