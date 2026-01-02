
import '../styles/Title.css'

interface TitleProps {
    text: string;
    level: number;
}

export default function Title({ text, level = 1 }: TitleProps) {

    return (
        <>
            {level == 1 ?
                <h1 className="t1">{text}</h1>
                : level == 2 ?
                    <h2 className="t2">{text}</h2>
                    : level == 3 ?
                        <h3 className="t3">{text}</h3>
                        : level == 4 ?
                            <h4 className="t4">{text}</h4>
                            : level == 5 ?
                                <h5 className="t5">{text}</h5> :
                                <h6 className="t6">{text}</h6>

            }

        </>
    )
}