import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card } from '@material-tailwind/react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const PrivateMessageList = ({ privateMessageList, selectedUser, handleRemovePrivateMessage }) => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const privateMessageRef = useRef(null);

  useEffect(() => scrollToBottomPrivate(), [filteredMessages]);

  useEffect(() => {
    privateMessageList[selectedUser._id] && privateMessageList[selectedUser._id].length > 0
      ? setFilteredMessages(
          privateMessageList[selectedUser._id].filter(
            (mess) =>
              ((currentUser._id === mess.to && selectedUser._id !== mess.to && selectedUser._id === mess.owner._id) ||
                (selectedUser._id === mess.to && currentUser._id === mess.owner._id)) &&
              mess
          )
        )
      : setFilteredMessages(privateMessageList[selectedUser._id]);
  }, [currentUser._id, privateMessageList, selectedUser, setFilteredMessages]);

  const scrollToBottomPrivate = () => {
    privateMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className='flex flex-auto overflow-y-scroll rounded'>
      <ul className='px-10 flex flex-col list-none'>
        {filteredMessages.map((message, i) =>
          message.owner._id === currentUser._id ? (
            <li
              key={i}
              className='m-1 w-full flex justify-end'>
              <div className='flex w-full'>
                <div className='group px-2 py-1 w-full flex justify-between items-center text-sm hover:bg-blue-50'>
                  <button
                    className='invisible group-hover:visible h-4 w-4'
                    type='button'
                    onClick={(e) => handleRemovePrivateMessage(e, message)}>
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
              <div className='flex w-full'>
                <img
                  src={message.owner.avatar}
                  alt={message.owner.name}
                  className='w-12 h-12 mx-2 shrink-0 object-cover'
                />
                <div className='px-2 py-1 w-full flex flex-col text-sm text-sm hover:bg-blue-50'>
                  <h2 className='font-medium'>{message.owner.name}</h2>
                  <p>{message.message}</p>
                </div>
              </div>
            </li>
          )
        )}
        <div ref={privateMessageRef} />
      </ul>
    </Card>
  );
};

export default PrivateMessageList;
