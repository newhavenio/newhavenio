import styled from 'styled-components';
import { flexbox, grid, layout, position, space, color } from 'styled-system';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  ${flexbox};
  ${grid};
  ${layout};
  ${position};
  ${space};
  ${color};
`;
