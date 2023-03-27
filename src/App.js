import React, { useRef, useState } from 'react';
import { Counter } from './components/Counter';
import { PostItem } from './components/PostItem';
import { PostList } from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaSript', body: 'Description' },
    { id: 2, title: 'JavaSript', body: 'Description' },
    { id: 3, title: 'JavaSript', body: 'Description' },
  ]);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    setPosts([...posts, newPost]);
    setTitle('');
    setBody('');
  };
  return (
    <div className='App'>
      <form className='form'>
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MyInput
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList
        posts={posts}
        title={'Посты про JS'}
      />
    </div>
  );
}

export default App;
