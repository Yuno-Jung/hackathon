import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import axios from "../axios/axios"; // 서버 호출용
import "./Result.css";

function Result() {
  const { id: jobId } = useParams(); // jobId 받아오기
  const navigate = useNavigate();

  const [resultData, setResultData] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!jobId) {
        alert("유효한 jobId가 없습니다.");
        navigate("/photographer/1");
        return;
      }

      // 서버에서 최종 결과 가져오기
      try {
        const res = await axios.get(`/videos/video-analyze/status/${jobId}`);
        if (res.data.status === "completed") {
          setResultData(res.data);
          localStorage.setItem(`result_${jobId}`, JSON.stringify(res.data));
        } else {
          alert("결과가 아직 준비되지 않았습니다.");
          navigate(`/photographer/1`);
        }
      } catch (err) {
        console.error("결과 가져오기 실패", err);
        alert("결과를 불러오는 중 오류가 발생했습니다.");
        navigate(`/photographer/1`);
      }
    };

    fetchResult();
  }, [jobId, navigate]);

  const handlePublish = () => {
    const allPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];
    const newPost = {
      id: Date.now(),
      jobId,
      ...resultData,
      thumbnail: thumbnail ? URL.createObjectURL(thumbnail) : null,
    };

    localStorage.setItem("publishedPosts", JSON.stringify([...allPosts, newPost]));
    alert("공개되었습니다!");
    navigate(`/mypage/${jobId}`);
  };

  return (
    <div className="result-section">
      <Header />
      <h3>결과 페이지</h3>

      <div className="video-preview">
        {resultData?.videoFile ? (
          <video
            className="video-thumbnail"
            controls
            src={resultData.videoFile}
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

      {thumbnail && (
        <img
          src={URL.createObjectURL(thumbnail)}
          alt="thumbnail preview"
          className="thumbnail-preview"
        />
      )}

      <div className="action-buttons">
        <button className="retry-btn" onClick={() => navigate(`/photographer/1`)}>
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
