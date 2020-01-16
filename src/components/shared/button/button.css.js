import styled, { css } from 'styled-components';
import { space } from 'styled-system';
import { motion } from 'framer-motion';

import { theme } from 'constants/theme';
import Box from 'components/shared/box';

const makePalette = ({
  bgColor,
  bgColorActive,
  bgColorHover,
  bgColorDisabled,
  textColor,
}) => css`
  background-color: ${bgColor};
  color: ${textColor};
  :hover,
  :focus {
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

export const Container = styled(motion.button)`
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  font-family: ${theme.fonts.heading};
  line-height: normal;
  padding: 1rem 2rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: ${p => p.theme.shadows.radial};
  border-radius: ${p => p.theme.radii.sm};

  :focus {
    outline: none;
  }

  :disabled {
    cursor: default;
  }
  :active {
    box-shadow: ${p => p.theme.shadows.inset}, ${p => p.theme.shadows.radial};
  }
  transition-duration: ${p => p.theme.transition.md}ms;
  transition: box-shadow ${(p => p, theme.transition.sm)}ms,
    background-color ${p => p.theme.transition.md}ms;

  ${p => PALETTES[p.palette]}
  ${space};
`;

export const PrefixIconContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 8px;

  > svg {
    height: 20px;
    width: 20px;
  }
`;

export const ButtonWrapper = styled.div`
  display: grid;
  grid-gap: 0.5rem 1rem;
  grid-auto-flow: column;

  @media screen and (max-width: ${p => p.theme.breakpoints.sm}) {
    grid-auto-flow: row;
  }
`;
