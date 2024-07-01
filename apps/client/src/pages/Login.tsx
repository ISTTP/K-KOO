import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";

function handleKakaoLogin() {
  console.log("Kakao Login!");
}

function handleGoogleLogin() {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=token&scope=email profile`;
  window.location.href = url;
}

console.log(process.env.SERVER_URL);

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
