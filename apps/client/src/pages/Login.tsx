import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";
import axios from "axios";

function handleKakaoLogin() {
  console.log("Kakao Login~~!");
}

async function handleGoogleLogin() {
  const url = `${process.env.SERVER_URL}/auth/google`;
  const res = await axios.post(url);
  window.location.href = res.data.GoogleAuthUrl;
}

function Login() {
  return (
    <Wrapper>
      <h1>Login</h1>
      <Link to="/signup">Sign Up</Link>
      <Button
        type="kakao"
        label="Kakao로 시작하기"
        onClick={handleKakaoLogin}
      />
      <Button
        type="google"
        label="Google로 시작하기"
        onClick={handleGoogleLogin}
      />
    </Wrapper>
  );
}

export default Login;
