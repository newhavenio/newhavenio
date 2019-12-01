import React from 'react';
import P from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import Title from 'components/shared/title';

const Events = ({ data: { meetupGroup } }) => (
  <Layout>
    <Head pageTitle="Events" />
    <Box padding="2rem 4rem">
      <Title as="h2" size="large" color="Oranges.100">
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
          featured_photo {
            highres_link
            photo_link
            thumb_link
            type
          }
          duration
          link
          local_date
          local_time
          name
          plain_text_description
          short_link
          venue {
            address_1
            city
            name
            state
          }
          yes_rsvp_count
        }
      }
    }
  }
`;

export default Events;
