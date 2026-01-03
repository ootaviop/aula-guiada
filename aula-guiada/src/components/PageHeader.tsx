import '../styles/pageHeader.css'

import type { ReactNode } from 'react';


type PageHeaderProps = {
  children: ReactNode;
};



export default function PageHeader({ children }: PageHeaderProps) {
  return (
  <>
    <div className="page-header-content">
    {children}
    </div>
  </>
  )
}