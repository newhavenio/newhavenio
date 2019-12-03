import Layout from 'components/layout';
import Box from 'components/shared/box';
import Button from 'components/shared/button';
import Text from 'components/shared/text';
import Title from 'components/shared/title';
import InviteForm from 'components/shared/inviteform';
import EventList from 'components/shared/eventlist';

import React from 'react';

const Index = () => (
  <Layout>
    <Box
      display="flex"
      flexDirection="column"
      minHeight="480px"
      position="relative"
      padding="0 4rem"
      alignItems="flex-start"
      bg="Oranges.100"
    >
      <Title as="h2" size="large" color="Whites.100" maxWidth="860px">
        Where tech happens in New Haven.
      </Title>
      <Box maxWidth="640px">
        <Text as="p" color="Whites.100">
          NewHaven.io is a tech community lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </Text>
      </Box>
      <Button.Wrapper>
        <Button palette="secondary">Join the Slack</Button>
        <Button
          as="a"
          href="https://www.meetup.com/newhavenio/"
          target="_blank"
          rel="noopener noreferrer"
          palette="tertiary"
        >
          Join the Meetup
        </Button>
      </Button.Wrapper>
    </Box>
    <Box padding="6rem 4rem">
      <Title color="Oranges.100" size="small" weight="800" py="1rem">
        ONLINE CHAT
      </Title>
      <Title as="h2" size="large" weight="800" color="Grays.100" pt="0">
        Join the Slack Community
      </Title>
      <Text mb={4} display="block" color="Grays.100">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </Text>
      <InviteForm />
    </Box>
    <Box
      minHeight="300px"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      padding={['2rem', '6rem 4rem']}
      style={{
        overflow: 'hidden',
      }}
      bg="Grays.8"
    >
      <Title color="Oranges.100" size="small" weight="800" py="1rem">
        UPCOMING EVENTS
      </Title>
      <Title as="h2" size="large" color="Grays.100" pt="0">
        Meet People IRL
      </Title>
      <EventList count={7} />
    </Box>
  </Layout>
);

export default Index;
