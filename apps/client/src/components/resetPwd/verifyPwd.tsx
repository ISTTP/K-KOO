import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "#components/common/Input.tsx";
import Button from "#components/common/Button.tsx";
import * as S from '#styles/SignUpStyle.ts';

import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import { ButtonType } from '@isttp/types/all';
import { handleButtonClick, hashPassword } from "#utils";


const VerifyPwd = () => {
  const navigate = useNavigate();
  const submitButton = useRef<HTMLButtonElement>(null);


  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
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

  function handleValidPassword(password: string) {
    if (password) {
      const isPasswordValid = password.length >= 6 && password.length <= 20;
      setIsPasswordValid(isPasswordValid);
      setButtonType(isPasswordValid ? 'default' : 'disabled');
    }
  }

  async function handleSubmit() {
    setButtonType('loading');

    try {
      const res = await axiosInstance.post('/verify/password', {
        password: hashPassword(password),
      });

      if (res.status === 200) {
        navigate('/reset/pwd/new');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // 비밀번호 불일치
        if (error.response?.status === 400) {
          setIsValid(false);
          setButtonType('disabled');
        }

        // 권한 없음
        if (error.response?.status === 401) {
          setButtonType('disabled');
          // 모달 처리
        }

        // 서버 에러
        if (error.response?.status === 500) {
          setButtonType('disabled');
          // 모달 처리
        }
      }
    }
  }

  return (
    <>
      <S.TitleWrapper>
        <S.Title>기존 비밀번호 입력</S.Title>
        <S.SubTitle>보안을 위해 기존 비밀번호를 입력해주세요.</S.SubTitle>
      </S.TitleWrapper>

      <S.InputWrapper>
        <Input
          autoFocus
          $isValid={isValid && isPasswordValid}
          disabled={buttonType === 'loading'}
          type="password"
          placeholder="6~20자 이내 기존 비밀번호 입력"
          maxLength={20}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsValid(true);
            handleValidPassword(e.target.value);
          }}
        />
      </S.InputWrapper>
      <S.WarningWrapper>
        {!isValid && <S.Warning>비밀번호가 일치하지 않습니다.</S.Warning>}
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

export default VerifyPwd;
