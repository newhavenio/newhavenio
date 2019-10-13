import React from 'react';
import { Location } from '@reach/router';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Nav from 'components/header/nav';
import Logo from 'components/logo';
import { theme } from 'constants/theme';

import { Container } from './header.css';

const Header = ({ title }) => (
  <Location>
    {({ location }) => (
      <Container isRoot={location.pathname === '/'}>
        <Link to="/">
          <Logo color={theme.colors.Whites[100]} />
        </Link>
        <Nav />
      </Container>
    )}
  </Location>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
