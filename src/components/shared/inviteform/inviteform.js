import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import * as Styled from './inviteform.css';
import Button from 'components/shared/button';
import Text from 'components/shared/text';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidEmail = email => EMAIL_REGEX.test(email.toLowerCase());

/**
 * Invite form for Slack
 */
const InviteForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleEmailChange = e => {
    setMessage({});
    setEmail(e.target.value);
  };

  const handleSubmit = useCallback(async e => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return setMessage({
        error: true,
        body: 'Please enter a valid email address.',
      });
    }

    try {
      setLoading(true);

      const recaptchaToken = await executeRecaptcha('slack_invite');

      await axios.post('/.netlify/functions/slackSubmit', {
        params: {
          email,
          recaptchaToken,
        },
      });

      return setMessage({
        error: false,
        body: 'Success! Check your email for an invite to our Slack channel.',
      });
    } catch (e) {
      if (
        e != null &&
        e.response != null &&
        e.response.data != null &&
        e.response.data.error != null
      ) {
        switch (e.response.data.error) {
          case 'invalid-recaptcha':
            return setMessage({
              error: true,
              body:
                'There was an issue with verifying your request. Please refresh the page and try again.',
            });
          case 'recaptcha-failed':
            return setMessage({
              error: true,
              body:
                'Recaptcha failed. If you are using a VPN, please disable it and try again.',
            });
          case 'already_in_team_invited_user':
            return setMessage({
              error: true,
              message: 'You have already been invited to this team.',
            });
          case 'invalid_email':
            return setMessage({
              error: true,
              message: 'Please enter a valid email address.',
            });
          default:
            return setMessage(
              'An unexpected error occurred. Please refresh the page and try again.'
            );
        }
      } else {
        return setMessage({
          error: true,
          message:
            'An unexpected error occurred. Please refresh the page and try again.',
        });
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <RecaptchaText />
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Input
          placeholder="you@email.com"
          required
          type="email"
          onChange={handleEmailChange}
          value={email}
        />
        <Button type="submit" disabled={message.error || loading}>
          Get Invite
        </Button>
      </Styled.Form>
      {message.body != null && (
        <Text fontSize={2} fontWeight={600} mt={3} color="Blues.100">
          {message.body}
        </Text>
      )}

      <Text fontSize={1} mt={3} display="block" color="Grays.100">
        Or if you&apos;re already a member{' '}
        <a
          href="https://newhavenio.slack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          sign in
        </a>
        .
      </Text>
    </>
  );
};

InviteForm.propTypes = {};

export default InviteForm;

/**
 * Because we hide the Recaptcha banner via CSS, we are legally required to
 * show this text.
 *
 * https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
 */
const RecaptchaText = () => (
  <Text fontSize={1} mb={2} display="block" color="Grays.60">
    This site is protected by reCAPTCHA and the Google&nbsp;
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and&nbsp;
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
  </Text>
);
