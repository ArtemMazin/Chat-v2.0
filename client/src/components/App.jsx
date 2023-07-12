import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import ProtectedRouteElement from './ProtectedRouteElement';
import Main from './Main';
import { changeProfileData, getProfileData, getUsers, login, logout, register } from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';

const socket = io('http://localhost:5000', {
  credentials: 'include',
});

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('messageList', ({ message, currentUser }) => {
      setMessageList((_state) => [..._state, { message, currentUser }]);
    });
  }, []);

  function handleMessage(e) {
    e.preventDefault();
    socket.emit('sendMessage', { message, currentUser });
    setMessage('');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    changeProfileData(user)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleSubmitLogin = (e, email, password) => {
    e.preventDefault();
    setIsLoading(true);

    const handleLogin = () => setLoggedIn(true);

    login(email, password)
      .then((data) => {
        handleLogin();
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSubmitRegistration = (e, name, email, password) => {
    e.preventDefault();
    setIsLoading(true);

    register(name, email, password)
      .then((res) => {
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  //токен
  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      getUsers()
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([getUsers(), getProfileData()])
        .then(([usersArray, userInfo]) => {
          setUsers(usersArray.data);
          setCurrentUser(userInfo.data);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  function onLogout() {
    logout()
      .then(() => setLoggedIn(false))
      .catch((err) => console.log(err));
  }

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/sign-up'
          element={
            <FormRegister
              handleSubmitRegistration={handleSubmitRegistration}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <FormLogin
              handleSubmitLogin={handleSubmitLogin}
              isLoading={isLoading}
            />
          }
        />

        <Route
          path='/'
          element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              users={users}
              onLogout={onLogout}
              currentUser={currentUser}
              message={message}
              setMessage={setMessage}
              handleMessage={handleMessage}
              messageList={messageList}
              handleEditAvatarClick={handleEditAvatarClick}
            />
          }
        />
        <Route
          path='*'
          element={
            <Navigate
              to='/'
              replace
            />
          }
        />
      </Routes>
      <EditAvatarPopup
        isOpen={handleEditAvatarClick}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        currentUser={currentUser}
        handleUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
    </div>
  );
}
