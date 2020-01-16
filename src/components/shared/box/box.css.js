import styled from 'styled-components';
import {
  color,
  flexbox,
  grid,
  layout,
  position,
  border,
  space,
} from 'styled-system';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  ${color};
  ${flexbox};
  ${grid};
  ${layout};
  ${position};
  ${border};
  ${space};
`;
