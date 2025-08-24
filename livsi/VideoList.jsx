import Video from "./Video"

const VideoList = () => {
    const Videos = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

    return (
        <div className="video_list">
            {Videos.map((video, index) => {
                <Video key={index} content={video} />
            })}
        </div>
    )
}

export default VideoList