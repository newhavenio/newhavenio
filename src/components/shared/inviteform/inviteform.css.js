import styled from 'styled-components';

import Text from 'components/shared/text';
import MEDIA from 'helpers/mediaTemplates';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-gap: 16px;
  grid-template-areas:
    'form recaptcha'
    'member member';
  align-items: center;

  ${MEDIA.TABLET`
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    grid-gap: 12px;
    grid-template-areas: 'form'  'recaptcha' 'member';
  `};
`;

export const InputAndButton = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;

  ${MEDIA.PHONE`
    flex-direction: column;
  `};
`;

export const Input = styled.input`
  box-sizing: border-box;
  font-size: 18px;
  padding: 1rem;
  background-color: white;
  border: 1px solid ${p => p.theme.colors.Grays[30]};
  min-width: 300px;
  ${MEDIA.PHONE`
    min-width: unset;
  `};
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
