import { Button, Navbar, Avatar } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export default function HeaderNavbar({ currentUser, onLogout, handleEditAvatarClick }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token');
    onLogout();
    navigate('/sign-in', { replace: 'true' });
  }
  return (
    <Navbar className='p-2 max-w-full flex justify-between items-center rounded'>
      <Avatar
        src={currentUser.avatar}
        alt='Профиль'
        variant='rounded'
        onClick={handleEditAvatarClick}
        className='cursor-pointer'
      />
      <Button
        type='button'
        onClick={signOut}
        className='max-h-10'>
        Left the room
      </Button>
    </Navbar>
  );
}
