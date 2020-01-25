import React from 'react';
import P from 'prop-types';
import { isPast, parseISO, addMilliseconds } from 'date-fns';
import { set } from 'lodash/fp';
import { graphql, useStaticQuery } from 'gatsby';

import Box from 'components/shared/box';
import EventCard from 'components/shared/eventcard';
import Text from 'components/shared/text';
import { GUESSTIMATED_EVENT_LENGTH_MS } from 'constants/events';

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
            duration
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

  const [nextEvent, ...otherEvents] = data.allMeetupEvent.edges
    /**
     * Adds the parsed date and time to the event object to reduce the need to
     * constantly parse ISO strings.
     */
    .map(event => {
      const {
        node: { local_date, local_time },
      } = event;
      const datetime = parseISO([local_date, local_time].join('T'));
      return set(['node', 'datetime'], datetime, event);
    })
    /**
     * We use `addMilliseconds` here because we don't want to filter out events
     * that are currently happening. If there is no provided duration, We
     * assume that events with a start time within 2 hours of now are ongoing,
     * and filter out events that occurred after that.
     */
    .filter(
      event =>
        !isPast(
          addMilliseconds(
            event.node.datetime,
            event.node.duration || GUESSTIMATED_EVENT_LENGTH_MS
          )
        )
    )
    .slice(0, count);

  return (
    <Styled.Container>
      {nextEvent && (
        <Box>
          <EventCard
            event={nextEvent.node}
            type="featured"
            isNow={isPast(nextEvent.node.datetime)}
          />
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
