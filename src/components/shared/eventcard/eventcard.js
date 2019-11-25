import React from 'react';
import PropTypes from 'prop-types';

import Day from 'components/shared/day';
import Box from 'components/shared/box';
import Text from 'components/shared/text';
import Button from 'components/shared/button';

import EventPlaceholderImage from 'images/event-placeholder.png';

import ClockIcon from 'images/clock.svg';
import MapMarkerIcon from 'images/map-marker.svg';

import {
  Article,
  ImageWrapper,
  Image,
  RSVPBox,
  IconList,
  IconRow,
  IconText,
  IconLink,
} from './eventcard.css';

import { parse, format } from 'date-fns';

const EventCard = ({ event }) => {
  const { name, local_date, time, featured_photo, venue, short_link } = event;

  const parsedDateTime = parse(time, 'T', new Date());
  const formattedTime = format(parsedDateTime, 'h:mm a');

  const venueLink = () => {
    if (venue) {
      const encodedAddress = encodeURI(
        `${venue.name}, ${venue.address_1}, ${venue.city}, ${venue.state}`
      );
      const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      return (
        <IconRow mt={3}>
          <Box flex="none">
            <MapMarkerIcon />
          </Box>
          <IconLink
            as="a"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {venue.name}
          </IconLink>
        </IconRow>
      );
    }
    return null;
  };

  return (
    <Article>
      <Box p={32} pb={0} gridArea="date">
        <Day date={local_date} alignItems={['start', 'center']} />
      </Box>
      <Box
        pt={32}
        pr={32}
        display="flex"
        flexDirection="column"
        gridArea="title"
      >
        <Text as="h5" color="Blues.100" fontWeight="bold">
          {name}
        </Text>
      </Box>
      <ImageWrapper mt={{ _: 32, lg: 0 }}>
        <Image
          src={
            featured_photo ? featured_photo.photo_link : EventPlaceholderImage
          }
          alt="event"
        />
      </ImageWrapper>
      <RSVPBox p={32} pl={{ lg: 0 }}>
        <IconList>
          <IconRow>
            <Box flex="none">
              <ClockIcon />
            </Box>
            <IconText>{formattedTime}</IconText>
          </IconRow>
          {venueLink()}
        </IconList>
        <Box mt={[4, 0]}>
          <Button
            as="a"
            p=".5rem 1.25rem"
            href={short_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            RSVP
          </Button>
        </Box>
      </RSVPBox>
    </Article>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

EventCard.defaultProps = {
  event: {
    venue: {},
    featured_photo: {},
  },
};

export default EventCard;
