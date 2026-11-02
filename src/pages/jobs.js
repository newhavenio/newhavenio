import React from 'react';
import P from 'prop-types';
import { graphql } from 'gatsby';

import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import PageContainer from 'components/shared/pagecontainer';
import Button from 'components/shared/button';
import Title from 'components/shared/title';
import Text from 'components/shared/text';
import JobPost from 'components/shared/jobPost';
import { Job } from 'customtypes';
import GithubIcon from 'images/github-icon.svg';

// Manual jobs.yaml entries use MM/DD/YYYY; Discord jobs use YYYY-MM-DD.
const toISODate = date => {
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(date || '');
  if (!us) return date || '';
  const [, m, d, y] = us;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
};

const Jobs = ({
  data: {
    pagesYaml: {
      jobs: { home },
    },
    allJobsYaml: { nodes: manualJobs },
    allDiscordJson: { nodes: discordJobs },
  },
}) => {
  const jobPosts = [
    ...manualJobs
      .filter(job => !job.hidden)
      .map(job => ({ ...job, key: job.jobURL })),
    ...discordJobs.map(job => ({ ...job, key: job.jobId })),
  ]
    .map(job => ({ ...job, postedOn: toISODate(job.postedOn) }))
    .sort((a, b) => b.postedOn.localeCompare(a.postedOn));

  return (
    <Layout>
      <Head pageTitle={home.title} />
      <PageContainer>
        <Title as="h2" size="large" color="Oranges.100">
          {home.title}
        </Title>
        <Text as="p" fontSize="3">
          {home.description}
        </Text>
        <Text as="p" fontSize="3">
          {home.feed}
        </Text>
        <Button
          as="a"
          href="https://github.com/newhavenio/newhavenio/tree/master/content/jobs"
          target="_blank"
          rel="noopener noreferrer"
          prefixIcon={<GithubIcon />}
        >
          {home.submitpr}
        </Button>
        <Box my={4}>
          <Title
            color="Oranges.100"
            size="small"
            weight="800"
            py="1rem"
            textTransform="uppercase"
          >
            Local-ish Jobs
          </Title>
          {jobPosts.length === 0 && (
            <Text as="p" fontSize="3">
              No openings right now. Check back soon.
            </Text>
          )}
          {jobPosts.map(({ key, ...jobPost }) => (
            <JobPost key={key} {...jobPost} />
          ))}
        </Box>
      </PageContainer>
    </Layout>
  );
};

export const jobPostsQuery = graphql`
  query JobPosts2Query {
    allJobsYaml {
      nodes {
        company
        hidden
        jobURL
        location
        remote
        jobTitle
        salary
        tech
        postedOn
        description
      }
    }
    allDiscordJson {
      nodes {
        jobId
        source
        company
        jobURL
        location
        employmentType
        jobTitle
        postedOn
        description
      }
    }
    pagesYaml {
      jobs {
        home {
          title
          description
          feed
          submitpr
        }
      }
    }
  }
`;

Jobs.propTypes = {
  data: P.shape({
    pagesYaml: P.any.isRequired,
    allJobsYaml: P.shape({
      nodes: P.arrayOf(Job),
    }),
    allDiscordJson: P.shape({
      nodes: P.arrayOf(Job),
    }),
  }),
};

export default Jobs;
