import { Link } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          LIV:SI
        </Link>
      </div>
      <div className="header-right">
        <Link to="/" className="home-btn">
          <FaHome />
        </Link>
        <button className="menu-btn" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>

      {/* 사이드 메뉴 */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          <FaTimes />
        </button>
        <nav>
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/photographer/1">촬영하기</Link></li>
            <li><Link to="/mypage/1">내 영상</Link></li>
            <li><Link to="/signup">회원가입</Link></li>
            <li><Link to="/login">로그인</Link></li>
          </ul>
        </nav>
      </div>

      {/* 배경 어둡게 처리 (클릭 시 닫기) */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
}

export default Header;
