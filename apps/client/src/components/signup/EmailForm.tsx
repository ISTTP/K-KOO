import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "#components/common/Input.tsx";
import Button from "#components/common/Button.tsx";
import {
  TitleWrapper,
  Title,
  SubTitle,
  InputWrapper,
  Warning,
  WarningWrapper
} from '#components/signup/common.tsx';
import axiosInstance from '#apis/axios.ts';

type ButtonType = 'disabled' | 'default' | 'loading';

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
    }
  } catch (error) {
    return false;
  }
}


const EmailForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    setButtonType('loading');
    // 인증 메일 전송 후 DB 저장
    if (step === 'enter') {
      const sended = await sendVerifyCode(email);

      if (!sended) {
        setButtonType('disabled');
        setIsExistEmail(true);
        return;
      }

      setButtonType('disabled');
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

  return (
    <>
      <TitleWrapper>
        <Title>
          {step === 'enter' && '이메일 입력하기'}
          {step === 'verify' && '이메일 인증하기'}
        </Title>
        <SubTitle>
          {step === 'enter' && '본인인증을 위한 이메일을 입력해주세요.'}
          {step === 'verify' && `${email}로 전송된 인증번호 6자리를 입력해주세요.`}
        </SubTitle>
      </TitleWrapper>

      <InputWrapper>
        {step === 'enter' &&
          <Input
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
          <Input
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
        }
      </InputWrapper>

      <WarningWrapper>
        {!isEmailValid && <Warning>이메일 형식이 올바르지 않습니다.</Warning>}
        {isExistEmail && <Warning>이미 가입된 이메일입니다.</Warning>}
        {!isCodeLengthValid && <Warning>인증번호는 6자리여야 합니다.</Warning>}
        {!isCodeValid && <Warning>인증번호가 올바르지 않습니다. </Warning>}
      </WarningWrapper>

      <Button
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
