import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import EventCard from './eventcard';

const EVENT_FIXTURE = {
  featured_photo: {
    highres_link:
      'https://secure.meetupstatic.com/photos/event/3/9/5/highres_486060917.jpeg',
    photo_link:
      'https://secure.meetupstatic.com/photos/event/3/9/5/600_486060917.jpeg',
    thumb_link:
      'https://secure.meetupstatic.com/photos/event/3/9/5/thumb_486060917.jpeg',
    type: 'event',
  },
  duration: 32400000,
  link: 'https://www.meetup.com/newhavenio/events/266620586/',
  local_date: '2019-12-06',
  local_time: '08:00',
  name: 'First Friday - Free Co-Working!',
  plain_text_description:
    "Drive has free co-working on the first Friday of every month, and since we know a lot of folks have the ability to work remote, we thought it would be fun to spend some time together!\n\nWord on the street is that they're opening up more office space soon, so this is a great opportunity to feel the place out and see if you might want to become a member in the future.\n\nFigure we can all get some work done, grab some lunch at The Stack, work through the afternoon, then grab a couple beers?\n\nI know at least a few of us will be there, so I hope some of you will come by and hang out!",
  short_link: 'http://meetu.ps/3kR32r',
  venue: {
    address_1: '470 James St suite 7',
    city: 'New Haven',
    name: 'Drive Cowork at District',
    state: 'CT',
  },
  yes_rsvp_count: 5,
};

storiesOf('EventCard', module).add('with text', () => {
  const knobs = {
    event: text('Event data', JSON.stringify(EVENT_FIXTURE)),
    featured: boolean('Featured', false),
  };

  return (
    <EventCard
      event={JSON.parse(knobs.event.replace(/&quot;/g, '"'))}
      featured={knobs.featured}
    />
  );
});
