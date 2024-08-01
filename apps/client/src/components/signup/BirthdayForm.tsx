import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Input from '#components/common/Input.tsx';
import Button from '#components/common/Button.tsx';
import {
  TitleWrapper,
  Title,
  SubTitle,
  InputWrapper,
  Warning,
  WarningWrapper
} from '#components/signup/common.tsx';

import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import { getFcmToken } from '#firebase';

type ButtonType = 'disabled' | 'default' | 'loading';

const BirthdayForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, password, email, nickname, loginType } = location.state;

  console.log(password);

  const [birthday, setBirthday] = useState('');
  const [isBirthdayValid, setIsBirthdayValid] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');

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
      const response = await axiosInstance.post(
        '/auth/signup',
        {
          id,
          password,
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
      <TitleWrapper>
        <Title>생년월일 입력하기</Title>
        <SubTitle>생년월일을 입력해주세요.</SubTitle>
      </TitleWrapper>

      <InputWrapper>
        <Input
          $isValid={true}
          type="date"
          value={birthday}
          onChange={(e) => {
            setBirthday(e.target.value);
            handleValidBirthday(e.target.value);
          }}
        />
      </InputWrapper>

      <WarningWrapper>
        {!isBirthdayValid && <Warning>올바른 생년월일을 입력해주세요.</Warning>}
      </WarningWrapper>

      <Button
        type={buttonType}
        onClick={handleSubmit}
      >
        확인
      </Button>
    </>
  )
};

export default BirthdayForm;
