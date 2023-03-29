import React from 'react';
import { PostItem } from './PostItem';

export const PostList = ({ posts, title, remove }) => {
  return (
    <div className="post-list">
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      {posts.map((post, index) => (
        <PostItem
          remove={remove}
          number={index + 1}
          post={post}
          key={post.id}
        />
      ))}
    </div>
  );
};
