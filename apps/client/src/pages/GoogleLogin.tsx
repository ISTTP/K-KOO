import React from "react";
import { useEffect } from "react";
import Wrapper from "../components/Wrapper";

import axios from "axios";

function GoogleLogin() {
  const currentUrl = new URL(window.location.href);
  const code = currentUrl.searchParams.get("code");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (code) transferCodeToServer(code).then(setMessage);
  }, [code]);

  return (
    <Wrapper>
      <h1>Google Login</h1>
      {!message && <p>Loading...</p>}
      {message && <p>{JSON.stringify(message, null, 2)}</p>}
    </Wrapper>
  );
}

export default GoogleLogin;

async function transferCodeToServer(code: string) {
  const url = `${process.env.SERVER_URL}/auth/google/redirect`;
  const res = await axios.post(url, {
    code,
  });
  return res.data;
}
