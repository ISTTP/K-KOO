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
  const buttonElement = screen.getByText(/카카오로 시작하기/i);
  expect(buttonElement).toBeInTheDocument();
});

test('구글 버튼 렌더링', () => {
  render(
    <Button
      type="google"
      onClick={() => console.log('구글')}
    >
      구글로 시작하기
    </Button>,
  );
  const buttonElement = screen.getByText(/구글로 시작하기/i);
  expect(buttonElement).toBeInTheDocument();
});

test('기본 버튼 렌더링', () => {
  render(
    <Button
      type="default"
      onClick={() => {
        console.log('로그인');
      }}
    >
      로그인
    </Button>,
  );
  const buttonElement = screen.getByText(/로그인/i);
  expect(buttonElement).toBeInTheDocument();
});
