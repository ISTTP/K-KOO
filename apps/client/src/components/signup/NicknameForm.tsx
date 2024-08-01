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

type ButtonType = 'disabled' | 'default' | 'loading';

const NicknameForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, password, email, loginType } = location.state;

  const [nickname, setNickname] = useState('');
  const [isNicknameLengthValid, setIsNicknameLengthValid] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');

  function handleNicknameValid(nickname: string) {
    if (nickname) {
      const isNicknameLengthValid = nickname.length >= 2 && nickname.length <= 20;
      setIsNicknameLengthValid(isNicknameLengthValid);
      setButtonType(isNicknameLengthValid ? 'default' : 'disabled');
    }
  }

  function handleSubmit() {
    navigate('/signup/birthday', {
      state: {
        id,
        password,
        email,
        nickname,
        loginType
      }
    })
  }

  return (
    <>
      <TitleWrapper>
        <Title>닉네임 입력하기</Title>
        <SubTitle>사용하실 닉네임을 입력해주세요.</SubTitle>
      </TitleWrapper>

      <InputWrapper>
        <Input
          $isValid={isNicknameLengthValid}
          type="text"
          placeholder="2~20자 이내 닉네임 입력"
          value={nickname}
          maxLength={20}
          onChange={(e) => {
            setNickname(e.target.value);
            handleNicknameValid(e.target.value);
          }}
        />
      </InputWrapper>
      <WarningWrapper>
        {!isNicknameLengthValid && <Warning>닉네임은 2자 이상이어야합니다.</Warning>}
      </WarningWrapper>
      <Button
        type={buttonType}
        onClick={handleSubmit}
      >
        계속하기
      </Button>
    </>
  )
};

export default NicknameForm;
