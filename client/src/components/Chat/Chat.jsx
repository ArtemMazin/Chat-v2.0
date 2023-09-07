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
  setIsEdit,
  setMessage,
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
          setIsEdit={setIsEdit}
          setMessage={setMessage}
        />
      )}
    </>
  );
};

export default Chat;
