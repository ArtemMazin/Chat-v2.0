import { Button, IconButton, Input } from '@material-tailwind/react';
import { LinkIcon } from '@heroicons/react/24/outline';

export default function TextArea({ message, setMessage, handleMessage }) {
  return (
    <form
      className='relative'
      onSubmit={handleMessage}>
      <Input
        variant='outlined'
        label='Сообщение'
        value={message || ''}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className='w-full flex justify-between py-1.5'>
        <IconButton
          variant='text'
          color='blue-gray'
          size='sm'>
          <LinkIcon
            strokeWidth={2}
            className='w-4 h-4'
          />
        </IconButton>
        <div className='flex gap-2'>
          <Button
            size='sm'
            color='red'
            variant='text'
            className='rounded-md'>
            Отмена
          </Button>
          <Button
            size='sm'
            className='rounded-md'
            type='submit'>
            Отправить
          </Button>
        </div>
      </div>
    </form>
  );
}
