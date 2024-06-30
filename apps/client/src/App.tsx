import React from "react";
import "./App.css";
import useTestStore from "./store/useTestStore";
import styled from "styled-components"



const App = () => {
  const { id } = useTestStore();

  return (
    <>
      <p>아래는 zustand 설정 테스트를 위한 것</p>
      <div>{id}</div>
      <StyledButton>버튼</StyledButton>
    </>
  );
};

export default App;

const StyledButton = styled.button`
  background-color: red;
`