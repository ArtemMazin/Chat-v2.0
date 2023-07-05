import { Button, Navbar } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export default function HeaderNavbar({ onLogout }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token');
    onLogout();
    navigate('/sign-in', { replace: 'true' });
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
