import React from 'react';
import P from 'prop-types';
import * as Styled from './button.css';

/**
 * A static display component that provides padding and a slight shadow.
 */
const Button = ({
  children,
  disabled,
  palette,
  onClick,
  type,
  prefixIcon,
  ...props
}) => (
  <Styled.Container
    disabled={disabled}
    palette={palette}
    onClick={onClick}
    type={type}
    {...props}
  >
    {!!prefixIcon && (
      <Styled.PrefixIconContainer>{prefixIcon}</Styled.PrefixIconContainer>
    )}
    {children}
  </Styled.Container>
);

Button.propTypes = {
  children: P.node.isRequired,
  disabled: P.bool,
  onClick: P.func.isRequired,
  palette: P.oneOf(['primary', 'secondary', 'tertiary']),
  type: P.oneOf(['button', 'submit']),
  prefixIcon: P.node,
};

Button.defaultProps = {
  palette: 'primary',
  type: 'button',
};

Button.Wrapper = Styled.ButtonWrapper;

export default Button;
