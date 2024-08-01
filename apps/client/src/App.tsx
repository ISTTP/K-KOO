import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { requestPermission } from '#firebase';

const MyPage = lazy(() =>
  import('#pages/MyPage.tsx').then((module) => ({ default: module.MyPage })),
);
const Cake = lazy(() =>
  import('#pages/Cake.tsx').then((module) => ({ default: module.Cake })),
);
const Login = lazy(() =>
  import('#pages/Login.tsx').then((module) => ({ default: module.Login })),
);
const GoogleLogin = lazy(() =>
  import('#pages/GoogleLogin.tsx').then((module) => ({
    default: module.GoogleLogin,
  })),
);
const KakaoLogin = lazy(() =>
  import('#pages/KakaoLogin.tsx').then((module) => ({
    default: module.KakaoLogin,
  })),
);
const SignUp = lazy(() =>
  import('#pages/SignUp.tsx').then((module) => ({ default: module.SignUp })),
);
const CreateCake = lazy(() =>
  import('#pages/CreateCake.tsx').then((module) => ({
    default: module.CreateCake,
  })),
);
const ChooseCandle = lazy(() =>
  import('#pages/ChooseCandle.tsx').then((module) => ({
    default: module.ChooseCandle,
  })),
);
const CreateLetter = lazy(() =>
  import('#pages/CreateLetter.tsx').then((module) => ({
    default: module.CreateLetter,
  })),
);
const MyLetter = lazy(() =>
  import('#pages/MyLetter.tsx').then((module) => ({
    default: module.MyLetter,
  })),
);

const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
        <Route path="/myletter" element={<MyLetter />} />

      </Routes>
    </Suspense>
  );
};

export default App;
