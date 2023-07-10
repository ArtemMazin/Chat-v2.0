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
          className='h-12 w-full p-0 flex items-center gap-2 font-light border-b border-b-blue-50 normal-case text-left'
          variant='text'>
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
        </Button>
      </PopoverHandler>
      <PopoverContent
        {...triggers}
        className='max-w-[14rem] p-2 w-full flex gap-2 bg-blue-50'>
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
            className='font-medium text-sm'>
            {user.name}
          </Typography>
          <Typography
            variant='small'
            color='gray'
            className='font-normal text-xs'>
            {user.about}
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  );
}
