import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Photographer.css";

function Photographer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [storeImg, setStoreImg] = useState(null);
  const [menuImg, setMenuImg] = useState(null);
  const [foodVideo, setFoodVideo] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [effect, setEffect] = useState("기본 효과");

  const handleSubmit = () => {
    const uploadData = {
      userId: id,
      storeImg: storeImg ? URL.createObjectURL(storeImg) : null,
      menuImg: menuImg ? URL.createObjectURL(menuImg) : null,
      foodVideo: foodVideo ? URL.createObjectURL(foodVideo) : null,
      category,
      description,
      location,
      effect,
    };

    localStorage.setItem(`upload_${id}`, JSON.stringify(uploadData));
    navigate(`/result/${id}`);
  };

  return (
    <div className="photographer-container">
      <h1 className="logo">LIV:SI</h1>

      {/* 외관 업로드 */}
      <p className="section-title">가게의 외관/간판을 업로드해주세요.</p>
      <div className="upload-box">
        <label htmlFor="store-upload" className="upload-label">
          <span className="upload-icon">⬆</span>
          <p>파일 선택하여 업로드</p>
          <input
            id="store-upload"
            type="file"
            className="file-input"
            accept="image/*"
            onChange={(e) => setStoreImg(e.target.files[0])}
          />
        </label>
      </div>
      {storeImg && (
        <img src={URL.createObjectURL(storeImg)} alt="store preview" width="200" />
      )}

      {/* 메뉴판 업로드 */}
      <p className="section-title">가게의 메뉴판을 업로드해주세요.</p>
      <div className="upload-box">
        <label htmlFor="menu-upload" className="upload-label">
          <span className="upload-icon">⬆</span>
          <p>파일 선택하여 업로드</p>
          <input
            id="menu-upload"
            type="file"
            className="file-input"
            accept="image/*"
            onChange={(e) => setMenuImg(e.target.files[0])}
          />
        </label>
      </div>
      {menuImg && (
        <img src={URL.createObjectURL(menuImg)} alt="menu preview" width="200" />
      )}

      {/* 음식 영상 업로드 */}
      <p className="section-title">가게의 음식 영상을 업로드해주세요.</p>
      <div className="upload-box">
        <label htmlFor="video-upload" className="upload-label">
          <span className="upload-icon">⬆</span>
          <p>파일 선택하여 업로드</p>
          <input
            id="video-upload"
            type="file"
            className="file-input"
            accept="video/*"
            onChange={(e) => setFoodVideo(e.target.files[0])}
          />
        </label>
      </div>
      {foodVideo && (
        <video width="300" controls src={URL.createObjectURL(foodVideo)} />
      )}

      {/* 카테고리 선택 */}
      <p className="section-title">업로드한 영상의 카테고리를 설정해주세요</p>
      <div className="category-buttons">
        <button onClick={() => setCategory("음식점")}>🍜 음식점</button>
        <button onClick={() => setCategory("카페")}>🏠 카페</button>
        <button onClick={() => setCategory("주류")}>🍺 주류</button>
      </div>

      {/* 설명 폼 */}
      <div className="form-box">
        <input
          type="text"
          placeholder="가게 설명"
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="위치"
          className="input-field"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="input-field"
          value={effect}
          onChange={(e) => setEffect(e.target.value)}
        >
          <option>기본 효과</option>
          <option>흑백</option>
          <option>비네팅</option>
        </select>
      </div>

      <button className="btn start-btn" onClick={handleSubmit}>
        편집 시작!
      </button>
    </div>
  );
}

export default Photographer;
