import reactHeadroom from 'react-headroom';
import styled from 'styled-components';

import MEDIA from 'helpers/mediaTemplates';

export const Headroom = styled(reactHeadroom)`
  background: ${p => p.theme.colors.Gradients.Orange};
  height: 140px;

  svg {
    width: 75px;
    height: 75px;
    transition: all 0.3s ease;
  }
  .headroom--pinned {
    background: ${p => p.theme.colors.Gradients.Orange};
    svg {
      width: 25px;
      height: 25px;
    }
  }

  .headroom--inner {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1rem 4rem;
    transition: background-color 1s;

    ${MEDIA.TABLET`
      align-items: center;
      padding-right: 2rem;
    `};

    a {
      color: ${p => p.theme.colors.Whites[100]};
      transition: color 0.2s ease;
      text-decoration: none;

      &:hover {
        color: inherit;
      }
    }
  }
`;
