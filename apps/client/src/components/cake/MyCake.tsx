import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from '#components/common/Toggle.tsx';
import GridInfo from '#components/cake/GridInfo.tsx';
import CakeInfo from '#components/cake/CakeInfo.tsx';
import Button from '#components/common/Button.tsx';
import ShareUrlModal from '#components/modal/ShareUrlModal.tsx';
import CakeHeader from '#components/cake/CakeHeader.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import { CakeUserTypeResponse } from '@isttp/types/all';
import useToggleStore from '../../store/useToggleStore';

type MyCakeProps = {
  ownerId: string;
  data: CakeUserTypeResponse;
};

const MyCake: React.FC<MyCakeProps> = ({ ownerId, data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = useToggleStore((state) => state.toggle);
  const setToggle = useToggleStore((state) => state.setToggle);

  const clickedToggle = () => {
    setToggle(!toggle);
  };

  function handleOpen() {
    setOpen(!open);
  }

  useEffect(() => {
    if (!data.sheetColor || !data.creamColor) {
      navigate(`/cake/create/${ownerId}`);
    }
  }, [data.sheetColor, data.creamColor]);

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
            onClick={handleOpen}
          >
            내 케이크 공유하기
          </Button>
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
