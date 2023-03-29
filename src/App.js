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
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      {posts.length ? (
        <PostList
          remove={removePost}
          posts={posts}
          title={'Посты про JS'}
        />
      ) : (
        <h2 style={{ textAlign: 'center' }}>Список постов пуст</h2>
      )}
    </div>
  );
}

export default App;
