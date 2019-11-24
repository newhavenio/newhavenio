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
  Description,
  ImageWrapper,
  Image,
  RSVPBox,
  IconList,
  IconRow,
  IconText,
  IconLink,
} from './featuredeventcard.css';

import { parse, format } from 'date-fns';

const FeaturedEventCard = ({ event }) => {
  const {
    name,
    simple_html_description,
    local_date,
    time,
    featured_photo,
    venue,
    short_link,
  } = event;

  const [short_description] = simple_html_description.split('\n');
  const parsedDateTime = parse(time, 'T', new Date());
  const formattedTime = format(parsedDateTime, 'h:mm a');

  const image = () => {
    if (featured_photo) {
      return <Image src={featured_photo.photo_link} alt="event" />;
    } else {
      return <Image src={EventPlaceholderImage} alt="event" />;
    }
  };

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

  const handleRSVPClick = () => window.open(short_link);

  return (
    <Article>
      <Box pl={32} pt={32} pr={[32, 0]}>
        <Day
          date={local_date}
          gridArea="date"
          alignItems={['start', 'center']}
        />
      </Box>
      <Box p={32} display="flex" flexDirection="column" gridArea="description">
        <Text as="h5" color="Blues.100" fontWeight="bold">
          {name}
        </Text>
        <Description
          mt={16}
          mb={0}
          color="Grays.100"
          fontSize={3}
          dangerouslySetInnerHTML={{ __html: short_description }}
        ></Description>
      </Box>
      <ImageWrapper>{image()}</ImageWrapper>
      <Box gridArea="blank" bg="Grays.20">
        {' '}
      </Box>
      <RSVPBox pb={[32, 'auto']}>
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

FeaturedEventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

FeaturedEventCard.defaultProps = {
  event: {
    venue: {},
    featured_photo: {},
  },
};

export default FeaturedEventCard;
