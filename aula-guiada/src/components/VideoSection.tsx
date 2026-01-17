import "../styles/VideoSection.css";

import { useCallback, useState } from "react";
import VideoJS from "./VideoJS";


const VideoSection = ({ videosList } : { videosList: string[] }) => {
  const configuracaoAula = {
  videoPrincipal: videosList[0], // "/video-aula.mp4"
  perguntas: [
    { segundo: 300, video: videosList[1] }, // 5min
    { segundo: 600, video: videosList[2] }, // 10min  
    { segundo: 780, video: videosList[3] }  // 13min
  ]
};



    const videoOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: currentVideo,
      type: 'video/mp4'
    }]
  };

  return (
    <div className="video-section">
      <div className="my-video">
        <button onClick={() => setCurrentVideoIndex((prev) => (prev - 1 + videosList.length) % videosList.length)}>Anterior</button>
        <button onClick={() => setCurrentVideoIndex((prev) => (prev + 1) % videosList.length)}>Próximo</button>
       <VideoJS 
      options={videoOptions} 
      onReady={handlePlayerReady}  // ← PASSA AQUI!
    ></VideoJS>
      </div>
    </div>
  );
};

export default VideoSection;
