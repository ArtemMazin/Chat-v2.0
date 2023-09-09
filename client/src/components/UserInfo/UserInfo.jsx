import React, { useEffect } from 'react';
import { Button, Avatar, Typography } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';

export default function UserInfo({ user, setSelectedUser, notification, setNotification, toNotification }) {
  const location = useLocation();

  useEffect(() => {
    location.pathname === '/users/' + user._id && setNotification(false);
  }, [location.pathname, setNotification, user._id]);

  return (
    <Link to={'/users/' + user._id}>
      <Button
        className='h-12 w-full p-0 flex items-center gap-2 font-light border-b border-b-blue-50 normal-case text-left'
        variant='text'
        onClick={() => setSelectedUser(user)}>
        <Avatar
          src={user.avatar}
          alt='avatar'
          className='w-8 h-8 mx-2 object-cover'
          variant='rounded'
        />
        <div>
          <Typography
            variant='h6'
            color='blue-gray'
            className='font-medium text-sm'>
            {user.name}
          </Typography>
          <Typography
            variant='h6'
            color='blue-gray'
            className='font-medium text-xs'>
            {user.about}
          </Typography>
        </div>
        <p>{user.online && 'online'}</p>
        {toNotification._id === user._id && notification && <div>&#9993;</div>}
      </Button>
    </Link>
  );
}
