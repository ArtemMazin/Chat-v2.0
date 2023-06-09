import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FormLogin from './FormLogin';
import ProtectedRouteElement from './ProtectedRouteElement';
import Main from './Main';
import { login } from '../utils/api';

export default function App() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmitLogin = (e, userName, userPassword) => {
    e.preventDefault();

    const handleLogin = () => setLoggedIn(true);

    login(userName, userPassword)
      .then((data) => {
        handleLogin();
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/sign-in'
          element={
            <FormLogin
              userName={userName}
              userPassword={userPassword}
              setUserName={setUserName}
              setUserPassword={setUserPassword}
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
