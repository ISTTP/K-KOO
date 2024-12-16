import React, { useEffect } from 'react';
import styled from 'styled-components';
import Modal from '#components/modal/Modal.tsx';
import Button from '#components/common/Button.tsx';

import { KakaoLogoIcon, FacebookLogoIcon, LinkIcon } from '#icons';

function pasteUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert('URL이 복사되었습니다.');
}

function kakaoShare(nickname: string) {
  const { Kakao, location } = window;
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `${nickname}님의 케이크`,
      description: '생일 편지를 쓰고 케이크를 꾸며주세요❤️',
      imageUrl:
        'https://kkoo.s3.ap-northeast-2.amazonaws.com/images/thumbnail.png',
      link: {
        mobileWebUrl: location.href,
        webUrl: location.href,
      },
    },
  });
}

function facebookShare(nickname: string) {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&title=${nickname}님의 케이크`,
  );
}

const ShareUrlModal = ({
  nickname,
  open,
  handleOpen,
}: {
  nickname: string;
  open: boolean;
  handleOpen: () => void;
}) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <Modal open={open}>
      <ShareBox>
        <h3>내 케이크 공유하기</h3>
        <div>
          <IconButton onClick={() => kakaoShare(nickname)}>
            <KakaoLogoIcon width={'3rem'} height={'3rem'} />
          </IconButton>
          <IconButton onClick={() => facebookShare(nickname)}>
            <FacebookLogoIcon width={'3rem'} height={'3rem'} />
          </IconButton>
          <IconButton onClick={pasteUrl}>
            <LinkIcon width={'3rem'} height={'3rem'} />
          </IconButton>
        </div>
        <Button type="default" onClick={handleOpen} >
          닫기
        </Button>
      </ShareBox>
    </Modal>
  );
};

export default ShareUrlModal;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0 0.5rem;
`;

const ShareBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`
