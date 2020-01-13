import styled, { css } from 'styled-components';
import { color, typography, space, layout } from 'styled-system';
import { motion } from 'framer-motion';

export const Span = styled(motion.span)`
  ${color};
  ${space};
  ${layout};
  ${typography};
  ${p =>
    p.textTransform != null &&
    css`
      text-transform: ${p.textTransform};
    `}
`;
