import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TimerProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  onTimeout: () => void;
}

const Timer = ({ timeLeft, setTimeLeft, onTimeout }: TimerProps) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <FormatTime>{formatTime(timeLeft)}</FormatTime>
  );
};

export default Timer;

const FormatTime = styled.span`
  width: 8rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--orange-500);
`;
