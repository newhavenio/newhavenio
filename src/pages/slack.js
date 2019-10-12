import React from 'react';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Title from 'components/title';

const Slack = ({ data }) => (
  <Layout>
    <Head pageTitle='Slack' />
    <Box>
      <Title as="h2" size="large">Slack</Title>
    </Box>
  </Layout>
);

export default Slack;