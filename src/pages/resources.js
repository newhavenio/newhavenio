import React from 'react';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Title from 'components/title';

const Resources = ({ data }) => (
  <Layout>
    <Head pageTitle='Resources' />
    <Box>
      <Title as="h2" size="large">Resources</Title>
    </Box>
  </Layout>
);

export default Resources;