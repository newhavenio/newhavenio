import React from 'react';
import { Link } from 'gatsby';
import { Container } from './nav.css';

const Nav = () => (
  <Container>
    <ul>
      <li>
        <Link activeClassName="active" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link activeClassName="active" to="/about">
          About
        </Link>
      </li>
      <li>
        <Link activeClassName="active" to="/events">
          Events
        </Link>
      </li>
      <li>
        <Link activeClassName="active" to="/resources">
          Rules and Resources
        </Link>
      </li>
    </ul>
  </Container>
);

export default Nav;
