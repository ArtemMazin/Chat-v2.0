import React from 'react';
import { Alert, Button } from '@material-tailwind/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function InfoFailLoginPopup({ isOpen, setIsInfoFailLoginPopupOpen, errorMessage }) {
  return (
    <React.Fragment>
      <Alert
        variant='gradient'
        color='red'
        className='max-w-md absolute top-0 left-0'
        open={isOpen}
        icon={<ExclamationTriangleIcon className='h-6 w-6' />}
        action={
          <Button
            variant='text'
            color='white'
            size='sm'
            className='!absolute top-3 right-3'
            onClick={() => setIsInfoFailLoginPopupOpen(false)}>
            Закрыть
          </Button>
        }>
        {errorMessage}
      </Alert>
    </React.Fragment>
  );
}
