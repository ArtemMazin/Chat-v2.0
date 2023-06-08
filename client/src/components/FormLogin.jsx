import { Link } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

export default function FormLogin() {
  return (
    <Card
      className='container max-w-md py-10'
      color='transparent'
      shadow={false}>
      <Typography
        variant='h4'
        color='blue-gray'>
        Sign In
      </Typography>
      <Typography
        color='gray'
        className='mt-1 font-normal'>
        Enter your details to login.
      </Typography>
      <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            size='lg'
            type='text'
            name='name'
            className='placeholder:text-center'
            placeholder='Username'
            required
          />
          <Input
            type='text'
            size='lg'
            name='room'
            className='placeholder:text-center'
            placeholder='Room'
            disabled
            // required
          />
        </div>
        <Link>
          <Button
            className='mt-6'
            fullWidth>
            Login
          </Button>
        </Link>
        <Typography
          color='gray'
          className='mt-4 text-center font-normal'>
          Go to registration{' '}
          <Link
            to={'/sign-up'}
            className='font-medium text-blue-500 transition-colors hover:text-blue-700'>
            Sign Up
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
