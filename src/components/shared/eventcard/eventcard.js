import React from 'react';
import PropTypes from 'prop-types';
import { parse, format } from 'date-fns';

import Day from 'components/shared/day';
import Box from 'components/shared/box';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import VenueLink from 'components/shared/venuelink';
import Event from 'customtypes/event';

import EventPlaceholderImage from 'images/event-placeholder.png';
import ClockIcon from 'images/clock.svg';
import MapMarkerIcon from 'images/map-marker.svg';

import {
  Article,
  Description,
  FeaturedImageWrapper,
  ImageWrapper,
  Image,
  RSVPBox,
  IconRow,
  IconText,
} from './eventcard.css';

const EventCard = ({ event, featured }) => {
  const {
    featured_photo,
    local_date,
    local_time,
    name,
    plain_text_description,
    short_link,
    venue,
  } = event;

  const [short_description] = plain_text_description.split('\n');
  const parsedDate = parse(local_date, 'yyyy-MM-dd', new Date());
  const parsedDateTime = parse(local_time, 'HH:mm', parsedDate);
  const formattedTime = format(parsedDateTime, 'h:mm a');

  return (
    <Article>
      <Box p={32} pb={0} gridArea="date">
        <Day
          date={parsedDateTime.toISOString()}
          alignItems={{ _: 'start', sm: 'center' }}
        />
      </Box>
      <Box
        p={32}
        pl={{ _: 0, lg: 0 }}
        display="flex"
        flexDirection="column"
        gridArea="title"
      >
        <Text as="h5" color="Blues.100" fontWeight="bold">
          {name}
        </Text>
        {featured && (
          <Description
            display={{ _: 'none', lg: 'block' }}
            mt={16}
            mb={0}
            color="Grays.100"
            fontSize={3}
          >
            {short_description}
          </Description>
        )}
      </Box>
      {featured && (
        <Box
          p={32}
          display={{ _: 'block', lg: 'none' }}
          flexDirection="column"
          gridArea="description"
        >
          {featured && (
            <Description mt={16} mb={0} color="Grays.100" fontSize={3}>
              {short_description}
            </Description>
          )}
        </Box>
      )}
      {featured && (
        <FeaturedImageWrapper
          width={{ lg: 400 }}
          gridArea={{ _: 'image', lg: 'featured-image' }}
        >
          <Image
            src={
              featured_photo ? featured_photo.photo_link : EventPlaceholderImage
            }
            alt="event"
          />
        </FeaturedImageWrapper>
      )}
      {featured ? (
        <Box gridArea="blank" bg="Grays.20">
          {' '}
        </Box>
      ) : (
        <ImageWrapper mt={{ _: 32, lg: 0 }}>
          <Image
            src={
              featured_photo ? featured_photo.photo_link : EventPlaceholderImage
            }
            alt="event"
          />
        </ImageWrapper>
      )}
      <RSVPBox pl={{ lg: 0 }} bg={featured ? 'Grays.20' : null}>
        <IconRow>
          <ClockIcon />
          <IconText>{formattedTime}</IconText>
          {venue && (
            <>
              <MapMarkerIcon />
              <VenueLink venue={venue} />
            </>
          )}
        </IconRow>
        <Box mt={{ _: 4, sm: 0 }}>
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
  featured: PropTypes.bool,
};

EventCard.defaultProps = {
  event: Event,
  featured: false,
};

export default EventCard;
