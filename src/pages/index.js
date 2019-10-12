import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';

const Index = () => (
  <Layout>
    <Box>
      <Title as="h2" size="large">
        Where tech happens in New Haven.
      </Title>
    </Box>

    <div style={{ height: '50vh' }} />
  </Layout>
);

export default Index;
