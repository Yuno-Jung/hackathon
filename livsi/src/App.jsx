import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Photographer from "./pages/Photographer";
import Result from "./pages/Result";
import MyPage from "./pages/Mypage";   // ⬅️ 마이페이지 추가
import "./App.css";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/photographer/:id" element={<Photographer />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/mypage/:id" element={<MyPage />} />   {/* ✅ 마이페이지 라우트 추가 */}
      </Routes>
    </div>
  );
}

export default App;


