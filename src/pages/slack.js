import React from 'react';
import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import Title from 'components/shared/title';

const Slack = () => (
  <Layout>
    <Head pageTitle="Slack" />
    <Box>
      <Title as="h2" size="large">
        Slack
      </Title>
    </Box>
  </Layout>
);

export default Slack;
