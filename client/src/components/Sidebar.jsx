import { List, Card } from '@material-tailwind/react';
import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';

export default function Sidebar({ users, currentUser }) {
  return (
    <Card className='w-80 h-full overflow-y-scroll rounded'>
      <div className='py-2 text-blue-400 text-center border-b border-b-blue-50'>Users in this room</div>
      <List className='p-0 gap-0 list-none'>
        {users
          .filter((user) => user._id !== currentUser._id)
          .map((user) => (
            <li key={user._id}>
              <Link to={'users/' + user._id}>
                <UserInfo user={user} />
              </Link>
            </li>
          ))}
      </List>
    </Card>
  );
}
