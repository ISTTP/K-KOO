import React from 'react';
import Wrapper from '#components/Wrapper.tsx';

type ChooseLetterProps = {
  handleNext: () => void;
};

const ChooseLetter = ({ handleNext }: ChooseLetterProps) => {
  return (
    <Wrapper>
      <h1>Choose Letter</h1>
      <button onClick={handleNext}>Next</button>
    </Wrapper>
  );
};

export default ChooseLetter;
