import { List, Card, Avatar } from '@material-tailwind/react';

export default function Sidebar({ users }) {
  return (
    <Card className='w-80 my-3'>
      <div className='py-2 text-blue-400 text-center '>Users in this room</div>
      <List className='p-0 gap-0 list-none'>
        {users.map((user) => (
          <li
            key={user._id}
            className='h-12 flex items-center gap-2 border-b border-b-blue-50'>
            <Avatar
              src={user.avatar}
              alt='avatar'
              className='w-8 h-8 mx-2 object-cover'
              variant='rounded'
            />
            <p>{user.name}</p>
          </li>
        ))}
      </List>
    </Card>
  );
}
