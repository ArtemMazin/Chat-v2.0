import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const useMessageHandler = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [privateMessageList, setPrivateMessageList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState('');

  const socket = useContext(SocketContext);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    socket.emit('join', { user: currentUser });
  }, [currentUser, socket]);

  useEffect(() => {
    socket.on('join', ({ messages, users }) => {
      setUserList(users);
      setMessageList(messages);
    });

    socket.on('messageList', ({ messages }) => {
      setMessageList(messages);
    });

    socket.on('privateMessageList', ({ message, selectedUser, roomID, currentUser }) => {
      setPrivateMessageList((prev) => [...prev, { selectedUser, roomID, message, currentUser }]);
    });

    socket.on('updateMessageList', ({ messages }) => {
      setMessageList(messages);
    });
  }, [socket]);

  function handleMessage(e, message) {
    e.preventDefault();
    socket.emit('sendMessage', { message, currentUser });
  }
  function handleRemoveMessage(e, message) {
    e.preventDefault();
    socket.emit('removeMessage', { message });
  }

  function handlePrivateMessage(e, message) {
    e.preventDefault();
    if (selectedUser) {
      socket.emit('privateMessage', {
        message,
        selectedUser,
        currentUser,
      });
    }
  }

  return {
    privateMessageList,
    messageList,
    userList,
    handleMessage,
    handlePrivateMessage,
    setSelectedUser,
    selectedUser,
    handleRemoveMessage,
  };
};
