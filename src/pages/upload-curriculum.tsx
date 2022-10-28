import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';

import GeneralPageLayout from '@layouts/GeneralPageLayout';
import FileUpload from '@components/file-upload';

const UploadCurriculumPage = () => {
  const { status } = useSession();

  // TODO:
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'unauthenticated')
    return <p>Access Denied! Please Sign in to view this page</p>;

  return (
    <GeneralPageLayout>
      <form onSubmit={handleSubmit} className="h-screen flex justify-center">
        <FileUpload />
      </form>
    </GeneralPageLayout>
  );
};

export default UploadCurriculumPage;
