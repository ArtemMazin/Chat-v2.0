import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const useMessageHandler = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [privateMessageList, setPrivateMessageList] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState('');
  const [notification, setNotification] = useState(false);
  const [toNotification, setToNotification] = useState(false);

  const socket = useContext(SocketContext);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    socket.emit('join', { user: currentUser });
  }, [currentUser, socket]);

  useEffect(() => {
    socket.on('join', (messages, privateMessagesDB, users) => {
      setUserList(users);
      setMessageList(messages);
      setPrivateMessageList(privateMessagesDB);
    });

    socket.on('updatePrivateMessageList', (messages, owner) => {
      setToNotification(owner);
      setNotification(() => true);
      setPrivateMessageList(messages);
    });

    socket.on('updateMessageList', (messages) => {
      setMessageList(messages);
    });

    socket.on('updateUserList', (users) => {
      setUserList(users);
    });
  }, [socket]);

  function handleMessage(e, message) {
    e.preventDefault();
    socket.emit('sendMessage', { message, currentUser });
  }

  function handleEditMessage(e, editedMessage, message) {
    e.preventDefault();
    socket.emit('editMessage', { editedMessage, message });
  }

  function handleRemoveMessage(e, message) {
    e.preventDefault();
    socket.emit('removeMessage', { message });
  }
  function handleRemovePrivateMessage(e, message) {
    e.preventDefault();
    socket.emit('removePrivateMessage', { message });
  }

  function handlePrivateMessage(e, message) {
    e.preventDefault();
    if (selectedUser) {
      socket.emit('privateMessage', {
        message,
        to: selectedUser._id,
        currentUser,
      });
    }
  }

  function handleLogout() {
    socket.emit('logout', currentUser);
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
    handleRemovePrivateMessage,
    handleLogout,
    handleEditMessage,
    notification,
    setNotification,
    toNotification,
  };
};
