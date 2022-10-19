import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import HomePageLayout from '@layouts/HomePageLayout';
import Btn from '@elements/btn';
import ObjectivesSection from '@components/objectives';

const LandingPage: NextPage = () => {
  return (
    <HomePageLayout>
      {/* TODO: extract this out into a separate component */}
      <main className="flex justify-between h-screen px-20 w-[85%] items-center">
        <aside className="flex flex-col w-1/4 gap-3">
          <div>
            <h1 className="text-4xl font-bold">Get Started</h1>
            <h2 className="text-xl font-semibold">and learn step by step..</h2>
          </div>
          <p className="text-md">An automated Curriculum Schedular which prepares a schedule as per your needs. A great tool for any self-learning student!</p>
          <Link href="/accounts/signup">
            <Btn btnText="Create an account" isCTOBtn={true} />
          </Link>
        </aside>
        <div className="">
          <Image
            src="/images/student-studying-transparent.svg"
            alt="Picture of a student studying"
            width={650}
            height={650}
          />
        </div>
      </main>
      <ObjectivesSection />
    </HomePageLayout>
  )
}

export default LandingPage
