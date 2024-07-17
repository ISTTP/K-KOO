import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import axiosInstance from '#apis/axios.ts';
import Button from '#components/Button.tsx';
import Wrapper from '#components/Wrapper.tsx';
import RenderCake from '#components/RenderCake.tsx';
import ColorSelector from '#components/ColorSelector.tsx';

import { CakeColorType } from '@isttp/types/all';

async function getColors(userId: string) {
  try {
    const res = await axiosInstance.get(`/cake/color/${userId}`);
    const { sheetColor, creamColor } = res.data;

    if (!sheetColor || !creamColor) {
      return null;
    }

    return { sheetColor, creamColor };
  } catch (error) {
    console.log(error);
    // 로그인이 필요합니다 모달 어떤 에러인지에 따라 모달 달리 하기
  }
}

const CreateCake = () => {
  const navigate = useNavigate();
  const { ownerId } = useParams();
  const [sheetColor, setSheetColor] = useState<CakeColorType>('white');
  const [creamColor, setCreamColor] = useState<CakeColorType>('chocolate');

  async function handleCreateCake() {
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
        })
        .catch((error) => {
          console.error(error);
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
      <h1>케이크 만들기</h1>
      <RenderCake sheetColor={sheetColor} creamColor={creamColor} />
      <h3>시트</h3>
      <ColorSelector
        selectedColor={sheetColor}
        setSelectedColor={setSheetColor}
      />
      <h3>크림</h3>
      <ColorSelector
        selectedColor={creamColor}
        setSelectedColor={setCreamColor}
      />
      <Button type="default" label="케이크 만들기" onClick={handleCreateCake} />
    </Wrapper>
  );
};

export default CreateCake;
