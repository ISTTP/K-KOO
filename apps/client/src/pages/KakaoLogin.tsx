import React from "react";

const KakaoLogin = () => {
  const authorizationCode = new URL(window.location.href).searchParams.get(
    "code",
  );
  console.log(authorizationCode);

  return <div>카카오</div>;
};

export default KakaoLogin;
