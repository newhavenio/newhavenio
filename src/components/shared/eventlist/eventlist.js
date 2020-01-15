import React from 'react';
import P from 'prop-types';
import isPast from 'date-fns/isPast';
import parse from 'date-fns/parse';
import { graphql, useStaticQuery } from 'gatsby';

import Box from 'components/shared/box';
import EventCard from 'components/shared/eventcard';
import Text from 'components/shared/text';

import * as Styled from './eventlist.css';

const EventList = ({ count }) => {
  // TODO: Possibly combine with events.js query if other components there need
  // Meetup data, to reduce concurrent fetches.
  const data = useStaticQuery(graphql`
    query UpcomingEvents {
      allMeetupEvent {
        edges {
          node {
            featured_photo {
              photo_link
            }
            id
            local_date
            local_time
            name
            plain_text_description
            short_link
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

  const excludePastEvents = event => {
    return !isPast(parse(event.node.local_date, 'yyyy-MM-dd', new Date()));
  };

  const [nextEvent, ...otherEvents] = data.allMeetupEvent.edges
    .filter(excludePastEvents)
    .slice(0, count);

  return (
    <Styled.Container>
      {nextEvent && (
        <Box>
          <EventCard event={nextEvent.node} type="featured" />
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
          {otherEvents.map((edge, idx) => (
            <EventCard
              key={edge.id}
              event={edge.node}
              type={idx >= 2 ? 'compact' : 'default'}
            />
          ))}
        </Box>
      )}

      {data.allMeetupEvent.edges.length === 0 && (
        <Text as="p">Sorry, no upcoming events!</Text>
      )}
    </Styled.Container>
  );
};

EventList.propTypes = {
  count: P.number,
};

export default EventList;
