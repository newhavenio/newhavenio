import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

import { NavContainer as _NavContainer } from '../navcontainer.css';

export const ModalStyle = createGlobalStyle`
  #mobile-nav-modal[data-reach-dialog-content] {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: none;
  }
`;

export const Container = styled(motion.div)`
  clip-path: polygon(0 0, 80% 0, 30% 100%, 0% 100%);
  width: calc(100% + 160px);
  background: ${p => p.theme.colors.Gradients.Orange};
  height: 100%;
  padding: 3rem;
  display: flex;
`;

export const NavContainer = styled(_NavContainer)`
  margin-top: auto;
  margin-bottom: 6rem;

  ul {
    flex-direction: column;
    justify-content: flex-end;

    li {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
  }
`;
