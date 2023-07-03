import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import ProtectedRouteElement from './ProtectedRouteElement';
import Main from './Main';
import { login, register } from '../utils/api';

export default function App() {
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmitLogin = (e, email, userPassword) => {
    e.preventDefault();

    const handleLogin = () => setLoggedIn(true);

    login(email, userPassword)
      .then((data) => {
        handleLogin();
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitRegistration =(e, email, userPassword)=>{
    e.preventDefault();
    register(email, userPassword).then((res) => { 
      navigate('/sign-in', { replace: true }); 
    }) 
    .catch((err) => { 
      console.log(err); 
      navigate('/sign-up', { replace: true }); 
    }) 
  
  }

  return (
    <div className='App'>
      <Routes>
      <Route
          path='/sign-up'
          element={
            <FormRegister
            handleSubmitRegistration={handleSubmitRegistration}
            email={email}
              userPassword={userPassword}
              setEmail={setEmail}
              setUserPassword={setUserPassword}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <FormLogin
              email={email}
              userPassword={userPassword}
              setEmail={setEmail}
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
