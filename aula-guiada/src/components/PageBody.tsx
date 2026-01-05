import '../styles/PageBody.css'

type PageBodyProps = {
    children: React.ReactNode
}

export default function PageBody({ children }: PageBodyProps) {
    return (
            <>
             <div className="page-body">{children}</div>
            </>
    )
}