import React from 'react';
import { Popover, PopoverHandler, PopoverContent, Button, Avatar, Typography } from '@material-tailwind/react';

export default function UserInfo({ user }) {
  const [openPopover, setOpenPopover] = React.useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover
      open={openPopover}
      handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Button
          className='h-12 w-full p-0 flex items-center gap-2 font-light border-b border-b-blue-50 normal-case'
          variant='text'>
          <Avatar
            src={user.avatar}
            alt='avatar'
            className='w-8 h-8 mx-2 object-cover'
            variant='rounded'
          />
          <div>
            <p className='text-sm'>{user.name}</p>
            <p className='text-xs'>{user.about}</p>
          </div>
        </Button>
      </PopoverHandler>
      <PopoverContent
        {...triggers}
        className='max-w-[24rem] flex gap-2 bg-blue-50'>
        <Avatar
          size='md'
          variant='circular'
          src={user.avatar}
          alt={user.name}
        />
        <div>
          <Typography
            variant='h6'
            color='blue-gray'
            className='flex items-center gap-2 font-medium'>
            <p className='text-sm'>{user.name}</p>
          </Typography>
          <Typography
            variant='small'
            color='gray'
            className='font-normal'>
            <p className='text-xs'>{user.about}</p>
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  );
}
