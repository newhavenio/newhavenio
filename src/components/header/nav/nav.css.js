import styled from 'styled-components';
import { fonts } from '../../../constants/theme/fonts';

export const Container = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;

    li {
      font-family: ${fonts.heading}
      font-weight: 700;
      font-size: 1.1rem;

      & + li {
        margin-left: 2rem;
      }
    }
  }
`;
