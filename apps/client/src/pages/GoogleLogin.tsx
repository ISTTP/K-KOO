import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axios";
import Wrapper from "../components/Wrapper";

type ResponseType = {
  success: boolean;
  access_token?: string;
  refresh_token?: string;
  id?: string;
  login_type?: string;
} | null;

function GoogleLogin() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const [response, setResponse] = useState<ResponseType>(null);

  async function transferCodeToServer(code: string) {
    const res = await axiosInstance.post("/auth/google/login", {
      code,
    });
    return res.data;
  }

  useEffect(() => {
    if (code) {
      transferCodeToServer(code).then(setResponse);
    }
  }, [code]);

  useEffect(() => {
    if (!response) return;
    switch (response.success) {
      case true:
        navigate("/cake");
        break;
      case false:
        navigate("/signup", {
          state: { login_type: response.login_type, id: response.id },
        });
        break;
    }
  }, [response]);

  return (
    <Wrapper>
      <h1>구글 로그인</h1>
      <p>로딩중...</p>
    </Wrapper>
  );
}

export default GoogleLogin;
