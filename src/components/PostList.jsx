import React from 'react';
import { PostItem } from './PostItem';

export const PostList = ({ posts, title }) => {
  return (
    <div className='post-list'>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      {posts.map((post) => (
        <PostItem
          post={post}
          key={post.id}
        />
      ))}
    </div>
  );
};
