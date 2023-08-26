import Content from './Content';
import HeaderNavbar from './HeaderNavbar';

const Main = ({ users, currentUser, onLogout, handleEditAvatarClick, messagesDB }) => {
  return (
    <div className='px-8 pt-2 pb-2 h-screen flex flex-col gap-2 bg-blue-50'>
      <HeaderNavbar
        currentUser={currentUser}
        onLogout={onLogout}
        handleEditAvatarClick={handleEditAvatarClick}
      />
      <Content
        users={users}
        currentUser={currentUser}
        messagesDB={messagesDB}
      />
    </div>
  );
};

export default Main;
