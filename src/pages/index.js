import React from 'react';
import Layout from 'components/layout';
import Box from 'components/box';
import ButtonWrapper from 'components/button/wrapper';
import Button from 'components/button';
import Title from 'components/title';
import Text from 'components/text';
import SplashShapeTop from 'images/splash-shape-top.svg';
import SplashShapeBottom from 'images/splash-shape-bottom.svg';

const Index = () => (
  <Layout>
    <Box
      display="flex"
      flexDirection="column"
      maxWidth="960px"
      minHeight="480px"
      position="relative"
      padding="0 4rem"
      alignItems="flex-start"
    >
      <SplashShapeTop
        style={{
          position: 'absolute',
          top: '-210px',
          left: '-4050px',
          zIndex: -1,
        }}
      />
      <Title as="h2" size="large" color="Whites.100">
        Where tech happens in New Haven.
      </Title>
      <Box maxWidth="640px">
        <Text as="p" color="Whites.100">
          NewHaven.io is a tech community lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </Text>
      </Box>
      <ButtonWrapper>
        <Button palette="secondary">Join the Slack</Button>
        <Button palette="tertiary">Join the Meetup</Button>
      </ButtonWrapper>
    </Box>
    <Box padding="0 4rem">
      <Title as="h2" size="large" color="Grays.100">
        Join the Slack Community
      </Title>
    </Box>
    <Box
      minHeight="300px"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      padding="6rem 4rem 0"
    >
      <SplashShapeBottom
        style={{
          position: 'absolute',
          top: '0',
          right: '-8400px',
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
