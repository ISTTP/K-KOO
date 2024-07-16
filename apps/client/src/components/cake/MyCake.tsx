import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '#apis/axios.ts';
import Toggle from '#components/Toggle.tsx';
import GridInfo from '#components/GridInfo.tsx';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import Button from '#components/Button.tsx';
import ShareUrlModal from '#components/modal/ShareUrlModal.tsx';
import CakeHeader from '#components/cake/CakeHeader.tsx';
import InnerWrapper from '#components/InnerWrapper.tsx';
import { CakeUserTypeResponse, CakeColorType } from '@isttp/types/all';

type MyCakeProps = {
  ownerId: string;
  data: CakeUserTypeResponse;
};

type CakeColorState = {
  sheetColor: CakeColorType;
  creamColor: CakeColorType;
};

const MyCake: React.FC<MyCakeProps> = ({ ownerId, data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [cakeColor, setCakeColor] = useState<CakeColorState>({
    sheetColor: 'chocolate',
    creamColor: 'white',
  });

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  function handleOpen() {
    setOpen(!open);
  }

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
    <InnerWrapper>
      <CakeHeader nickname={data.nickname} />
      <Toggle ownerId={ownerId} toggle={toggle} onClick={clickedToggle} />
      {toggle ? (
        <GridInfo year={data.year} />
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
            onClick={handleOpen}
          />
          <ShareUrlModal open={open} handleOpen={handleOpen} />
        </>
      )}
    </InnerWrapper>
  );
};

export default MyCake;
