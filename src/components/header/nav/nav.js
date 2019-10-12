import React from 'react';
import { Link } from 'gatsby';
import { Container } from './nav.css';

const Nav = () => (
  <Container>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/events">Events</Link>
      </li>
      <li>
        {/* <a href="https://github.com/fabe/gatsby-universal">Slack</a> */}
        <Link to="/slack">Slack</Link>
      </li>
      <li>
        <Link to="/resources">Rules and Resources</Link>
      </li>
    </ul>
  </Container>
);

export default Nav;
