import '../styles/CourseInfo.css'
import { BookOpen } from 'lucide-react'

interface CourseInfoProps {
    title: string;
}


export default function CourseInfo({ title }: CourseInfoProps) {
    return (
            <>
                <div className="course-info">
                    <BookOpen />
                    <div className="description">
                        <h5>Aula em Andamento</h5>
                        <h2>{title}</h2>
                    </div>

                </div>
            </>
    )
}