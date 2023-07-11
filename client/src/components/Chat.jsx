import { Card } from '@material-tailwind/react';

const Chat = ({ messageList }) => {
  return (
    <Card className='flex grow overflow-y-auto rounded'>
      <ul className='list-none'>
        {messageList.map(({ message }, i) => (
          <li
            key={i}
            className='p-4 m-3 max-w-fit bg-blue-50 rounded-full'>
            {message}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Chat;
