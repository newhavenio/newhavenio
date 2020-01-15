import styled from 'styled-components';

import Box from 'components/shared/box';

export const HeroSection = styled(Box).attrs(() => ({
  forwardedAs: 'section',
}))`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 0 4rem 8rem;
  background: ${p => p.theme.colors.Gradients.Orange};
  clip-path: polygon(0 89%, 0 0, 100% 0, 100% 80%, 40% 100%);

  @media screen and (min-width: ${p => p.theme.breakpoints.lgLower}) {
    clip-path: polygon(0 89%, 0 0, 100% 0, 100% 65%, 40% 100%);
  }

  @media screen and (min-width: ${p => p.theme.breakpoints.xlLower}) {
    clip-path: polygon(0 89%, 0 0, 100% 0, 100% 40%, 40% 100%);
  }

  @media screen and (min-width: ${p => p.theme.breakpoints.xxlLower}) {
    clip-path: polygon(0 89%, 0 0, 100% 0, 100% 40%, 40% 100%);
    align-items: center;
    padding-right: 20%;
  }
`;

export const SlackSection = styled(Box).attrs(() => ({
  forwardedAs: 'section',
}))`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6rem 4rem;

  @media screen and (min-width: ${p => p.theme.breakpoints.xxlLower}) {
    align-items: center;
    padding-right: 10%;
  }
`;

export const EventSection = styled(Box).attrs(() => ({
  forwardedAs: 'section',
}))`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  padding: 8rem 4rem;
  overflow: hidden;
  background: ${p => p.theme.colors.Gradients.Gray};
  clip-path: polygon(0 200px, 40% 0, 100% 100px, 100% 100%, 0 100%);

  @media screen and (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: 8rem 2rem 2rem;
  }

  @media screen and (min-width: ${p => p.theme.breakpoints.xxlLower}) {
    align-items: center;
    padding-left: 10%;
  }
`;
