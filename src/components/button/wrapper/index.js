import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './buttonWrapper.css';

const ButtonWrapper = ({ children }) => (
  <Styled.Container>{children}</Styled.Container>
);

ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonWrapper;
