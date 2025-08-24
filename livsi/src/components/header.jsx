import "./Header.css";
import { GoHome } from "react-icons/go";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { livsistateContext } from "../App";

const Header = () => {
  
  const { loginInfo, isLogin } = useContext(livsistateContext);

  const nav = useNavigate();

  const goHome = () => {
    nav("/");
    console.log("홈");
  };

  const goInfo = () => {
    nav(isLogin ? `/mypage/${loginInfo.id}` : "/signin");
  }

  return (
    <div className="header">
      <h1 className="logo" onClick={goHome}>
        LIV:SI
      </h1>
      <div className="nav">
        <IoMdInformationCircleOutline size={30} className="menu-icon" onClick={goInfo} />
        <GoHome size={30} className="home-icon" onClick={goHome} />
      </div>
    </div>
  );
};

export default Header;
