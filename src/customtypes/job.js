import P from 'prop-types';

// A job from content/jobs/discord.json (synced from Discord).
const Job = P.shape({
  jobId: P.string,
  source: P.string,
  company: P.string,
  jobURL: P.string.isRequired,
  location: P.string,
  employmentType: P.string,
  jobTitle: P.string.isRequired,
  postedOn: P.string.isRequired,
  description: P.string,
});

export default Job;
