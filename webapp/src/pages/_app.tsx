import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import "../styles/globals.css";

const MyApp = ({ Component, pageProps, session }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp