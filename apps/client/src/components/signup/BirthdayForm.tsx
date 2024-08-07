import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Input from '#components/common/Input.tsx';
import Button from '#components/common/Button.tsx';
import * as S from '#styles/SignUpStyle.ts';

import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import { getFcmToken } from '#firebase';
import { ButtonType } from '@isttp/types/all';
import { handleButtonClick, hashPassword } from '#utils';

const BirthdayForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const submitButton = useRef<HTMLButtonElement>(null);
  const { id, password, email, nickname, loginType } = location.state;

  const [birthday, setBirthday] = useState('');
  const [isBirthdayValid, setIsBirthdayValid] = useState(true);
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

  function handleValidBirthday(birthday: string) {
    if (birthday) {
      const isBeforeToday = new Date(birthday) < new Date();
      setIsBirthdayValid(isBeforeToday);
      setButtonType(isBeforeToday ? 'default' : 'disabled');
    }
  }

  async function handleSubmit() {
    setButtonType('loading');

    try {
      const hashedPassword = hashPassword(password);
      const response = await axiosInstance.post(
        '/auth/signup',
        {
          id,
          password: hashedPassword,
          email,
          nickname: nickname,
          birthday: `${birthday}T00:00:00.000Z`, // ISO 8601
          loginType,
        },
        { withCredentials: true },
      );
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        if (Notification.permission === 'granted') {
          getFcmToken();
        }
        navigate(`/cake/${response.data.userId}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert('회원가입에 실패했습니다.');
        setButtonType('default');
      }
    }
  }

  return (
    <>
      <S.TitleWrapper>
        <S.Title>생년월일 입력하기</S.Title>
        <S.SubTitle>생년월일을 입력해주세요.</S.SubTitle>
      </S.TitleWrapper>

      <S.InputWrapper>
        <Input
          autoFocus
          $isValid={true}
          disabled={buttonType === 'loading'}
          type="date"
          value={birthday}
          onChange={(e) => {
            setBirthday(e.target.value);
            handleValidBirthday(e.target.value);
          }}
        />
      </S.InputWrapper>

      <S.WarningWrapper>
        {!isBirthdayValid && <S.Warning>올바른 생년월일을 입력해주세요.</S.Warning>}
      </S.WarningWrapper>

      <Button
        ref={submitButton}
        type={buttonType}
        onClick={handleSubmit}
      >
        확인
      </Button>
    </>
  )
};

export default BirthdayForm;
