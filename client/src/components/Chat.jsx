import { Card } from '@material-tailwind/react';
import { useEffect, useRef } from 'react';

const Chat = ({ messageList, messagesDB, currentUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList, messagesDB]);

  return (
    <Card className='flex grow overflow-y-scroll rounded'>
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
        <div ref={messagesEndRef} />
      </ul>
      <ul className='px-10 flex flex-col list-none'>
        {messageList.map((message, i) =>
          message.currentUser._id === currentUser._id ? (
            <li
              key={i}
              className='m-1 w-full flex justify-end'>
              <div className='flex w-full'>
                <div className='px-2 py-1 w-full flex flex-col text-sm text-sm hover:bg-blue-50'>
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
              <div className='flex w-full'>
                <img
                  src={message.currentUser.avatar}
                  className='w-12 h-12 mx-2 shrink-0 object-cover'
                />
                <div className='px-2 py-1 w-full flex flex-col text-sm text-sm hover:bg-blue-50'>
                  <h2 className='font-medium'>{message.currentUser.name}</h2>
                  <p>{message.message}</p>
                </div>
              </div>
            </li>
          )
        )}
        <div ref={messagesEndRef} />
      </ul>
    </Card>
  );
};

export default Chat;
