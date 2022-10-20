import Image from 'next/image';
import { useDropzone, FileWithPath } from 'react-dropzone';

const FileUpload = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="flex flex-col gap-10">
      <h1 className='text-4xl font-bold text-center'>Upload Curriculum</h1>
      <section className="border-4 border-dashed border-primaryDark rounded-lg flex flex-col px-10 py-10 bg-gradient-to-t from-gray-300 to-primaryLight">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            {/* TODO: add an excel file image here */}
            <Image src="/icons/excel-icon.svg" height={100} width={100} alt="Excel or CSV File Icon" />
            <h2 className="text-xl">Upload your curriculum which is in a CSV format</h2>
            <p className="text-sm">OR</p>
            <button className="bg-primaryDark px-4 py-2 rounded-md text-white">Browse Files</button>
          </div>
        </div>
      </section>
      <aside>
        <h4 className="text-xl font-semibold">Uploaded Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

export default FileUpload
