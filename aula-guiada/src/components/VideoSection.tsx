import "../styles/VideoSection.css";
import VideoAula from "../assets/videos/video-aula.mp4";
import ReactPlayer from "react-player";
import { useState } from "react";


const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTime, setActualTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const percentTime = totalTime > 0 ? ((actualTime / totalTime) * 100).toFixed(0) : "0";

  return (
    <div className="video-section">
      <div className="my-video">
        <span>Duração {actualTime}</span>
        <p>Porcentagem: {percentTime}</p>
        <ReactPlayer
         
          controls={true}
          width="100%"
          height="100%"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playing={isPlaying}
          onTimeUpdate={(e) => setActualTime(e.target.currentTime)}
          onDurationChange={(e) => setTotalTime(e.target.duration)}
        >
         <source src={VideoAula} type="video/mp4" />
        </ReactPlayer>
      </div>
    </div>
  );
};

export default VideoSection;

