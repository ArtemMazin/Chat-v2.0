import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card } from '@material-tailwind/react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

const PrivateMessageList = ({ privateMessageList, selectedUser }) => {
  const [filteredMessages, setFilteredMessages] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const privateMessageRef = useRef(null);

  useEffect(() => scrollToBottomPrivate(), [filteredMessages]);

  useEffect(() => {
    privateMessageList.length > 0 &&
      setFilteredMessages(
        privateMessageList.filter(
          (mess) => (selectedUser === mess.selectedUserID || mess.roomID === selectedUser) && mess
        )
      );
  }, [privateMessageList, selectedUser, setFilteredMessages]);

  const scrollToBottomPrivate = () => {
    privateMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
  );
};

export default PrivateMessageList;
