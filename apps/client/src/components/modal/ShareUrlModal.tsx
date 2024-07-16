import React from 'react';
import Modal from '#components/modal/Modal.tsx';
import Button from '#components/Button.tsx';

import { KakaoLogoIcon, FacebookLogoIcon, LinkIcon } from '#icons';

function pasteUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert('URL이 복사되었습니다.');
}

const ShareUrlModal = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  return (
    <Modal open={open}>
      <h3>내 케이크 공유하기</h3>
      <div>
        <button>
          <KakaoLogoIcon />
        </button>
        <button>
          <FacebookLogoIcon />
        </button>
        <button onClick={pasteUrl}>
          <LinkIcon />
        </button>
      </div>
      <Button type="default" label="닫기" onClick={handleOpen} />
    </Modal>
  );
};

export default ShareUrlModal;
