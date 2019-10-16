import React from 'react';
import P from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared//box';
import Title from 'components/shared/title';

const Events = ({ data: { meetupGroup } }) => (
  <Layout>
    <Head pageTitle="Events" />
    <Box>
      <Title as="h2" size="large">
        Events
      </Title>
      We are currently {meetupGroup.members} members strong!
      <a href={meetupGroup.link}>Join us!</a>
    </Box>
  </Layout>
);

Events.propTypes = {
  data: P.shape({
    meetupGroup: P.shape({
      members: P.number,
      link: P.string,
    }),
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
    allMeetupEvent {
      edges {
        node {
          name
          local_time
          link
          description
          duration
          time
          yes_rsvp_count
        }
      }
    }
  }
`;

export default Events;
