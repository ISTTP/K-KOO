import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import GoogleLogin from './pages/GoogleLogin';
import KakaoLogin from './pages/KakaoLogin';
import Cake from './pages/Cake';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<KakaoLogin />} />
      <Route path="/auth/google" element={<GoogleLogin />} />
      <Route path="/cake" element={<Cake />} />
    </Routes>
  );
}

export default App;
