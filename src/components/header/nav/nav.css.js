import styled from 'styled-components';
import { theme } from 'constants/theme';

import { NavContainer } from '../navcontainer.css';

export const Container = styled(NavContainer)`
  ul {
    li {
      font-size: 1.2rem;

      & + li {
        margin-left: 2rem;
      }
    }
  }
`;
