import TextArea from './TextArea';
import HeaderNavbar from './HeaderNavbar';
import Chat from './Chat';
import Sidebar from './Sidebar';

const Main = ({ users, setLoggedIn }) => {
  return (
    <div className='container h-screen flex flex-col'>
      <HeaderNavbar setLoggedIn={setLoggedIn} />

      <Sidebar users={users} />
      <Chat />

      <TextArea />
    </div>
  );
};

export default Main;
