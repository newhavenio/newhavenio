import styled, { css } from 'styled-components';

import { TitleText } from 'components/shared/title/title.css';

export const Title = styled(TitleText)`
  color: ${p => p.theme.colors.Whites[100]};
  max-width: 860px;
  ${p =>
    !p.active &&
    css`
      .typed-cursor {
        opacity: 0;
      }
    `};

  > span:last-child {
    display: block;
  }

  /*
   * On mobile, we want the first line to break, to avoid jank from the
   * typewriter effect.
   */
  @media screen and (max-width: ${p => p.theme.breakpoints.sm}) {
    > span:first-child {
      display: block;
    }
  }
`;
