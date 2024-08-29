import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { user } from '@isttp/schemas/all';
import { HomeIcon, MessengerIcon } from '#icons';
import axiosInstance from '#apis/axios.ts';
import Wrapper from '#components/layout/Wrapper.tsx';
import InnerWrapper from '#components/layout/InnerWrapper.tsx';
import * as S from '#styles/MyPageStyle.ts';

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<user | null>(null);
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [disableNickname, setDisableNickname] = useState(true);
  const [disableBirthday, setDisableBirthday] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosInstance.get<user>('/user/me');
        user.parse(res.data);
        if (res.status === 200) {
          setUserInfo(res.data);
          setNickname(res.data.nickname);
          setBirthday(res.data.birthday.toString().split('T')[0]);
        }
      } catch (error) {
        alert('로그인이 필요합니다.');
        navigate('/');
      }
    })();
  }, []);

  async function changeNickname(nickname: string) {
    try {
      const res = await axiosInstance.put<user>('/user/me', {
        nickname,
      });
      const data = user.parse(res.data);
      if (res.status === 200) {
        alert('닉네임이 변경되었습니다.');
        setUserInfo(data);
      }
    } catch (error) {
      alert('닉네임 변경에 실패했습니다.');
    }
  }

  async function changeBirthday(birthday: string) {
    try {
      const res = await axiosInstance.put<user>('/user/me', {
        birthday: birthday + 'T00:00:00.000Z',
      });
      const data = user.parse(res.data);
      if (res.status === 200) {
        alert('생일이 변경되었습니다.');
        setUserInfo(data);
      }
    } catch (error) {
      alert('생일 변경에 실패했습니다.');
    }
  }

  async function logout() {
    try {
      await axiosInstance.post('/auth/logout');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      alert('로그아웃에 실패했습니다.');
    }
  }

  async function signOut() {
    const res = confirm('정말로 회원탈퇴 하시겠습니까?');
    if (!res) return;
    try {
      await axiosInstance.post('/auth/signout');
      alert('회원탈퇴 되었습니다.');
      navigate('/');
    } catch (error) {
      alert('회원탈퇴에 실패했습니다.');
    }
  }

  return (
    <Wrapper>
      <InnerWrapper>

        <S.MyPageHeader>
          <S.TitleWrapper>
            <h1><S.Nickname>{userInfo?.nickname}</S.Nickname>님</h1>
            <h2>케이꾸에 오신 것을 환영합니다🧡</h2>
          </S.TitleWrapper>

          <S.HomeButton
            onClick={() => {
              navigate(`/cake/${userInfo?.userId}`);
            }}
          >
            <HomeIcon width={'2rem'} height={'2rem'} />
          </S.HomeButton>
        </S.MyPageHeader>

        <S.InfoWrapper>
          <S.MyLetterButton>
            <MessengerIcon width={'1.5rem'} height={'1.5rem'} />
            <span onClick={() => {
              navigate(`/myletter`);
            }}>내가 작성한 편지함</span>
          </S.MyLetterButton>

          <S.PointWrapper>
            <S.PointIcon>P</S.PointIcon>
            <span>{userInfo?.point} P</span>
          </S.PointWrapper>
        </S.InfoWrapper>

        <S.Hr />

        <S.EditContainer>
          <S.EditWrapper>
            <S.LabelWrapper>
              <S.SubTitle>닉네임</S.SubTitle>
              {disableNickname && (
                <S.OrangeButton
                  onClick={() => {
                    setDisableNickname(false);
                  }}
                >
                  변경
                </S.OrangeButton>
              )}
              {!disableNickname && (
                <S.ButtonWrapper>
                  <S.WhiteButton
                    onClick={() => {
                      setDisableNickname(true);
                      setNickname(String(userInfo?.nickname));
                    }}
                  >
                    취소
                  </S.WhiteButton>
                  <S.OrangeButton
                    onClick={async () => {
                      await changeNickname(nickname);
                      setDisableNickname(true);
                    }}
                  >
                    확인
                  </S.OrangeButton>
                </S.ButtonWrapper>
              )}
            </S.LabelWrapper>
            <S.Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={disableNickname}
            />
          </S.EditWrapper>

          <S.EditWrapper>
            <S.LabelWrapper>
              <S.SubTitle>생일</S.SubTitle>
              {disableBirthday && (
                <S.OrangeButton
                  onClick={() => {
                    setDisableBirthday(false);
                  }}
                >
                  변경
                </S.OrangeButton>
              )}
              {!disableBirthday && (
                <S.ButtonWrapper>
                  <S.WhiteButton
                    onClick={() => {
                      setDisableBirthday(true);
                      setBirthday(String(userInfo?.birthday).split('T')[0]);
                    }}
                  >
                    취소
                  </S.WhiteButton>
                  <S.OrangeButton
                    onClick={async () => {
                      await changeBirthday(birthday);
                      setDisableBirthday(true);
                    }}
                  >
                    확인
                  </S.OrangeButton>
                </S.ButtonWrapper>
              )}
            </S.LabelWrapper>
            <S.Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              disabled={disableBirthday}
            />
          </S.EditWrapper>
        </S.EditContainer>

        <S.Hr />

        {userInfo?.loginType === 'default' &&
          <S.LinkWrapper>
            <S.StyledLink to={'/reset/pwd/verify'}>
              비밀번호 재설정
            </S.StyledLink>
          </S.LinkWrapper>
        }

        {userInfo?.loginType === 'default' && <S.Hr />}

        <S.AccountSettingWrapper>
          <S.AccountButton onClick={logout}>로그아웃</S.AccountButton>
          <S.AccountButton onClick={signOut}>회원탈퇴</S.AccountButton>
        </S.AccountSettingWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export { MyPage };
