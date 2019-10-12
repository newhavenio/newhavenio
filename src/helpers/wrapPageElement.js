import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import Transition from 'components/transition';
import { theme } from 'constants/theme';

const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Transition {...props}>{element}</Transition>
    </ThemeProvider>
  );
};

wrapPageElement.propTypes = {
  element: PropTypes.any,
  props: PropTypes.any,
};

export default wrapPageElement;
