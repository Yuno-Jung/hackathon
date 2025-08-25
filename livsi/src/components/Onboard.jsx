import "./Onboard.css"
import React, { useContext, useRef, useState } from "react"
import marketImage from "../images/traditional_market.png"
import backgroundImage_1 from "../images/background_1.png"
import backgroundImage_2 from "../images/background_2.png"
import { livsiFunctionContext } from "../App"

const card_title = {
  title: "LIV:SI",
  subTitle: "Local Interactive Video:\n Smart & Intuitive",
}

const cards = [
  {
    id: 1,
    bgClass: "bg-card-1",
    text: "라이브러리 없이 직접 슬라이더를 구현했습니다.",
    imageUrl: marketImage,
    middleText: "진짜 로컬의 숨결",
    description: "작은 가게의 풍경이\n 리브시를 만나 이야기가 되고,\n 여러분의 선택으로 이어집니다.",
  },
  {
    id: 2,
    bgClass: "bg-card-2",
    text: "React의 useState로 현재 페이지를 추적합니다.",
    imageUrl: backgroundImage_1,
    middleText: "기술을 더하다",
    description: "리브시는 생생한 시장의 이야기에\n AI기술을 엮어 더 많은 이들의\n 일상으로 건넵니다.",
  },
  {
    id: 3,
    bgClass: "bg-card-3",
    text: "CSS transform 속성으로 부드러운 전환 효과를 만듭니다.",
    imageUrl: backgroundImage_2,
    middleText: "더 정확하게",
    description: "리브시는 가게에서 판매하는\n 상품의 정보를 보다 정확하게 제공합니다.",
  },
]

const Onboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSwipe, setIsSwipe] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const swipeStartX = useRef(null)

  const { setSkip } = useContext(livsiFunctionContext)

  const handleSwipeStart = (clientX) => {
    setIsSwipe(true)
    swipeStartX.current = clientX
  }

  const handleSwipeMove = (clientX) => {
    if (!isSwipe) return
    const currentX = clientX
    let diff = currentX - swipeStartX.current

    if (currentIndex === 0 && diff > 0) {
      diff = 0
    }

    if (currentIndex === cards.length - 1 && diff < 0) {
      diff = 0
    }
    setTranslateX(diff)
  }

  const handleSwipeEnd = () => {
    if (!isSwipe) return

    const threshold = window.innerWidth / 4
    if (translateX < -threshold && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (translateX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }

    setTranslateX(0)
    swipeStartX.current = null
    setIsSwipe(false)
  }

  const onMouseDown = (e) => handleSwipeStart(e.clientX)
  const onMouseMove = (e) => handleSwipeMove(e.clientX)
  const onMouseUp = () => handleSwipeEnd()
  const onMouseLeave = () => handleSwipeEnd()

  const onTouchStart = (e) => handleSwipeStart(e.touches[0].clientX)
  const onTouchMove = (e) => handleSwipeMove(e.touches[0].clientX)
  const onTouchEnd = () => handleSwipeEnd()

  const trackStyle = {
    transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
    transition: isSwipe ? "none" : "transform 0.5s ease-in-out",
  }

  return (
    <div
      className="slider-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="slider-track" style={trackStyle}>
        {cards.map((card) => (
          <div key={card.id} className="slide">
            <div
              className="slide-content"
              style={{ backgroundImage: `url(${card.imageUrl})` }}
            >
              <div className="slide-top">
                <h1 className="slide-header">{card_title.title}</h1>
                <p className="slide-subtitle">{card_title.subTitle}</p>
              </div>
              <div className="slide-bottom">
                <h1 className="slide-middle">{card.middleText}</h1>
                <p className="slide-description">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bottom-ui">
        <button className="bottom-button" onClick={setSkip}>건너뛰기</button>
        <div className="pagination-dots">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Onboard
