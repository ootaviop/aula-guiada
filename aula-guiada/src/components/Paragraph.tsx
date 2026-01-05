
import '../styles/Paragraph.css'

interface ParagraphProps {
    children: string;
}

const Paragraph = ({ children }: ParagraphProps) => {

    return (
        <>
            <p className='prg'>{children}</p>
        </>
    )
}

export default Paragraph;