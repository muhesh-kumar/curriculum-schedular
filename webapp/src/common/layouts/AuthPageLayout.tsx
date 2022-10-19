import { FC, ReactNode } from 'react';

import Navbar from '../components/navbar';

export type AuthPageLayoutProps = {
  children: ReactNode,
};

const AuthPageLayout: FC<AuthPageLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen overflow-x-hidden relative font-poppins bg-background">
      <Navbar />
      {children}
    </div>
  )
}

export default AuthPageLayout
