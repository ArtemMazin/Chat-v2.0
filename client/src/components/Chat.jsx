import { Card } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Chat = ({ messageList, messagesDB, currentUser, privateMessageList, selectedUser }) => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const privateMessageRef = useRef(null);

  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToBottomPrivate = () => {
    privateMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
    scrollToBottomPrivate();
  }, [messageList, messagesDB, filteredMessages, location]);

  useEffect(() => {
    privateMessageList.length > 0 &&
      setFilteredMessages(
        privateMessageList.filter(
          (mess) => (selectedUser === mess.selectedUserID || mess.roomID === selectedUser) && mess
        )
      );
  }, [privateMessageList, selectedUser, setFilteredMessages]);

  return (
    <>
      {location.pathname === `/users/${selectedUser}` ? (
        <Card className='flex flex-auto overflow-y-scroll rounded'>
          <ul className='px-10 flex flex-col list-none'>
            {filteredMessages.map((message, i) =>
              message.roomID === currentUser._id ? (
                <li
                  key={i}
                  className='m-1 w-full flex justify-end'>
                  <div className='flex w-full'>
                    <div className='px-2 py-1 w-full flex flex-col text-sm hover:bg-blue-50'>
                      <p className='self-end'>{message.message}</p>
                    </div>
                  </div>
                </li>
              ) : (
                <li
                  key={i}
                  className='m-1 w-full flex'>
                  <div className='flex w-full'>
                    <div className='px-2 py-1 w-full flex flex-col text-sm text-sm hover:bg-blue-50'>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </li>
              )
            )}
            <div ref={privateMessageRef} />
          </ul>
        </Card>
      ) : (
        <Card className='flex flex-auto overflow-y-scroll rounded'>
          <>
            <ul className='px-10 flex flex-col list-none'>
              {messagesDB.map((message, i) =>
                message.owner._id === currentUser._id ? (
                  <li
                    key={i}
                    className='m-1 w-full flex justify-end'>
                    <div className='flex w-full'>
                      <div className='px-2 py-1 w-full flex flex-col text-sm hover:bg-blue-50'>
                        <h2 className='self-end font-medium'>{message.owner.name}</h2>
                        <p className='self-end'>{message.text}</p>
                      </div>
                      <img
                        src={message.owner.avatar}
                        className='w-12 h-12 mx-2 shrink-0 object-cover'
                      />
                    </div>
                  </li>
                ) : (
                  <li
                    key={i}
                    className='m-1 w-full flex'>
                    <div className='flex w-full'>
                      <img
                        src={message.owner.avatar}
                        className='w-12 h-12 mx-2 shrink-0 object-cover'
                      />
                      <div className='px-2 py-1 w-full flex flex-col text-sm text-sm hover:bg-blue-50'>
                        <h2 className='font-medium'>{message.owner.name}</h2>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>

            <ul className='px-10 flex flex-col list-none'>
              {messageList.map((message, i) => {
                return message.systemMessage ? (
                  <p
                    key={i}
                    className='text-sm'>
                    {message.systemMessage}
                  </p>
                ) : message.currentUser._id === currentUser._id ? (
                  <li
                    key={i}
                    className='m-1 w-full flex justify-end'>
                    <div className='flex w-full'>
                      <div className='px-2 py-1 w-full flex flex-col text-sm hover:bg-blue-50'>
                        <h2 className='self-end font-medium'>{message.currentUser.name}</h2>
                        <p className='self-end'>{message.message}</p>
                      </div>
                      <img
                        src={message.currentUser.avatar}
                        className='w-12 h-12 mx-2 shrink-0 object-cover'
                      />
                    </div>
                  </li>
                ) : (
                  <li
                    key={i}
                    className='m-1 w-full flex'>
                    {message.systemMessage ? (
                      <p>{message.systemMessage}</p>
                    ) : (
                      <div className='flex w-full'>
                        <img
                          src={message.currentUser.avatar}
                          className='w-12 h-12 mx-2 shrink-0 object-cover'
                        />
                        <div className='px-2 py-1 w-full flex flex-col text-sm hover:bg-blue-50'>
                          <h2 className='font-medium'>{message.currentUser.name}</h2>
                          <p>{message.message}</p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
              <div ref={messagesEndRef} />
            </ul>
          </>
        </Card>
      )}
    </>
  );
};

export default Chat;
