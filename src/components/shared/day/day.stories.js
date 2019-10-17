import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { date } from '@storybook/addon-knobs';

import Day from './day';

const dateISO = (name, defaultValue) =>
  new Date(date(name, defaultValue)).toISOString();

storiesOf('Date', module).add('with text', () => {
  const knobs = {
    date: dateISO('Date', new Date()),
  };

  return <Day {...knobs} onClick={action('clicked')} />;
});
