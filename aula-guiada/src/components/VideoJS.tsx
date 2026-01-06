// VideoJS.tsx
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export type VideoJSProps = {
  options: any;
  onReady?: (player: any) => void;
};

const VideoJS: React.FC<VideoJSProps> = ({ options, onReady }) => {
  const videoRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<any | null>(null);

  React.useEffect(() => {
    if (!videoRef.current) return;

    if (!playerRef.current) {
      // cria o elemento <video-js> dinamicamente (padrão do guia React)
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (
        playerRef.current = videojs(videoElement,options,
        () => {
          onReady?.(player);
        }
      ));
    } else {
      // aqui é onde a mágica da troca dinâmica acontece
      const player = playerRef.current;
      

      // exemplo: atualizar autoplay e fontes
      if (typeof options.autoplay !== 'undefined') {
        player.autoplay(options.autoplay);
      }

      if (options.sources) {
        player.src(options.sources); // aceita array de sources { src, type }.[web:1][web:45]
      }
    }

    // cleanup
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]);

 

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
