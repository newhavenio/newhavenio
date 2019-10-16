import React from 'react';
import PropTypes from 'prop-types';

import { Span } from './text.css';

const Text = ({ children, as = 'span', ...props }) => {
  return (
    <Span as={as} {...props}>
      {children}
    </Span>
  );
};

Text.propTypes = {
  children: PropTypes.string.isRequired,
  as: PropTypes.string,
};

export default Text;
