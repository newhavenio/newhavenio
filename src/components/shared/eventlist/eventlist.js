import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Box from 'components/shared/box';
import FeaturedEventCard from 'components/shared/featuredeventcard';
import EventCard from 'components/shared/eventcard';

const EventList = () => {
  const data = useStaticQuery(graphql`
    query UpcomingEvents {
      allMeetupEvent {
        edges {
          node {
            id
            name
            simple_html_description
            local_date
            short_link
            time
            featured_photo {
              photo_link
            }
            venue {
              name
              address_1
              city
              state
              zip
            }
          }
        }
      }
    }
  `);

  const [nextEvent, secondEvent, ...otherEvents] = data.allMeetupEvent.edges;
  const events = otherEvents.map((edge, index) => (
    <EventCard key={index} event={edge.node} />
  ));

  return (
    <Box display="flex" flexDirection="column" width={1}>
      <Box width={1}>
        <FeaturedEventCard event={nextEvent.node} />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={{ _: '1 fr', lg: '1fr 1fr' }}
        gridColumnGap={32}
        gridRowGap={32}
        mt={32}
      >
        {events}
      </Box>
    </Box>
  );
};

export default EventList;
