import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Button from "../components/Button";
import axiosInstance from "../apis/axios";
import { AxiosError } from "axios";

interface SignUpProps {
  id: string;
  login_type: string;
}

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, login_type } = location.state as SignUpProps;
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");

  async function handleSignup() {
    if (!nickname || !birthday) {
      alert("닉네임과 생일을 모두 입력해주세요");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/auth/signup",
        {
          nickname,
          birthday: `${birthday}T00:00:00.000Z`, // ISO 8601
          id,
          login_type,
        },
        { withCredentials: true },
      );
      if (response.data.success) {
        alert("회원가입이 완료되었습니다.");
        navigate("/cake");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.message);
      }
    }
  }
  return (
    <Wrapper>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <Button type="default" label="확인" onClick={handleSignup} />
      <Link to="/">Login</Link>
    </Wrapper>
  );
}

export default SignUp;
