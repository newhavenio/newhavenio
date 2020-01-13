import React from 'react';
import P from 'prop-types';
import { graphql } from 'gatsby';

import Layout from 'components/layout';
import Head from 'components/head';
import Title from 'components/shared/title';
import Text from 'components/shared/text';
import Box from 'components/shared/box';
import Button from 'components/shared/button';

import ResourceList from 'components/shared/resourcelist';

const Resources = ({
  data: {
    pagesYaml: {
      resources: { home, rules, resources },
    },
  },
}) => (
  <Layout>
    <Head pageTitle={home.title} />
    <Box padding="2rem 4rem">
      <Title as="h2" size="large" color="Oranges.100">
        {home.title}
      </Title>
      <Box my={4}>
        <Title
          color="Oranges.100"
          size="small"
          weight="800"
          py="1rem"
          textTransform="uppercase"
        >
          {rules.title}
        </Title>
        <Text as="p" fontSize={3}>
          {rules.description}
        </Text>
        <Button
          as="a"
          href="https://github.com/newhavenio/code-of-conduct/blob/master/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code of Conduct
        </Button>
      </Box>
      <Box my={4}>
        <Title
          color="Oranges.100"
          size="small"
          weight="800"
          py="1rem"
          textTransform="uppercase"
        >
          {resources.title}
        </Title>
        <ResourceList roles={resources.role} />
      </Box>
    </Box>
  </Layout>
);

Resources.propTypes = {
  data: P.shape({
    pagesYaml: P.any.isRequired,
  }),
};

export const resourcesQuery = graphql`
  query ResourcesQuery {
    pagesYaml {
      resources {
        home {
          title
        }
        rules {
          title
          description
        }
        resources {
          title
          role {
            title
            description
          }
        }
      }
    }
  }
`;

export default Resources;
