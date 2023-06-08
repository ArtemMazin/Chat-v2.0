import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FormLogin from '../FormLogin';
import ProtectedRouteElement from './ProtectedRouteElement';
import Main from '../mainPage/Main';

// const navigate = useNavigate();

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/sign-in'
        element={<FormLogin />}
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
  );
};

export default AppRoutes;
