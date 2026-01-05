import "../styles/VideoSection.css";
import VideoAula from '../assets/videos/video-aula.mp4';

const VideoSection = () => {
  return (
    <div className="video-section">
      <video className="my-video">
        <source
          src={VideoAula}
          type="video/mp4"
          
        />
      </video>
    </div>
  );
};

export default VideoSection;
