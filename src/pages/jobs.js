import React, { useEffect, useRef, useState } from 'react';
import P from 'prop-types';
import { graphql, navigate } from 'gatsby';

import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import PageContainer from 'components/shared/pagecontainer';
import Button from 'components/shared/button';
import Title from 'components/shared/title';
import Text from 'components/shared/text';
import JobPost from 'components/shared/jobPost';
import { Job } from 'customtypes';

const PAGE_SIZE = 20;

const pageFromSearch = search => {
  const match = /[?&]page=(\d+)/.exec(search || '');
  return match ? Number(match[1]) : 1;
};

const Jobs = ({
  location,
  data: {
    pagesYaml: {
      jobs: { home },
    },
    allDiscordJson: { nodes: discordJobs },
  },
}) => {
  const jobPosts = [...discordJobs].sort((a, b) =>
    b.postedOn.localeCompare(a.postedOn)
  );

  // The static HTML is always page 1; read ?page= only after hydrating so the
  // first client render matches it.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const pageCount = Math.max(1, Math.ceil(jobPosts.length / PAGE_SIZE));
  const requested = hydrated ? pageFromSearch(location.search) : 1;
  const page = Math.min(Math.max(requested, 1), pageCount);
  const visible = jobPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const listTop = useRef(null);
  const goTo = target => {
    navigate(
      target === 1 ? location.pathname : `${location.pathname}?page=${target}`
    );
    if (listTop.current) listTop.current.scrollIntoView();
  };

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
        <div ref={listTop} />
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
          {visible.map(({ jobId, ...jobPost }) => (
            <JobPost key={jobId} {...jobPost} />
          ))}
          {pageCount > 1 && (
            <Box
              as="nav"
              aria-label="Job listing pages"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={4}
            >
              <Button
                palette="secondary"
                disabled={page === 1}
                onClick={() => goTo(page - 1)}
              >
                Newer
              </Button>
              <Text as="span" fontSize="3">
                Page {page} of {pageCount}
              </Text>
              <Button
                palette="secondary"
                disabled={page === pageCount}
                onClick={() => goTo(page + 1)}
              >
                Older
              </Button>
            </Box>
          )}
        </Box>
      </PageContainer>
    </Layout>
  );
};

export const jobPostsQuery = graphql`
  query JobPosts2Query {
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
        }
      }
    }
  }
`;

Jobs.propTypes = {
  location: P.shape({
    pathname: P.string,
    search: P.string,
  }).isRequired,
  data: P.shape({
    pagesYaml: P.any.isRequired,
    allDiscordJson: P.shape({
      nodes: P.arrayOf(Job),
    }),
  }),
};

export default Jobs;
