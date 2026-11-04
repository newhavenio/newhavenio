import React from 'react';
import P from 'prop-types';
import { format, isPast, parseISO, addMilliseconds } from 'date-fns';
import { set } from 'lodash/fp';
import { graphql, useStaticQuery } from 'gatsby';

import Button from 'components/shared/button';
import Day from 'components/shared/day';
import Text from 'components/shared/text';
import { GUESSTIMATED_EVENT_LENGTH_MS } from 'constants/events';

import * as Styled from './eventlist.css';

const EventList = ({ count }) => {
  const data = useStaticQuery(graphql`
    query UpcomingEvents {
      allMeetupJson(sort: { fields: [local_date, local_time], order: ASC }) {
        edges {
          node {
            id
            local_date
            local_time
            duration
            name
            short_link
          }
        }
      }
    }
  `);

  const events = data.allMeetupJson.edges
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
      {events.length > 0 ? (
        <Styled.List>
          {events.map(({ node }) => (
            <Styled.Row key={node.id}>
              <Day datetime={node.datetime} />
              <Styled.Details>
                <Styled.Name
                  href={node.short_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {node.name}
                </Styled.Name>
                <Styled.Time>{format(node.datetime, 'h:mm a')}</Styled.Time>
              </Styled.Details>
              <Styled.RSVP>
                <Button
                  as="a"
                  p=".5rem 1.25rem"
                  href={node.short_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSVP
                </Button>
              </Styled.RSVP>
            </Styled.Row>
          ))}
        </Styled.List>
      ) : (
        <Text as="p">Sorry, no upcoming events!</Text>
      )}
    </Styled.Container>
  );
};

EventList.propTypes = {
  count: P.number,
};

export default EventList;
