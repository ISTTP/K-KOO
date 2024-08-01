import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "#components/common/Input.tsx";
import Button from "#components/common/Button.tsx";
import {
  TitleWrapper,
  Title,
  SubTitle,
  InputWrapper,
  WarningWrapper,
  Warning
} from "#components/signup/common.tsx";

type ButtonType = 'disabled' | 'default' | 'loading';

const PasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, loginType } = location.state;
  const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');

  function handleValidPassword(password: string) {
    if (password) {
      const isPasswordValid = pattern.test(password);
      const isPasswordLengthValid = password.length >= 6 && password.length <= 20;
      setIsPasswordValid(isPasswordValid);
      setIsPasswordLengthValid(isPasswordLengthValid);
      setButtonType(isPasswordValid && isPasswordLengthValid && isPasswordCheckValid ? 'default' : 'disabled');
    }
  }

  function handleValidPasswordCheck(passwordCheck: string) {
    if (passwordCheck) {
      const isPasswordCheckValid = password === passwordCheck;
      setIsPasswordCheckValid(isPasswordCheckValid);
      setButtonType(isPasswordValid && isPasswordLengthValid && isPasswordCheckValid ? 'default' : 'disabled');
    }
  }

  function handleSubmit() {
    navigate('/signup/email', {
      state: {
        id,
        loginType,
        password,
      }
    })
  }

  return (
    <>
      <TitleWrapper>
        <Title>비밀번호 입력하기</Title>
        <SubTitle>사용하실 비밀번호를 입력해주세요.</SubTitle>
      </TitleWrapper>

      <InputWrapper>
        <Input
          $isValid={isPasswordValid && isPasswordLengthValid}
          type="password"
          placeholder="6~20자 이내 영문 대소문자, 숫자, 특수문자 포함"
          maxLength={20}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleValidPassword(e.target.value);
            handleValidPasswordCheck(e.target.value);
          }}
        />
        <Input
          $isValid={isPasswordCheckValid}
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value)
            handleValidPasswordCheck(e.target.value);
          }}
        />
      </InputWrapper>

      <WarningWrapper>
        {!isPasswordLengthValid &&
          <Warning>비밀번호는 6자 이상 20자 이하여야합니다.</Warning>
        }
        {!isPasswordValid &&
          <Warning>비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야합니다.</Warning>
        }
        {!isPasswordCheckValid &&
          <Warning>비밀번호가 일치하지 않습니다.</Warning>
        }
      </WarningWrapper>

      <Button
        type={buttonType}
        onClick={handleSubmit}
      >
        계속하기
      </Button>
    </>
  );
}

export default PasswordForm;
