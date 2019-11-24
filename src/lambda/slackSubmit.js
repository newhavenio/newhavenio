import dotenv from 'dotenv';
import axios from 'axios';
import qs from 'qs';

dotenv.config();

const RECAPTCHA_ENDPOINT = 'https://www.google.com/recaptcha/api/siteverify';
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SLACK_INVITE_ENDPOINT = 'https://slack.com/api/users.admin.invite';

// TODO: Move this to Netlify env vars @a-trost
// This is NOT ok! This is a secret!
// Currently we are using a test key for Netlify. Once we swap for a key on
// the newhaven.io domain, this MUST be stored in Netlify secret management.
const RECAPTCHA_SECRET_KEY = '6LfTTMQUAAAAAJirVZO6XgpNCj-94HfJ_rclZu3G';

/**
 * Invites the given email to our Slack channel.
 *
 * @name Slack Submit
 * @path {POST} /.netlify/functions/slackSubmit
 * @body {String} email
 * @body {String} recaptchaToken the recaptcha user response token
 * @response {String} error failure reason
 */
export async function handler(event, _context, callback) {
  const payload = JSON.parse(event.body);
  const email = encodeURIComponent(payload.params.email.trim());
  const toSlack = `email=${email}&token=${SLACK_TOKEN}&set_active=true`;

  const {
    data: { success, score, 'error-codes': errorCodes },
  } = await axios.post(
    RECAPTCHA_ENDPOINT,
    qs.stringify({
      secret: RECAPTCHA_SECRET_KEY,
      response: payload.params.recaptchaToken,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (!success) {
    // Recaptcha itself was invalid -- might mean key was misconfigured
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: 'invalid-recaptcha',
        errorCodes,
      }),
    });
  }

  if (score < 0.5) {
    // Recaptcha failed
    return callback(null, {
      statusCode: 429,
      body: JSON.stringify({
        error: 'recaptcha-failed',
      }),
    });
  }

  try {
    const { data } = await axios.get(`${SLACK_INVITE_ENDPOINT}?${toSlack}`);

    if (data.error != null) {
      // Slack invite failed -- can mean malformed email or user already invited
      return callback(null, {
        statusCode: 422,
        body: JSON.stringify({
          error: data.error,
        }),
      });
    }

    // Invite succeeded
    return callback(null, {
      statusCode: 200,
    });
  } catch (error) {
    // Mystery error
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    });
  }
}
