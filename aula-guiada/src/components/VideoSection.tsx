import { useEffect, useRef, useState } from "react";
import "../styles/VideoSection.css";
import VideoAula from "./VideoAula";
import type videojs from "video.js";
import type { VideoOptionsProps } from "../types/types";
import observerModuleInstance from "../modules/ObserverModule";



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

class VideoState {
 
  state = {
    isPlaying: false,
    actualSrc: null as string | null,
    subject: null as string | null,
  }

  setState(newState: Partial<typeof this.state>) {
    this.state = { ...this.state, ...newState };
    console.log(this.state);
    // Notify observers about state change
    Observer.notify("videoStateChange", this.state);
  }
  getState() {
    return this.state;
  }

  init() {
    this.state = {
      isPlaying: false,
      actualSrc: null,
      subject: null,
    };
    Observer.subscribeTo("playingState", (data: { isPlaying: boolean }) => {
      this.setState({ isPlaying: data.isPlaying });
    });
    Observer.subscribeTo("actualSrc", (data: { actualSrc: string }) => {
      this.setState({ actualSrc: data.actualSrc });
    });
  }
}

const VideoSection = ({options} : {options: VideoOptionsProps}) => {
  const playerRef = useRef<typeof videojs.players | null>(null);
  // const [playerState, setPlayerState] = useState<string | null>(null);
  const videoState = new VideoState();
  const [actualSrc, setActualSrc] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const myCheckpoint = useRef<number | null>(null);
  const myNextQuestion = useRef<number>(1);
  // const mySubject = useRef<string | null>(null);
  
  const triggeredPoints = new Set();


  // const options: optionsProps = {
  //   autoplay: false,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   sources: [
  //     {
  //       src: "/src/assets/videos/aula.mp4",
  //       type: "video/mp4",
  //       id: "lessonVideo",
  //     },
  //     {
  //       src: "/src/assets/videos/q1.mp4",
  //       type: "video/mp4",
  //       id: "question1",
  //       insertTime: 11.9,
  //     },
  //     {
  //       src: "/src/assets/videos/q2.mp4",
  //       type: "video/mp4",
  //       id: "question2",
  //       insertTime: 23,
  //     },
  //     {
  //       src: "/src/assets/videos/q3.mp4",
  //       type: "video/mp4",
  //       id: "question3",
  //       insertTime: 32,
  //     },
  //   ],
  // };
  // console.log(playerState, subject, actualSrc);

  const stopPoints = (sources: VideoOptionsProps["sources"]) =>
    sources
      .filter((source) => source.insertTime !== undefined)
      .map((source) => source.insertTime as number); 

  const handlePlayerReady = (player: typeof videojs.players) => {
    playerRef.current = player;
    // console.log(player);
    //console.log(typeof player);

    player.on("play", () => {
      Observer.notify("playingState", { isPlaying: true });
      setActualSrc(player.currentSrc());
      if (actualSrc?.includes(options.sources[0].src)) {
        setSubject("lesson");
      } else {
        setSubject("question");
      }
    });

    player.on("pause", () => {
      Observer.notify("playingState", { isPlaying: false });
    });

    // player.on("ended", () => {
    //   if (subject === "question") {
    //     console.log("The question video ended. Resuming the lesson video.");
    //     player.src({
    //       src: options.sources[0].src,
    //       type: "video/mp4",
    //     });
    //     player.load();
    //     player.currentTime(myCheckpoint.current || 0);
    //     player.play();
    //   }
    // });

    // player.on("timeupdate", () => {
    //   if (player.currentSrc().includes(options.sources[0].src)) {
    //     // Tomar cuidado aqui, pois quando o vídeo é local, o currentSrc retornará o caminho completo(com o localhost:3000/...) e aí se tentar comparar direto com o src, não vai bater. Por isso usei o includes.
    //     //console.log("aquiiiiii");
    //     setSubject("lesson");
    //     // console.log(player.currentSrc());
    //   } else {
    //     setSubject("question");
    //     // console.log(player.currentSrc());
    //   }

    //   // const currentTime = Math.floor(player.currentTime()); // Arredondar em segundos
    //   const currentTime = parseFloat(player.currentTime().toFixed(1)); // Uma casa decimal
    //   //console.log("Current time: ", player.currentTime(), currentTime);

    //   // if (
    //   //   currentTime === stopPoints.find((time) => time === currentTime) &&
    //   //   !triggeredPoints.has(currentTime) &&
    //   //   mySubject.current === "lesson"
    //   // ) {
    //   //   console.log("achou", currentTime);
    //   // }

    //   //console.log(subject);
    //   const nextSource = options.sources[myNextQuestion.current];
    //   if (nextSource?.insertTime !== undefined) {
    //     if (
    //       currentTime >= nextSource.insertTime &&
    //       currentTime < nextSource.insertTime + 1 &&
    //       !triggeredPoints.has(nextSource.insertTime) &&
    //       subject === "lesson"
    //     ) {
    //       triggeredPoints.add(
    //         nextSource.insertTime as number,
    //       );
    //       myCheckpoint.current = player.currentTime();
    //       player.pause();
    //       player.src({
    //         src: options.sources[myNextQuestion.current].src,
    //         type: "video/mp4",
    //       });
    //       myNextQuestion.current = triggeredPoints.size + 1;
    //       // Recarrega o vídeo, iniciando o carregamento do novo vídeo
    //       player.load();
    //       // Se quiser que o novo vídeo comece a tocar imediatamente após o load
    //       player.play();
    //     }
    //   }

    //   // if (currentTime === 6 && !triggeredPoints.has(6) && mySubject.current === 'question') {
    //   //   console.log('6 segundos');
    //   //   triggeredPoints.add(6);
    //   // }

    //   //console.log("Triggered points: ", triggeredPoints);
    // });
  };
  return (
    <>
      <VideoAula options={options} onReady={handlePlayerReady} />
    </>
  );
};

export default VideoSection;
