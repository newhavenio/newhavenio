import styled from 'styled-components';

import Box from 'components/shared/box';
import MEDIA from 'helpers/mediaTemplates';

export const ResourceListContainer = styled(Box)`
  padding: 20px 40px;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;

  ${MEDIA.TABLET`
    padding: 0;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    grid-gap: 30px;
  `};
`;
