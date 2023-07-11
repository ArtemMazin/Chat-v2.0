import TextArea from './TextArea';
import HeaderNavbar from './HeaderNavbar';
import Chat from './Chat';
import Sidebar from './Sidebar';

const Main = ({
  users,
  currentUser,
  onLogout,
  handleEditAvatarClick,
  message,
  setMessage,
  messageList,
  handleMessage,
}) => {
  return (
    <div className='h-screen p-6 flex flex-col gap-2 bg-blue-50'>
      <HeaderNavbar
        currentUser={currentUser}
        onLogout={onLogout}
        handleEditAvatarClick={handleEditAvatarClick}
      />
      <div className='h-full flex gap-2'>
        <Sidebar
          users={users}
          currentUser={currentUser}
        />
        <div className='h-full w-full flex flex-col gap-2'>
          <Chat messageList={messageList} />
          <TextArea
            setMessage={setMessage}
            handleMessage={handleMessage}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
