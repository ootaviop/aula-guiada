import '../styles/Content.css'

export default function Content({ children }: any) {
    return (
        <>
            <div className="content-spacing">
                {children}
            </div>

        </>
    )
}