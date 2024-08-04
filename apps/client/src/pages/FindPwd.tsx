import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Wrapper from '#components/layout/Wrapper.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import ArrowBackIcon from '../assets/icons/ArrowBackIcon';
import Button from '#components/common/Button.tsx';
import Input from '#components/common/Input.tsx';
import * as S from '#styles/SignUpStyle.ts';

import axiosInstance from '#apis/axios.ts';
import { ButtonType } from '@isttp/types/all';
import { handleButtonClick, hideEmail } from '#utils';

const FindPwd = () => {
  const navigate = useNavigate();
  const submitButton = useRef<HTMLButtonElement>(null);
  const idPattern = /^[a-zA-Z0-9]*$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [step, setStep] = useState<'verify' | 'complete'>('verify');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [isIdValid, setIsIdValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');
  const [isValid, setIsValid] = useState(true);

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

  function handleValid() {
    const isIdValid = idPattern.test(id);
    const isIdLengthValid = id.length >= 6 && id.length <= 20;
    const isEmailValid = emailPattern.test(email);
    const isValid = isIdValid && isIdLengthValid && isEmailValid;

    setIsIdValid(isIdValid && isIdLengthValid);
    setIsEmailValid(isEmailValid);
    setButtonType(isValid ? 'default' : 'disabled');
  }

  async function handleSubmit() {
    setButtonType('loading');

    if (step === 'verify') {
      // 비밀번호 찾기 요청 
      try {
        const res = await axiosInstance.post('/verify/userinfo', {
          id,
          email,
        });

        if (res.status === 200) {
          setStep('complete');
          setButtonType('default');
        }
      } catch (error) {
        setIsValid(false);
        setButtonType('disabled');
      }
    } else {
      // 비밀번호 찾기 완료
      navigate('/');
    }
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <NavWrapper>
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </NavWrapper>

        <S.TitleWrapper>
          <S.Title>
            비밀번호 찾기
          </S.Title>
          <S.SubTitle>
            {step === 'verify' && '회원가입시 사용했던 아이디와 이메일을 입력해주세요.'}
          </S.SubTitle>
        </S.TitleWrapper>

        {step === 'verify' &&
          <S.InputWrapper>
            <Input
              autoFocus
              $isValid={isIdValid}
              type="text"
              placeholder="아이디를 입력해주세요"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIsValid(true);
                handleValid();
              }}
            />
            <Input
              autoFocus
              $isValid={isEmailValid}
              type="email"
              placeholder="이메일를 입력해주세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValid(true);
                handleValid();
              }}
            />
          </S.InputWrapper>
        }

        {step === 'complete' &&
          <S.TextWrapper>
            <S.Text>
              회원님의 이메일
            </S.Text>
            <S.Text>
              {hideEmail(email)}&#40;으&#41;로
            </S.Text>
            <S.Text>
              <S.ColorText>임시 비밀번호</S.ColorText>가 전송되었습니다.
            </S.Text>
            <br />
            <S.Text>
              이메일을 확인해주세요.
            </S.Text>
          </S.TextWrapper>
        }

        {step === 'verify' &&
          <S.WarningWrapper>
            {!isEmailValid && <S.Warning>이메일 형식이 올바르지 않습니다.</S.Warning>}
            {!isIdValid && <S.Warning>아이디 형식이 올바르지 않습니다.</S.Warning>}
            {!isValid && <S.Warning>아이디 또는 이메일이 올바르지 않습니다. </S.Warning>}
          </S.WarningWrapper>
        }

        <Button
          ref={submitButton}
          type={buttonType}
          onClick={handleSubmit}
        >
          {step === 'verify' && '비밀번호 찾기 '}
          {step === 'complete' && '확인'}
        </Button>
      </InnerWrapper>
    </Wrapper >
  );
};

export { FindPwd };

const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
