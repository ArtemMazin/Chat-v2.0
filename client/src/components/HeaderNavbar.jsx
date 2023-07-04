import { Button, Navbar } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export default function HeaderNavbar({ setLoggedIn }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
  }
  return (
    <Navbar className='flex justify-between'>
      <div className='text-blue-400'></div>
      <div className='text-blue-400'> users in this room</div>
      <Button
        type='button'
        onClick={signOut}>
        Left the room
      </Button>
    </Navbar>
  );
}
