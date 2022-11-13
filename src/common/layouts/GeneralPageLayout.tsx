import { FC } from 'react';

import { LayoutProps } from 'types/Layout';
import Navbar from '../components/navbar';

const GeneralPageLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-x-hidden relative font-poppins bg-background">
      <Navbar />
      {children}
    </div>
  );
};

export default GeneralPageLayout;
