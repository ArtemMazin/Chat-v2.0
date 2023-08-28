import React from 'react';
import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import TextArea from '../TextArea/TextArea';
import { useMessageHandler } from '../../hooks/useMessageHandler';

const Content = ({ messagesDB }) => {
  const {
    privateMessageList,
    messageList,
    userList,
    handleMessage,
    handlePrivateMessage,
    setSelectedUser,
    selectedUser,
  } = useMessageHandler();

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
            messagesDB={messagesDB}
            privateMessageList={privateMessageList}
            selectedUser={selectedUser}
          />
          <TextArea
            handleMessage={handleMessage}
            handlePrivateMessage={handlePrivateMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
