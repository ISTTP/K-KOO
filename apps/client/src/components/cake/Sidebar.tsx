import React from 'react'
import styled from 'styled-components';
import * as S from '#styles/SidebarStyle.tsx';
import { CakeLogo, CakeIcon, GridIcon, PersonIcon, PenIcon, ShareIcon } from '#icons';
import Button from '#components/common/Button.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import useToggleStore from '../../store/useToggleStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const setToggle = useToggleStore((state) => state.setToggle);
  const { ownerId } = useParams();

  const handleMenuClick = (menu: string) => {
    if (menu === 'cake') {
      setToggle(false);
    } else if (menu === 'list') {
      setToggle(true);
    }
  };
  return (
    <S.Container>
      <div className='logo'>
        <CakeLogo width={54} height={54} />
        <h1>케이쿠</h1>
      </div>
      <section className='menu'>
        <li onClick={() => handleMenuClick('cake')}>
          <CakeIcon fill={'#FFC57C'} stroke={'#FFC57C'} width={37} height={37} />
          케이크
        </li>
        <li onClick={() => handleMenuClick('list')}>
          <GridIcon fill={'#FFC57C'} stroke={'#FFC57C'} width={37} height={37} viewBox="-10 -10 40 40" />
          리스트
        </li>
        <li onClick={() => navigate('/mypage')}>
          <PersonIcon fill={'#FFC57C'} stroke={'#FFC57C'} width={37} height={37} viewBox="-10 -10 54 54" />
          마이페이지
        </li>
        <li onClick={() => navigate(`/cake/create/${ownerId}`)}>
          <PenIcon fill={'#FFC57C'} stroke={'#FFC57C'} width={37} height={37} viewBox="-6 -6 30 30" />
          케이크 수정</li>
        <li>
          <ShareIcon fill={'#FFC57C'} />
          링크 공유</li>
      </section>
      <Button
        type="default"
        onClick={() => console.log('로그아웃')}
      >
        로그아웃
      </Button>
    </S.Container>
  )
}

export default Sidebar


