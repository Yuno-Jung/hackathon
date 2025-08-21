import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      alert("로그인 성공!");
      navigate(`/photographer/${foundUser.id}`);
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="logo">LIV:SI</h1>
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
        <button className="btn" onClick={handleLogin}>
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
  );
}

export default Login;
