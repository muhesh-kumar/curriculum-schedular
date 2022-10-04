import Link from 'next/link';
import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <div className="flex justify-between sticky top-0 py-5">
      <div>
        {/*TODO: add logo here */}
        <h1 className="text-2xl font-bold">Curriculum Schedular</h1>
      </div>
      <div className="flex gap-14">
        <Link href="/"><a className="hover:font-semibold">Home</a></Link>
        <Link href="/">Home</Link>
        <Link href="/">Home</Link>
        <Link href="/">Home</Link>
        <Link href="/">Home</Link>
      </div>
    </div>
  )
}

export default Navbar
