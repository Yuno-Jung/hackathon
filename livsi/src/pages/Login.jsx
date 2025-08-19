import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-container">
      <h1 className="logo">LIV:SI</h1>
      <div className="form-box">
        <input type="text" placeholder="아이디 입력" className="input-field" />
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="input-field"
        />
        <button className="btn">로그인</button>
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
