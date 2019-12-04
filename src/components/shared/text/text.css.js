import styled, { css } from 'styled-components';
import { color, typography, space, layout } from 'styled-system';

export const Span = styled.span`
  ${color};
  ${space};
  ${layout};
  ${typography};
  ${p =>
    p.textTransform != null &&
    css`
      text-transform: ${p.textTransform};
    `}
`;
