/**
 * Builds content/jobs/discord.json from the job postings that the jobbot
 * (github.com/josh-levinson/newhavenio-jobbot) posts to our Discord #jobs
 * channel. Runs at the start of every build (`yarn build`), so each Netlify
 * deploy has current jobs. .github/workflows/discord-jobs.yml triggers a
 * Netlify build on a schedule to keep the page fresh between code changes.
 *
 * The bot posts one embed per job: the author is the source ("JSearch" or
 * "Yale Careers"), the title links to the posting, and Location / Type /
 * Company (or Category) / Posted are fields. The footer holds the job ID.
 *
 * Env:
 *   DISCORD_BOT_TOKEN       token of a bot that can read the channel
 *   DISCORD_JOBS_CHANNEL_ID the #jobs channel ID
 *   JOBS_MAX_AGE_DAYS       how far back to read (default 30)
 *
 * Without the token and channel ID (local dev, deploy previews), the script
 * leaves the committed discord.json alone. In a Netlify production build
 * (CONTEXT=production) it fails instead, so we never deploy stale jobs
 * silently. Netlify keeps the last good deploy live when a build fails.
 *
 * No dependencies.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const API = 'https://discord.com/api/v10';
const OUTPUT = path.join(__dirname, '..', 'content', 'jobs', 'discord.json');
const SOURCES = ['JSearch', 'Yale Careers'];

const field = (embed, ...names) => {
  const match = (embed.fields || []).find(f => names.includes(f.name));
  return match ? match.value.trim() : '';
};

// "October 30, 2026" -> "2026-10-30". The bot falls back to the raw value when
// it can't format a date, so ISO strings are handled too.
const toISODate = value => {
  if (!value) return null;
  const iso = value.match(/^\d{4}-\d{2}-\d{2}/);
  if (iso) return iso[0];
  const parsed = Date.parse(`${value} UTC`);
  return Number.isNaN(parsed)
    ? null
    : new Date(parsed).toISOString().slice(0, 10);
};

/** Turns one Discord message into job records (one per qualifying embed). */
const parseMessage = message =>
  (message.embeds || [])
    .filter(
      e => e.author && SOURCES.includes(e.author.name) && e.title && e.url
    )
    .map(embed => {
      const footer = (embed.footer && embed.footer.text) || '';
      const idMatch = footer.match(/Job ID:\s*(\S+)/);
      const messageDate = message.timestamp.slice(0, 10);
      return {
        jobId: idMatch ? idMatch[1] : `${message.id}`,
        source: embed.author.name,
        jobTitle: embed.title.trim(),
        company:
          field(embed, 'Company') ||
          (embed.author.name === 'Yale Careers' ? 'Yale University' : ''),
        location: field(embed, 'Location'),
        employmentType: field(embed, 'Type'),
        jobURL: embed.url,
        postedOn: toISODate(field(embed, 'Posted')) || messageDate,
        sharedOn: messageDate,
        description: (embed.description || '').trim(),
      };
    });

/** Dedupes by job ID and title+company, newest first. */
const buildJobs = messages => {
  const byKey = new Map();
  messages
    .flatMap(parseMessage)
    .sort((a, b) => b.sharedOn.localeCompare(a.sharedOn))
    .forEach(job => {
      const titleCompany = `${job.jobTitle}|${job.company}`.toLowerCase();
      if (byKey.has(job.jobId) || byKey.has(titleCompany)) return;
      byKey.set(job.jobId, job);
      byKey.set(titleCompany, job);
    });
  return [...new Set(byKey.values())].sort(
    (a, b) =>
      b.postedOn.localeCompare(a.postedOn) ||
      b.sharedOn.localeCompare(a.sharedOn) ||
      a.jobTitle.localeCompare(b.jobTitle)
  );
};

// Minimal GET returning { status, body }. Uses https rather than fetch so it
// runs on whatever Node version the Netlify build image is pinned to.
const get = (url, headers) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers }, res => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => {
          body += chunk;
        });
        res.on('end', () => resolve({ status: res.statusCode, body }));
      })
      .on('error', reject);
  });

const discord = async (route, token) => {
  for (;;) {
    const res = await get(`${API}${route}`, {
      Authorization: `Bot ${token}`,
      'User-Agent': 'newhaven.io jobs sync',
    });
    if (res.status === 429) {
      const { retry_after: wait = 1 } = JSON.parse(res.body);
      await new Promise(r => setTimeout(r, wait * 1000));
      continue;
    }
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`Discord ${route} -> ${res.status} ${res.body}`);
    }
    return JSON.parse(res.body);
  }
};

/** Pages backwards through the channel until messages are older than cutoff. */
const fetchMessages = async (channelId, token, cutoff) => {
  const messages = [];
  let before = '';
  for (;;) {
    const page = await discord(
      `/channels/${channelId}/messages?limit=100${before &&
        `&before=${before}`}`,
      token
    );
    const recent = page.filter(m => Date.parse(m.timestamp) >= cutoff);
    messages.push(...recent);
    if (page.length < 100 || recent.length < page.length) return messages;
    before = page[page.length - 1].id;
  }
};

const main = async () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_JOBS_CHANNEL_ID;
  if (!token || !channelId) {
    const message =
      'DISCORD_BOT_TOKEN and DISCORD_JOBS_CHANNEL_ID are not set';
    if (process.env.CONTEXT === 'production') throw new Error(message);
    console.warn(`${message}; keeping the committed discord.json.`);
    return;
  }
  const maxAgeDays = Number(process.env.JOBS_MAX_AGE_DAYS || 30);
  const cutoff = Date.now() - maxAgeDays * 24 * 60 * 60 * 1000;

  const messages = await fetchMessages(channelId, token, cutoff);
  const jobs = buildJobs(messages);
  fs.writeFileSync(OUTPUT, `${JSON.stringify(jobs, null, 2)}\n`);
  console.log(
    `Read ${messages.length} messages from the last ${maxAgeDays} days; wrote ${
      jobs.length
    } jobs to ${path.relative(process.cwd(), OUTPUT)}`
  );
};

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { parseMessage, buildJobs, toISODate };
