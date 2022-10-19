import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { clsx } from 'clsx';

import { footerLinks } from './footerLinks';

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="flex flex-col gap-5 bottom-0 py-10 pt-20 px-20 backdrop-blur bg-gradient-to-t from-background mix-blend-normal">
      <div className="w-full flex justify-between border-b-2 border-b-background pb-8">
        <div className='flex items-center'>
          {/* <Image src="/icons/list-bullet.svg" height={100} width={100} alt="Product Logo" /> */}
          <Link href="/">
            <a className="text-2xl font-bold">Curriculum Schedular</a>
          </Link>
        </div>
        <div className='flex gap-14'>
          {
            footerLinks.map((footerLink, index) => {
              return (
                <Link href={footerLink.href} key={index}>
                  <a className={clsx(
                    (footerLink.href == router.asPath ? "font-semibold" : "")
                  )}>{footerLink.name}</a>
                </Link>
              );
            })
          }
        </div>
      </div>
      <div className='flex justify-center'>
        © 2022 Curriculum Schedular™. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
