import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import ProtectedRouteElement from './ProtectedRouteElement';
import Main from './Main';
import { changeProfileData, getProfileData, getUsers, getMessages, login, logout, register } from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithError from './PopupWithError';

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
  const [messagesDB, setMessagesDB] = useState([]);
  const [isInfoFailLoginPopupOpen, setIsInfoFailLoginPopupOpen] = useState(false);
  const [isInfoFailRegistrationPopupOpen, setIsInfoFailRegistrationPopupOpen] = useState(false);
  const [errorMessageLogin, setErrorMessageLogin] = useState('');
  const [errorMessageRegistration, setErrorMessageRegistration] = useState('');

  function showInfoFailLoginPopup() {
    setIsInfoFailLoginPopupOpen(true);
  }
  function showInfoFailRegistrationPopup() {
    setIsInfoFailRegistrationPopupOpen(true);
  }

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

    login(email, password, setErrorMessageLogin)
      .then((data) => {
        handleLogin();
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        showInfoFailLoginPopup();
      })
      .finally(() => setIsLoading(false));
  };

  const handleSubmitRegistration = (e, name, email, password) => {
    e.preventDefault();
    setIsLoading(true);

    register(name, email, password, setErrorMessageRegistration)
      .then((res) => {
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        showInfoFailRegistrationPopup();
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
      Promise.all([getUsers(), getProfileData(), getMessages()])
        .then(([usersArray, userInfo, messages]) => {
          setUsers(usersArray.data);
          setCurrentUser(userInfo.data);
          setMessagesDB(messages.data);
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
              setIsInfoFailRegistrationPopupOpen={setIsInfoFailRegistrationPopupOpen}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <FormLogin
              handleSubmitLogin={handleSubmitLogin}
              setIsInfoFailLoginPopupOpen={setIsInfoFailLoginPopupOpen}
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
              messagesDB={messagesDB}
              setMessage={setMessage}
              handleMessage={handleMessage}
              messageList={messageList}
              handleEditAvatarClick={handleEditAvatarClick}
            />
          }
        />
        <Route
          path='/users/:id'
          element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              users={users}
              onLogout={onLogout}
              currentUser={currentUser}
              message={message}
              messagesDB={messagesDB}
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
      <PopupWithError
        isOpen={isInfoFailLoginPopupOpen}
        setIsOpen={setIsInfoFailLoginPopupOpen}
        errorMessage={errorMessageLogin}
      />
      <PopupWithError
        isOpen={isInfoFailRegistrationPopupOpen}
        setIsOpen={setIsInfoFailRegistrationPopupOpen}
        errorMessage={errorMessageRegistration}
      />
    </div>
  );
}
