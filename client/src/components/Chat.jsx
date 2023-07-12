import { Card } from '@material-tailwind/react';

const Chat = ({ messageList, currentUser }) => {
  return (
    <Card className='flex grow overflow-y-scroll rounded'>
      <ul className='px-10 flex flex-col list-none'>
        {messageList.map((message, i) =>
          message.currentUser._id === currentUser._id ? (
            <li
              key={i}
              className='m-1 flex self-end'>
              <div className='flex'>
                <div className='px-2 max-w-xs flex flex-col text-sm bg-blue-200'>
                  <h2 className='self-end font-medium'>{message.currentUser.name}</h2>
                  <p>{message.message}</p>
                </div>
                <img
                  src={message.currentUser.avatar}
                  className='w-10 h-10 mx-2 object-cover'
                />
              </div>
            </li>
          ) : (
            <li
              key={i}
              className='m-1 flex'>
              <div className='flex'>
                <img
                  src={message.currentUser.avatar}
                  className='w-10 h-10 mx-2 object-cover'
                />
                <div className='px-2 max-w-xs text-sm bg-blue-50'>
                  <h2 className='font-medium'>{message.currentUser.name}</h2>
                  <p>{message.message}</p>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </Card>
  );
};

export default Chat;
