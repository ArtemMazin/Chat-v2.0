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
    socket.on('join', ({ MESSAGE_SYSTEM, users }) => {
      setUserList(users);
      setMessageList((_state) => [..._state, { systemMessage: MESSAGE_SYSTEM }]);
    });

    socket.on('messageList', ({ message, owner }) => {
      setMessageList((_state) => [..._state, { message, owner }]);
    });

    socket.on('privateMessageList', ({ message, selectedUserID, roomID }) => {
      setPrivateMessageList((prev) => [...prev, { selectedUserID, roomID, message }]);
    });
  }, [socket]);

  function handleMessage(e, message) {
    e.preventDefault();
    socket.emit('sendMessage', { message, currentUser });
  }

  function handlePrivateMessage(e, message) {
    e.preventDefault();
    if (selectedUser) {
      socket.emit('privateMessage', {
        message,
        selectedUserID: selectedUser,
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
  };
};
