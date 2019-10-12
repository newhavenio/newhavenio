import React from 'react';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Title from 'components/title';

const Events = ({ data }) => (
  <Layout>
    <Head pageTitle='Events' />
    <Box>
      <Title as="h2" size="large">Events</Title>
    </Box>
  </Layout>
);

export default Events;