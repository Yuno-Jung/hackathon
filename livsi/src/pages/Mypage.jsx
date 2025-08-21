import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Mypage.css";

function MyPage() {
  const { id } = useParams();
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

  const handleEdit = (postId) => {
    alert(`수정 기능은 여기에 연결하면 됩니다. (postId: ${postId})`);
  };

  return (
    <div className="mypage-container">
      <h1>LIV:SI</h1>
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
                <button className="edit-btn" onClick={() => handleEdit(post.id)}>
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
