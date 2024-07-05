import React from "react";
import { useEffect } from "react";
import Wrapper from "../components/Wrapper";

import axios from "axios";

function GoogleLogin() {
  // 현재 URL 가져오기
  const currentUrl = window.location.href;

  // URLSearchParams를 사용하여 쿼리 파라미터 추출
  const urlParams = new URLSearchParams(currentUrl.split("?")[1]);
  const code = urlParams.get("code");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    console.log(code);
    if (code) {
      transferCodeToServer(code);
    }

    async function transferCodeToServer(code: string) {
      const res = await axios.post(
        `${process.env.SERVER_URL}/auth/google/redirect`,
        {
          code,
        },
      );
      console.log(res);
      setMessage(res.data);
    }
  }, []);

  return (
    <Wrapper>
      <h1>Google Login</h1>
      <p>로딩중...</p>
      <p>{JSON.stringify(message, null, 2)}</p>
    </Wrapper>
  );
}

export default GoogleLogin;
