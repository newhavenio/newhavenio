import React from 'react';
import P from 'prop-types';
import { graphql } from 'gatsby';

import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import Title from 'components/shared/title';
import Text from 'components/shared/text';
import EventList from 'components/shared/eventlist/eventlist';

const Events = ({ data: { meetupGroup } }) => (
  <Layout>
    <Head pageTitle="Events" />
    <Box padding="2rem 4rem">
      <Title as="h2" size="large" color="Oranges.100">
        Events
      </Title>
      <Text as="p" fontSize="3">
        NewHaven.io hosts tech-focused and social events in the New Haven area
        that are open for all to attend. We are currently {meetupGroup.members}{' '}
        members strong!{' '}
        <a href={meetupGroup.link} target="_blank" rel="noopener noreferrer">
          Join our Meetup group to be notified of future events
        </a>
        .
      </Text>
      <EventList />
    </Box>
  </Layout>
);

Events.propTypes = {
  data: P.shape({
    meetupGroup: P.shape({
      members: P.number.isRequired,
      link: P.string.isRequired,
      next_event: P.shape({
        time: P.string,
      }).isRequired,
    }).isRequired,
  }),
};

export const homeQuery = graphql`
  query EventsQuery {
    meetupGroup {
      members
      link
      next_event {
        time
      }
    }
  }
`;

export default Events;
