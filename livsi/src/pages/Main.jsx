import React from "react";
import "./Main.css";
import { useContext, useState } from "react";
import Header from "../components/Header.jsx";
import VideoList from "../components/VideoList";
import { livsiFunctionContext } from "../App";

const Main = () => {
  const { toggleMenuBar } = useContext(livsiFunctionContext);

  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [isCityPanelOpen, setIsCityPanelOpen] = useState(false);
  const [isDistrictPanelOpen, setIsDistrictPanelOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const locations = {
    "서울시": [
      "강남구", "서초구", "송파구", "강동구", "관악구", "동작구",
      "영등포구", "마포구", "용산구", "서대문구", "종로구", "중구",
      "성동구", "광진구",
    ],
  };

  const toggleLocationExpansion = () => {
    const willOpen = !isLocationExpanded;
    setIsLocationExpanded(willOpen);
    if (!willOpen) {
      setIsCityPanelOpen(false);
      setIsDistrictPanelOpen(false);
    }
  };

  const handleDistrictToggle = (district) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistricts([]);
    setIsCityPanelOpen(false);
  };

  const handleSelectAllDistricts = () => {
    if (!selectedCity) return;
    const allDistricts = locations[selectedCity] || [];
    const areAllSelected = allDistricts.length === selectedDistricts.length;

    setSelectedDistricts(areAllSelected ? [] : allDistricts);
  };

  const handleApply = () => toggleLocationExpansion();

  const handleReset = () => {
    setSelectedCity(null);
    setSelectedDistricts([]);
  };

  return (
    <div className="main-container">
      <Header toggleMenuBar={toggleMenuBar} />
      <div className="location-container">
        <div className="location-wrapper">
          <div className="location-bar">
            <button className="filter-button" onClick={toggleLocationExpansion}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </button>
            <div className="selected-locations-list">
              {selectedDistricts.length > 0 ? (
                selectedDistricts.map((district) => (
                  <div key={district} className="selected-tag">
                    {district}
                  </div>
                ))
              ) : (
                <span className="placeholder-tag">지역을 선택해주세요</span>
              )}
            </div>
          </div>

          <div className={`location-expansion-panel ${isLocationExpanded ? "expanded" : ""}`}>
            {/* 시/도 선택 */}
            <div className="accordion-header" onClick={() => setIsCityPanelOpen(!isCityPanelOpen)}>
              <span>{selectedCity || "시/도 선택"}</span>
              <span className={`accordion-arrow ${isCityPanelOpen ? "expanded" : ""}`}>▼</span>
            </div>
            <div className={`accordion-panel ${isCityPanelOpen ? "expanded" : ""}`}>
              <div className="location-grid">
                {Object.keys(locations).map((city) => (
                  <button key={city} className="location-button" onClick={() => handleCitySelect(city)}>
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* 구/군 선택 */}
            <div
              className={`accordion-header ${!selectedCity ? "disabled" : ""}`}
              onClick={() => selectedCity && setIsDistrictPanelOpen(!isDistrictPanelOpen)}
            >
              <span>구/군 선택</span>
              <span className={`accordion-arrow ${isDistrictPanelOpen ? "expanded" : ""}`}>▼</span>
            </div>
            <div className={`accordion-panel ${isDistrictPanelOpen ? "expanded" : ""}`}>
              {selectedCity && (
                <>
                  <div className="location-grid-header">
                    <button className="select-all-button" onClick={handleSelectAllDistricts}>
                      전체선택
                    </button>
                  </div>
                  <div className="location-grid">
                    {(locations[selectedCity] || []).map((district) => (
                      <button
                        key={district}
                        className={`location-button ${selectedDistricts.includes(district) ? "selected" : ""}`}
                        onClick={() => handleDistrictToggle(district)}
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="button-group">
              <button className="all-undo-button" onClick={handleReset}>
                선택취소
              </button>
              <button className="apply-button" onClick={handleApply}>
                적용하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <VideoList />
    </div>
  );
};

export default Main;
