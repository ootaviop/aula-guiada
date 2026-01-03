import '../styles/Conclusion.css'
import ConclusionBar from './ConclusionBar'

export default function Conclusion() {
    return (
            <>
                <div className="conclusion">
                    <p>Progresso</p>
                    <ConclusionBar />
                    <span>0%</span>
                </div>
            </>
    )
}