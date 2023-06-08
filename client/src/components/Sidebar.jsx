import { List, Card } from '@material-tailwind/react';

export default function Sidebar() {
  return (
    <Card className='w-80 p-4 my-3 lg:fixed lg:top-16'>
      <div className='text-blue-400 text-center '>Users in this room</div>
      <List className='list-none'>Users</List>
    </Card>
  );
}
