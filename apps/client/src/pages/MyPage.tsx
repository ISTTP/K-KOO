import React from 'react';
import { HomeIcon, MessengerIcon } from '#icons';
import Wrapper from '#components/Wrapper.tsx';

const MyPage = () => {
  return (
    <Wrapper>
      <div>
        <h1>마이페이지</h1>
        <button>
          <HomeIcon width={'2rem'} height={'2rem'} />
        </button>
      </div>

      <h2>
        <span>김예린</span>
        <span>님</span>
      </h2>

      <div>
        <div>
          <MessengerIcon width={'2rem'} height={'2rem'} />
          <span>내가 작성한 편지함</span>
        </div>

        <div>
          <div>P</div>
          <span>1000 P</span>
        </div>
      </div>

      <hr />

      <div>
        <h2>닉네임</h2>
        <button>변경</button>
      </div>
      <input type="text" value="김예린" />

      <div>
        <h2>생일</h2>
        <button>변경</button>
      </div>
      <input type="text" value="1998-01-01" />
      <input type="date" value="1998-01-01" />

      <hr />

      <button>로그아웃</button>
      <button>회원탈퇴</button>
    </Wrapper>
  );
};

export default MyPage;
