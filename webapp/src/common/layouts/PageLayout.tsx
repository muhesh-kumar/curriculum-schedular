import { FC, ReactNode } from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

export type PageLayoutProps = {
  children: ReactNode,
};

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-x-hidden relative font-poppins">
      <Navbar />
      {/* Top left circle */}
      <div className="absolute left-[22.5rem] -top-[52.5rem] w-[90rem] h-[90rem] bg-primaryLight rounded-full mix-blend-normal -z-50"></div>

      {children}

      <Footer />
    </div>
  )
}

export default PageLayout
