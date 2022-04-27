import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import MasonaryLayout from './MasonryLayout';

import { request } from '../api';
import { useCategory } from '../hooks';

const fetchPins = () => {
  return request({ url: '/api/pins' });
};

const Feed = () => {
  const { categoryId } = useParams();

  const { data: response, isLoading } = useQuery('get-all-pins', fetchPins, {
    refetchOnWindowFocus: false,
  });

  const { data: pinsByCategory } = useCategory(categoryId);

  if (isLoading) return <h1>Loading....</h1>;

  const { pins } = response?.data;

  return categoryId ? (
    <div>
      {pinsByCategory?.data.pins && (
        <MasonaryLayout pins={pinsByCategory?.data.pins} />
      )}
    </div>
  ) : (
    <div>{pins && <MasonaryLayout pins={pins} />}</div>
  );
};

export default Feed;
