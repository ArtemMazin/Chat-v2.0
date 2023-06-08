import { Link } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

export default function FormLogin({ userName, setUserName, handleSubmitLogin }) {
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
        onSubmit={(e) => handleSubmitLogin(e, userName)}>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            size='lg'
            type='text'
            name='name'
            className='placeholder:text-center'
            placeholder='Username'
            onChange={(e) => setUserName(e.target.value)}
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

        <Button
          className='mt-6'
          fullWidth
          type='submit'>
          Login
        </Button>
      </form>
    </Card>
  );
}
