import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '#components/common/Button.tsx';

test('카카오 버튼 렌더링', () => {
  render(
    <Button
      type="kakao"
      onClick={() => console.log('카카오')}
    >
      카카오로 시작하기
    </Button>,
  );
  const buttonElement = screen.getByText(/카카오로 시작하기/);
  expect(buttonElement).toBeInTheDocument();
});
