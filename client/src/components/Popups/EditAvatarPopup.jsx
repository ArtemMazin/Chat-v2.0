import React, { useContext, useEffect } from 'react';
import { Button, Dialog, DialogBody, Input, Textarea, Spinner } from '@material-tailwind/react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function EditAvatarPopup({ isOpen, isEditAvatarPopupOpen, handleUpdateUser, isLoading }) {
  const { errors, handleChangeValidation, inputsValid, setInputsValid, resetForm, values, setValues } =
    useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    //сначала очищаем форму при открытии
    resetForm();
    //при открытии попапа инпуты валидны
    setInputsValid({ avatar: true, name: true, about: true });
    //в данном попапе инпуты заполнены при открытии
    setValues({ avatar: currentUser.avatar, name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen, resetForm, setInputsValid, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(values);
  }
  return (
    <React.Fragment>
      <Dialog
        className='rounded-none'
        open={isEditAvatarPopupOpen}
        handler={isOpen}>
        <img
          src={currentUser.avatar}
          alt='Фотография профиля'
          className='max-h-96 w-full object-cover'
        />
        <DialogBody divider>
          <form
            className='grid'
            onSubmit={handleSubmit}>
            <Input
              type='url'
              label='Аватар'
              name='avatar'
              onChange={handleChangeValidation}
              value={values.avatar || ''}
              className={`${!inputsValid.avatar ? 'border-b-2 border-b-red-700' : ''}`}
            />
            <span
              id='avatar-error'
              className='block h-6 text-xs text-red-700 overflow-hidden'>
              {errors.avatar || ''}
            </span>
            <Input
              type='text'
              label='Имя'
              name='name'
              minLength='2'
              maxLength='20'
              onChange={handleChangeValidation}
              value={values.name || ''}
              className={`${!inputsValid.name ? 'border-b-2 border-b-red-700' : ''}`}
            />
            <span
              id='name-error'
              className='block h-6 text-xs text-red-700 overflow-hidden'>
              {errors.name || ''}
            </span>
            <Textarea
              label='Описание'
              name='about'
              minLength='2'
              maxLength='150'
              onChange={handleChangeValidation}
              value={values.about || ''}
              className={`${!inputsValid.about ? 'border-b-2 border-b-red-700' : ''}`}
            />
            <span
              id='about-error'
              className='block h-6 text-xs text-red-700 overflow-hidden'>
              {errors.about || ''}
            </span>
            <div className='space-x-2 flex justify-end'>
              <Button
                variant='outlined'
                color='red'
                onClick={isOpen}>
                Отмена
              </Button>
              <Button
                variant='gradient'
                type='submit'
                color='green'
                onClick={isOpen}>
                {!isLoading ? 'Сохранить' : <Spinner />}
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </React.Fragment>
  );
}
