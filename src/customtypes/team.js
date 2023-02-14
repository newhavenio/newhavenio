import P from 'prop-types';

const Team = P.shape({
  node: P.shape({
    description: P.string,
    name: P.string,
    title: P.string,
    image: P.string,
    social: P.shape({
      discord: P.string,
      twitter: P.string,
      github: P.string,
    }),
  }),
});

export default Team;
