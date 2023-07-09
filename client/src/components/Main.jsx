import TextArea from './TextArea';
import HeaderNavbar from './HeaderNavbar';
import Chat from './Chat';
import Sidebar from './Sidebar';

const Main = ({ users, onLogout }) => {
  return (
    <div className='h-screen p-6 flex flex-col bg-blue-50'>
      <HeaderNavbar onLogout={onLogout} />

      <Sidebar users={users} />
      <Chat />

      <TextArea />
    </div>
  );
};

export default Main;
