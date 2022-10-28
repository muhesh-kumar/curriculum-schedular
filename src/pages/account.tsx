import Image from 'next/image';
import { useSession, signOut, signIn } from 'next-auth/react';

const Account = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === 'authenticated') {
    return (
      <div>
        <p>Welcome {session?.user?.name}</p>
        <Image
          src={session?.user?.image ?? ''}
          alt=""
          style={{ borderRadius: '100%' }}
          height={100}
          width={100}
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <p>
        you are not signed in.
        <button onClick={() => signIn()}>Sign In</button>
      </p>
    </div>
  );
};

export default Account;
