
import '../styles/Paragraph.css'

interface ParagraphProps {
    text: string;
}

export default function Paragraph({ text }: ParagraphProps) {

    return (
        <>
            <p className='prg'>{text}</p>
        </>
    )
}