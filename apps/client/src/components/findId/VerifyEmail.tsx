import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Input from "#components/common/Input.tsx";
import Button, { ButtonLoading } from "#components/common/Button.tsx";
import Timer from "#components/common/Timer.tsx";
import * as S from '#styles/SignUpStyle.ts';

import axiosInstance from '#apis/axios.ts';
import { ButtonType } from '@isttp/types/all';
import { handleButtonClick, hideUserId, formatDate } from "#utils";

type Data = {
  id: string;
  createdAt: string;
}

async function sendVerifyCode(email: string) {
  try {
    const res = await axiosInstance.post('/verify/email', {
      email,
      checkDuplicate: true,
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


const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  const submitButton = useRef<HTMLButtonElement>(null);

  const [step, setStep] = useState<'verify' | 'complete'>('verify');
  const [verifyCode, setVerifyCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [isCodeLengthValid, setIsCodeLengthValid] = useState(true);
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimeout, setIsTimeout] = useState(false);
  const [resendBtnClicked, setResendBtnClicked] = useState(false);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    window.addEventListener('keydown', handleEnterKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEnterKeyDown);
    }
  }, [buttonType]);

  function handleValidCodeLength(code: string) {
    if (code) {
      const isCodeLengthValid = code.length === 6;
      setIsCodeLengthValid(isCodeLengthValid);
      setButtonType(isCodeLengthValid ? 'default' : 'disabled');
    }
  }

  function handleEnterKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleButtonClick({ buttonType, submitButton: submitButton.current });
    }
  }

  function handleOnTimeout() {
    setIsTimeout(true);
    setButtonType('disabled');
  }

  async function handleSubmit() {
    // 재인증 요청: 인증 메일 전송 후 DB 저장
    if (isTimeout) {
      setResendBtnClicked(true);
      const sended = await sendVerifyCode(email);

      if (!sended) {
        setButtonType('disabled');
        setResendBtnClicked(false);
        return;
      }

      setButtonType('disabled');
      setTimeLeft(180);
      setIsTimeout(false);
      setResendBtnClicked(false);
    }

    setButtonType('loading');

    // 인증 번호 확인
    if (step === 'verify') {
      const verified = await checkVerifyCode(email, verifyCode);

      if (!verified) {
        setIsCodeValid(false);
        setButtonType('disabled');
        return;
      }

      const res = await axiosInstance.get(`/user/id/${email}`);

      if (res.status === 200) {
        setData(res.data);
        setStep('complete');
      } else {
        setButtonType('disabled');
        // 에러 모달
      }
    }
  }

  return (
    <>
      <S.TitleWrapper>
        <S.Title>
          아이디 찾기
        </S.Title>
        <S.SubTitle>
          {step === 'verify' && `${email}로 전송된 인증번호 6자리를 입력해주세요.`}
          {step === 'complete' && '회원님의 아이디 정보는 다음과 같습니다.'}
        </S.SubTitle>
      </S.TitleWrapper>

      {step === 'verify' &&
        <S.InputWrapper>
          <S.InputInnerWrapper>
            <Input
              autoFocus
              $isValid={isCodeValid}
              disabled={buttonType === 'loading'}
              type="text"
              maxLength={6}
              placeholder="인증번호 6자리를 입력해주세요"
              value={verifyCode}
              onChange={(e) => {
                setIsCodeValid(true);
                setVerifyCode(e.target.value);
                handleValidCodeLength(e.target.value);
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
        </S.InputWrapper>
      }
      {step === 'complete' &&
        <S.LabelWrapper>
          <S.Label>{hideUserId(data?.id ?? '')}</S.Label>
          <S.SubLabel>{formatDate(data?.createdAt ?? '')} 가입</S.SubLabel>
        </S.LabelWrapper>
      }

      {step === 'verify' &&
        <S.WarningWrapper>
          {!isCodeLengthValid && <S.Warning>인증번호는 6자리여야 합니다.</S.Warning>}
          {!isCodeValid && <S.Warning>인증번호가 올바르지 않습니다. </S.Warning>}
          {isTimeout && <S.Warning>인증 시간이 초과되었습니다. 다시 시도해주세요.</S.Warning>}
        </S.WarningWrapper>
      }

      {step === 'verify' &&
        <Button
          ref={submitButton}
          type={buttonType}
          onClick={handleSubmit}
        >
          확인
        </Button>
      }
      {step === 'complete' &&
        <S.LinkWrapper>
          <S.LoginLink to={'/'}>
            로그인
          </S.LoginLink>
          <S.FindPwdLink to={'/find/pwd'}>
            비밀번호 찾기
          </S.FindPwdLink>
        </S.LinkWrapper>
      }

    </>
  );
};

export default VerifyEmail;
