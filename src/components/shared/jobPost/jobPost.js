import React, { useCallback } from 'react';
import P from 'prop-types';
import { format, parseISO } from 'date-fns';

import Box from 'components/shared/box';

import {
  Article,
  JobPrimary,
  JobSecondary,
  JobTertiary,
  Description,
} from './jobPost.css';

const formatDate = date => {
  const parsed = parseISO(date);
  return Number.isNaN(parsed.getTime()) ? date : format(parsed, 'MMM d, yyyy');
};

/**
 * A job listing card. Manual listings carry salary/tech/remote; listings
 * synced from Discord carry employment type and source instead, so every
 * detail line is optional.
 */
const JobPost = ({
  company,
  jobURL,
  location,
  remote,
  employmentType,
  jobTitle,
  salary,
  tech,
  postedOn,
  description,
  source,
}) => {
  const onCardClick = useCallback(
    () => window.open(jobURL, '_blank', 'noopener'),
    [jobURL]
  );

  const where = [location, remote && `Remote Friendly: ${remote}`]
    .filter(Boolean)
    .join(' || ');
  const role = [jobTitle, employmentType, salary].filter(Boolean).join(' || ');

  return (
    <div>
      <Article role="link" onClick={onCardClick}>
        <Box
          pl={{ _: 0, lg: 0 }}
          display="flex"
          flexDirection="column"
          justifyContent={{
            _: 'center',
          }}
          gridArea="title"
        >
          <JobPrimary>
            {company}
            {where && <span> ({where})</span>}
          </JobPrimary>
          <JobSecondary>{role}</JobSecondary>
          {tech && <JobTertiary>Tech: {tech}</JobTertiary>}
          <JobTertiary>
            Posted {formatDate(postedOn)}
            {source && ` · via ${source}`}
          </JobTertiary>
          {description && (
            <Description
              mt={{ _: 0, lg: 16 }}
              mb={0}
              color="Grays.100"
              fontSize={3}
            >
              {description}
            </Description>
          )}
        </Box>
      </Article>
      <br />
    </div>
  );
};

JobPost.propTypes = {
  company: P.string,
  jobURL: P.string.isRequired,
  location: P.string,
  remote: P.string,
  employmentType: P.string,
  jobTitle: P.string.isRequired,
  salary: P.string,
  tech: P.string,
  postedOn: P.string.isRequired,
  description: P.string,
  source: P.string,
};

export default JobPost;
