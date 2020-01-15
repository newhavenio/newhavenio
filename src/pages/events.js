import React from 'react';

import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import PageContainer from 'components/shared/pagecontainer';
import Button from 'components/shared/button';
import Title from 'components/shared/title';
import Text from 'components/shared/text';
import EventList from 'components/shared/eventlist/eventlist';

const Events = () => (
  <Layout>
    <Head pageTitle="Events" />
    <PageContainer>
      <Title as="h2" size="large" color="Oranges.100">
        Events
      </Title>
      <Text as="p" fontSize="3">
        NewHaven.io hosts tech-focused and social events in the New Haven area
        that are open for all to attend.
      </Text>
      <Button
        as="a"
        href="https://www.meetup.com/newhavenio/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join our Meetup group
      </Button>
      <Box my={4}>
        <Title
          color="Oranges.100"
          size="small"
          weight="800"
          py="1rem"
          textTransform="uppercase"
        >
          Upcoming events
        </Title>
        <EventList />
      </Box>
    </PageContainer>
  </Layout>
);

export default Events;
