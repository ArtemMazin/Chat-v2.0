import React, { useContext } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import TextArea from './TextArea';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const socket = io('http://localhost:5000', {
  credentials: 'include',
});

const Content = ({ messagesDB }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [privateMessageList, setPrivateMessageList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const [userList, setUserList] = useState('');

  const currentUser = useContext(CurrentUserContext);

  console.count('count Content');

  useEffect(() => {
    socket.emit('join', { user: currentUser });
  }, [currentUser]);

  useEffect(() => {
    socket.on('join', ({ MESSAGE_SYSTEM, users }) => {
      setUserList(users);
      setMessageList((_state) => [..._state, { systemMessage: MESSAGE_SYSTEM }]);
    });

    socket.on('messageList', ({ message, currentUser }) => {
      setMessageList((_state) => [..._state, { message, currentUser }]);
    });

    socket.on('privateMessageList', ({ message, selectedUserID, roomID }) => {
      setPrivateMessageList((prev) => [...prev, { selectedUserID, roomID, message }]);
    });
  }, []);

  function handleMessage(e) {
    e.preventDefault();
    socket.emit('sendMessage', { message, currentUser });
    setMessage('');
  }

  function handlePrivateMessage(e) {
    e.preventDefault();

    if (selectedUser) {
      socket.emit('privateMessage', {
        message,
        selectedUserID: selectedUser,
      });
      setMessage('');
    }
  }
  return (
    <div className='flex-auto flex flex-col overflow-hidden'>
      <div className='h-full flex gap-2'>
        <Sidebar
          users={userList}
          setSelectedUser={setSelectedUser}
        />
        <div className='w-full flex flex-col gap-2'>
          <Chat
            messageList={messageList}
            messagesDB={messagesDB}
            privateMessageList={privateMessageList}
            selectedUser={selectedUser}
          />
          <TextArea
            setMessage={setMessage}
            handleMessage={handleMessage}
            message={message}
            handlePrivateMessage={handlePrivateMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
