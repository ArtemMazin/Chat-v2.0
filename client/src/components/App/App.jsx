import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FormLogin from '../FormLogin/FormLogin';
import FormRegister from '../FormRegister/FormRegister';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import Main from '../Main/Main';
import { changeProfileData, getProfileData, login, logout, register } from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditAvatarPopup from '../Popups/EditAvatarPopup';
import PopupWithError from '../Popups/PopupWithError';
import { SocketContext } from '../../contexts/SocketContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  credentials: 'include',
  withCredentials: true,
  auth: {
    userID: localStorage.getItem('userID') || '',
    userName: localStorage.getItem('name') || '',
  },
});

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoFailLoginPopupOpen, setIsInfoFailLoginPopupOpen] = useState(false);
  const [isInfoFailRegistrationPopupOpen, setIsInfoFailRegistrationPopupOpen] = useState(false);
  const [errorMessageLogin, setErrorMessageLogin] = useState('');
  const [errorMessageRegistration, setErrorMessageRegistration] = useState('');

  const navigate = useNavigate();
  // console.count('count App');

  //токен
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('name', currentUser.name);
    localStorage.setItem('userID', currentUser._id);
  }, [currentUser]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([getProfileData()])
        .then(([userInfo]) => {
          setCurrentUser(userInfo.data);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  function showInfoFailLoginPopup() {
    setIsInfoFailLoginPopupOpen(true);
  }
  function showInfoFailRegistrationPopup() {
    setIsInfoFailRegistrationPopupOpen(true);
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

  function onLogout() {
    logout()
      .then(() => setLoggedIn(false))
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SocketContext.Provider value={socket}>
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
                  onLogout={onLogout}
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
                  onLogout={onLogout}
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
      </SocketContext.Provider>
    </CurrentUserContext.Provider>
  );
}
