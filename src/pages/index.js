import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';
import Text from 'components/text';
import SplashShapeTop from 'images/splash-shape-top.svg';
import SplashShapeBottom from 'images/splash-shape-bottom.svg';


const Index = () => (
  <Layout>
    <Box
      minHeight="480px"
      maxWidth="960px"
      display="flex"
      flexDirection="column"
      padding="0 4rem"
    >
      <SplashShapeTop
        style={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          zIndex: -1,
        }}
      />
      <Title as="h2" size="large" color="Whites.100">
        Where tech happens in New Haven.
      </Title>
      <Text as="p" color="Whites.100">
        NewHaven.io is a tech community lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </Text>
    </Box>
    <Box minHeight="300px" padding="4rem">
      <Title as="h2" size="large" color="Grays.100">
        Join the Slack Community
      </Title>
    </Box>
    <Box
      minHeight="300px"
      padding="4rem"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      overflow="hidden"
    >
      <SplashShapeBottom
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          zIndex: -1,
        }}
      />
      <Title as="h2" size="large" color="Grays.100">
        Meet People IRL
      </Title>
    </Box>
  </Layout>
);

export default Index;
