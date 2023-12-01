import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/authReducer';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from "./store";

// Importing react toastify library ------>>
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Home from './pages/home_page/home';
import Login from "./pages/login_page/login";


function App() {
  const {isLogin} = useSelector(authSelector);
  console.log("Inside app.js & login status is : ", isLogin);
  
  return (
    <div className="App">
      <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route index = {true} element={isLogin ? <Home /> : <Navigate to="/login" />}/>
        <Route path='/login' element={isLogin? <Navigate to="/"/> : <Login />}/>
      </Routes>      
      </PersistGate>
      <ToastContainer />
    </div>
  );
}

export default App;
