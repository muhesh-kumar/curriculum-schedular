import { FC, ReactNode } from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

export type AuthPageLayoutProps = {
  children: ReactNode,
};

const AuthPageLayout: FC<AuthPageLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-x-hidden relative font-poppins bg-primaryLight">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default AuthPageLayout
