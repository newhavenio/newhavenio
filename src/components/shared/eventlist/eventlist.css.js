import styled from 'styled-components';

import Box from 'components/shared/box';
import Card from 'components/shared/card';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${p => p.theme.breakpoints.xl};
`;

export const List = styled(Card).attrs(() => ({ forwardedAs: 'ul' }))`
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
`;

export const Row = styled.li`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 12px;
  align-items: center;
  padding: 20px 24px;

  & + & {
    border-top: 1px solid ${p => p.theme.colors.Grays[20]};
  }

  @media screen and (min-width: ${p => p.theme.breakpoints.smLower}) {
    grid-template-columns: 72px minmax(0, 1fr) auto;
  }
`;

export const Details = styled.div`
  grid-column: 2;
`;

export const Name = styled.a`
  display: block;
  color: ${p => p.theme.colors.Blues[100]};
  font-size: 20px;
  font-weight: bold;
  line-height: 1.3;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const Time = styled.div`
  margin-top: 4px;
  color: ${p => p.theme.colors.Grays[100]};
  font-size: 16px;
`;

export const RSVP = styled.div`
  grid-column: 2;

  @media screen and (min-width: ${p => p.theme.breakpoints.smLower}) {
    grid-column: 3;
  }
`;
