import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';

import Button from './button';

storiesOf('Button', module).add('with text', () => {
  const knobs = {
    disabled: boolean('Disabled', false),
    palette: select('Palette', ['primary', 'secondary', 'tertiary'], 'primary'),
  };

  return (
    <Button {...knobs} onClick={action('clicked')}>
      Hello Button
    </Button>
  );
});
