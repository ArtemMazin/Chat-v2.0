import React, { useState } from 'react';
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

  const [title, setTitle] = useState('пост');
  const addNewPost = (e) => {
    e.preventDefault();
    console.log(title);
  };
  return (
    <div className="App">
      <form className="form">
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MyInput />
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
