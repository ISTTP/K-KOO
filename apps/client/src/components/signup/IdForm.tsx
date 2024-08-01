import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

async function checkId(id: string) {
  try {
    const res = await axiosInstance.post('/verify/id', {
      id,
    });

    const isDuplicate = res.data.isDuplicate;
    return isDuplicate;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        return null;
      }
    }
  }
}

type ButtonType = 'disabled' | 'default' | 'loading';

const IdForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginType } = location.state;
  const pattern = /^[a-zA-Z0-9]*$/;

  const [id, setId] = useState<string>('');
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');
  const [isIdValid, setIsIdValid] = useState(true);
  const [isIdLengthValid, setIsIdLengthValid] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false);

  function handleValidId(id: string) {
    if (id) {
      const isIdValid = pattern.test(id);
      const isIdLengthValid = id.length >= 6 && id.length <= 20;
      setIsIdValid(isIdValid);
      setIsIdLengthValid(isIdLengthValid);
      setButtonType(isIdValid && isIdLengthValid ? 'default' : 'disabled');
    }
  }

  async function handleSubmit() {
    setButtonType('loading');

    try {
      const isDuplicate = await checkId(id);
      setIsDuplicate(isDuplicate);

      if (isDuplicate) {
        setButtonType('disabled');
      } else {
        setButtonType('default');
        navigate('/signup/password', { state: { id, loginType } });
      }
    } catch {
      // 모달 처리
    }
  }

  return (
    <>
      <TitleWrapper>
        <Title>아이디 입력하기</Title>
        <SubTitle>회원가입하실 아이디를 입력해주세요.</SubTitle>
      </TitleWrapper>

      <InputWrapper>
        <Input
          $isValid={isIdValid && isIdLengthValid && !isDuplicate}
          type="text"
          placeholder="6~20자 이내 영문 대소문자, 숫자 포함"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setIsDuplicate(false);
            handleValidId(e.target.value);
          }}
        />
      </InputWrapper>
      <WarningWrapper>
        {!isIdLengthValid && <Warning>아이디는 6자 이상이어야합니다.</Warning>}
        {!isIdValid && <Warning>아이디는 영문 대소문자, 숫자만 사용 가능합니다.</Warning>}
        {isDuplicate && <Warning>이미 사용중인 아이디입니다.</Warning>}
      </WarningWrapper>
      <Button
        type={buttonType}
        onClick={handleSubmit}
      >
        아이디 중복 확인
      </Button>
    </>
  );
}

export default IdForm;


