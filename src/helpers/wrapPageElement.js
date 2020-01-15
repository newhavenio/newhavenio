import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import Transition from 'components/shared/transition';
import { theme } from 'constants/theme';
import Head from 'components/head';
import Header from 'components/header';
import Footer from 'components/footer';
import GlobalStyle from 'global.css.js';
import * as Styled from 'components/layout/layout.css';

const wrapPageElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Styled.Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Styled.Content>
          <GlobalStyle />
          <Head />
          <Header />
          <Transition {...props}>{element}</Transition>
        </Styled.Content>
        <Footer />
      </Styled.Container>
    </ThemeProvider>
  );
};

wrapPageElement.propTypes = {
  element: PropTypes.any,
  props: PropTypes.any,
};

export default wrapPageElement;
