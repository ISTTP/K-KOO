import React from "react";
import "./App.css";
import useTestStore from "./store/useTestStore";
import Test from "./Test";

const App = () => {
  const { id }= useTestStore();
  
  return (
    <>
      <p>아래는 zustand 설정 테스트를 위한 것</p>
      <div>{id}</div>
      <Test/>
    </>
  );
};

export default App;