import React from 'react';
import P from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Head from 'components/head';
import Box from 'components/shared/box';
import Button from 'components/shared/button';
import PageContainer from 'components/shared/pagecontainer';
import Title from 'components/shared/title';
import Text from 'components/shared/text';
import TeamMember from 'components/shared/teammember';
import { Image, Team } from 'customtypes';
import MailtoIcon from 'images/mailto-icon.svg';

const About = ({
  data: {
    pagesYaml: {
      about: { home, board },
    },
    allTeamYaml: { edges: teamMembers },
    allImageSharp: { edges: memberImages },
  },
}) => (
  <Layout>
    <Head pageTitle={home.title} />
    <PageContainer>
      <Title as="h2" size="large" color="Oranges.100">
        {home.title}
      </Title>
      <Text as="p" fontSize={3}>
        {home.description}
      </Text>
      <ul
        style={{
          listStyle: 'inside',
          marginLeft: '2rem',
          marginBottom: '2rem',
        }}
      >
        {home.values.map((v, i) => (
          <li key={i}>
            <Text fontSize={3}>{v}</Text>
          </li>
        ))}
      </ul>
      <Button
        as="a"
        href="mailto:organizers@newhaven.io?subject=NewHaven.io"
        prefixIcon={<MailtoIcon />}
      >
        {home.contact}
      </Button>
      <Box my={4}>
        <Title
          color="Oranges.100"
          size="small"
          weight="800"
          py="1rem"
          textTransform="uppercase"
        >
          {board.title}
        </Title>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {teamMembers.map(({ node: member }) => (
            <TeamMember
              key={member.name}
              name={member.name}
              title={member.title}
              description={member.description}
              image={memberImages.find(
                image => image.node.fluid.originalName === member.picture
              )}
              social={member.social}
            />
          ))}
        </Box>
      </Box>
    </PageContainer>
  </Layout>
);

export const aboutQuery = graphql`
  query AboutQuery {
    pagesYaml {
      about {
        home {
          description
          title
          values
          contact
        }
        board {
          title
        }
      }
    }
    allTeamYaml {
      edges {
        node {
          description
          name
          picture
          title
          social {
            github
            slack
          }
        }
      }
    }
    allImageSharp {
      edges {
        node {
          fluid(maxWidth: 500, maxHeight: 500) {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
    }
  }
`;

About.propTypes = {
  data: P.shape({
    pagesYaml: P.any.isRequired,
    allImageSharp: P.shape({
      edges: P.arrayOf(Image),
    }),
    allTeamYaml: P.shape({
      edges: P.arrayOf(Team),
    }),
  }),
};

export default About;
