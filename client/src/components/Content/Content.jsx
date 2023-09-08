import React, { useState } from 'react';
import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import TextArea from '../TextArea/TextArea';
import { useMessageHandler } from '../../hooks/useMessageHandler';
import useFocus from '../../hooks/useFocus';

const Content = () => {
  const {
    privateMessageList,
    messageList,
    userList,
    handleMessage,
    handlePrivateMessage,
    setSelectedUser,
    selectedUser,
    handleRemoveMessage,
    handleRemovePrivateMessage,
    handleEditMessage,
  } = useMessageHandler();

  const [inputRef, setInputFocus] = useFocus();
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState('');
  const [editedMessage, setEditedMessage] = useState({});

  // console.count('count Content');

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
            privateMessageList={privateMessageList}
            selectedUser={selectedUser}
            handleRemoveMessage={handleRemoveMessage}
            handleRemovePrivateMessage={handleRemovePrivateMessage}
            setInputFocus={setInputFocus}
            inputRef={inputRef}
            setIsEdit={setIsEdit}
            setMessage={setMessage}
            setEditedMessage={setEditedMessage}
          />
          <TextArea
            handleMessage={handleMessage}
            message={message}
            setMessage={setMessage}
            handlePrivateMessage={handlePrivateMessage}
            handleEditMessage={handleEditMessage}
            inputRef={inputRef}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            editedMessage={editedMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
