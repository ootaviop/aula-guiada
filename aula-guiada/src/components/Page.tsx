
import '../styles/Page.css'

interface PageProps {
    children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => {

    return (
        <>
            <div className='page-structure'>
                {children}
            </div>

        </>
    )
}

export default Page;



