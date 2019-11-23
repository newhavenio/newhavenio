import React, { useState, useCallback } from 'react';
import axios from 'axios';

import * as Styled from './inviteform.css';
import Button from '../button';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidEmail = email => EMAIL_REGEX.test(email.toLowerCase());

/**
 * Invite form for Slack
 */
const InviteForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleEmailChange = e => {
    setMessage('');
    setEmail(e.target.value);
  };
  const handleSubmit = useCallback(async e => {
    e.preventDefault();

    try {
      await axios.post('/.netlify/functions/slackSubmit', {
        params: {
          email,
        },
      });

      // TODO: surface success message
      return setMessage(
        'Success! Check your email for an invite to our Slack channel.'
      );
    } catch (e) {
      if (
        e.response != null &&
        e.response.data != null &&
        e.response.data.error != null
      ) {
        switch (e.response.data.error) {
          case 'already_in_team_invited_user':
            return setMessage('You have already been invited to this team.');
          case 'invalid_email':
            return setMessage('Invalid email address.');
          default:
            return setMessage(
              'An unexpected error occurred. Please refresh the page and try again.'
            );
        }
      } else {
        return setMessage(
          'An unexpected error occurred. Please refresh the page and try again.'
        );
      }
    }
  });

  return (
    <>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Input
          placeholder="you@email.com"
          required
          type="email"
          onChange={handleEmailChange}
          value={email}
        />
        <Button type="submit" disabled={!isValidEmail(email)}>
          Get Invite
        </Button>
      </Styled.Form>
      {message.length > 0 && <Styled.Message>{message}</Styled.Message>}
    </>
  );
};

InviteForm.propTypes = {};

export default InviteForm;
