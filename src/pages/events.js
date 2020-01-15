import React from 'react';
import P from 'prop-types';
import { graphql } from 'gatsby';

import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import PageContainer from 'components/shared/pagecontainer';
import Button from 'components/shared/button';
import Title from 'components/shared/title';
import Text from 'components/shared/text';
import EventList from 'components/shared/eventlist/eventlist';

const Events = ({
  data: {
    pagesYaml: {
      events: { home, eventList },
    },
  },
}) => (
  <Layout>
    <Head pageTitle={home.title} />
    <PageContainer>
      <Title as="h2" size="large" color="Oranges.100">
        {home.title}
      </Title>
      <Text as="p" fontSize="3">
        {home.description}
      </Text>
      <Button
        as="a"
        href="https://www.meetup.com/newhavenio/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {home.join}
      </Button>
      <Box my={4}>
        <Title
          color="Oranges.100"
          size="small"
          weight="800"
          py="1rem"
          textTransform="uppercase"
        >
          {eventList.title}
        </Title>
        <EventList />
      </Box>
    </PageContainer>
  </Layout>
);

Events.propTypes = {
  data: P.shape({
    pagesYaml: P.any.isRequired,
  }),
};

export const eventsQuery = graphql`
  query EventsQuery {
    pagesYaml {
      events {
        home {
          title
          description
          join
        }
        eventList {
          title
        }
      }
    }
  }
`;

export default Events;
