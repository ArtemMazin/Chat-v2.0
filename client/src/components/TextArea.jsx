import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Textarea } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function TextArea() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        className='mr-8 self-end'>
        Message Dialog
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}>
        <div className='flex items-center justify-between'>
          <DialogHeader>New message</DialogHeader>
          <XMarkIcon
            className='mr-3 h-5 w-5'
            onClick={handleOpen}
          />
        </div>
        <DialogBody divider>
          <div className='grid gap-6'>
            <Textarea label='Message' />
          </div>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button
            variant='outlined'
            color='red'
            onClick={handleOpen}>
            close
          </Button>
          <Button
            variant='gradient'
            color='green'
            onClick={handleOpen}>
            send message
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}
