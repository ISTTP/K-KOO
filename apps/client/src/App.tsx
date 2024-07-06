import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import GoogleLogin from "./pages/GoogleLogin";
import KakaoLogin from "./pages/KakaoLogin";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<KakaoLogin />} />
      <Route path="/auth/google" element={<GoogleLogin />} />
    </Routes>
  );
};

export default App;
