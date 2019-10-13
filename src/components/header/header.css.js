import styled, { css } from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem 4rem;
  transition: background-color 1s;

  ${p =>
    p.isRoot
      ? null
      : css`
          background-color: ${p => p.theme.colors.Oranges[60]};
          background-image: ${p => p.theme.colors.Gradients.Orange};
        `};

  a {
    color: ${p => p.theme.colors.Whites[100]};
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover {
      color: inherit;
    }
  }
`;
