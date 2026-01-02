import '../styles/Destaque.css'
import Paragraph from './Paragraph'
import Title from './title'

interface DestaqueProps {
    type: string;
    text: string;

}


export default function Destaque({type, text} : DestaqueProps){

    return(
        <div className="container-destaque">
            <Title level={3} text={type}></Title>
            <Paragraph text={text}></Paragraph>
        </div>

    )
}