import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './card.css';

/**
 * A static display component that provides padding and a slight shadow.
 */
const Card = ({ children }) => <Styled.Container>{children}</Styled.Container>;

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
