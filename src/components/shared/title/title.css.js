import styled from 'styled-components';
import { color } from 'styled-system';

import MEDIA from 'helpers/mediaTemplates';
import Text from 'components/shared/text';

export const TitleText = styled(Text)`
  ${color};
  display: block;
  font-weight: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '700';
      default:
        return '400';
    }
  }};
  font-size: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '5rem';
      default:
        return '2rem';
    }
  }};
  line-height: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '1';
      default:
        return '1.2';
    }
  }};
  padding: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '1.5rem 0';
      default:
        return '0';
    }
  }};

  ${MEDIA.TABLET`
    font-size: ${({ size }) => () => {
      switch (size) {
        case 'large':
          return '2.6rem';
        default:
          return '2rem';
      }
    }};
  `};
`;
