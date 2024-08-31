import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "#components/common/Input.tsx";
import Button from "#components/common/Button.tsx";
import * as S from '#styles/SignUpStyle.ts';

import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import { ButtonType } from '@isttp/types/all';
import { handleButtonClick } from "#utils";

const EnterEmail = () => {
  const navigate = useNavigate();
  const submitButton = useRef<HTMLButtonElement>(null);
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isExistEmail, setIsExistEmail] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');

  useEffect(() => {
    window.addEventListener('keydown', handleEnterKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEnterKeyDown);
    }
  }, [buttonType]);

  function handleEnterKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleButtonClick({ buttonType, submitButton: submitButton.current });
    }
  }

  function handleValidEmail(email: string) {
    if (email) {
      const isEmailValid = pattern.test(email);
      setIsEmailValid(isEmailValid);
      setButtonType(isEmailValid ? 'default' : 'disabled');
    }
  }

  async function handleSubmit() {
    setButtonType('loading');

    try {
      const res = await axiosInstance.post('/verify/email', {
        email,
        checkDuplicate: false,
      });

      if (res.status === 200) {
        navigate('/find/id/verify', { state: { email } });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setIsExistEmail(false);
          setButtonType('disabled');
        }
      }
    }
  }

  return (
    <>
      <S.TitleWrapper>
        <S.Title>아이디 찾기</S.Title>
        <S.SubTitle>회원가입시 사용했던 이메일을 입력해주세요.</S.SubTitle>
      </S.TitleWrapper>

      <S.InputWrapper>
        <Input
          autoFocus
          $isValid={isEmailValid && isExistEmail}
          disabled={buttonType === 'loading'}
          type="text"
          placeholder="ex) email@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsExistEmail(true);
            handleValidEmail(e.target.value);
          }}
        />
      </S.InputWrapper>
      <S.WarningWrapper>
        {!isEmailValid && <S.Warning>올바르지 않은 형식입니다.</S.Warning>}
        {!isExistEmail && <S.Warning>회원 정보가 존재하지 않습니다. </S.Warning>}
      </S.WarningWrapper>

      <Button
        ref={submitButton}
        type={buttonType}
        onClick={handleSubmit}
      >
        이메일 인증
      </Button>
    </>
  );
}

export default EnterEmail;
