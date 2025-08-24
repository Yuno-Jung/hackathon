import React, { createContext, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Short from "./pages/Short";
import Photographer from "./pages/Photographer";
import Result from "./pages/Result";
import MyPage from "./pages/Mypage";
import Onboard from "./components/Onboard";
import Main from "./pages/Main";

export const livsiFunctionContext = createContext();
export const livsistateContext = createContext();

function App() {
  const [isOn, setIson] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ id: "", password: "" });

  const toggleMenuBar = () => {
    setToggleMenu(!toggleMenu);
  };

  const setSkip = () => setIson(false);

  const handleLogin = (id, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === id && u.password === password
    );
    if (foundUser) {
      setIsLogin(true);
      setLoginInfo({ id, password });
    }
  };

  return (
    <livsistateContext.Provider value={{ toggleMenu, loginInfo, isLogin }}>
      <livsiFunctionContext.Provider value={{ toggleMenuBar, setSkip, handleLogin }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/short" element={<Short />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/photographer/:id" element={<Photographer />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/mypage/:id" element={<MyPage />} />
          <Route path="/mypage" element={<Navigate to="/signin" />} />
        </Routes>
      </livsiFunctionContext.Provider>
    </livsistateContext.Provider>
  );
}

export default App;
