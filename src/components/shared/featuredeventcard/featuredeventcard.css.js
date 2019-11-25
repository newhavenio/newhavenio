import styled from 'styled-components';
import { grid, space, color, typography, layout } from 'styled-system';
import breakpoints from 'constants/theme/breakpoints';

import Text from 'components/shared/text';
import Box from 'components/shared/box';

export const Article = styled.article`
  @media screen and (min-width: ${breakpoints.md}) {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'date description'
      'image image'
      'rsvp rsvp';
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    height: 400px;
    grid-template-columns: auto 1fr 400px;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'date description image'
      'blank rsvp image';
  }

  background-color: white;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Description = styled.p`
  display: block;
  ${space};
  ${color};
  ${typography};
`;

const RSVPBox = styled(Box)(space, grid, layout);

RSVPBox.defaultProps = {
  p: 32,
  pb: 0,
  gridArea: 'rsvp',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: ['column', 'row'],
  justifyContent: 'space-between',
  bg: 'Grays.20',
};

export const IconList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const IconRow = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${space};
`;

const IconText = styled(Text)(color, space, typography);
const IconLink = styled(Text)(color, space, typography);

IconText.defaultProps = {
  color: 'Grays.100',
  fontSize: 3,
  ml: 3,
};

IconLink.defaultProps = {
  color: 'Grays.100',
  textDecoration: 'underline',
  fontSize: 3,
  ml: 3,
};

export const ImageWrapper = styled.div`
  padding-bottom: 56%;
  position: relative;
  display: block;
  grid-area: image;

  @media screen and (min-width: ${breakpoints.lg}) {
    height: auto;
  }
  ${grid};
`;

export const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${grid};
`;

export { RSVPBox, IconText, IconLink };
