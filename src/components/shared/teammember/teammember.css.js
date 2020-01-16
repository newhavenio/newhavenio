import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';

export const Container = styled.div`
  max-width: 400px;
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  position: relative;
`;

export const Img = styled(GatsbyImage)`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

export const Overlay = styled.div`
  position: absolute;
  opacity: ${p => (p.active ? 0.5 : 0)};
  transition-duration: ${p => p.theme.transition.md};
  width: 100%;
  height: auto;
  border-radius: 5px;
`;
