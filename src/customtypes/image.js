import PropTypes from 'prop-types';

const Image = PropTypes.shape({
  node: PropTypes.shape({
    fluid: PropTypes.shape({
      originalName: PropTypes.string,
    }),
  }),
});

export default Image;
