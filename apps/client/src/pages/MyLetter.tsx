import Wrapper from '#components/layout/Wrapper.tsx'
import React, { useState } from 'react'
import GridInfo from '#components/cake/GridInfo.tsx';

const MyLetter = () => {
  const [count, setCount] = useState(0);

  return (
    <Wrapper>
      <p>내가 작성한 편지함</p>
      <p>총 {count}개의 편지를 남겼어요!</p>
      <GridInfo year="all" handleTotalChange={(total) => setCount(total)} />
    </Wrapper>
  )
}

export { MyLetter }
