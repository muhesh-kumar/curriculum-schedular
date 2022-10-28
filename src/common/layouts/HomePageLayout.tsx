import { FC } from 'react';

import { LayoutProps } from 'types/Layout';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const HomePageLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-x-hidden relative font-poppins">
      <Navbar />
      {/* Top left circle */}
      <div className="absolute left-[22.5rem] -top-[52.5rem] w-[90rem] h-[90rem] bg-primaryLight rounded-full mix-blend-normal -z-1"></div>

      {children}

      <Footer />
    </div>
  );
};

export default HomePageLayout;
