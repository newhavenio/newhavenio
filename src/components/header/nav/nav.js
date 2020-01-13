import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import { motion } from 'framer-motion';

import { Container } from './nav.css';

// Note: this should coordinate with the animation in index.js.
// There should be a small delay after all index elements render, then the nav should come in.
const INDEX_ANIMATION_COUNT = 2;
// Inserts a half second pause between index and menu animations
const entryAnimationFactory = pathname => {
  const isIndexPage = pathname === '/';
  // We only want to stagger these links with more delay if on index page which also has animations
  const delay = isIndexPage ? INDEX_ANIMATION_COUNT * 0.2 + 0.5 : 0;

  return idx => ({
    initial: { opacity: 0, y: -25 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'tween', delay: 0.2 * (idx + 1) + delay },
  });
};

const Nav = () => (
  <Location>
    {({ location }) => {
      const entryAnimation = entryAnimationFactory(location.pathname);
      return (
        <Container>
          <ul>
            <motion.li {...entryAnimation(0)}>
              <Link activeClassName="active" to="/">
                Home
              </Link>
            </motion.li>
            <motion.li {...entryAnimation(1)}>
              <Link partiallyActive activeClassName="active" to="/about/">
                About
              </Link>
            </motion.li>
            <motion.li {...entryAnimation(2)}>
              <Link partiallyActive activeClassName="active" to="/events/">
                Events
              </Link>
            </motion.li>
            <motion.li {...entryAnimation(3)}>
              <Link partiallyActive activeClassName="active" to="/resources/">
                Rules and Resources
              </Link>
            </motion.li>
          </ul>
        </Container>
      );
    }}
  </Location>
);

export default Nav;
