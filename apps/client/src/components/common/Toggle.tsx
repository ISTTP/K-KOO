import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { PenIcon, CakeIcon, GridIcon } from '#icons'; // Assuming you have a GridIcon

interface ToggleBtnProps {
  ownerId: string;
  toggle: boolean;
  onClick: () => void;
}

interface Proptype {
  $istoggle: boolean;
}

const Toggle: React.FC<ToggleBtnProps> = ({ ownerId, toggle, onClick }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ToggleBtn $istoggle={toggle}>
        <CakeIconWrapper $istoggle={!toggle} onClick={onClick} >
          <CakeIcon width={32} height={32} fill={'#AEAEAE'} stroke={'#AEAEAE'} />
        </CakeIconWrapper>
        <GridIconWrapper $istoggle={toggle} onClick={onClick} >
          <GridIcon width={20} height={20} fill={'#AEAEAE'} />
        </GridIconWrapper>
        <Circle $istoggle={toggle} >
          <CircleIconWrapper>
            {toggle ? (
              <GridIcon width={20} height={20} fill="#FFF" viewBox='0 0 20 20' />
            ) : (
              <CakeIcon width={32} height={32} fill="#FFF" stroke="#FFF" />
            )}
          </CircleIconWrapper>
        </Circle>
      </ToggleBtn>
      <ChangeBtn onClick={() => navigate(`/cake/create/${ownerId}`)}>
        케이크 수정
        <PenIcon width='16px' height='16px' fill={'#FFF'} viewBox="0 0 16 16" />
      </ChangeBtn>
    </Container>
  );
};

export default Toggle;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const ToggleBtn = styled.button<Proptype>`
  width: 100px;
  height: 37px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: var(--gray-300);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  transition: all 0.5s ease-in-out;
`;

const CakeIconWrapper = styled.div<Proptype>`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridIconWrapper = styled.div<Proptype>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const Circle = styled.div<Proptype>`
  background-color: var(--orange-500);
  width: 55px;
  height: 37px;
  border-radius: 15px;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.$istoggle &&
    css`
      transform: translateX(45px);
    `}
`;

const CircleIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChangeBtn = styled.button`
  border-radius: 15px;
  background: var(--orange-500);
  padding: 8px 12px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  color: var(--white);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0;
  cursor: pointer;
`;
