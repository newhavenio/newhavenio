import React, { useState, useCallback } from 'react';
import axios from 'axios';

import * as Styled from './inviteform.css';
import Button from '../button';

/**
 * Invite form for Slack
 */
const InviteForm = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = useCallback(async () => {
    try {
      const resp = await axios.post('/.netlify/functions/slackSubmit', {
        params: {
          email,
        },
      });

      // TODO: surface success message
      console.info(resp);
    } catch (e) {
      // TODO: surface error message
      console.error(e);
    }
  });

  return (
    <Styled.Container>
      <Styled.Input
        placeholder="you@email.com"
        required
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <Button type="button" click={handleSubmit}>
        Get Invite
      </Button>
    </Styled.Container>
  );
};

InviteForm.propTypes = {};

export default InviteForm;
