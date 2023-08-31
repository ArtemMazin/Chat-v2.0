import React, { useContext, useEffect, useRef } from 'react';
import { Card } from '@material-tailwind/react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const MessageList = ({ messageList, handleRemoveMessage }) => {
  const currentUser = useContext(CurrentUserContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className='flex flex-auto overflow-y-scroll rounded'>
      <ul className='px-10 flex flex-col list-none'>
        {messageList.map((message, i) => {
          return message.MESSAGE_SYSTEM ? (
            <p
              key={i}
              className='text-sm'>
              {message.MESSAGE_SYSTEM}
            </p>
          ) : message.owner._id === currentUser._id ? (
            <li
              key={i}
              className='m-1 w-full flex justify-end'>
              <div className='flex w-full'>
                <div className='group px-2 py-1 w-full flex justify-between items-center text-sm hover:bg-blue-50'>
                  <button
                    className='invisible group-hover:visible h-4 w-4'
                    type='button'
                    onClick={(e) => handleRemoveMessage(e, message)}>
                    X
                  </button>
                  <div className='flex flex-col '>
                    <h2 className='self-end font-medium'>{message.owner.name}</h2>
                    <p className='self-end'>{message.message}</p>
                  </div>
                </div>

                <img
                  src={message.owner.avatar}
                  alt={message.owner.name}
                  className='w-12 h-12 mx-2 shrink-0 object-cover'
                />
              </div>
            </li>
          ) : (
            <li
              key={i}
              className='m-1 w-full flex'>
              {message.MESSAGE_SYSTEM ? (
                <p>{message.MESSAGE_SYSTEM}</p>
              ) : (
                <div className='flex w-full'>
                  <img
                    src={message.owner.avatar}
                    alt={message.owner.name}
                    className='w-12 h-12 mx-2 shrink-0 object-cover'
                  />
                  <div className='px-2 py-1 w-full flex flex-col text-sm hover:bg-blue-50'>
                    <h2 className='font-medium'>{message.owner.name}</h2>
                    <p>{message.message}</p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
        <div ref={messagesEndRef} />
      </ul>
    </Card>
  );
};

export default MessageList;
