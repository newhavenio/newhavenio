import styled from 'styled-components';

import Box from 'components/shared/box';

export const Container = styled(Box)`
  padding: 2rem 8rem;
  max-width: ${p => p.theme.breakpoints.xl};
  margin: 0 auto;

  @media screen and (max-width: ${p => p.theme.breakpoints.md}) {
    padding: 2rem 6rem;
  }

  @media screen and (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: 2rem 2rem;
  }
`;
