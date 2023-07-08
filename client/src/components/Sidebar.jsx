import { List, Card, Avatar } from '@material-tailwind/react';

export default function Sidebar({ users }) {
  console.log(users);
  return (
    <Card className='w-80 p-4 my-3 lg:fixed lg:top-16'>
      <div className='text-blue-400 text-center '>Users in this room</div>
      <List className='list-none'>
        {users.map((user) => (
          <li
            key={user._id}
            className='flex gap-2'>
            <Avatar
              src={user.avatar}
              alt='avatar'
              className='w-6 h-6 object-cover'
            />
            <p>{user.name}</p>
          </li>
        ))}
      </List>
    </Card>
  );
}
