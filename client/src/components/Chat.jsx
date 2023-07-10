import { Card } from '@material-tailwind/react';

const Chat = () => {
  return (
    <Card className='flex grow overflow-y-auto rounded'>
      <ul className='list-none'></ul>
    </Card>
  );
};

export default Chat;
