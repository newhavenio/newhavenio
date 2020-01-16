import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import P from 'prop-types';
import { Link } from 'gatsby';
import { useMediaQuery } from 'react-responsive';
import { Location } from '@reach/router';

import MobileNav from 'components/header/mobilenav';
import Nav from 'components/header/nav';
import Logo from 'components/shared/logo';

import * as Styled from './header.css';

const Header = ({ pathname }) => {
  const { breakpoints, colors } = useContext(ThemeContext);
  const [prevPath, setPrevPath] = useState(pathname);
  const headroomRef = useRef(null);
  // There is a bug with headroom where the header doesn't resize when clicking
  // on the pinned header. This forces a resize to set the header to the proper
  // height after routing.
  useEffect(() => {
    if (pathname !== prevPath && !!headroomRef.current) {
      window.headroom = headroomRef.current;
      setTimeout(headroomRef.current.setHeightOffset, 300);
      setPrevPath(pathname);
    }
  }, [pathname]);

  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.md})`,
  });

  return (
    <Location>
      {({ location: { pathname } }) => (
        <Styled.Headroom path={pathname} ref={headroomRef}>
          <div className="headroom--inner">
            <Link to="/">
              <Logo
                squareColor={colors.Whites[100]}
                letterColor="transparent"
              />
            </Link>
            {isMobile ? <MobileNav /> : <Nav />}
          </div>
        </Styled.Headroom>
      )}
    </Location>
  );
};

Header.propTypes = {
  pathname: P.object.isRequired,
};

const HeaderWithLocation = () => (
  <Location>
    {({ location: { pathname } }) => <Header pathname={pathname} />}
  </Location>
);
export default HeaderWithLocation;
