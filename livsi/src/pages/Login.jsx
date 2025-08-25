import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { livsiFunctionContext } from "../App";
import Header from "../components/Header";

function Login() {
  const { handleLogin } = useContext(livsiFunctionContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = () => {
    const user = handleLogin(username, password);
    if (user) {
      alert("로그인 성공!");
      navigate(`/mypage/${user.id}`);
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div>
      <Header />
    <div className="auth-container">
      <div className="form-box">
        <input
          type="text"
          placeholder="아이디 입력"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" onClick={onLogin}>
          로그인
        </button>
      </div>
      <p className="help-text">
        아이디 또는 비밀번호를 까먹지 않았나요?{" "}
        <Link to="/signup" className="link">
          회원가입
        </Link>
      </p>
      <footer className="footer">© Livsi Corp. \ 고객센터</footer>
    </div>
    </div>
  );
}

export default Login;
