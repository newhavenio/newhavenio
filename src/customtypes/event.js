import P from 'prop-types';

const Event = P.shape({
  node: P.shape({
    featured_photo: P.shape({
      photo_link: P.string,
    }).isRequired,
    id: P.string.isRequired,
    local_date: P.string.isRequired,
    local_time: P.string.isRequired,
    name: P.string.isRequired,
    plain_text_description: P.string.isRequired,
    short_link: P.string.isRequired,
    venue: P.shape({
      name: P.string,
      address_1: P.string,
      city: P.string,
      state: P.string,
      zip: P.string,
    }).isRequired,
  }),
});

export default Event;
