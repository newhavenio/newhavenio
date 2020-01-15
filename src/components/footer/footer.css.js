import styled from 'styled-components';
import { theme } from 'constants/theme';
import { space } from 'styled-system';

export const Container = styled.section`
  ${space};
  width: 100%;
  background: ${theme.colors.Whites[100]};
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

export const Grid = styled.div`
  max-width: 900px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-content: center;
  justify-content: center;
  grid-gap: 2rem;
  @media screen and (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const LogoContainer = styled.div`
  max-width: 74px;
  max-height: 74px;
`;

export const FooterSection = styled.div`
  .heading {
    font-size: 1.2rem;
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.Grays[100]};
    font-weight: 700;
    margin: 0;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 1rem;
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.Grays[100]};
    text-decoration: none;
    line-height: 1.4;
  }
  ul {
    li {
      a {
        font-size: 1rem;
        font-family: ${theme.fonts.heading};
        color: ${theme.colors.Grays[100]};
        text-decoration: none;
      }
    }
  }
`;

export const CopyrightSection = styled.div`
  flex: 1 100%;
  display: flex;
  justify-content: center;
  display: block;
  margin-top: 3rem;
  text-align: center;
  font-size: 1rem;
  color: ${theme.colors.Grays[60]};
`;

export const SocialLink = styled.a`
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.Grays[100]};
  text-decoration: none;
  svg {
    margin-right: 0.5rem;
    width: 20px;
  }
`;
