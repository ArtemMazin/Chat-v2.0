import { Button, IconButton, Input } from '@material-tailwind/react';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function TextArea({
  handleMessage,
  handlePrivateMessage,
  inputRef,
  isEdit,
  setIsEdit,
  message,
  setMessage,
}) {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [emojiIsOpen, setEmojiIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => setMessage((prev) => `${prev || ''}${selectedEmoji.emoji || ''}`), [selectedEmoji, setMessage]);

  function handleEmojiSelect(emoji) {
    setSelectedEmoji(emoji);
    setEmojiIsOpen(false);
  }
  function handleEmojiButton() {
    setEmojiIsOpen(!emojiIsOpen);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isEdit) {
      console.log(isEdit);
      location.pathname === '/' ? handleMessage(e, message) : handlePrivateMessage(e, message);
      setMessage('');
    } else {
      location.pathname === '/' ? handleMessage(e, message) : handlePrivateMessage(e, message);
      setMessage('');
    }
    setIsEdit(false);
  }

  async function handleCancel() {
    setMessage('');
    await setIsEdit((v) => !v);
  }

  return (
    <form
      className='relative'
      onSubmit={handleSubmit}>
      <input
        className='w-full p-1 placeholder:text-xs'
        placeholder='Введите сообщение'
        value={message || ''}
        ref={inputRef}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className='w-full relative flex justify-between py-1.5'>
        <IconButton
          size='sm'
          className='rounded-md text-lg'
          onClick={handleEmojiButton}>
          &#128512;
        </IconButton>
        {emojiIsOpen && (
          <div className='absolute bottom-full left-0'>
            <EmojiPicker
              height={200}
              searchDisabled={true}
              previewConfig={{ showPreview: false }}
              emojiStyle='native'
              onEmojiClick={handleEmojiSelect}
            />
          </div>
        )}
        <div className='flex gap-2'>
          <Button
            size='sm'
            color='red'
            variant='text'
            className='rounded-md'
            onClick={handleCancel}>
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
