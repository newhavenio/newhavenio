import React from 'react';
import P from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Title from 'components/title';
import { graphql } from 'gatsby';

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
