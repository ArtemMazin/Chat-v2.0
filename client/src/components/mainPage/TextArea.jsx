import { Button, IconButton, Input } from '@material-tailwind/react';

export default function TextArea() {
  return (
    <form className='relative lg:pr-6'>
      <Input
        variant='outlined'
        label='Your Comment'
      />
      <div className='w-full flex justify-between py-1.5'>
        <IconButton
          variant='text'
          color='blue-gray'
          size='sm'></IconButton>
        <div className='flex gap-2'>
          <Button
            size='sm'
            color='red'
            variant='text'
            className='rounded-md'>
            Cancel
          </Button>
          <Button
            size='sm'
            className='rounded-md'
            type='submit'>
            Post Comment
          </Button>
        </div>
      </div>
    </form>
  );
}
