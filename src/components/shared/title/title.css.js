import styled, { css } from 'styled-components';
import { color, layout, space } from 'styled-system';

import MEDIA from 'helpers/mediaTemplates';
import Text from 'components/shared/text';

export const TitleText = styled(Text)`
  font-family: ${p => p.theme.fonts.heading};
  display: block;
  font-weight: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '700';
      case 'small':
        return '700';
      default:
        return '400';
    }
  }};
  font-size: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '5rem';
      case 'small':
        return '1.5rem';
      default:
        return '2rem';
    }
  }};
  line-height: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '1';
      case 'small':
        return '1.2rem';
      default:
        return '1.2';
    }
  }};
  padding: ${({ size }) => () => {
    switch (size) {
      case 'large':
        return '1.5rem 0';
      case 'small':
        return '1rem 0';
      default:
        return '0';
    }
  }};
  ${layout};
  ${color};
  ${space};
  ${MEDIA.TABLET`
    font-size: ${({ size }) => () => {
      switch (size) {
        case 'large':
          return '2.6rem';
        case 'small':
          return '1.25rem';
        default:
          return '2rem';
      }
    }};
  `};
  ${p =>
    p.textTransform != null &&
    css`
      text-transform: ${p.textTransform};
    `}
`;
