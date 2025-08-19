import "./Result.css";

function Result() {
  return (
    <div className="result-section">
      {/* 결과 화면 샘플 */}
      <div className="video-preview">
        <img
          src="https://via.placeholder.com/300x200"
          alt="video preview"
          className="video-thumbnail"
        />
        <div className="play-overlay">▶</div>
      </div>

      <p className="result-text">편집 완료!</p>

      <div className="upload-box">
        <label htmlFor="thumbnail-upload" className="upload-label">
          <span className="upload-icon">⬆</span>
          <p>파일 선택하여 업로드</p>
          <input id="thumbnail-upload" type="file" className="file-input" />
        </label>
      </div>

      <p className="section-title">썸네일을 선택해 주세요</p>

      <div className="action-buttons">
        <button className="retry-btn">다시만들기</button>
        <button className="publish-btn">공개하기</button>
      </div>
    </div>
  );
}

export default Result;
