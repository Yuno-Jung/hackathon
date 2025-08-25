import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import "./Photographer.css";
import axios from "../axios/axios";

function Photographer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [storeImg, setStoreImg] = useState(null);
  const [menuImg, setMenuImg] = useState(null);
  const [foodVideo, setFoodVideo] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Seodaemun-gu");
  const [effect, setEffect] = useState("남성");

  // 📌 수정 모드일 경우 기존 데이터 불러오기
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(`upload_${id}`));
    if (savedData) {
      setStoreImg(savedData.storeImg || null);
      setMenuImg(savedData.menuImg || null);
      setFoodVideo(savedData.foodVideo || null);
      setCategory(savedData.category || "");
      setDescription(savedData.description || "");
      setLocation(savedData.location || "");
      setEffect(savedData.effect || "남성");
    }
  }, [id]);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setLocation(data.address);
      },
    }).open();
  };

  const handleSubmit = async () => {
    // const uploadData = {
    //   userId: id,
    //   storeImg: storeImg,
    //   menuImg: menuImg,
    //   foodVideo: foodVideo,
    //   category,
    //   description,
    //   location,
    //   effect,
    // };

    // localStorage.setItem(`upload_${id}`, JSON.stringify(uploadData));
    // // navigate(`/result/${id}`);
    const videoInfo = {
        sido: "서울시",
        sigungu: "서대문구",
        member: {
          email: "user@example.com",
        },
      }

    const formData = new FormData()
    formData.append("videoFile", foodVideo)
    formData.append("video", JSON.stringify(videoInfo))
    formData.append("sigunguEnglish", "Seodaemun-gu")
    formData.append("voicePack", effect)

    const res = await axios.post(
      `/videos/video-analyze`,
      formData,
      // location,
      // effect,
      // foodVideo,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
  };

  return (
    <div>
      <Header />

      <div className="photographer-container">
        <p className="section-title">가게 영상을 업로드해주세요.</p>
        <div className="upload-box">
          <label htmlFor="video-upload" className="upload-label">
            <span className="upload-icon">⬆</span>
            <p>파일 선택하여 업로드</p>
            <input
              id="video-upload"
              type="file"
              className="file-input"
              accept="video/*"
              onChange={(e) =>
                setFoodVideo(
                  // URL.createObjectURL(
                  e.target.files[0]
                  // )
                )
              }
            />
          </label>
        </div>
        {foodVideo && <video width="300" controls src={foodVideo} />}

        <div className="form-box">
          <div className="address-box">
            <input
              type="text"
              placeholder="위치"
              className="input-field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              readOnly
            />
            <button
              type="button"
              onClick={handleAddressSearch}
              className="address-btn"
            >
              주소 검색
            </button>
          </div>

          <select
            className="input-field"
            value={effect}
            onChange={(e) => setEffect(e.target.value)}
          >
            <option>남성</option>
            <option>여성</option>
          </select>
        </div>

        <button className="start-btn" onClick={handleSubmit}>
          편집 시작!
        </button>
      </div>
    </div>
  );
}

export default Photographer;
