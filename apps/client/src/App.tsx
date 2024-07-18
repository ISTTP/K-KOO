import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '#pages/Login.tsx';
import SignUp from '#pages/Signup.tsx';
import MyPage from '#pages/MyPage.tsx';
import GoogleLogin from '#pages/GoogleLogin.tsx';
import KakaoLogin from '#pages/KakaoLogin.tsx';
import Cake from '#pages/Cake.tsx';
import CreateCake from '#pages/CreateCake.tsx';
import ChooseCandle from '#pages/ChooseCandle.tsx';
import CreateLetter from '#pages/CreateLetter.tsx';
import './App.css';
import { requestPermission } from './firebase-messaging-sw';

const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/auth/kakao" element={<KakaoLogin />} />
      <Route path="/auth/google" element={<GoogleLogin />} />
      <Route path="/cake/:ownerId" element={<Cake />} />
      <Route path="/cake/create/:ownerId" element={<CreateCake />} />
      <Route path="/letter/choose/:ownerId" element={<ChooseCandle />} />
      <Route path="/letter/create/:ownerId" element={<CreateLetter />} />
    </Routes>
  );
};

export default App;
