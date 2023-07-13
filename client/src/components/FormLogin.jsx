import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { Spinner } from '@material-tailwind/react';

export default function FormLogin({ handleSubmitLogin, setIsInfoFailLoginPopupOpen, isLoading }) {
  const { isFormValid, errors, handleChangeValidation, inputsValid, setInputsValid, values } = useFormAndValidation();
  const { email, password } = values;

  useEffect(() => {
    //при монтировании инпуты валидны
    setInputsValid({ email: true, password: true });
  }, []);

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
        <div className='flex flex-col gap-2'>
          <Input
            size='lg'
            type='email'
            name='email'
            value={email || ''}
            className={`placeholder:text-center ${!inputsValid.email ? 'border-b-2 border-b-red-700' : ''}`}
            placeholder='Введите email'
            onChange={(e) => {
              handleChangeValidation(e);
              setIsInfoFailLoginPopupOpen(false);
            }}
            required
          />
          <span className='block h-8 text-xs text-red-700 overflow-hidden'>{errors.email || ''}</span>
          <Input
            type='password'
            size='lg'
            name='password'
            value={password || ''}
            className={`placeholder:text-center ${!inputsValid.password ? 'border-b-2 border-b-red-700' : ''}`}
            placeholder='Введите пароль'
            onChange={(e) => {
              handleChangeValidation(e);
              setIsInfoFailLoginPopupOpen(false);
            }}
            minLength='6'
            required
          />
          <span className='block h-8 text-xs text-red-700 overflow-hidden'>{errors.password || ''}</span>
        </div>

        <Button
          className='mt-2 h-12 flex justify-center items-center'
          fullWidth
          type='submit'
          disabled={!isFormValid}>
          {!isLoading ? 'Войти' : <Spinner />}
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
