import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea } from '@material-tailwind/react';

export default function EditAvatarPopup({ handleEditAvatarClick, isEditAvatarPopupOpen, currentUser }) {
  return (
    <React.Fragment>
      <Dialog
        open={isEditAvatarPopupOpen}
        handler={handleEditAvatarClick}>
        <div className='flex items-center justify-between'>
          <DialogHeader className='max-w-full object-cover'>
            <img
              src={currentUser.avatar}
              alt='Фотография профиля'
              className='max-w-full object-cover'
            />
          </DialogHeader>
        </div>
        <DialogBody divider>
          <div className='grid gap-6'>
            <Input label='Аватар' />
            <Input label='Имя' />
            <Textarea label='Описание' />
          </div>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button
            variant='outlined'
            color='red'
            onClick={handleEditAvatarClick}>
            Отмена
          </Button>
          <Button
            variant='gradient'
            color='green'
            onClick={handleEditAvatarClick}>
            Сохранить
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}
