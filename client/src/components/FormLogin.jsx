import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function FormLogin({ email, password, setEmail, setpassword, handleSubmitLogin }) {
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
      <form
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
        onSubmit={(e) => handleSubmitLogin(e, email, password)}>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            size='lg'
            type='text'
            name='email'
            className='placeholder:text-center'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type='password'
            size='lg'
            name='password'
            className='placeholder:text-center'
            placeholder='password'
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>

        <Button
          className='mt-6'
          fullWidth
          type='submit'>
          Login
        </Button>
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
