import '../styles/Conclusion.css'
import ConclusionBar from './ConclusionBar'

const Conclusion = () => {
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

export default Conclusion