import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

// Remove transition for now -- not well implemented. Header should be outside.
// import Transition from 'components/shared/transition';
import { theme } from 'constants/theme';

const wrapPageElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};

wrapPageElement.propTypes = {
  element: PropTypes.any,
  props: PropTypes.any,
};

export default wrapPageElement;
