import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Input from "#components/common/Input.tsx";
import Button, { ButtonLoading } from "#components/common/Button.tsx";
import Timer from "#components/common/Timer.tsx";
import * as S from '#styles/SignUpStyle.ts';

import axiosInstance from '#apis/axios.ts';
import { ButtonType } from '@isttp/types/all';
import { handleButtonClick } from "#utils";

async function sendVerifyCode(email: string) {
  try {
    const res = await axiosInstance.post('/verify/email', {
      email,
    });

    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

async function checkVerifyCode(email: string, code: string) {
  try {
    const res = await axiosInstance.get(`/verify/email?email=${email}&code=${code}`);

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

const EmailForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const submitButton = useRef<HTMLButtonElement>(null);
  const { id, password, loginType } = location.state;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [step, setStep] = useState<'enter' | 'verify'>('enter');
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isExistEmail, setIsExistEmail] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [isCodeLengthValid, setIsCodeLengthValid] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimeout, setIsTimeout] = useState(false);
  const [resendBtnClicked, setResendBtnClicked] = useState(false);

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

  function handleValidCode(code: string) {
    if (code) {
      const isCodeLengthValid = code.length === 6;
      setIsCodeLengthValid(isCodeLengthValid);
      setButtonType(isCodeLengthValid ? 'default' : 'disabled');
    }
  }

  async function handleSubmit() {
    // 재인증 요청: 인증 메일 전송 후 DB 저장
    if (isTimeout) {
      setResendBtnClicked(true);
      const sended = await sendVerifyCode(email);

      if (!sended) {
        setButtonType('disabled');
        setIsExistEmail(true);
        setResendBtnClicked(false);
        return;
      }

      setButtonType('disabled');
      setTimeLeft(180);
      setIsTimeout(false);
      setResendBtnClicked(false);
      return;
    }

    setButtonType('loading');

    // 인증 요청: 인증 메일 전송 후 DB 저장
    if (step === 'enter') {
      const sended = await sendVerifyCode(email);

      if (!sended) {
        setButtonType('disabled');
        setIsExistEmail(true);
        return;
      }

      setButtonType('disabled');
      setTimeLeft(180);
      setStep('verify');
    }

    // 인증 번호 확인
    if (step === 'verify') {
      const verified = await checkVerifyCode(email, verifyCode);

      if (!verified) {
        setIsCodeValid(false);
        setButtonType('disabled');
        return;
      }

      navigate('/signup/nickname', {
        state: {
          id,
          password,
          email,
          loginType,
        }
      });
    }
  }

  function handleOnTimeout() {
    setIsTimeout(true);
    setButtonType('disabled');
  }

  return (
    <>
      <S.TitleWrapper>
        <S.Title>
          {step === 'enter' && '이메일 입력하기'}
          {step === 'verify' && '이메일 인증하기'}
        </S.Title>
        <S.SubTitle>
          {step === 'enter' && '본인인증을 위한 이메일을 입력해주세요.'}
          {step === 'verify' && `${email}로 전송된 인증번호 6자리를 입력해주세요.`}
        </S.SubTitle>
      </S.TitleWrapper>

      <S.InputWrapper>
        {step === 'enter' &&
          <Input
            autoFocus
            $isValid={isEmailValid}
            type="email"
            placeholder="ex) email@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsExistEmail(false);
              handleValidEmail(e.target.value);
            }}
          />
        }
        {step === 'verify' &&
          <S.InputInnerWrapper>
            <Input
              autoFocus
              $isValid={isCodeValid}
              type="text"
              maxLength={6}
              placeholder="인증번호 6자리를 입력해주세요"
              value={verifyCode}
              onChange={(e) => {
                setIsCodeValid(true);
                setVerifyCode(e.target.value);
                handleValidCode(e.target.value);
              }}
            />
            {!isTimeout &&
              <Timer
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                onTimeout={handleOnTimeout}
              />
            }
            {isTimeout &&
              <S.ResendButton
                disabled={resendBtnClicked}
                onClick={handleSubmit}
              >
                재인증
                {resendBtnClicked && <ButtonLoading />}
              </S.ResendButton>
            }
          </S.InputInnerWrapper>
        }
      </S.InputWrapper>

      <S.WarningWrapper>
        {!isEmailValid && <S.Warning>이메일 형식이 올바르지 않습니다.</S.Warning>}
        {isExistEmail && <S.Warning>이미 가입된 이메일입니다.</S.Warning>}
        {!isCodeLengthValid && <S.Warning>인증번호는 6자리여야 합니다.</S.Warning>}
        {!isCodeValid && <S.Warning>인증번호가 올바르지 않습니다. </S.Warning>}
        {isTimeout && <S.Warning>인증 시간이 초과되었습니다. 다시 시도해주세요.</S.Warning>}
      </S.WarningWrapper>

      <Button
        ref={submitButton}
        type={buttonType}
        onClick={handleSubmit}
      >
        {step === 'enter' && '인증하기'}
        {step === 'verify' && '확인'}
      </Button>
    </>
  );
}

export default EmailForm;
