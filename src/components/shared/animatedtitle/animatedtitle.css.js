import styled, { css } from 'styled-components';

import _Title from 'components/shared/title';

export const Title = styled(_Title).attrs(() => ({
  as: 'h2',
  size: 'large',
}))`
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
