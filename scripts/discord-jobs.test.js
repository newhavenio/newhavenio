const test = require('ava');

const { parseMessage, buildJobs, toISODate } = require('./discord-jobs');

// Shaped like the embeds JobsBot.format_job_embed() posts.
const jsearchMessage = (overrides = {}) => ({
  id: '1300000000000000001',
  timestamp: '2026-11-02T18:01:00.000000+00:00',
  embeds: [
    {
      author: { name: 'JSearch' },
      title: 'Software Engineer, FTT Investment Tech Solutions',
      url: 'https://example.com/apply/ftt',
      description: 'At Franklin Templeton, we believe success...',
      fields: [
        { name: 'Location', value: 'Stamford, Connecticut, US', inline: true },
        { name: 'Type', value: 'Full-time', inline: true },
        { name: 'Company', value: 'Franklin Templeton', inline: true },
        { name: 'Posted', value: 'October 30, 2026', inline: true },
      ],
      footer: { text: 'Job ID: jsearch_SXZYc1hP' },
    },
  ],
  ...overrides,
});

test('parses a JSearch embed', t => {
  t.deepEqual(parseMessage(jsearchMessage()), [
    {
      jobId: 'jsearch_SXZYc1hP',
      source: 'JSearch',
      jobTitle: 'Software Engineer, FTT Investment Tech Solutions',
      company: 'Franklin Templeton',
      location: 'Stamford, Connecticut, US',
      employmentType: 'Full-time',
      jobURL: 'https://example.com/apply/ftt',
      postedOn: '2026-10-30',
      sharedOn: '2026-11-02',
      description: 'At Franklin Templeton, we believe success...',
    },
  ]);
});

test('parses a Yale embed, which uses Category instead of Company', t => {
  const [job] = parseMessage({
    id: '2',
    timestamp: '2026-11-01T12:00:00+00:00',
    embeds: [
      {
        author: { name: 'Yale Careers' },
        title: 'Systems Administrator',
        url: 'https://example.com/yale/1',
        fields: [
          { name: 'Location', value: 'New Haven, CT' },
          { name: 'Category', value: 'Information Technology' },
        ],
        footer: { text: 'Yale Job ID: 98765' },
      },
    ],
  });
  t.is(job.company, 'Yale University');
  t.is(job.jobId, '98765');
  t.is(job.postedOn, '2026-11-01', 'falls back to the message date');
  t.is(job.description, '');
});

test('ignores chat messages and other bots', t => {
  t.deepEqual(
    parseMessage({ id: '3', timestamp: '2026-11-01T00:00:00Z', content: 'hi' }),
    []
  );
  t.deepEqual(
    parseMessage(
      jsearchMessage({
        embeds: [{ author: { name: 'GitHub' }, title: 'x', url: 'y' }],
      })
    ),
    []
  );
});

test('dedupes reposts by job ID and by title+company, newest posting first', t => {
  const older = jsearchMessage({ id: '1', timestamp: '2026-10-20T00:00:00Z' });
  const newer = jsearchMessage({ id: '2' });
  const sameJobNewId = jsearchMessage({ id: '4' });
  sameJobNewId.embeds[0].footer.text = 'Job ID: jsearch_other';
  const other = jsearchMessage({ id: '5' });
  Object.assign(other.embeds[0], {
    title: 'Data Engineer',
    url: 'https://example.com/de',
  });
  other.embeds[0].fields[3].value = 'November 1, 2026';
  other.embeds[0].footer.text = 'Job ID: jsearch_de';

  const jobs = buildJobs([older, newer, sameJobNewId, other]);
  t.deepEqual(
    jobs.map(j => j.jobTitle),
    ['Data Engineer', 'Software Engineer, FTT Investment Tech Solutions']
  );
  t.is(jobs[1].sharedOn, '2026-11-02', 'keeps the most recent share');
});

test('toISODate handles the formats the bot emits', t => {
  t.is(toISODate('October 30, 2026'), '2026-10-30');
  t.is(toISODate('2026-10-30T00:00:00.000Z'), '2026-10-30');
  t.is(toISODate('sometime soon'), null);
  t.is(toISODate(''), null);
});
