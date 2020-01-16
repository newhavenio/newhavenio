import React, { useCallback } from 'react';
import P from 'prop-types';
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

const EventCard = ({ event, type }) => {
  const {
    featured_photo,
    local_date,
    local_time,
    name,
    plain_text_description,
    short_link,
    venue,
  } = event;
  const isFeatured = type === 'featured';
  const isDefault = type === 'default';
  const isCompact = type === 'compact';

  const [short_description] = plain_text_description.split('\n');
  const parsedDateTime = parse(local_time, 'HH:mm', new Date());
  const formattedTime = format(parsedDateTime, 'h:mm a');

  const onCardClick = useCallback(() => window.open(short_link), [short_link]);

  return (
    <Article type={type} role="link" onClick={onCardClick}>
      <Box p={isCompact ? 0 : 32} pb={0} gridArea="date">
        <Day date={local_date} alignItems={{ _: 'start', sm: 'center' }} />
      </Box>
      <Box
        p={isCompact ? 0 : 32}
        pl={{ _: 0, lg: 0 }}
        display="flex"
        flexDirection="column"
        gridArea="title"
      >
        <Text as="h5" color="Blues.100" fontWeight="bold">
          {name}
        </Text>
        {isFeatured && (
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
      {isFeatured && (
        <>
          <Box
            p={32}
            display={{ _: 'block', lg: 'none' }}
            flexDirection="column"
            gridArea="description"
          >
            {isFeatured && (
              <Description mt={16} mb={0} color="Grays.100" fontSize={3}>
                {short_description}
              </Description>
            )}
          </Box>
          <FeaturedImageWrapper
            width={{ lg: 400 }}
            gridArea={{ _: 'image', lg: 'featured-image' }}
          >
            <Image
              src={
                featured_photo
                  ? featured_photo.photo_link
                  : EventPlaceholderImage
              }
              alt="event"
            />
          </FeaturedImageWrapper>
          <Box gridArea="blank" bg="Grays.20" borderBottomLeftRadius="md">
            {' '}
          </Box>
        </>
      )}
      {isDefault && (
        <ImageWrapper mt={{ _: 32, lg: 0 }}>
          <Image
            src={
              featured_photo ? featured_photo.photo_link : EventPlaceholderImage
            }
            alt="event"
          />
        </ImageWrapper>
      )}
      <RSVPBox
        p={isCompact ? 0 : 32}
        pl={{ lg: 0 }}
        bg={isFeatured ? 'Grays.20' : null}
      >
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
            onClick={e => e.stopPropagation()}
          >
            RSVP
          </Button>
        </Box>
      </RSVPBox>
    </Article>
  );
};

EventCard.propTypes = {
  event: P.object.isRequired,
  type: P.oneOf(['default', 'featured', 'compact']),
};

EventCard.defaultProps = {
  event: Event,
  type: 'default',
};

export default EventCard;
