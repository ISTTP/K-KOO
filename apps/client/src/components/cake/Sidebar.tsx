import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import * as S from '#styles/SidebarStyle.tsx';
import { CakeLogo, CakeIcon, GridIcon, PersonIcon, PenIcon, ShareIcon } from '#icons';
import Button from '#components/common/Button.tsx';
import { useNavigate } from 'react-router-dom';
import useToggleStore from '../../store/useToggleStore';
import { fetchUserInfo } from '#pages/CreateLetter.tsx';
import axiosInstance from '#apis/axios.ts';
import ShareUrlModal from '#components/modal/ShareUrlModal.tsx';

const Sidebar: React.FC<{ isMyCake: boolean }> = ({ isMyCake }) => {
  const navigate = useNavigate();
  const setToggle = useToggleStore((state) => state.setToggle);
  const [user, setUser] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('cake');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUserInfo().then((data) => {
      if (data) {
        setUser(data.userId);
        setNickname(data.nickname);
      }
    });
  }, []);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    if (isMyCake) {
      if (menu === 'cake') {
        setToggle(false);
      } else if (menu === 'list') {
        setToggle(true);
      }
    } else {
      if (menu === 'cake' || menu === 'list') {
        navigate(`/cake/${user}`);
        if (menu === 'cake') {
          setToggle(false);
        } else if (menu === 'list') {
          setToggle(true);
        }
      }
    }
  };

  async function logout() {
    try {
      await axiosInstance.post('/auth/logout');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      alert('로그아웃에 실패했습니다.');
    }
  }

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <S.Container>
      <div className='logo'>
        <CakeLogo width={54} height={54} />
        <h1>케이쿠</h1>
      </div>
      {user ? (
        <>
          <section className='menu'>
            <li
              className={isMyCake && selectedMenu === 'cake' ? 'selected' : ''}
              onClick={() => handleMenuClick('cake')}>
              <CakeIcon width={37} height={37} />
              케이크
            </li>
            <li
              className={isMyCake && selectedMenu === 'list' ? 'selected' : ''}
              onClick={() => handleMenuClick('list')}>
              <GridIcon width={37} height={37} viewBox="-10 -10 40 40" />
              리스트
            </li>
            <li onClick={() => navigate('/mypage')}>
              <PersonIcon width={37} height={37} viewBox="-10 -10 54 54" />
              마이페이지
            </li>
            <li onClick={() => navigate(`/cake/create/${user}`)}>
              <PenIcon width={37} height={37} viewBox="-6 -6 30 30" />
              케이크 수정
            </li>
            <li onClick={handleOpen}>
              <ShareIcon />
              링크 공유
            </li>
            <ShareUrlModal
              nickname={nickname}
              open={open}
              handleOpen={handleOpen}
            />
          </section>
          <Button
            type="default"
            onClick={logout}
          >
            로그아웃
          </Button>
        </>
      ) : (
        <Button
          type="default"
          onClick={() => navigate('/')}
        >
          로그인
        </Button>
      )}
    </S.Container>
  );
};

export default Sidebar;
