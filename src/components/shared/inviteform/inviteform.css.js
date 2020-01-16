import styled from 'styled-components';

import Text from 'components/shared/text';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  grid-gap: 12px;
  grid-template-areas: 'form' 'recaptcha' 'member';

  @media screen and (min-width: ${p => p.theme.breakpoints.lgLower}) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-gap: 16px;
    grid-template-areas:
      'form recaptcha'
      'member member';
    align-items: center;
  }

  @media screen and (min-width: ${p => p.theme.breakpoints.xxlLower}) {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    grid-gap: 12px;
    grid-template-areas: 'form' 'recaptcha' 'member';
  }
`;

export const InputAndButton = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  flex-direction: column;
  box-shadow: ${p => p.theme.shadows.radial};
  border-radius: ${p => p.theme.radii.sm};

  > *:first-child {
    border-top-left-radius: ${p => p.theme.radii.sm};
    border-bottom-left-radius: ${p => p.theme.radii.sm};
  }

  > *:last-child {
    border-radius: 0;
    border-top-right-radius: ${p => p.theme.radii.sm};
    border-bottom-right-radius: ${p => p.theme.radii.sm};
  }

  @media screen and (min-width: ${p => p.theme.breakpoints.mdLower}) {
    flex-direction: row;
  }
`;

export const Input = styled.input`
  box-sizing: border-box;
  font-size: 18px;
  padding: 1rem;
  background-color: white;
  border: none;
  min-width: unset;
  @media screen and (min-width: ${p => p.theme.breakpoints.mdLower}) {
    min-width: 300px;
  }
  color: ${p => p.theme.colors.Grays[100]};
  ::placeholder {
    color: ${p => p.theme.colors.Grays[60]};
  }
`;

export const RecaptchaText = styled(Text)`
  grid-area: recaptcha;
  color: ${p => p.theme.colors.Grays[60]};
  opacity: ${p => (p.focused ? 1 : 0)};
  transition-duration: 0.2s;
`;
