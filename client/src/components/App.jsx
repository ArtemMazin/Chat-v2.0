import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FormLogin from './FormLogin';
import ProtectedRouteElement from './ProtectedRouteElement';
import Main from './Main';
import { login } from '../utils/api';

export default function App() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmitLogin = (e, userName) => {
    e.preventDefault();

    login(userName)
      .then((data) => {
        console.log(data);
        navigate('/main', { replace: true });
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
              setUserName={setUserName}
              handleSubmitLogin={handleSubmitLogin}
            />
          }
        />
        <Route
          path='/main'
          element={<Main />}
        />
        {/* <Route
      path="/"
      element={
        <ProtectedRouteElement
          element={Main}
          loggedIn={loggedIn}
        />
      }
    /> */}
        <Route
          path='*'
          element={
            <Navigate
              to='/sign-in'
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}
