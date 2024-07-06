import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { log } from '@repo/logger';
import Button from '../components/Button';

test('카카오 버튼 렌더링', () => {
  render(
    <Button
      type="kakao"
      label="Kakao로 시작하기"
      onClick={() => log('카카오')}
    />,
  );
  const buttonElement = screen.getByText(/Kakao로 시작하기/i);
  expect(buttonElement).toBeInTheDocument();
});
