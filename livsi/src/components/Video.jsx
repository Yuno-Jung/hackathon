import { useNavigate } from "react-router-dom";
import "./Video.css";

const Video = ({content}) => {

    const nav = useNavigate()

    const toShort = () => {
        nav(`/short/#/${content}`)
    }

    return (
        <div className="video-container" onClick={toShort}>
            {/* 영상 넣기 */}
            {/* <video src=""></video>  */}
            <div className="main-video">{content}</div>
            <div className="overlay"></div>
        </div>
    )
}

export default Video