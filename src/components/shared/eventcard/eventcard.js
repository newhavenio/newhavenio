import React from 'react';
import PropTypes from 'prop-types';

import Day from 'components/shared/day';
import Box from 'components/shared/box';
import Text from 'components/shared/text';
import Button from 'components/shared/button';

import EventPlaceholderImage from 'images/event-placeholder.png';

import ClockIcon from 'images/clock.svg';
import MapMarkerIcon from 'images/map-marker.svg';

import VenueLink from 'components/shared/venuelink';

import {
  Article,
  Description,
  FeaturedImageWrapper,
  ImageWrapper,
  Image,
  RSVPBox,
  IconList,
  IconRow,
  IconText,
} from './eventcard.css';

import { parse, format } from 'date-fns';

const EventCard = ({ event, featured }) => {
  const {
    name,
    plain_text_description,
    local_date,
    time,
    featured_photo,
    venue,
    short_link,
  } = event;

  const [short_description] = plain_text_description.split('\n');
  const parsedDateTime = parse(time, 'T', new Date());
  const formattedTime = format(parsedDateTime, 'h:mm a');

  return (
    <Article>
      <Box p={32} pb={0} gridArea="date">
        <Day date={local_date} alignItems={{ _: 'start', sm: 'center' }} />
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
      {!featured && (
        <ImageWrapper mt={{ _: 32, lg: 0 }}>
          <Image
            src={
              featured_photo ? featured_photo.photo_link : EventPlaceholderImage
            }
            alt="event"
          />
        </ImageWrapper>
      )}
      {featured && (
        <Box gridArea="blank" bg="Grays.20">
          {' '}
        </Box>
      )}
      <RSVPBox pl={{ lg: 0 }} bg={featured ? 'Grays.20' : null}>
        <IconList>
          <IconRow>
            <Box flex="none">
              <ClockIcon />
            </Box>
            <IconText>{formattedTime}</IconText>
          </IconRow>
          {venue && (
            <IconRow mt={3}>
              <Box flex="none">
                <MapMarkerIcon />
              </Box>
              <VenueLink venue={venue} />
            </IconRow>
          )}
        </IconList>
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
  event: {
    venue: {},
    featured_photo: {},
  },
  featured: false,
};

export default EventCard;
