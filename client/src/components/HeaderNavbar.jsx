import { Button, Navbar, Avatar } from '@material-tailwind/react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function HeaderNavbar({ onLogout, handleEditAvatarClick }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  function signOut() {
    localStorage.removeItem('token');
    onLogout();
    navigate('/sign-in', { replace: 'true' });
  }
  return (
    <Navbar className='px-8 pt-2 pb-2 max-w-full flex justify-between items-center rounded'>
      <Avatar
        src={currentUser.avatar}
        alt='Профиль'
        variant='rounded'
        onClick={handleEditAvatarClick}
        className='cursor-pointer'
      />
      <div className='flex gap-2'>
        <Link to={'/'}>
          <Button
            type='button'
            size='sm'
            className='rounded-md'>
            ЧАТ
          </Button>
        </Link>

        <Button
          type='button'
          onClick={signOut}
          size='sm'
          className='rounded-md'>
          Выйти
        </Button>
      </div>
    </Navbar>
  );
}
