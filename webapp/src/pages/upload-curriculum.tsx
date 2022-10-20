import { FormEvent } from "react";

import FileUpload from "@components/file-upload"

import AuthPageLayout from "@layouts/AuthPageLayout";

const UploadCurriculumPage = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <AuthPageLayout>
      <form onSubmit={handleSubmit} className="h-screen flex justify-center">
        <FileUpload />
      </form>
    </AuthPageLayout>
  )
}

export default UploadCurriculumPage
