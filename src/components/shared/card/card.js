import React from 'react';
import P from 'prop-types';

import * as Styled from './card.css';

/**
 * A static display component that provides padding and a slight shadow.
 */
const Card = ({ className, children, ...props }) => (
  <Styled.Container className={className} {...props}>
    {children}
  </Styled.Container>
);

Card.propTypes = {
  className: P.string,
  children: P.node.isRequired,
};

export default Card;
