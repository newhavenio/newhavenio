import styled from 'styled-components';
import { space } from 'styled-system';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${p => p.theme.fonts.heading};
  ${space};
`;

export const DayOfWeek = styled.span`
  color: ${p => p.theme.colors.Grays[60]};
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: ${p => p.theme.typography.LETTER_SPACINGS.tight};
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
  font-weight: ${p => p.theme.typography.FONT_WEIGHTS.bold};
  letter-spacing: ${p => p.theme.typography.LETTER_SPACINGS.wide};
`;

export const DaysAway = styled.div`
  color: ${p => p.theme.colors.Oranges[100]};
  text-transform: uppercase;
  font-size: 14px;
  font-weight: ${p => p.theme.typography.FONT_WEIGHTS.bold};
  letter-spacing: ${p => p.theme.typography.LETTER_SPACINGS.tight};
  margin-top: 4px;
  padding: 2px 4px;
  border-radius: ${p => p.theme.radii.sm};
  ${p =>
    p.featured &&
    `
      color: ${p.theme.colors.Whites[100]};
      background: ${p.theme.colors.Oranges[100]};
    `};
`;
