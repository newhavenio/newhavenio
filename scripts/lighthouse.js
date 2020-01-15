import test from 'ava';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

// TODO: switch this to actual URL once deployed
import { siteUrlDevelopment as siteUrl } from '../site-config';

const launchChromeAndRunLighthouse = (
  url,
  opts = { chromeFlags: ['--headless'] },
  config = null
) =>
  launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results =>
      chrome.kill().then(() => results.lhr)
    );
  });

let scores;
test.before(async t => {
  t.log(`Auditing ${siteUrl}.\n`);
  scores = await launchChromeAndRunLighthouse(siteUrl).then(
    ({ categories }) => categories
  );
});

const logScore = score => `Is ${score * 100}.`;

/**
 * Pass/fail thresholds are fairly arbitrary now but should not be lowered for
 * the most part.
 *
 * We can consider removing PWA since we don't really care about that.
 */
test('Performance Score above 80', t => {
  const score = scores['performance'].score;
  t.log(logScore(score));
  score >= 0.8 ? t.pass() : t.fail();
});

test('PWA Score above 70', t => {
  const score = scores['pwa'].score;
  t.log(logScore(score));
  score >= 0.7 ? t.pass() : t.fail();
});

test('Accessibility Score above 70', t => {
  const score = scores['accessibility'].score;
  t.log(logScore(score));
  score >= 0.7 ? t.pass() : t.fail();
});

test('Best Practices Score above 90', t => {
  const score = scores['best-practices'].score;
  t.log(logScore(score));
  score >= 0.9 ? t.pass() : t.fail();
});

test('SEO Score above 80', t => {
  const score = scores['seo'].score;
  t.log(logScore(score));
  score >= 0.8 ? t.pass() : t.fail();
});
