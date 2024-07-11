import React, { useState } from 'react';
import Wrapper from '#components/Wrapper.tsx';
import Toggle from '#components/Toggle.tsx';
import GridInfo from '#components/GridInfo.tsx';
import CakeInfo from '#components/CakeInfo.tsx';

const Cake = () => {
  const [toggle, setToggle] = useState(false);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Wrapper>
      <h3>김예린 님의 케이크</h3>
      <p>장식초를 눌러 편지를 확인해보세요</p>
      <button>my</button>
      <Toggle toggle={toggle} onClick={clickedToggle} />
      {/* toggle에 따라 다른 컴포넌트 렌더링 */}
      {toggle ? <GridInfo /> : <CakeInfo />}
    </Wrapper>
  );
};

export default Cake;
