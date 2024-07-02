import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../components/Wrapper";

type UserInfo = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

function GoogleLogin() {
  const location = useLocation();
  const accessToken = new URLSearchParams(location.hash).get("#access_token");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (accessToken) {
      getProfile(accessToken)
        .then((data: UserInfo) => {
          setUserInfo(data);
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [accessToken]);

  const getProfile = async (accessToken: string) => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
    return await response.json();
  };

  return (
    <Wrapper>
      <h1>Google Login</h1>
      {userInfo ? (
        <div>
          <p>email: {userInfo.email}</p>
          <p>name: {userInfo.name}</p>
          <p>
            picture: <img src={userInfo.picture} alt="Profile" />
          </p>
        </div>
      ) : (
        <p>로딩중...</p>
      )}
    </Wrapper>
  );
}

export default GoogleLogin;
