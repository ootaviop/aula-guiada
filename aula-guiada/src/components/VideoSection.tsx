import { use, useEffect, useRef, useState } from "react";
import "../styles/VideoSection.css";
import VideoAula from "./VideoAula";
import type videojs from "video.js";

/**
 * player.currentTime() - Retorna o tempo atual do vídeo em segundos.
 * player.on('timeupdate', callback) - Adiciona um ouvinte de evento que é chamado sempre que o tempo atual do vídeo é atualizado.
 * player.on('play', callback) - Adiciona um ouvinte de evento que é chamado quando o vídeo é reproduzido.
 * player.on('pause', callback) - Adiciona um ouvinte de evento que é chamado quando o vídeo é pausado.
 * player.currentSrc() - Retorna a URL da fonte de vídeo atual.
 * player.src({ src: 'url', type: 'video/mp4' }) - Define uma nova fonte de vídeo para o player.
 * player.load() - Recarrega o vídeo, iniciando o carregamento da nova fonte.
 *
 */

export type VideoOptionsProps = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sources: {
    src: string;
    type: string;
    id?: string;
    insertTime?: number;
  }[];
};

const VideoSection: React.FC = () => {
  const [subject, setSubject] = useState<string | null>(null);
  const [checkPoint, setCheckPoint] = useState(null);
  const [nextQuestion, setNextQuestion] = useState(null);
  const playerRef = useRef<videojs.Player | null>(null);
  const mySubject = useRef<string | null>(null);
  const myCheckpoint = useRef<number | null>(null);
  const myNextQuestion = useRef<number>(1);

  const triggeredPoints = new Set();

  const videoOptions: VideoOptionsProps = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "/src/assets/videos/aula.mp4",
        type: "video/mp4",
        id: "lessonVideo",
      },
      {
        src: "/src/assets/videos/q1.mp4",
        type: "video/mp4",
        id: "question1",
        insertTime: 11.9,
      },
      {
        src: "/src/assets/videos/q2.mp4",
        type: "video/mp4",
        id: "question3",
        insertTime: 23,
      },
      {
        src: "/src/assets/videos/q3.mp4",
        type: "video/mp4",
        id: "question4",
        insertTime: 32,
      },
    ],
  };

  const stopPoints = videoOptions.sources
    .filter((source) => source.insertTime !== undefined)
    .map((source) => source.insertTime as number);
  console.log(stopPoints);

  const getStopPoint = (time: number) => {
    return stopPoints.find((stopTime) => stopTime === time);
  };
  // console.log(stopPoints);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    console.log(player);
    console.log(typeof player);

    player.on("play", () => {
      console.log(player.currentSrc());
    });

    player.on("pause", () => {
      console.log("Video paused");
    });

    player.on("ended", () => {
      if (mySubject.current === "question") {
        console.log("The question video ended. Resuming the lesson video.");
        player.src({
          src: videoOptions.sources[0].src,
          type: "video/mp4",
        });
        player.load();
        player.currentTime(myCheckpoint.current || 0);
        player.play();
      }
    });

    player.on("timeupdate", () => {
      if (player.currentSrc().includes(videoOptions.sources[0].src)) {
        // Tomar cuidado aqui, pois quando o vídeo é local, o currentSrc retornará o caminho completo(com o localhost:3000/...) e aí se tentar comparar direto com o src, não vai bater. Por isso usei o includes.
        mySubject.current = "lesson";
        console.log(player.currentSrc());
      } else {
        mySubject.current = "question";
        console.log(player.currentSrc());
      }

      // const currentTime = Math.floor(player.currentTime()); // Arredondar em segundos
      const currentTime = parseFloat(player.currentTime().toFixed(1)); // Uma casa decimal
      console.log("Current time: ", player.currentTime(), currentTime);

      // if (
      //   currentTime === stopPoints.find((time) => time === currentTime) &&
      //   !triggeredPoints.has(currentTime) &&
      //   mySubject.current === "lesson"
      // ) {
      //   console.log("achou", currentTime);
      // }

      console.log(mySubject);
      const nextSource = videoOptions.sources[myNextQuestion.current];
      if (nextSource?.insertTime !== undefined) {
        if (
          currentTime >= nextSource.insertTime &&
          currentTime < nextSource.insertTime + 1 &&
          !triggeredPoints.has(nextSource.insertTime) &&
          mySubject.current === "lesson"
        ) {
          triggeredPoints.add(
            nextSource.insertTime as number,
          );
          myCheckpoint.current = player.currentTime();
          player.pause();
          player.src({
            src: videoOptions.sources[myNextQuestion.current].src,
            type: "video/mp4",
          });
          myNextQuestion.current = triggeredPoints.size + 1;
          // Recarrega o vídeo, iniciando o carregamento do novo vídeo
          player.load();
          // Se quiser que o novo vídeo comece a tocar imediatamente após o load
          player.play();
        }
      }

      // if (currentTime === 6 && !triggeredPoints.has(6) && mySubject.current === 'question') {
      //   console.log('6 segundos');
      //   triggeredPoints.add(6);
      // }

      console.log("Triggered points: ", triggeredPoints);
    });
  };
  return (
    <>
      <VideoAula options={videoOptions} onReady={handlePlayerReady} />
    </>
  );
};

export default VideoSection;
