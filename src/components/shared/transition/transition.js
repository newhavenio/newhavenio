import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { timeout } from 'constants/transition';

class Transition extends PureComponent {
  render() {
    const { children, location } = this.props;

    // To enable page transitions on mount / initial load,
    // use the prop `animateOnMount={true}` on `PoseGroup`.
    return (
      <AnimatePresence>
        <motion.div
          enter={{ opacity: 1, delay: timeout, delayChildren: timeout }}
          exit={{ opacity: 0 }}
          key={location.pathname}
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
