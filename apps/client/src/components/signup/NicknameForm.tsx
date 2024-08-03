import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Input from '#components/common/Input.tsx';
import Button from '#components/common/Button.tsx';
import * as S from '#styles/SignUpStyle.ts';

import { ButtonType } from '@isttp/types/all';
import { handleButtonClick } from '#utils';

const NicknameForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const submitButton = useRef<HTMLButtonElement>(null);
  const { id, password, email, loginType } = location.state;

  const [nickname, setNickname] = useState('');
  const [isNicknameLengthValid, setIsNicknameLengthValid] = useState(true);
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
      <S.TitleWrapper>
        <S.Title>닉네임 입력하기</S.Title>
        <S.SubTitle>사용하실 닉네임을 입력해주세요.</S.SubTitle>
      </S.TitleWrapper>

      <S.InputWrapper>
        <Input
          autoFocus
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
      </S.InputWrapper>
      <S.WarningWrapper>
        {!isNicknameLengthValid && <S.Warning>닉네임은 2자 이상이어야합니다.</S.Warning>}
      </S.WarningWrapper>
      <Button
        ref={submitButton}
        type={buttonType}
        onClick={handleSubmit}
      >
        계속하기
      </Button>
    </>
  )
};

export default NicknameForm;
