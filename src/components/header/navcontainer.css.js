import styled from 'styled-components';

import { theme } from 'constants/theme';

export const NavContainer = styled.nav`
  a {
    text-decoration: none;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;

    li {
      font-family: ${theme.fonts.heading};
      font-weight: 700;

      a {
        color: ${theme.colors.Whites[100]};
        position: relative;
        z-index: 1;
        display: inline-flex;
        margin: 0 10px;
        padding-bottom: 8px;
      }
      a:hover {
        color: ${theme.colors.Whites[100]} !important;
      }
      a::before {
        content: '';
        width: 0;
        height: 100%;
        background-image: linear-gradient(
          to top,
          ${theme.colors.Whites[100]} 15%,
          rgba(0, 0, 0, 0) 15%
        );
        position: absolute;
        left: 0;
        bottom: 2px;
        z-index: -1;
        will-change: width;
        transform-origin: left bottom;
      }

      a:hover::before,
      a.active::before {
        width: 100%;
      }

      a::before {
        transition: width 0.1s ease-out;
      }

      a:hover::before {
        transition-duration: 0.25s;
      }
    }
  }
`;
