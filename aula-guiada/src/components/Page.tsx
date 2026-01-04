
import '../styles/Page.css'

type PageProps = {
    children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {

    return (
        <>
            <div className='page-structure'>
                {children}
            </div>

        </>
    )
}

export default Page;



