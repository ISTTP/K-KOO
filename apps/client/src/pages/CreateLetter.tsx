import React, { useState, useEffect } from 'react';
import Wrapper from '#components/Wrapper.tsx';
import Button from '#components/Button.tsx';
import axiosInstance from '#apis/axios.ts';
import { AxiosError } from 'axios';
import {
  UserType,
  LetterRequestType,
  LetterResponseType,
} from '@isttp/schemas/all';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

async function fetchUserInfo() {
  try {
    const res = await axiosInstance.get<UserType>('/user/me');
    if (res.status !== 200) {
      return UserType.parse(res.data);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return null;
      } else {
        throw new Error(`${error}`);
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
    console.log(error);
    throw new Error(`${error}`);
  }
}

// letter/create/ownerId?candleId=123
const CreateLetter = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const candleId = searchParams.get('candleId');

  const [senderId, setSenderId] = useState('');
  const [nickname, setNickname] = useState('');
  const [contents, setContents] = useState('');

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
      <h1>편지 작성</h1>
      <input
        type="text"
        value={nickname}
        style={{ marginBottom: '10px', width: '50%', height: '2rem' }}
        placeholder="닉네임을 작성해주세요"
        onChange={(e) => setNickname(e.target.value)}
      />
      <textarea
        value={contents}
        cols={100}
        rows={10}
        placeholder="편지 내용을 작성해주세요"
        onChange={(e) => setContents(e.target.value)}
      />
      <Button
        type="default"
        label="편지 보내기"
        onClick={async () => {
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
            console.error(result);
          }
        }}
      />
    </Wrapper>
  );
};

export default CreateLetter;
