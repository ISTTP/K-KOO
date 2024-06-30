import React from "react";
import useTestStore from "./store/useTestStore";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import GoogleLogin from "./pages/GoogleLogin";
import "./App.css";

const App = () => {
  const { id } = useTestStore();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/oauth/google" element={<GoogleLogin />} />
    </Routes>
  );
};

export default App;

const StyledButton = styled.button`
  background-color: red;
`