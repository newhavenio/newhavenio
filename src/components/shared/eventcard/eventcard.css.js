import styled from 'styled-components';
import { grid, space, color, typography, layout } from 'styled-system';
import breakpoints from 'constants/theme/breakpoints';

import Text from 'components/shared/text';
import Box from 'components/shared/box';

export const Article = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    'date title'
    'description description'
    'image image'
    'rsvp rsvp';

  @media screen and (min-width: ${breakpoints.lg}) {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr auto 1fr;
    grid-template-areas:
      'date title featured-image'
      'blank image featured-image'
      'blank rsvp featured-image';
  }

  background-color: white;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Description = styled.p`
  display: block;
  ${layout};
  ${space};
  ${color};
  ${typography};
`;

const RSVPBox = styled(Box)(color, space, grid, layout);

RSVPBox.defaultProps = {
  p: 32,
  gridArea: 'rsvp',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: ['column', 'row'],
  justifyContent: 'space-between',
};

export const IconRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;
  align-items: center;
  justify-content: center;
  ${space};

  > svg {
    justify-self: center;
  }
`;

const IconText = styled(Text)(color, space, typography);

IconText.defaultProps = {
  color: 'Grays.100',
  fontSize: 3,
};

export const FeaturedImageWrapper = styled.div`
  padding-bottom: 56%;
  position: relative;
  display: block;

  @media screen and (min-width: ${breakpoints.lg}) {
    height: auto;
  }
  ${grid};
  ${layout};
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: block;
  grid-area: image;

  padding-bottom: 56%;
  ${space};
  ${grid};
`;

export const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${grid};
`;

export { RSVPBox, IconText };
