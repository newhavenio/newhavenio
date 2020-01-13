import React from 'react';
import P from 'prop-types';
import { Link } from 'gatsby';
import { AnimatePresence } from 'framer-motion';

import Burger from 'components/shared/burger';
import Modal from 'components/shared/modal';
import { Consumer } from 'store/createContext';

import { Container, NavContainer, ModalStyle } from './mobilenav.css';

const Menu = ({ onClick }) => (
  <Container
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: 'tween' }}
    enter={{ opacity: 1, delay: 100, delayChildren: 100 }}
    exit={{ opacity: 0, x: -200 }}
  >
    <NavContainer>
      <ul>
        <li>
          <Link activeClassName="active" to="/" onClick={onClick}>
            Home
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/about/" onClick={onClick}>
            About
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/events/" onClick={onClick}>
            Events
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/resources/" onClick={onClick}>
            Rules
          </Link>
        </li>
      </ul>
    </NavContainer>
  </Container>
);

Menu.propTypes = {
  onClick: P.func.isRequired,
};

const MobileNav = () => (
  <Consumer>
    {({ outerOpen, innerOpen, showModal, hideModal }) => (
      <>
        <Burger open={innerOpen} onClick={innerOpen ? hideModal : showModal} />
        <ModalStyle />
        <Modal
          id="mobile-nav-modal"
          open={outerOpen}
          showModal={showModal}
          hideModal={hideModal}
        >
          <AnimatePresence>
            {innerOpen && <Menu onClick={hideModal} />}
          </AnimatePresence>
        </Modal>
      </>
    )}
  </Consumer>
);
export default MobileNav;
