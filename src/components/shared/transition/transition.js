import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { timeout } from 'constants/transition';

class Transition extends PureComponent {
  render() {
    const { children, location } = this.props;

    return (
      <AnimatePresence>
        <motion.div
          enter={{ opacity: 1, delay: timeout, delayChildren: timeout }}
          exit={{ opacity: 0 }}
          key={location.pathname}
          style={{ width: '100%' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
}

Transition.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Transition;
