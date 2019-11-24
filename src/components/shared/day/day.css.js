import styled from 'styled-components';
import { space } from 'styled-system';

import * as fonts from 'constants/theme/fonts';
import { FONT_WEIGHTS, LETTER_SPACINGS } from 'constants/theme/typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.heading};
  ${space};
`;

export const DayOfWeek = styled.span`
  color: ${p => p.theme.colors.Grays[60]};
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: ${LETTER_SPACINGS.tight};
  margin-bottom: -2px;
`;

export const DateNumber = styled.h3`
  color: ${p => p.theme.colors.Oranges[100]};
  line-height: 0.8em;
`;

export const Month = styled.span`
  color: ${p => p.theme.colors.Grays[100]};
  text-transform: uppercase;
  font-size: 18px;
  font-weight: ${FONT_WEIGHTS.bold};
  letter-spacing: ${LETTER_SPACINGS.wide};
`;
