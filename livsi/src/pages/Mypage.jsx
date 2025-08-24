import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/header";
import "./Mypage.css";

function MyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];
    const userPosts = allPosts.filter((post) => post.userId === id);
    setPosts(userPosts);
  }, [id]);

  const handleDelete = (postId) => {
    const allPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];
    const updated = allPosts.filter((p) => p.id !== postId);
    localStorage.setItem("publishedPosts", JSON.stringify(updated));
    setPosts(updated.filter((p) => p.userId === id));
  };

  const handleEdit = (post) => {
    // 선택한 게시물 데이터를 수정용으로 localStorage에 저장
    localStorage.setItem(`upload_${id}`, JSON.stringify(post));

    // Photographer 페이지로 이동
    navigate(`/photographer/${id}`);
  };

  return (
    <div className="mypage-container">
      <Header />   {/* ✅ 공통 헤더 */}
      
      <h3>내 영상 관리</h3>

      {posts.length > 0 ? (
        <div className="mypage-grid">
          {posts.map((post) => (
            <div key={post.id} className="mypage-card">
              {post.thumbnail ? (
                <img src={post.thumbnail} alt="thumbnail" className="mypage-thumb" />
              ) : (
                <video src={post.foodVideo} className="mypage-thumb" controls />
              )}
              <div className="mypage-actions">
                <button className="edit-btn" onClick={() => handleEdit(post)}>
                  수정
                </button>
                <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>아직 공개한 영상이 없습니다.</p>
      )}
    </div>
  );
}

export default MyPage;
