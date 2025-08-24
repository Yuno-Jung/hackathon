import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Short from "./pages/Short";
import Photographer from "./pages/Photographer";
import Result from "./pages/Result";
import MyPage from "./pages/Mypage";
import Main from "./pages/Main";

export const livsiFunctionContext = createContext();
export const livsistateContext = createContext();

function App() {
  const [isOn, setIson] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState(null);

  useEffect(() => {
    const savedLogin = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedLogin) {
      setIsLogin(true);
      setLoginInfo(savedLogin);
    }
  }, []);

  const toggleMenuBar = () => setToggleMenu(!toggleMenu);
  const setSkip = () => setIson(false);

  const handleLogin = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      const userData = { id: foundUser.id, username: foundUser.username };
      setIsLogin(true);
      setLoginInfo(userData);
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      return userData;
    }
    return null;
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
          <Route
            path="/mypage/:id"
            element={isLogin ? <MyPage /> : <Navigate to="/signin" />}
          />
          <Route path="/mypage" element={<Navigate to="/signin" />} />
        </Routes>
      </livsiFunctionContext.Provider>
    </livsistateContext.Provider>
  );
}

export default App;
