import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Link from 'gatsby-link';

import Logo from 'components/shared/logo';
import SlackIcon from 'images/slack-icon.svg';
import MeetupIcon from 'images/meetup-icon.svg';
import TwitterIcon from 'images/twitter-icon.svg';
import GithubIcon from 'images/github-icon.svg';

import * as Styled from './footer.css';
/**
 * Component present at the bottom of all screens via the Layout component
 */
const Footer = () => {
  const year = new Date().getFullYear();
  const { colors } = useContext(ThemeContext);

  return (
    <Styled.Container>
      <Styled.Grid>
        <Styled.LogoContainer>
          <Link to="/">
            <Logo
              squareColor={colors.Grays[60]}
              hoverSquareColor={colors.Oranges[100]}
            />
          </Link>
        </Styled.LogoContainer>

        <Styled.FooterSection>
          <p className="heading">Directory</p>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/resources">Rules & Resources</Link>
            </li>
          </ul>
        </Styled.FooterSection>

        <Styled.FooterSection>
          <p className="heading">Follow Us</p>
          <ul>
            <li>
              <Styled.SocialLink
                href="https://newhavenio.slack.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SlackIcon />
                Slack
              </Styled.SocialLink>
            </li>
            <li>
              <Styled.SocialLink
                href="https://www.meetup.com/newhavenio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MeetupIcon />
                Meetup
              </Styled.SocialLink>
            </li>
            <li>
              <Styled.SocialLink
                href="https://www.twitter.com/newhavenio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
                Twitter
              </Styled.SocialLink>
            </li>
            <li>
              <Styled.SocialLink
                href="https://www.github.com/newhavenio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                Github
              </Styled.SocialLink>
            </li>
          </ul>
        </Styled.FooterSection>

        <Styled.FooterSection>
          <p className="heading">About Us</p>
          <p>We are a 501(c)(6) non-profit self-managed by volunteers.</p>
        </Styled.FooterSection>
      </Styled.Grid>

      <Styled.CopyrightSection>© {year} NewHaven.io</Styled.CopyrightSection>
    </Styled.Container>
  );
};

export default Footer;
