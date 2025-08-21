import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Result.css";

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const uploadData = JSON.parse(localStorage.getItem(`upload_${id}`));

  const [thumbnail, setThumbnail] = useState(null);

  const handlePublish = () => {
    // 기존 업로드 데이터에 'published' 상태 저장
    const allPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];
    const newPost = {
      id: Date.now(), // 고유 id
      userId: id,
      ...uploadData,
      thumbnail: thumbnail ? URL.createObjectURL(thumbnail) : null,
    };

    localStorage.setItem("publishedPosts", JSON.stringify([...allPosts, newPost]));

    alert("공개되었습니다!");
    navigate(`/mypage/${id}`);
  };

  return (
    <div className="result-section">
      <h1>LIV:SI</h1>
      <h3>사용자 {id} 결과 페이지</h3>

      <div className="video-preview">
        {uploadData?.foodVideo ? (
          <video
            width="100%"
            className="video-thumbnail"
            controls
            src={uploadData.foodVideo}
          />
        ) : (
          <img
            src="https://via.placeholder.com/300x200"
            alt="video preview"
            className="video-thumbnail"
          />
        )}
      </div>

      <p className="result-text">편집 완료!</p>

      <div className="upload-box">
        <label htmlFor="thumbnail-upload" className="upload-label">
          <span className="upload-icon">⬆</span>
          <p>썸네일 업로드</p>
          <input
            id="thumbnail-upload"
            type="file"
            className="file-input"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </label>
      </div>

      {thumbnail && (
        <img
          src={URL.createObjectURL(thumbnail)}
          alt="thumbnail preview"
          className="thumbnail-preview"
        />
      )}

      <div className="action-buttons">
        <button
          className="retry-btn"
          onClick={() => navigate(`/photographer/${id}`)}  // ⬅️ 다시 만들기 동작 추가
        >
          다시만들기
        </button>
        <button className="publish-btn" onClick={handlePublish}>
          공개하기
        </button>
      </div>
    </div>
  );
}

export default Result;
