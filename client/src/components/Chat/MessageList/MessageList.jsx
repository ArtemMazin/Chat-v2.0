import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card } from '@material-tailwind/react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const MessageList = ({
  messageList,
  handleRemoveMessage,
  setInputFocus,
  inputRef,
  setIsEdit,
  setMessage,
  setEditedMessage,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEditButton = (message) => {
    setIsEdit(() => true);
    setInputFocus();
    inputRef.current.value = message.message;
    setMessage(message.message);
    setEditedMessage(message.createdAt);
  };

  return (
    <Card className='flex flex-auto overflow-y-scroll rounded'>
      <ul className='px-6 flex flex-col gap-1 list-none mobile:px-1'>
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
                <div className='group w-full flex items-start text-sm hover:bg-blue-50'>
                  <div className='px-2 w-full flex flex-col gap-1'>
                    <div className='w-full self-end flex justify-between'>
                      <div className='invisible group-hover:visible flex gap-2 py-1'>
                        <button
                          className='h-4 w-4 bg-delete-img'
                          type='button'
                          onClick={(e) => handleRemoveMessage(e, message)}
                        />
                        <button
                          className='h-4 w-4 bg-correct-img'
                          type='button'
                          onClick={() => handleEditButton(message)}
                        />
                      </div>
                      <div className='flex gap-2 items-center'>
                        <p className='text-xs'>{message.time}</p>
                        <h2 className='font-medium'>{message.owner.name}</h2>
                      </div>
                    </div>
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
                  <div className='px-2 w-full flex flex-col gap-1 text-sm hover:bg-blue-50'>
                    <div className='flex gap-2 items-center'>
                      <h2 className='font-medium'>{message.owner.name}</h2>
                      <p className='text-xs'>{message.time}</p>
                    </div>
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
