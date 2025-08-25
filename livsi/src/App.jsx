import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Short from "./pages/Short";
import Photographer from "./pages/Photographer";
import Processing from "./pages/Processing"; // 📌 추가
import Result from "./pages/Result";
import MyPage from "./pages/Mypage";
import Main from "./pages/Main";
import Onboard from "./components/Onboard";
import axios from "./axios/axios";

export const livsiFunctionContext = createContext();
export const livsistateContext = createContext();

function App() {
  const [isOn, setIson] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState(null);

  const [Videos, setVideos] = useState([]);

  const onLoad = async () => {
    let Data = [];
    try {
      const res = await axios.get("/videos/sido?sido=서울시");
      Data = res.data;
      setVideos(Data);
      console.log("loaded", Videos);
    } catch (error) {
      console.log("error");
    }
    console.log(Data);
  };

  useEffect(() => {
    const savedLogin = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedLogin) {
      setIsLogin(true);
      setLoginInfo(savedLogin);
    }
  }, []);

  const setSkip = () => {
    setIson(false);
  };

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
    <livsistateContext.Provider value={{ loginInfo, isLogin, Videos }}>
      <livsiFunctionContext.Provider value={{ setSkip, handleLogin, onLoad }}>
        {/* {isOn ? <Onboard /> : null} */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/short" element={<Short />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/photographer/:id" element={<Photographer />} />
          <Route path="/processing/:id" element={<Processing />} /> {/* 📌 추가 */}
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
