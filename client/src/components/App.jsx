import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import ProtectedRouteElement from './ProtectedRouteElement';
import Main from './Main';
import { getUsers, login, register } from '../utils/api';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSubmitLogin = (e, email, password) => {
    e.preventDefault();

    const handleLogin = () => setLoggedIn(true);

    login(email, password)
      .then((data) => {
        handleLogin();
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitRegistration = (e, email, password) => {
    e.preventDefault();
    register(email, password)
      .then((res) => {
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        navigate('/sign-up', { replace: true });
      });
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

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/sign-up'
          element={
            <FormRegister
              handleSubmitRegistration={handleSubmitRegistration}
              email={email}
              password={password}
              setEmail={setEmail}
              setpassword={setpassword}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <FormLogin
              email={email}
              password={password}
              setEmail={setEmail}
              setpassword={setpassword}
              handleSubmitLogin={handleSubmitLogin}
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
