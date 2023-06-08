import { Button, Navbar } from '@material-tailwind/react';

export default function HeaderNavbar() {
  return (
    <Navbar className='flex justify-between'>
      <div className='text-blue-400'></div>
      <div className='text-blue-400'> users in this room</div>
      <Button>Left the room</Button>
    </Navbar>
  );
}
