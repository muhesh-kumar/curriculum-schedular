import { FC, ReactNode } from 'react';

import Navbar from '../components/navbar';

export type GeneralPageLayoutProps = {
  children: ReactNode,
};

const GeneralPageLayout: FC<GeneralPageLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-x-hidden relative font-poppins bg-background">
      <Navbar />
      {children}
    </div>
  )
}

export default GeneralPageLayout
