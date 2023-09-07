import { useLocation } from 'react-router-dom';
import PrivateMessageList from './PrivateMessageList/PrivateMessageList';
import MessageList from './MessageList/MessageList';

const Chat = ({
  messageList,
  privateMessageList,
  selectedUser,
  handleRemoveMessage,
  handleRemovePrivateMessage,
  setInputFocus,
  inputRef,
}) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === `/users/${selectedUser._id}` ? (
        <PrivateMessageList
          privateMessageList={privateMessageList}
          selectedUser={selectedUser}
          handleRemovePrivateMessage={handleRemovePrivateMessage}
        />
      ) : (
        <MessageList
          messageList={messageList}
          handleRemoveMessage={handleRemoveMessage}
          setInputFocus={setInputFocus}
          inputRef={inputRef}
        />
      )}
    </>
  );
};

export default Chat;
