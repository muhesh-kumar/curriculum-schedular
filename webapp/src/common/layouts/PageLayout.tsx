import { FC, ReactNode } from 'react';

export type PageLayoutProps = {
  children: ReactNode,
};

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen px-20 pb-7 relative font-poppins">
      {/* Top left circle */}
      <div className="absolute left-[15rem] -top-[52.5rem] w-[90rem] h-[90rem] bg-primaryLight rounded-full mix-blend-normal -z-50"></div>

      {children}
    </div>
  )
}

export default PageLayout
