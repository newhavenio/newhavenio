import React from 'react';
import styled from 'styled-components';

import GlobalStyle from '../../src/global.css';

require('typeface-source-sans-pro');
require('typeface-lato');

const Container = styled.div``;

export default storyFn => (
  <Container>
    <GlobalStyle />
    {storyFn()}
  </Container>
);
