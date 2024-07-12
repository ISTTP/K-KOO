import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import Toggle from '#components/Toggle.tsx';
import GridInfo from '#components/GridInfo.tsx';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import Wrapper from '#components/Wrapper.tsx';
import Button from '#components/Button.tsx';
import { CakeUserTypeResponse, CakeColorType } from '@isttp/types/all';

type MyCakeProps = {
  ownerId: string;
  data: CakeUserTypeResponse;
};

type CakeColorState = {
  sheetColor: CakeColorType;
  creamColor: CakeColorType;
};

function handleShareUrl() {
  alert('기능 준비중');
}

const MyCake: React.FC<MyCakeProps> = ({ ownerId, data }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [cakeColor, setCakeColor] = useState<CakeColorState>({
    sheetColor: 'chocolate',
    creamColor: 'white',
  });

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  async function getColors(userId: string) {
    try {
      const res = await axiosInstance.get(`/cake/color/${userId}`);

      if (!res.data.sheetColor || !res.data.creamColor) {
        navigate(`/cake/create/${userId}`);
      }

      setCakeColor({
        sheetColor: res.data.sheetColor,
        creamColor: res.data.creamColor,
      });
    } catch (error) {
      console.log(error);
      // 에러 코드에 따라 모달
    }
  }

  useEffect(() => {
    getColors(ownerId);
  }, [ownerId]);

  return (
    <Wrapper>
      <h3>{data.nickname} 님의 케이크</h3>
      <p>장식초를 눌러 편지를 확인해보세요</p>
      <button>my</button>
      <Toggle ownerId={ownerId} toggle={toggle} onClick={clickedToggle} />
      {toggle ? (
        <GridInfo />
      ) : (
        <>
          <CakeInfo
            year={data.year}
            sheetColor={cakeColor.sheetColor}
            creamColor={cakeColor.creamColor}
          />
          <Button
            type="default"
            label="내 케이크 공유하기"
            onClick={handleShareUrl}
          />
        </>
      )}
    </Wrapper>
  );
};

export default MyCake;
