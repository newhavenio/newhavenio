import React from 'react';
import P from 'prop-types';
import { Container, StyledBurger } from './burger.css';

const Burger = ({ open, onClick }) => (
  <Container>
    <StyledBurger open={open} onClick={onClick}>
      <div />
      <div />
      <div />
    </StyledBurger>
  </Container>
);

Burger.propTypes = {
  open: P.bool.isRequired,
  onClick: P.func.isRequired,
};

export default Burger;
