import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  button + button {
    margin-left: 1rem;
  }
`;
