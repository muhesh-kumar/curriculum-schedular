import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { clsx } from 'clsx';

import { pages } from '@components/navbar/pages';

const Navbar = () => {
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
      <div className="flex gap-5 items-center">
        {pages.map((page, index) => {
          return (
            <Link href={page.href} key={index}>
              <a
                className={clsx(
                  page.href === router.asPath ? 'font-semibold' : '',
                  'text-sm',
                )}
              >
                {page.name}
              </a>
            </Link>
          );
        })}
        {status !== 'authenticated' ? (
          <Link href="/accounts/login">
            <a
              className={clsx(
                '/accounts/login' == router.asPath ? 'font-semibold' : '',
                'text-sm',
              )}
            >
              Log In
            </a>
          </Link>
        ) : (
          <div className="flex gap-2 items-center">
            <button className="text-sm" onClick={() => signOut()}>
              Log Out
            </button>
            <Link href="/profile">
              <Image
                // FIXME: fix these errors later
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
                src={session?.user?.image!}
                alt="User's Profile Picture"
                className="rounded-full cursor-pointer"
                height={30}
                width={30}
              ></Image>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
