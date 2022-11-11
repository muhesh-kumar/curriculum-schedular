import { FormEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import GeneralPageLayout from '@layouts/GeneralPageLayout';
import Dropdown from '@components/dropdown';
import Btn from '@elements/btn';

const Electives: NextPage = () => {
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push('/schedule');
  };

  return (
    <GeneralPageLayout>
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-4xl font-bold text-center">Select an Elective</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Dropdown />
          <Btn btnText="Get Schedule" />
        </form>
      </div>
    </GeneralPageLayout>
  );
};

export default Electives;
