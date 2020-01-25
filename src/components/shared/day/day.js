import React from 'react';
import PropTypes from 'prop-types';
import {
  format,
  differenceInCalendarDays,
  startOfToday,
  isPast,
} from 'date-fns';

import * as Styled from './day.css';

/**
 * Algorithm:
 * 1. If the event is today...
 *    1. ...and the start time is past, show 'Now!'
 *    2. ...and the start time is future, show 'Today'
 * 2. If the event is tomorrow, show 'Tomorrow'
 * 3. If the event is this week, show 'In N days'
 * 4. If the event is in 2 weeks, show 'In 2 weeks'
 * 5. Show nothing
 */
const renderDaysAway = date => {
  const daysAway = differenceInCalendarDays(date, startOfToday());

  if (daysAway === 0) {
    return isPast(date) ? (
      <Styled.DaysAway featured>Now!</Styled.DaysAway>
    ) : (
      <Styled.DaysAway featured>Today</Styled.DaysAway>
    );
  } else if (daysAway === 1) {
    return <Styled.DaysAway featured>Tomorrow</Styled.DaysAway>;
  } else if (daysAway < 7) {
    return <Styled.DaysAway>In {daysAway} days</Styled.DaysAway>;
  } else if (daysAway < 14) {
    return <Styled.DaysAway>In 2 weeks</Styled.DaysAway>;
  }
};

/**
 * A static display component that provides padding and a slight shadow.
 */
const Day = ({ datetime }) => {
  const dayOfWeek = format(datetime, 'EEEE');
  const dateNumber = format(datetime, 'd');
  const month = format(datetime, 'MMM');

  return (
    <Styled.Container>
      <Styled.DayOfWeek>{dayOfWeek}</Styled.DayOfWeek>
      <Styled.DateNumber>{dateNumber}</Styled.DateNumber>
      <Styled.Month>{month}</Styled.Month>
      {renderDaysAway(datetime)}
    </Styled.Container>
  );
};

Day.propTypes = {
  datetime: PropTypes.instanceOf(Date),
};

export default Day;
