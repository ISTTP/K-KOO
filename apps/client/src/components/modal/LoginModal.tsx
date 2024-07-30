import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '#components/modal/Modal.tsx';
import Button from '#components/common/Button.tsx';

const LoginModal = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Modal open={open}>
      <span>로그인이 필요합니다.</span>
      <Button
        type="default"
        onClick={() => {
          navigate('/');
        }}
      >
        로그인하러 가기
      </Button>
      <Button
        type="default"
        onClick={() => {
          handleOpen();
        }}
      >
        괜찮아요
      </Button>
    </Modal>
  );
};

export default LoginModal;
