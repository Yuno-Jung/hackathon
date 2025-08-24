import "./VideoList.css";
import Video from "./Video";
import { useEffect, useRef, useState } from "react";

const VideoList = () => {
  const Videos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [itemLimit, setItemLimit] = useState(Videos.length);
  const gridRef = useRef(null);

  const certiffiedVideos = (cartegories) => {
    return Videos.filter((video) => cartegories.includes(video));
  };

  useEffect(() => {
    const calculateLimit = () => {
      if (gridRef.current) {
        const gridStyle = window.getComputedStyle(gridRef.current);
        const columnValue = gridStyle.getPropertyValue("grid-template-columns");
        const columnCount = columnValue.split(" ").length;
        setItemLimit(columnCount);
      }
    };

    // 초기 계산을 위해 잠시 기다립니다.
    const timeoutId = setTimeout(calculateLimit, 100);

    // 화면 크기가 변경될 때마다 다시 계산합니다.
    window.addEventListener("resize", calculateLimit);

    // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateLimit);
    };
  }, []); // 이 effect는 처음 마운트될 때 한 번만 실행됩니다.

  return (
    <div className="video-list-container">
      <div className="video-list" ref={gridRef}>
        {Videos.slice(0, itemLimit).map((video, index) => (
          <Video key={index} content={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
