import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = {
      id: Date.now(),
      name,
      phone,
      username,
      password,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("회원가입 성공!");
    navigate(`/mypage/${newUser.id}`);
  };

  return (
    <div className="auth-container">
      <h1 className="logo">LIV:SI</h1>
      <h2 className="title">회원가입</h2>
      <div className="form-box">
        <input
          type="text"
          placeholder="👤 이름 입력"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="📞 휴대전화번호"
          className="input-field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="🆔 아이디 입력"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="🔑비밀번호 입력"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" onClick={handleSignup}>
          회원가입
        </button>
      </div>
      <footer className="footer">© Livsi Corp. \ 고객센터</footer>
    </div>
  );
}

export default Signup;
