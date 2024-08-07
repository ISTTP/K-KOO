import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "#components/common/Input.tsx";
import Button from "#components/common/Button.tsx";
import * as S from '#styles/SignUpStyle.ts';

import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import { ButtonType } from '@isttp/types/all';
import { handleButtonClick, hashPassword } from "#utils";


const SetNewPwd = () => {
  const navigate = useNavigate();
  const submitButton = useRef<HTMLButtonElement>(null);
  const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');

  useEffect(() => {
    window.addEventListener('keydown', handleEnterKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEnterKeyDown);
    }
  }, [buttonType])

  function handleEnterKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleButtonClick({ buttonType, submitButton: submitButton.current });
    }
  }

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

  async function handleSubmit() {
    setButtonType('loading');

    try {
      const res = await axiosInstance.put('/user/me', {
        password: hashPassword(password),
      });

      if (res.status === 200) {
        // 비밀번호 변경 성공 모달
        navigate('/mypage');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // 권한 없음
        if (error.response?.status === 401) {
          // 모달 처리
          setButtonType('disabled');
        }

        // 서버 에러
        if (error.response?.status === 500) {
          // 모달 처리
          setButtonType('disabled');
        }
      }
    }
  }

  return (
    <>
      <S.TitleWrapper>
        <S.Title>새로운 비밀번호 입력</S.Title>
        <S.SubTitle>사용하실 새로운 비밀번호를 입력해주세요.</S.SubTitle>
      </S.TitleWrapper>

      <S.InputWrapper>
        <Input
          autoFocus
          $isValid={isPasswordValid && isPasswordLengthValid}
          disabled={buttonType === 'loading'}
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
          disabled={buttonType === 'loading'}
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value)
            handleValidPasswordCheck(e.target.value);
          }}
        />
      </S.InputWrapper>

      <S.WarningWrapper>
        {!isPasswordLengthValid &&
          <S.Warning>비밀번호는 6자 이상 20자 이하여야합니다.</S.Warning>
        }
        {!isPasswordValid &&
          <S.Warning>비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야합니다.</S.Warning>
        }
        {!isPasswordCheckValid &&
          <S.Warning>비밀번호가 일치하지 않습니다.</S.Warning>
        }
      </S.WarningWrapper>

      <Button
        ref={submitButton}
        type={buttonType}
        onClick={handleSubmit}
      >
        확인
      </Button>
    </>
  );
};

export default SetNewPwd;
