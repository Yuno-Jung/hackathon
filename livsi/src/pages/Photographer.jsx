import "./photographer.css";

function Photographer() {
  return (
    <div className="photographer-container">
      <h1 className="logo">LIV:SI</h1>

      {/* 업로드 섹션 */}
      <p className="section-title">가게의 외관/간판을 업로드해주세요.</p>
      <div className="upload-box">
        <label htmlFor="store-upload" className="upload-label">
          <span className="upload-icon">⬆</span>
          <p>파일 선택하여 업로드</p>
          <input id="store-upload" type="file" className="file-input" />
        </label>
      </div>

      <p className="section-title">가게의 메뉴판을 업로드해주세요.</p>  
      <div className="upload-box">
        <label htmlFor="store-upload" className="upload-label">
          <span className="upload-icon">⬆</span>
          <p>파일 선택하여 업로드</p>
          <input id="store-upload" type="file" className="file-input" />
        </label>
      </div>
       
      <p className="section-title">가게의 음식 영상을 업로드해주세요.</p> 
      <div className="upload-box">
        <label htmlFor="store-upload" className="upload-label">
          <span className="upload-icon">⬆</span>
          <p>파일 선택하여 업로드</p>
          <input id="store-upload" type="file" className="file-input" />
        </label>
      </div>

      <p className="section-title">업로드한 영상의 카테고리를 설정해주세요</p>
      <div className="category-buttons">
        <button className="category-btn">🍜 음식점</button>
        <button className="category-btn">🏠 카페</button>
        <button className="category-btn">🍺 주류 </button>
      </div>

      {/* 설명 폼 */}
      <div className="form-box">
        <input type="text" placeholder="가게 설명" className="input-field" />
        <input type="text" placeholder="위치" className="input-field" />
        <select className="input-field">
          <option>영상 특수효과 선택</option>
          <option>기본 효과</option>
          <option>흑백</option>
          <option>비네팅</option>
        </select>
      </div>

      <button className="btn start-btn">편집 시작!</button>
    </div>
  );
}

export default Photographer;
