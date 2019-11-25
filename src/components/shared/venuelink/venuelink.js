import React from 'react';
import PropTypes from 'prop-types';
import { IconLink } from './venuelink.css';

const VenueLink = ({ venue }) => {
  const encodedAddress = encodeURI(
    `${venue.name}, ${venue.address_1}, ${venue.city}, ${venue.state}`
  );
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <IconLink
      as="a"
      href={directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {venue.name}
    </IconLink>
  );
};

VenueLink.propTypes = {
  venue: PropTypes.object.isRequired,
};

export default VenueLink;
