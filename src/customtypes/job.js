import P from 'prop-types';

// A job from content/jobs/jobs.yaml (manual) or content/jobs/discord.json
// (synced from Discord). Only the fields both sources share are required.
const Job = P.shape({
  jobId: P.string,
  source: P.string,
  company: P.string,
  hidden: P.string,
  jobURL: P.string.isRequired,
  location: P.string,
  remote: P.string,
  employmentType: P.string,
  jobTitle: P.string.isRequired,
  salary: P.string,
  tech: P.string,
  postedOn: P.string.isRequired,
  description: P.string,
});

export default Job;
