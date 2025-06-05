import { DragDropFileSvgIcon } from "@/components/icons/glob-icon";
import { makeToastError } from "@/utils/toaster";
import axios from "axios";
import { ReactNode, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

type Props = {
  files: File[];
  index: number;
  setFieldValue: (field: string, value: any) => void;
  children?: ReactNode;
};

// type FileWithProgress = File & { progress?: number };
type FileWithProgress = {
    name: string;
    progress: number;
  };

const DragAndDropFilesWidget = ({ files, setFieldValue, children,index }: Props) => {
  const [uploadingFiles, setUploadingFiles] = useState<FileWithProgress[]>([]);

  //   const [uploadingFiles, setUploadingFiles] = useState<
  //     { name: string; progress: number; formattedTime: string }[]
  //   >([]);

  const simulateProgress = async (newFiles: File[]) => {
    // Use a copy of current uploadingFiles so we can add properly typed items
    const uploadingFilesCopy: FileWithProgress[] = [...uploadingFiles];

    newFiles.forEach((file) => {
      // Truncate long file names for display
      const fileName =
        file.name.length > 10 ? file.name.slice(0, 10) + "..." : file.name;

      // Add a new file with progress 0 to uploadingFiles state
      const newFileEntry: FileWithProgress = Object.assign(file, {
        progress: 0,
      });
      uploadingFilesCopy.push(newFileEntry);
      setUploadingFiles([...uploadingFilesCopy]);
      // setShowProgress(true);

      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost:4000/api/upload", formData, {
          onUploadProgress: ({ loaded, total }) => {
            if (!total) return;
            const progressPercent = Math.floor((loaded / total) * 100);

            // Update progress for the correct file by matching name (better would be a unique id)
            setUploadingFiles((prev) => {
              const updated = prev.map((f) =>
                f.name === file.name ? { ...f, progress: progressPercent } : f
              );
              return updated;
            });


            console.log(file);
            

            // When upload completes for this file
            if (loaded === total) {
              // Append this file to formik field 'file'
            //   setFieldValue("file", (prevFiles: File[]) => [
            //     ...(prevFiles || []),
            //     file,
            //   ]);
            setFieldValue(`returns[${index}].file`, (prevFiles: File[]) => [
                ...(prevFiles || []),
                file,
              ]);
              

              // Hide progress bar if all done
              setUploadingFiles((prev) => {
                // Remove this file from uploading files or keep for UX? You can filter here if you want.
                return prev.filter((f) => f.name !== file.name);
              });

              if (uploadingFilesCopy.length <= 1) {
                //   setShowProgress(false);
              }
            }
          },
        })
        .catch((error) => {
          console.log(error);

          makeToastError(`Failed to upload ${fileName}`);
          // Remove from uploadingFiles on error
          setUploadingFiles((prev) => prev.filter((f) => f.name !== file.name));
          if (uploadingFilesCopy.length <= 1) {
            //   setShowProgress(false);
          }
        });
    });
  };


  const acceptedFileTypes: Accept = {
    "application/pdf": [".pdf"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
  };

  const onDrop = (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length < acceptedFiles.length) {
      makeToastError("Each file must be smaller than 5MB.");
    }

    // validFiles.forEach((file) => {
    //   // const estimate = estimateUploadTime(file.size, 10); // simulate 10 Mbps
    //   setSelectedFile(file);
    // });

    // setFieldValue("file", [...files, ...validFiles]); // just set 'file'
    // validFiles.forEach(loadFileWithRealTime);
    simulateProgress(validFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes, // Pass the readonly array to 'accept'
    multiple: true,
  });

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()} // Applying root props to the dropzone div
        className="border-2 border-dashed cursor-pointer bg-[#F8F8FF]  w-full h-1/2 flex flex-col justify-center items-center mx-auto border-[#384EB74D]  p-8 text-center rounded-sm transition-colors"
      >
        <input {...getInputProps()} />{" "}
        {/* Applying input props to the file input */}
        <div className="flex flex-col gap-2 items-center">
          <DragDropFileSvgIcon />
          <span className="font-bold text-black flex items-center gap-1 text-sm">
            Drag & drop files or{" "}
            <p className="text-textMain font-bold">Browse</p>
          </span>
        </div>
      </div>

      {uploadingFiles.map((file, i) => (
        <div key={i} className="flex flex-col gap-1 border rounded-md">
          <div className="flex justify-between items-center text-xs text-gray-600 p-2">
            <span>{file.name}</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full">
            <div
              className="h-1 rounded-full bg-[#8F47D9] transition-all duration-300 ease-in-out"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        </div>
      ))}

      {children ? (
        children
      ) : (
        <div className="flex flex-col gap-2">
         {Array.isArray(files) && files.length > 0 && (
  <span className="font-semibold text-sm">Uploaded</span>
)}
{Array.isArray(files) &&
  files.length > 0 &&
  files.map((file, i) => (
    <div
      key={i}
      className="border border-green-400 p-2 flex justify-between items-center text-xs rounded-sm"
    >
      {file.name}
      <button
        type="button"
        className="text-red-500 ml-2 text-xs"
        onClick={() =>
          setFieldValue(
            "file",
            files.filter((_, idx) => idx !== i)
          )
        }
      >
        🗑
      </button>
    </div>
  ))}

        </div>
      )}
    </div>
  );
};

export default DragAndDropFilesWidget;
