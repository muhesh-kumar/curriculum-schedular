import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import GeneralPageLayout from '@layouts/GeneralPageLayout';
import FileUpload from '@components/file-upload';
import Btn from '@elements/btn';

const UploadCurriculumPage = () => {
  const router = useRouter();
  const { status } = useSession();

  // TODO:
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push('/electives');
  };

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'unauthenticated')
    return <p>Access Denied! Please Sign in to view this page</p>;

  return (
    <GeneralPageLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-center">Upload Curriculum</h1>
        <form onSubmit={handleSubmit} className="h-screen flex justify-center">
          <div className="flex flex-col gap-5 items-center">
            <FileUpload />
            <Btn btnText="Upload" />
          </div>
        </form>
      </div>
    </GeneralPageLayout>
  );
};

export default UploadCurriculumPage;
