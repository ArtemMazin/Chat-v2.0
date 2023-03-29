import React, { useRef, useState } from 'react';
import { Counter } from './components/Counter';
import { PostItem } from './components/PostItem';
import { PostList } from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaSript', body: 'Description' },
    { id: 2, title: 'JavaSript', body: 'Description' },
    { id: 3, title: 'JavaSript', body: 'Description' },
  ]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <PostList
        posts={posts}
        title={'Посты про JS'}
      />
    </div>
  );
}

export default App;
