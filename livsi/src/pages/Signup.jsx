function Signup() {
  return (
    <div className="auth-container">
      <h1 className="logo">LIV:SI</h1>
      <h2 className="title">회원가입</h2>
      <div className="form-box">
        <input type="text" placeholder="👤 이름 입력" className="input-field" />
        <input type="text" placeholder="📞 휴대전화번호" className="input-field" />
        <input type="text" placeholder="🆔 아이디 입력" className="input-field" />
        <input
          type="password"
          placeholder="🔑비밀번호 입력"
          className="input-field"
        />
        <button className="btn">회원가입</button>
      </div>
      <footer className="footer">© Livsi Corp. \ 고객센터</footer>
    </div>
  );
}

export default Signup;
