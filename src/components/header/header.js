import { Link } from 'gatsby';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

import MobileNav from 'components/header/mobilenav';
import Nav from 'components/header/nav';
import Logo from 'components/shared/logo';
import { theme } from 'constants/theme';
import breakpoints from 'constants/theme/breakpoints';

import * as Styled from './header.css';

const Header = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.md})`,
  });

  return (
    <Styled.Headroom>
      <div className="headroom--inner">
        <Link to="/">
          <Logo
            squareColor={theme.colors.Whites[100]}
            letterColor="transparent"
          />
        </Link>
        {isMobile ? <MobileNav /> : <Nav />}
      </div>
    </Styled.Headroom>
  );
};

export default Header;
