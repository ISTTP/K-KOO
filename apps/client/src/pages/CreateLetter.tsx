import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Wrapper from '#components/layout/Wrapper.tsx';
import Button from '#components/common/Button.tsx';
import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import {
  user,
  LetterRequestType,
  LetterResponseType,
} from '@isttp/schemas/all';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserInfo().then((data) => {
      if (data) {
        setSenderId(data.userId);
        setNickname(data.nickname);
      }
    });
  }, []);

  return (
    <Wrapper>
      <InnerWrapper>
        <h1>편지 작성</h1>
        <Input
          type="text"
          value={nickname}
          placeholder="닉네임을 입력하세요 (10자 이하)"
          maxLength={10}
          onChange={(e) => setNickname(e.target.value)}
        />
        <TextArea
          value={contents}
          rows={10}
          placeholder="편지 내용을 작성해주세요"
          onChange={(e) => setContents(e.target.value)}
        />
        <Button
          type={loading ? 'loading' : 'default'}
          onClick={async () => {
            setLoading(true);

            if (!nickname || !contents) {
              alert('닉네임과 내용을 작성해주세요.');
              setLoading(false);
              return;
            }

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
      </InnerWrapper>
    </Wrapper>
  );
};

export { CreateLetter };

const Input = styled.input`
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;
