import React from 'react';
import { graphql } from 'gatsby';
import P from 'prop-types';
import { motion } from 'framer-motion';

import Layout from 'components/layout';
import Box from 'components/shared/box';
import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Title from 'components/shared/title';
import AnimatedTitle from 'components/shared/animatedtitle';
import EventList from 'components/shared/eventlist';
import DiscordIcon from 'images/discord-icon.svg';
import MeetupIcon from 'images/meetup-icon.svg';

import { HeroSection, EventSection } from 'components/homepage';

const entryAnimation = idx => ({
  initial: { opacity: 0, y: -25 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'tween', delay: 0.2 * (idx + 1) },
});

const Index = ({
  data: {
    pagesYaml: {
      index: { home, events },
    },
  },
}) => {
  return (
    <Layout>
      <HeroSection>
        <AnimatedTitle />
        <Box maxWidth="640px">
          <Text as="p" color="Whites.100">
            {home.description}
          </Text>
        </Box>
        <Button.Wrapper>
          <Button
            as={motion.a}
            href="https://discord.gg/XMb6QKnj"
            palette="tertiary"
            target="_blank"
            rel="noopener noreferrer"
            prefixIcon={<DiscordIcon />}
            {...entryAnimation(0)}
          >
            Join the Discord
          </Button>
          <Button
            as={motion.a}
            href="https://www.meetup.com/newhavenio/"
            target="_blank"
            rel="noopener noreferrer"
            palette="tertiary"
            prefixIcon={<MeetupIcon />}
            {...entryAnimation(1)}
          >
            Join the Meetup
          </Button>
        </Button.Wrapper>
      </HeroSection>
      <EventSection>
        <Title
          color="Oranges.100"
          size="small"
          weight="800"
          py="1rem"
          textTransform="uppercase"
        >
          {events.subtitle}
        </Title>
        <Title as="h2" size="large" color="Grays.100" pt="0">
          {events.title}
        </Title>
        <EventList count={5} />
      </EventSection>
    </Layout>
  );
};

Index.propTypes = {
  data: P.shape({
    pagesYaml: P.any.isRequired,
  }),
};

export const query = graphql`
  query IndexQuery {
    pagesYaml {
      index {
        home {
          description
          title
        }
        events {
          subtitle
          title
        }
      }
    }
  }
`;

export default Index;
