import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import axiosInstance from '#apis/axios.ts';
import Button from '#components/common/Button.tsx';
import Wrapper from '#components/layout/Wrapper.tsx';
import RenderCake from '#components/cake/RenderCake.tsx';
import ColorSelector from '#components/cake/ColorSelector.tsx';
import styled from 'styled-components';

import { ButtonType, CakeColorType } from '@isttp/types/all';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';

async function getColors(userId: string) {
  try {
    const res = await axiosInstance.get(`/cake/color/${userId}`);
    const { sheetColor, creamColor } = res.data;

    if (!sheetColor || !creamColor) {
      return null;
    }

    return { sheetColor, creamColor };
  } catch (error) {
    alert('색상 정보를 불러오는데 실패했습니다.');
  }
}

const CreateCake = () => {
  const navigate = useNavigate();
  const { ownerId } = useParams();
  const [nickname, setNickname] = useState('');
  const [sheetColor, setSheetColor] = useState<CakeColorType>('white');
  const [creamColor, setCreamColor] = useState<CakeColorType>('chocolate');
  const [buttonType, setButtonType] = useState<ButtonType>('default');

  async function handleCreateCake() {
    setButtonType('loading');
    try {
      axiosInstance
        .put('/cake/color', {
          sheetColor: sheetColor,
          creamColor: creamColor,
        })
        .then((res) => {
          if (res.status === 200) {
            alert('케이크 만들기에 성공했습니다.');
            navigate(`/cake/${ownerId}`);
          } else {
            setButtonType('default');
            throw new Error('케이크 만들기에 실패했습니다.');
          }
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          navigate('/');
          return;
        }
      }
    }
  }

  useEffect(() => {
    const fetchIsOwner = async () => {
      axiosInstance
        .get('/user/me')
        .then((res) => {
          if (res.data.userId !== ownerId) {
            alert('잘못된 접근입니다.');
            navigate(`/cake/${ownerId}`);
            return;
          }

          setNickname(res.data.nickname);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              alert('로그인이 필요합니다.');
              navigate('/');
              return;
            }
          }
        });
    };

    const fetchColors = async () => {
      getColors(ownerId).then((res) => {
        if (!res) {
          return;
        }

        setSheetColor(res.sheetColor);
        setCreamColor(res.creamColor);
      });
    };

    fetchIsOwner();
    fetchColors();
  }, [ownerId]);

  return (
    <Wrapper>
      <InnerWrapper>
        <TitleWrapper>
          <h1><Nickname>{nickname}</Nickname>님의</h1>
          <h1>케이크를 꾸며보세요!</h1>
        </TitleWrapper>
        <RenderCake sheetColor={sheetColor} creamColor={creamColor} />
        <SelectorWrapper>
          <Label>시트 색상</Label>
          <ColorSelector
            selectedColor={sheetColor}
            setSelectedColor={setSheetColor}
          />
          <Label>크림 색상</Label>
          <ColorSelector
            selectedColor={creamColor}
            setSelectedColor={setCreamColor}
          />
        </SelectorWrapper>
        <Button type={buttonType} onClick={handleCreateCake}>
          케이크 만들기
        </Button>
      </InnerWrapper>
    </Wrapper>
  );
};

export { CreateCake };

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Nickname = styled.h1`
  color: var(--orange-500);
  display: inline;
`;

const SelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  margin-bottom: 2rem;
`;

const Label = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;


