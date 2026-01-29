import React, { useEffect } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import '../styles/VideoAula.css'

type VideoOptionsProps = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sources: {
    src: string;
    type: string;
  }[];
};

const VideoAula = ({ options, onReady } : { options: VideoOptionsProps, onReady?: (player: any) => void }) => {
    const videoRef = React.useRef<HTMLDivElement | null>(null); // Armazenar uma referência ao elemento HTML que conterá a instância do player (???)
    const playerRef = React.useRef<any | null>(null) // Armazenar a instância do player

    useEffect(() => { // Será executado na primeira renderização do componente e quando o valor de options ou videoRef mudar
        if (!playerRef.current) {
            const videoElement = document.createElement('video-js') // Cria o elemento personalizado do Video.js

            videoElement.classList.add('vjs-big-play-centered') // Adiciona uma classe CSS ao elemento do player
            videoRef.current.appendChild(videoElement); // Anexa o elemento do player ao contêiner referenciado por videoRef

            const player = playerRef.current = videojs(videoElement, options, () => {
                console.log('Player is ready')
                onReady && onReady(player)
            });

        } else{
            // Aqui você pode atualizar as opções de um player existente se necessário
            const player = playerRef.current
            player.autoplay(options.autoplay)
            player.src(options.sources)
        }

    },[options, videoRef])

    useEffect(() => { // Será executado na primeira renderização do componente e quando o valor de playerRef mudar
        const player = playerRef.current

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose() // Limpa o player quando o componente é desmontado
                playerRef.current = null
            }
        }
    }, [playerRef]);
    
    return(
        <>
            <div data-vjs-player>
                <div ref={videoRef} />
            </div>
      
        </>
    )
}
export default VideoAula;