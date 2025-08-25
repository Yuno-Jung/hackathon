import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import "./Mypage.css";
import axios from "../axios/axios";

function MyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const allPosts = axios.get(`/members/6`)
    console.log(allPosts)
    setPosts(allPosts);
  }, [id]);

  const handleDelete = (postId) => {
    const allPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];
    const updated = allPosts.filter((p) => p.id !== postId);
    localStorage.setItem("publishedPosts", JSON.stringify(updated));
    setPosts(updated.filter((p) => p.userId === id));
  };

  const handleEdit = (post) => {
    localStorage.setItem(`upload_${id}`, JSON.stringify(post));
    navigate(`/photographer/${id}`);
  };

  const handleNewVideo = () => {
    localStorage.removeItem(`upload_${id}`);
    navigate(`/photographer/${id}`);
  };

  return (
    <div>
      <Header /> 

    <div className="mypage-container">

      <button className="new-video-btn" onClick={handleNewVideo}>
         + 동영상 새로 만들기
      </button>

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
    </div>
  );
}

export default MyPage;
