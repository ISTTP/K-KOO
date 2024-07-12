import React from 'react';
import Wrapper from '#components/Wrapper.tsx';

type WriteLetterProps = {
  handlePrev: () => void;
};

const WriteLetter = ({ handlePrev }: WriteLetterProps) => {
  return (
    <Wrapper>
      <h1>Write Letter</h1>
      <button onClick={handlePrev}>Prev</button>
    </Wrapper>
  );
};

export default WriteLetter;
