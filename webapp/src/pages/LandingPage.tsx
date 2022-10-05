import { NextPage } from 'next'
import Image from 'next/image'

import PageLayout from '@layouts/PageLayout';
import Navbar from '@components/navbar';
import Btn from '@elements/btn';

const LandingPage: NextPage = () => {
  return (
    <PageLayout>
      <Navbar />
      {/* TODO: extract this out into a separate component */}
      <main className="flex justify-between h-screen w-[85%] items-center mt-8">
        <aside className="flex flex-col w-1/4 gap-3">
          <div>
            <h1 className="text-4xl font-bold">Get Started</h1>
            <h2 className="text-xl font-semibold">and learn step by step..</h2>
          </div>
          <p className="text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eos deserunt minus corrupti in incidunt nemo hic nesciunt qui ipsa!</p>
          <Btn btnText="Create an account" isCTOBtn={true} />
        </aside>
        <div className="">
          <Image
            src="/images/student-studying.svg"
            alt="Picture of a student studying"
            width={600}
            height={600} />
        </div>
      </main>
    </PageLayout>
  )
}

export default LandingPage
