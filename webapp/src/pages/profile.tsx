import Image from 'next/image';
import { useSession, signOut, signIn } from 'next-auth/react'

import GeneralPageLayout from '@layouts/GeneralPageLayout';

const ProfilePage = () => {
  const { data: session, status } = useSession({
    required: true
  });

  if (status !== 'authenticated') {
    return (
      <div>
        <p>
          you are not signed in.
          <button onClick={() => signIn()}>Sign In</button>
        </p>
      </div>
    )
  }

  return (
    <GeneralPageLayout>
      <div className="flex flex-col gap-3 items-center justify-center">
        <Image src={session?.user?.image!} alt="" style={{ borderRadius: '100%' }} height={150} width={150} />
        <h2 className="text-2xl">Welcome <span className="font-bold">{session?.user?.name}</span></h2>
      </div>
    </GeneralPageLayout>
  )
}

export default ProfilePage
