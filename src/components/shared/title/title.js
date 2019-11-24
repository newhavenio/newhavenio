import React from 'react';
import PropTypes from 'prop-types';
import { TitleText } from './title.css';

const Title = ({ children, as = 'span', ...props }) => {
  return (
    <TitleText as={as} {...props}>
      {children}
    </TitleText>
  );
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
  as: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small']),
};

export default Title;
