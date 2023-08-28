import { useLocation } from 'react-router-dom';
import PrivateMessageList from './PrivateMessageList/PrivateMessageList';
import MessageList from './MessageList/MessageList';

const Chat = ({ messageList, messagesDB, privateMessageList, selectedUser }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === `/users/${selectedUser._id}` ? (
        <PrivateMessageList
          privateMessageList={privateMessageList}
          selectedUser={selectedUser}
        />
      ) : (
        <MessageList
          messageList={messageList}
          messagesDB={messagesDB}
        />
      )}
    </>
  );
};

export default Chat;
