import styled, { css } from 'styled-components';

import { theme } from 'constants/theme';

const makePalette = ({
  bgColor,
  bgColorActive,
  bgColorHover,
  bgColorDisabled,
  textColor,
}) => css`
  background-color: ${bgColor};
  color: ${textColor};
  :hover {
    background-color: ${bgColorHover};
  }
  :active {
    background-color: ${bgColorActive};
  }
  :disabled {
    background-color: ${bgColorDisabled};
  }
`;

const PALETTES = {
  primary: makePalette({
    bgColor: theme.colors.Oranges[60],
    bgColorHover: theme.colors.Oranges[30],
    bgColorActive: theme.colors.Oranges[60],
    bgColorDisabled: theme.colors.Grays[60],
    textColor: theme.colors.Whites[100],
  }),
  secondary: makePalette({
    bgColor: theme.colors.Blues[100],
    bgColorHover: theme.colors.Blues[60],
    bgColorActive: theme.colors.Blues[100],
    bgColorDisabled: theme.colors.Grays[60],
    textColor: theme.colors.Whites[100],
  }),
  tertiary: makePalette({
    bgColor: theme.colors.Whites[100],
    bgColorHover: theme.colors.Grays[8],
    bgColorActive: theme.colors.Grays[30],
    bgColorDisabled: theme.colors.Grays[30],
    textColor: theme.colors.Blues[100],
  }),
};

export const Container = styled.button`
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  padding: 1rem 2rem;

  :disabled {
    cursor: default;
  }

  ${p => PALETTES[p.palette]}
`;
