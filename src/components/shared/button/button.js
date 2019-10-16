import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './button.css';

/**
 * A static display component that provides padding and a slight shadow.
 */
const Button = ({ children, disabled, palette }) => (
  <Styled.Container disabled={disabled} palette={palette}>
    {children}
  </Styled.Container>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.boolean,
  palette: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
};

Button.Wrapper = Styled.ButtonWrapper;

export default Button;
