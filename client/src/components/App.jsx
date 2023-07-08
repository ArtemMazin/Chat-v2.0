import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import ProtectedRouteElement from './ProtectedRouteElement';
import Main from './Main';
import { getUsers, login, logout, register } from '../utils/api';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
      Promise.all([getUsers()])
        .then(([usersArray]) => {
          setUsers(usersArray.data);
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
    </div>
  );
}
