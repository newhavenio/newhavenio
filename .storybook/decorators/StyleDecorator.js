import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { theme } from 'constants/theme';

import GlobalStyle from '../../src/global.css';

require('typeface-source-sans-pro');
require('typeface-lato');

const Container = styled.div``;

export default storyFn => (
  <ThemeProvider theme={theme}>
    <Container>
      <GlobalStyle />
      {storyFn()}
    </Container>
  </ThemeProvider>
);
