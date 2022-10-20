import { FormEvent } from "react";
import { useSession, getSession } from "next-auth/react"

import AuthPageLayout from "@layouts/AuthPageLayout";
import FileUpload from "@components/file-upload"

const UploadCurriculumPage = () => {
  const { data: session, status } = useSession();

  // TODO: 
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied! Please Sign in to view this page</p>
  }

  return (
    <AuthPageLayout>
      <form onSubmit={handleSubmit} className="h-screen flex justify-center">
        <FileUpload />
      </form>
    </AuthPageLayout>
  )
}

export default UploadCurriculumPage
