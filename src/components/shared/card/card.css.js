import styled, { css } from 'styled-components';

import Box from 'components/shared/box';

export const Container = styled(Box).attrs(p => {
  if (p != null && p.onClick != null) {
    return {
      role: 'link',
    };
  } else {
    return {};
  }
})`
  padding: 1.5rem;
  box-shadow: ${p => p.theme.shadows.md};
  border-radius: ${p => p.theme.radii.md};
  transition-duration: ${p => p.theme.transition.md}ms;

  ${p =>
    p.onClick != null &&
    css`
      cursor: pointer;
      :hover {
        box-shadow: ${p.theme.shadows.lg};
      }
    `}
`;
