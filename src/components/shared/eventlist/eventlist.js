import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Box from 'components/shared/box';
import Text from 'components/shared/text';

import EventCard from 'components/shared/eventcard';

const EventList = () => {
  const data = useStaticQuery(graphql`
    query UpcomingEvents {
      allMeetupEvent {
        edges {
          node {
            id
            name
            plain_text_description
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

  const [nextEvent, ...otherEvents] = data.allMeetupEvent.edges;

  return (
    <Box display="flex" flexDirection="column">
      {nextEvent && (
        <Box>
          <EventCard event={nextEvent.node} featured={true} />
        </Box>
      )}

      {otherEvents.length > 0 && (
        <Box
          display="grid"
          gridTemplateColumns={{ _: '1 fr', lg: '1fr 1fr' }}
          gridColumnGap={32}
          gridRowGap={32}
          mt={32}
        >
          {otherEvents.map(edge => (
            <EventCard key={edge.id} event={edge.node} />
          ))}
        </Box>
      )}

      {data.allMeetupEvent.edges.length === 0 && (
        <Text as="p">Sorry, no upcoming events!</Text>
      )}
    </Box>
  );
};

export default EventList;
