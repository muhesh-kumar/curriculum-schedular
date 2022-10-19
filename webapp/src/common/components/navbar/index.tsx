import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { clsx } from 'clsx';

import { pages } from '@components/navbar/pages';

const Navbar: FC = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between sticky top-0 py-5">
      <div>
        {/*TODO: add logo here */}
        <Link href="/">
          <a className="text-2xl font-bold">Curriculum Schedular</a>
        </Link>
      </div>
      <div className="flex gap-14">
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
      </div>
    </div>
  )
}

export default Navbar
