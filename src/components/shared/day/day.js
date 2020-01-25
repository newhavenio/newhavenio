import React from 'react';
import PropTypes from 'prop-types';
import {
  parseISO,
  format,
  differenceInCalendarDays,
  startOfToday,
  isPast,
} from 'date-fns';

import * as Styled from './day.css';

const renderDaysAway = date => {
  const daysAway = differenceInCalendarDays(date, startOfToday());

  if (daysAway === 0) {
    return isPast(date) ? (
      <Styled.DaysAway featured>Happening now!</Styled.DaysAway>
    ) : (
      <Styled.DaysAway featured>Today</Styled.DaysAway>
    );
  } else if (daysAway === 1) {
    return <Styled.DaysAway>Tomorrow</Styled.DaysAway>;
  } else if (daysAway < 7) {
    return <Styled.DaysAway>In {daysAway} days</Styled.DaysAway>;
  }
};

/**
 * A static display component that provides padding and a slight shadow.
 */
const Day = ({ date }) => {
  const parsedDate = parseISO(date);
  const dayOfWeek = format(parsedDate, 'EEEE');
  const dateNumber = format(parsedDate, 'd');
  const month = format(parsedDate, 'MMM');

  return (
    <Styled.Container>
      <Styled.DayOfWeek>{dayOfWeek}</Styled.DayOfWeek>
      <Styled.DateNumber>{dateNumber}</Styled.DateNumber>
      <Styled.Month>{month}</Styled.Month>
      {renderDaysAway(parsedDate)}
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
