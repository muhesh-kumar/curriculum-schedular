import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react'
import { clsx } from 'clsx';

import { pages } from '@components/navbar/pages';

const Navbar: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between sticky top-0 px-20 py-5 backdrop-blur -z-[-1]">
      <div>
        {/*TODO: add logo here */}
        <Link href="/">
          <a className="text-2xl font-bold">Curriculum Schedular</a>
        </Link>
      </div>
      <div className="flex gap-14 items-center">
        {
          pages.map((page, index) => {
            return (
              <Link href={page.href} key={index}>
                <a className={clsx(
                  (page.href == router.asPath ? "font-semibold" : "")
                )}>{page.name}</a>
              </Link>
            );
          })
        }
        {status !== "authenticated" ? (
          <Link href="/accounts/login">
            <a className={clsx(
              ("/accounts/login" == router.asPath ? "font-semibold" : "")
            )} >Log In</a></Link>
        ) : (
          <button className='flex gap-2 items-center' onClick={() => signOut()}>
            Log Out
            <Image src={session?.user?.image!} alt="User's Profile Picture" className="rounded-full" height={30} width={30} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
