import { NextPage } from 'next';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react'

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <div>
        <p>
          Welcome, {session.user.email}
        </p>
        <Image src={session.user.image} alt="" style={{ borderRadius: '100%' }} height={100} width={100} />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>
          You are not signed in.
        </p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }
}

export default LoginPage;
