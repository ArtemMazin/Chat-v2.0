import { List, Card } from '@material-tailwind/react';
import UserInfo from '../UserInfo/UserInfo';
import { useContext, useMemo } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Sidebar({ users, setSelectedUser }) {
  const currentUser = useContext(CurrentUserContext);

  const filteredUserList = useMemo(() => {
    if (users.length > 0) {
      return users.filter((user) => user._id !== currentUser._id);
    }
  }, [currentUser._id, users]);

  // console.count('count Sidebar');

  return (
    <Card className='w-80 h-full overflow-y-scroll rounded mobile:hidden'>
      <div className='py-2 text-blue-400 text-center border-b border-b-blue-50'>Список пользователей</div>
      <List className='p-0 gap-0 list-none'>
        {users.length > 0 &&
          filteredUserList.map((user) => (
            <li key={user._id}>
              <UserInfo
                user={user}
                setSelectedUser={setSelectedUser}
              />
            </li>
          ))}
      </List>
    </Card>
  );
}
