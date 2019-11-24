import styled from 'styled-components';
import { grid, space, color, typography, layout } from 'styled-system';
import Text from 'components/shared/text';
import Box from 'components/shared/box';

// style-system default breakpoints
// const breakpoints = ['40em', '52em', '64em']
export const Article = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'date title'
    'image image'
    'rsvp rsvp';

  @media screen and (min-width: 64em) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'date title'
      'blank image'
      'blank rsvp';
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
  gridArea: 'rsvp',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: ['column', 'row'],
  justifyContent: 'space-between',
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

export { RSVPBox, IconText, IconLink };
