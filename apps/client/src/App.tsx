import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { requestPermission } from '#firebase';
import Loading from '#components/common/Loading.tsx';
import './App.css';


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
const FindId = lazy(() =>
  import('#pages/FindId.tsx').then((module) => ({ default: module.FindId })),
);
const FindPwd = lazy(() =>
  import('#pages/FindPwd.tsx').then((module) => ({ default: module.FindPwd })),
);
const ResetPwd = lazy(() =>
  import('#pages/ResetPwd.tsx').then((module) => ({ default: module.ResetPwd })),
);

const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/:step" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/auth/kakao" element={<KakaoLogin />} />
        <Route path="/auth/google" element={<GoogleLogin />} />
        <Route path="/cake/:ownerId" element={<Cake />} />
        <Route path="/cake/create/:ownerId" element={<CreateCake />} />
        <Route path="/letter/choose/:ownerId" element={<ChooseCandle />} />
        <Route path="/letter/create/:ownerId" element={<CreateLetter />} />
        <Route path="/myletter" element={<MyLetter />} />
        <Route path="/find/id/:step" element={<FindId />} />
        <Route path="/find/pwd" element={<FindPwd />} />
        <Route path="/reset/pwd/:step" element={<ResetPwd />} />
      </Routes>
    </Suspense>
  );
};

export default App;
