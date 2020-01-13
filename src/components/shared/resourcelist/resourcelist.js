import React from 'react';
import P from 'prop-types';

import Title from 'components/shared/title';
import Text from 'components/shared/text';
import Card from 'components/shared/card';

import { ResourceListContainer } from './resourcelist.css';

const Resource = ({ title, description }) => (
  <Card display="flex" justifyContent="space-between" flexDirection="column">
    <Title display="inline" color="Grays.100" size="small" py="1rem">
      {"If you're a "} <Text color="Oranges.100">{title}</Text>
      ...
    </Title>{' '}
    <ul>
      {description.map((d, i) => (
        <li key={i}>
          <Text fontSize={3}>{d}</Text>
        </li>
      ))}
    </ul>
  </Card>
);

Resource.propTypes = {
  title: P.string,
  description: P.arrayOf(P.string),
};

const ResourceList = ({ roles }) => (
  <ResourceListContainer>
    {roles.map(({ title, description }, i) => (
      <Resource title={title} description={description} key={i} />
    ))}
  </ResourceListContainer>
);

ResourceList.propTypes = {
  roles: P.arrayOf(
    P.shape({
      title: P.string,
      description: P.arrayOf(P.string),
    })
  ),
};

export default ResourceList;
