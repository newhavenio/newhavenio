import React from 'react';
import { graphql } from 'gatsby';
import P from 'prop-types';
import { motion } from 'framer-motion';

import Layout from 'components/layout';
import Box from 'components/shared/box';
import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Title from 'components/shared/title';
import InviteForm from 'components/shared/inviteform';
import EventList from 'components/shared/eventlist';

import { HeroSection, EventSection } from 'components/homepage';

const entryAnimation = idx => ({
  initial: { opacity: 0, y: -25 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'tween', delay: 0.2 * (idx + 1) },
});

const Index = ({
  data: {
    pagesYaml: {
      index: { home, slack, events },
    },
  },
}) => {
  const handleSlackButtonClick = () => {
    // Using query selectors because forwarding refs is a pain
    // See inviteform.js
    const el = document.getElementById('slack-invite');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => el.focus(), 500);
  };

  return (
    <Layout>
      <HeroSection
        display="flex"
        flexDirection="column"
        position="relative"
        padding="0 4rem 6rem"
        alignItems="flex-start"
      >
        <Title
          as={motion.h2}
          size="large"
          color="Whites.100"
          maxWidth="860px"
          {...entryAnimation(0)}
        >
          {home.title}
        </Title>
        <Box maxWidth="640px">
          <Text as={motion.p} color="Whites.100" {...entryAnimation(1)}>
            {home.description}
          </Text>
        </Box>
        <Button.Wrapper>
          <Button
            palette="secondary"
            onClick={handleSlackButtonClick}
            {...entryAnimation(2)}
          >
            Join the Slack
          </Button>
          <Button
            as={motion.a}
            href="https://www.meetup.com/newhavenio/"
            target="_blank"
            rel="noopener noreferrer"
            palette="tertiary"
            {...entryAnimation(3)}
          >
            Join the Meetup
          </Button>
        </Button.Wrapper>
      </HeroSection>
      <Box padding="6rem 4rem">
        <Title
          color="Oranges.100"
          size="small"
          weight="800"
          py="1rem"
          textTransform="uppercase"
        >
          {slack.subtitle}
        </Title>
        <Title as="h2" size="large" weight="800" color="Grays.100" pt="0">
          {slack.title}
        </Title>
        <Text as="p" mb={4} display="block" color="Grays.100">
          {slack.description}
        </Text>
        <InviteForm />
      </Box>
      <EventSection
        minHeight="300px"
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        padding={['8rem 2rem 2rem', '8rem 4rem']}
        style={{
          overflow: 'hidden',
        }}
      >
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
        slack {
          description
          subtitle
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
