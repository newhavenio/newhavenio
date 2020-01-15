import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

import { NavContainer as _NavContainer } from '../navcontainer.css';

export const ModalStyle = createGlobalStyle`
  #mobile-nav-modal[data-reach-dialog-content] {
    /* don't use 100vh because it breaks on mobile (by design) */
    height: 100%;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: none;
  }
`;

export const Container = styled(motion.div)`
  clip-path: polygon(0 0, 80% 0, 30% 100%, 0% 100%);
  width: calc(100% + 160px);
  background: ${p => p.theme.colors.Gradients.Orange};
  height: 100%;
  display: flex;
`;

export const NavContainer = styled(_NavContainer)`
  margin-top: auto;
  margin-bottom: 9rem;
  margin-left: 3rem;

  @media screen and (max-height: ${p => p.theme.breakpoints.sm}) {
    margin-bottom: 3rem;
  }

  @media screen and (max-height: ${p => p.theme.breakpoints.xs}) {
    margin-bottom: 1rem;
  }

  ul {
    flex-direction: column;
    justify-content: flex-end;

    li {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;

      @media screen and (max-height: ${p => p.theme.breakpoints.xs}) {
        font-size: 1.75rem;
      }
    }
  }
`;
