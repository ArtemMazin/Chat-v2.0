import React, { useState } from 'react';
import { Counter } from './components/Counter';
import { PostItem } from './components/PostItem';
import { PostList } from './components/PostList';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaSript', body: 'Description' },
    { id: 2, title: 'JavaSript', body: 'Description' },
    { id: 3, title: 'JavaSript', body: 'Description' },
  ]);
  const [posts2, setPosts2] = useState([
    { id: 1, title: 'Python', body: 'Description' },
    { id: 2, title: 'Python', body: 'Description' },
    { id: 3, title: 'Python', body: 'Description' },
  ]);
  return (
    <div className='App'>
      <PostList
        posts={posts}
        title={'Посты про JS'}
      />
      <PostList
        posts={posts2}
        title={'Посты про Phyton'}
      />
    </div>
  );
}

export default App;
