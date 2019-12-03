import React from 'react';
import PropTypes from 'prop-types';
import {
  parseISO,
  format,
  differenceInCalendarDays,
  startOfToday,
} from 'date-fns';

import * as Styled from './day.css';

/**
 * A static display component that provides padding and a slight shadow.
 */
const Day = ({ date }) => {
  const parsedDate = parseISO(date);
  const dayOfWeek = format(parsedDate, 'EEEE');
  const dateNumber = format(parsedDate, 'd');
  const month = format(parsedDate, 'MMM');
  const daysAway = differenceInCalendarDays(parsedDate, startOfToday());

  return (
    <Styled.Container>
      <Styled.DayOfWeek>{dayOfWeek}</Styled.DayOfWeek>
      <Styled.DateNumber>{dateNumber}</Styled.DateNumber>
      <Styled.Month>{month}</Styled.Month>
      {daysAway < 7 && <Styled.DaysAway>In {daysAway} days</Styled.DaysAway>}
    </Styled.Container>
  );
};

Day.propTypes = {
  /**
   * ISO-8601 date string
   */
  date: PropTypes.string.isRequired,
};

export default Day;
