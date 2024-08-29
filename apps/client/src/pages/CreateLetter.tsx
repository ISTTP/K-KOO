import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Wrapper from '#components/layout/Wrapper.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import Button from '#components/common/Button.tsx';
import Input from '#components/common/Input.tsx';
import ArrowBackIcon from '../assets/icons/ArrowBackIcon';

import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import {
  user,
  LetterRequestType,
  LetterResponseType,
} from '@isttp/schemas/all';
import { ButtonType } from '@isttp/types/all';

export async function fetchUserInfo() {
  try {
    const res = await axiosInstance.get<user>('/user/me');
    if (res.status === 200) {
      return user.parse(res.data);
    } else {
      return null;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return null;
      } else {
        throw new Error(String(error));
      }
    }
  }
}

async function handleCreateLetter({
  senderId,
  recipientId,
  candleId,
  nickname,
  contents,
}: LetterRequestType) {
  try {
    const res = await axiosInstance.post<LetterResponseType>('/letter', {
      senderId,
      recipientId,
      candleId,
      nickname,
      contents,
    });

    LetterResponseType.parse(res.data);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw new Error(String(error));
  }
}

const CreateLetter = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const candleId = searchParams.get('candleId');

  const [senderId, setSenderId] = useState('');
  const [nickname, setNickname] = useState('');
  const [contents, setContents] = useState('');
  const [buttonType, setButtonType] = useState<ButtonType>('disabled');

  useEffect(() => {
    fetchUserInfo().then((data) => {
      if (data) {
        setSenderId(data.userId);
        setNickname(data.nickname);
      }
    });
  }, []);

  useEffect(() => {
    if (nickname && contents) {
      setButtonType('default');
    } else {
      setButtonType('disabled');
    }
  }, [nickname, contents]);

  return (
    <Wrapper>
      <InnerWrapper>

        <NavWrapper>
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </NavWrapper>

        <TitleWrapper>
          <h1>생일 편지를 남겨주세요</h1>
          <h2>친구의 생일을 축하해주세요❤️</h2>
        </TitleWrapper>

        <FormWrapper>
          <Input
            type="text"
            $isValid={!!nickname}
            value={nickname}
            placeholder="닉네임을 작성해주세요."
            maxLength={20}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextArea
            value={contents}
            rows={10}
            placeholder="편지 내용을 작성해주세요. (1000자 이하)"
            maxLength={1000}
            onChange={(e) => setContents(e.target.value)}
          />
          <Button
            type={buttonType}
            onClick={async () => {
              setButtonType('loading');

              const result = await handleCreateLetter({
                senderId,
                recipientId: ownerId,
                candleId: Number(candleId),
                nickname,
                contents,
              });

              if (result) {
                alert('편지 보내기에 성공했습니다.');
                navigate(`/cake/${ownerId}`);
              } else {
                alert('편지 보내기에 실패했습니다.');
              }
            }}
          >
            편지 보내기
          </Button>
        </FormWrapper>

      </InnerWrapper>
    </Wrapper>
  );
};

export { CreateLetter };

const TextArea = styled.textarea`
  width: 100%;
  height: 22.5rem;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.05rem;
  border: 1px solid var(--orange-500); 
  border-radius: 0.25rem;
  resize: none;
`;

const NavWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const TitleWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  margin: 1.75rem 0;
`;
