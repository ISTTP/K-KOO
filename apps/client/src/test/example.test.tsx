import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '#components/common/Button.tsx';

test('카카오 버튼 렌더링', () => {
  render(
    <Button
      type="kakao"
      label="Kakao로 시작하기"
      onClick={() => console.log('카카오')}
    />,
  );
  const buttonElement = screen.getByText(/Kakao로 시작하기/);
  expect(buttonElement).toBeInTheDocument();
});
