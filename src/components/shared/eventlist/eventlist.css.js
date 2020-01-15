import styled from 'styled-components';

import Box from 'components/shared/box';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: ${p => p.theme.breakpoints.xl};
`;
