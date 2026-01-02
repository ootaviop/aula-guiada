import '../styles/Destaque.css'
import Paragraph from './Paragraph'
import Title from './title'
import { CircleAlert } from 'lucide-react';

interface DestaqueProps {
    type: string;
    text: string;

}

export default function Destaque({ type, text }: DestaqueProps) {

    return (
        <div className="container-destaque">

            <div className="header">
                <CircleAlert />
                <Title level={3} text={type} />
            </div>

            <Paragraph text={text} />
        </div>

    )
}