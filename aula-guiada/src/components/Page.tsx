
import '../styles/Page.css'


export default function Page({ children }: any) {

    return (
        <>
            <div className='page-structure'>
                {children}
            </div>

        </>
    )
}