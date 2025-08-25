import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/axios";
import "./Processing.css";

function Processing() {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [progress, setProgress] = useState("영상 분석 요청 중...");

  useEffect(() => {
    if (!jobId) {
      alert("유효한 jobId가 없습니다.");
      navigate("/photographer/1");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await axios.get(`/videos/video-analyze/status/${jobId}`);
        const data = res.data;
        console.log("[폴링 상태]", data);

        if (data.progressMessage) {
          setProgress(data.progressMessage);
        }

        const statusLower = data.status.toLowerCase();

        if (statusLower === "completed") {
          localStorage.setItem(`result_${jobId}`, JSON.stringify(data));
          setStatus("completed");
          navigate(`/result/${jobId}`);
        } else if (statusLower === "failed") {
          setStatus("failed");
          alert("영상 분석 실패");
          navigate(`/photographer/1`);
        } else {
          // 짧은 주기로 다시 체크 (3초)
          setTimeout(checkStatus, 3000);
        }
      } catch (err) {
        console.error("상태 조회 실패", err);
        setTimeout(checkStatus, 3000);
      }
    };

    checkStatus();
  }, [jobId, navigate]);

  return (
    <div className="processing-container">
      <h2>영상 편집 중입니다...</h2>
      <p>{progress}</p>
      <div className="spinner"></div>
      {status === "completed" && <p>분석 완료! 곧 결과 페이지로 이동합니다.</p>}
      {status === "failed" && <p>분석에 실패했습니다. 다시 시도해주세요.</p>}
    </div>
  );
}

export default Processing;
