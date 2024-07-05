import React, { useEffect } from "react";
import axiosInstance from "../apis/axios";
import Wrapper from "../components/Wrapper";

const KakaoLogin = () => {
  const code = new URL(document.location.toString()).searchParams.get("code");

  useEffect(() => {
    if (code) {
      getTokens(code);
    }

    async function getTokens(code: string) {
      const res = await axiosInstance.post(`/auth/kakao/login`, {
        code,
      });
      console.log(res);
    }
  }, []);

  return (
    <Wrapper>
      <h1>카카오로그인</h1>;
    </Wrapper>
  );
};

export default KakaoLogin;
