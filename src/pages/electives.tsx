/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import GeneralPageLayout from '@layouts/GeneralPageLayout';
import Dropdown from '@components/dropdown';
import Btn from '@elements/btn';

import { findElectives } from '@utils/findElectives';
import { useElectiveStore } from '@utils/store';

const Electives: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const chosenElective = useElectiveStore((state) => state.chosenElective);
  console.log(chosenElective);

  const electives = findElectives();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push('/schedule');
  };

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'unauthenticated')
    return <p>Access Denied! Please Sign in to view this page</p>;

  return (
    <GeneralPageLayout>
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-4xl font-bold text-center">Select an Elective</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Dropdown dropDownContents={electives} />
          <Btn btnText="Get Schedule" />
        </form>
      </div>
    </GeneralPageLayout>
  );
};

export default Electives;
