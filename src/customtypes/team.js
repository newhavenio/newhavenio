import PropTypes from 'prop-types';

const Team = PropTypes.shape({
  node: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
  }),
});

export default Team;
