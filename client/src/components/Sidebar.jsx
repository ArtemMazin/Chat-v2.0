import { List, Card, Avatar } from '@material-tailwind/react';
import UserInfo from './UserInfo';

export default function Sidebar({ users }) {
  return (
    <Card className='w-80 h-full my-3'>
      <div className='py-2 text-blue-400 text-center border-b border-b-blue-50'>Users in this room</div>
      <List className='p-0 gap-0 list-none'>
        {users.map((user) => (
          <li key={user._id}>
            <UserInfo user={user} />
          </li>
        ))}
      </List>
    </Card>
  );
}
