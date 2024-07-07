import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

test('카카오 버튼 렌더링', () => {
  render(
    <Button
      type="kakao"
      label="Kakao로 시작하기"
      onClick={() => console.log("카카오")}
    />,
  );
  const buttonElement = screen.getByText(/Kakao로 시작하기/i);
  expect(buttonElement).toBeInTheDocument();
});

test('구글 버튼 렌더링', () => {
  render(
    <Button
      type="google"
      label="Google로 시작하기"
      onClick={() => console.log("구글")}
    />,
  );
  const buttonElement = screen.getByText(/Google로 시작하기/i);
  expect(buttonElement).toBeInTheDocument();
});

test('기본 버튼 렌더링', () => {
  render(
    <Button
      type="default"
      label="로그인"
      onClick={() => {
        console.log('로그인');
      }}
    />,
  );
  const buttonElement = screen.getByText(/로그인/i);
  expect(buttonElement).toBeInTheDocument();
});
