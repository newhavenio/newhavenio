import React from 'react';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Title from 'components/title';

const About = ({ data }) => (
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
