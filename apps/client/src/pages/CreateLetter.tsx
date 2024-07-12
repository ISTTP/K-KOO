import React, { useState } from 'react';
import Wrapper from '#components/Wrapper.tsx';
import ChooseLetter from '#components/letter/ChooseLetter.tsx';
import WriteLetter from '#components/letter/WriteLetter.tsx';

const CreateLetter = () => {
  const [step, setStep] = useState(1);

  function handleNext() {
    setStep(step + 1);
  }

  function handlePrev() {
    setStep(step - 1);
  }

  return (
    <Wrapper>
      <h1>Create Letter</h1>
      {step === 1 && <ChooseLetter handleNext={handleNext} />}
      {step === 2 && <WriteLetter handlePrev={handlePrev} />}
    </Wrapper>
  );
};

export default CreateLetter;
