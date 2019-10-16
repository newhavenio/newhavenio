import React from 'react';

import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import Title from 'components/shared/title';

const About = () => (
  <Layout>
    <Head pageTitle="About" />
    <Box>
      <Title as="h2" size="large">
        About
      </Title>
    </Box>
  </Layout>
);

export default About;
