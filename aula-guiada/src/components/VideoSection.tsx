import "../styles/VideoSection.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import VideoJS from "./VideoJS";

// Tipos fortes
type ModoAula = "aula" | "pergunta";
type Pergunta = { segundo: number; video: string };

interface ConfigAula {
  videoPrincipal: string;
  perguntas: Pergunta[];
}

// Configuração externa (fácil de trocar)
const DEFAULT_CONFIG: ConfigAula = {
  videoPrincipal: "",
  perguntas: [],
};

interface VideoSectionProps {
  videosList: string[];
  configAula?: Partial<ConfigAula>;
}

const VideoSection = ({ videosList, configAula = {} }: VideoSectionProps) => {
  // Config final (merge props + default)
  const configFinal: ConfigAula = useMemo(() => ({
    videoPrincipal: videosList[0],
    perguntas: [
      { segundo: 10, video: videosList[1] },
      { segundo: 600, video: videosList[2] },
      { segundo: 780, video: videosList[3] },
    ],
    ...configAula,
  }), [videosList, configAula]);

  // Estados mínimos + ref pro player
  const [modo, setModo] = useState<ModoAula>("aula");
  const [tempoSalvo, setTempoSalvo] = useState(0);
  const [proximaPergunta, setProximaPergunta] = useState(0);
  const playerRef = useRef<any | null>(null);
  const timeupdateHandlerRef = useRef<(() => void) | null>(null);

  // srcAtual memoizado (evita recálculo)
  const srcAtual = useMemo(() => {
    if (modo === "aula") return configFinal.videoPrincipal;
    
    const pergunta = configFinal.perguntas[proximaPergunta - 1];
    return pergunta?.video || configFinal.videoPrincipal;
  }, [modo, proximaPergunta, configFinal]);

  const videoOptions = useMemo(() => ({
    controls: true,
    fluid: true,
    responsive: true,
    sources: [{ src: srcAtual, type: "video/mp4" }],
  }), [srcAtual]);

  // Cleanup de listeners antigos
  const cleanupListeners = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    if (timeupdateHandlerRef.current) {
      player.off("timeupdate", timeupdateHandlerRef.current);
      timeupdateHandlerRef.current = null;
    }
  }, []);

  const handlePlayerReady = useCallback((player: any) => {
    console.log(`Player ready - modo: ${modo}`);
    playerRef.current = player;

    // Cleanup anterior
    cleanupListeners();

    if (modo === "aula") {
      // Monitora próxima pergunta
      const handler = () => {
        const proximoSegundo = configFinal.perguntas[proximaPergunta]?.segundo;
        if (!proximoSegundo || player.currentTime() < proximoSegundo) return;

        // PAUSA E SALVA
        const tempoAtual = player.currentTime();
        setTempoSalvo(tempoAtual);
        player.pause();

        // VAI PRA PERGUNTA
        setModo("pergunta");
        setProximaPergunta((prev) => prev + 1);
      };

      timeupdateHandlerRef.current = handler;
      player.on("timeupdate", handler);
    }

    // Volta do pergunta → principal
    const handleEnded = () => {
      if (modo === "pergunta") {
        setModo("aula");
      }
    };
    player.on("ended", handleEnded);

    // Restaura tempo no principal
    const handleLoadedMetadata = () => {
      if (modo === "aula") {
        player.currentTime(tempoSalvo);
        
        // Reativa monitor da próxima pergunta
        if (proximaPergunta < configFinal.perguntas.length) {
          cleanupListeners(); // limpa antigo
          const handler = () => {
            const proximoSegundo = configFinal.perguntas[proximaPergunta]?.segundo;
            if (proximoSegundo && player.currentTime() >= proximoSegundo) {
              setTempoSalvo(player.currentTime());
              player.pause();
              setModo("pergunta");
              setProximaPergunta((prev) => prev + 1);
            }
          };
          timeupdateHandlerRef.current = handler;
          player.on("timeupdate", handler);
        }
      }
    };
    player.on("loadedmetadata", handleLoadedMetadata);
  }, [modo, proximaPergunta, tempoSalvo, configFinal, cleanupListeners]);

  // Cleanup global no unmount
  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        cleanupListeners();
        player.dispose();
      }
    };
  }, [cleanupListeners]);

  return (
    <div className="video-section">
      <div className="my-video">
        <VideoJS options={videoOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default VideoSection;
