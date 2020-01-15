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
`;
