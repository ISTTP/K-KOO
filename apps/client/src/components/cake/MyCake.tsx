import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from '#components/Toggle.tsx';
import GridInfo from '#components/GridInfo.tsx';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import Button from '#components/Button.tsx';
import ShareUrlModal from '#components/modal/ShareUrlModal.tsx';
import CakeHeader from '#components/cake/CakeHeader.tsx';
import InnerWrapper from '#components/InnerWrapper.tsx';
import { CakeUserTypeResponse } from '@isttp/types/all';

type MyCakeProps = {
  ownerId: string;
  data: CakeUserTypeResponse;
};

const MyCake: React.FC<MyCakeProps> = ({ ownerId, data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  function handleOpen() {
    setOpen(!open);
  }

  if (!data.sheetColor || !data.creamColor) {
    navigate(`/cake/create/${ownerId}`);
  }

  return (
    <InnerWrapper>
      <CakeHeader nickname={data.nickname} isMyCake={true} />
      <Toggle ownerId={ownerId} toggle={toggle} onClick={clickedToggle} />
      {toggle ? (
        <GridInfo year={data.year} />
      ) : (
        <>
          <CakeInfo
            year={data.year}
            sheetColor={data.sheetColor}
            creamColor={data.creamColor}
          />
          <Button
            type="default"
            label="내 케이크 공유하기"
            onClick={handleOpen}
          />
          <ShareUrlModal
            nickname={data.nickname}
            open={open}
            handleOpen={handleOpen}
          />
        </>
      )}
    </InnerWrapper>
  );
};

export default MyCake;
