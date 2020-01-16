import React, { memo, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import P from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const Transition = ({ children, location }) => {
  const { transition } = useContext(ThemeContext);

  return (
    <AnimatePresence>
      <motion.div
        enter={{
          opacity: 1,
          delay: transition.md,
          delayChildren: transition.md,
        }}
        exit={{ opacity: 0 }}
        key={location.pathname}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

Transition.propTypes = {
  children: P.node.isRequired,
  location: P.object.isRequired,
};

export default memo(Transition);
