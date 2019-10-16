import React from 'react';
import { Location } from '@reach/router';
import { Link } from 'gatsby';

import Nav from 'components/header/nav';
import Logo from 'components/shared/logo';
import { theme } from 'constants/theme';

import { Container } from './header.css';

const Header = () => (
  <Location>
    {({ location }) => (
      <Container isRoot={location.pathname === '/'}>
        <Link to="/">
          <Logo
            squareColor={theme.colors.Whites[100]}
            letterColor="transparent"
          />
        </Link>
        <Nav />
      </Container>
    )}
  </Location>
);

export default Header;
