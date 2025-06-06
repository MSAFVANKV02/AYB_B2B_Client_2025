import { DragDropFileSvgIcon } from "@/components/icons/glob-icon";
import { ReturnItemType } from "@/components/orders/return-order-sec/actions/return-action-form";
import { cn } from "@/lib/utils";
import { makeToastError } from "@/utils/toaster";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { ReactNode, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

type Props = {
  files: File[];
  index: number;
  setFieldValue: (field: string, value: any) => void;
  children?: ReactNode;
  values: ReturnItemType;
  fileUploadLimit?: number;
  addFileTypes?: Accept;
  className?: string;
};

// type FileWithProgress = File & { progress?: number };
type FileWithProgress = {
  name: string;
  progress: number;
};

const DragAndDropFilesWidget = ({
  files,
  setFieldValue,
  children,
  index,
  values,
  fileUploadLimit,
  addFileTypes,
  className,
}: Props) => {
  const [uploadingFiles, setUploadingFiles] = useState<FileWithProgress[]>([]);

  //   const [uploadingFiles, setUploadingFiles] = useState<
  //     { name: string; progress: number; formattedTime: string }[]
  //   >([]);

  const simulateProgress = async (newFiles: File[]) => {
    const updatedFileList = [...files]; // Start with current files

    const uploadPromises = newFiles.map((file) => {
      const fileName =
        file.name.length > 10 ? file.name.slice(0, 10) + "..." : file.name;

      const newFileEntry: FileWithProgress = {
        name: fileName,
        progress: 0,
      };

      setUploadingFiles((prev) => [...prev, newFileEntry]);

      const formData = new FormData();
      formData.append("file", file);

      return axios
        .post("http://localhost:4000/api/upload", formData, {
          onUploadProgress: ({ loaded, total }) => {
            if (!total) return;
            const progressPercent = Math.floor((loaded / total) * 100);
            setUploadingFiles((prev) =>
              prev.map((f) =>
                f.name === fileName ? { ...f, progress: progressPercent } : f
              )
            );
          },
        })
        .then(() => {
          // ✅ Push to temp updated list
          updatedFileList.push(file);
        })
        .catch((error) => {
          console.error(error);
          makeToastError(`Failed to upload ${fileName}`);
          setUploadingFiles((prev) => prev.filter((f) => f.name !== fileName));
        });
    });

    await Promise.allSettled(uploadPromises);

    // ✅ Set Formik value once, after all uploads
    setFieldValue(`returns[${index}].file`, updatedFileList);
    setUploadingFiles([]);
  };

  //   const simulateProgress3 = async (newFiles: File[]) => {
  //     newFiles.map((file) => {
  //       const fileName =
  //         file.name.length > 10 ? file.name.slice(0, 10) + "..." : file.name;

  //       const newFileEntry: FileWithProgress = {
  //         name: fileName,
  //         progress: 0,
  //       };

  //       // Add to uploadingFiles
  //       setUploadingFiles((prev) => [...prev, newFileEntry]);

  //       const formData = new FormData();
  //       formData.append("file", file);

  //       axios
  //         .post("http://localhost:4000/api/upload", formData, {
  //           onUploadProgress: ({ loaded, total }) => {
  //             if (!total) return;
  //             const progressPercent = Math.floor((loaded / total) * 100);

  //             setUploadingFiles((prev) =>
  //               prev.map((f) =>
  //                 f.name === fileName ? { ...f, progress: progressPercent } : f
  //               )
  //             );
  //           },
  //         })
  //         .then(() => {
  //           // ✅ Only push file to form after upload complete
  //           setFieldValue(`returns[${index}].file`, [...files, file]);

  //           // ✅ Remove from progress bar list
  //           setUploadingFiles((prev) =>
  //             prev.filter((f) => f.name !== fileName)
  //           );
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           makeToastError(`Failed to upload ${fileName}`);
  //           setUploadingFiles((prev) =>
  //             prev.filter((f) => f.name !== fileName)
  //           );
  //         });
  //     });
  //   };

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
    "video/mp4": [".mp4"],
    "video/webm": [".webm"],
    "video/ogg": [".ogv"],
    "video/quicktime": [".mov"],
  };

  const MAX_IMAGE_SIZE = 7 * 1024 * 1024; // 7 MB
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 20 MB
  const MAX_VIDEO_DURATION = 10 * 60; // 10 minutes in seconds

  // Helper to get video duration in seconds from File
  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = url;
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve(video.duration);
      };
      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(0); // Could not get duration, treat as invalid or zero
      };
    });
  };

  const onDrop = async (acceptedFiles: File[]) => {
    // First filter out files by size for images & videos,
    // and check video duration asynchronously
    const filteredFiles: File[] = [];
    const errors: string[] = [];

    for (const file of acceptedFiles) {
      const isVideo = file.type.startsWith("video/");
      if (isVideo) {
        if (file.size > MAX_VIDEO_SIZE) {
          errors.push(`Video "${file.name}" exceeds 20MB.`);
          continue;
        }
        const duration = await getVideoDuration(file);
        if (duration > MAX_VIDEO_DURATION) {
          errors.push(`Video "${file.name}" exceeds 10 minutes duration.`);
          continue;
        }
        filteredFiles.push(file);
      } else if (file.type.startsWith("image/")) {
        if (file.size > MAX_IMAGE_SIZE) {
          errors.push(`Image "${file.name}" exceeds 7MB.`);
          continue;
        }
        filteredFiles.push(file);
      } else {
        // For other accepted file types (pdf, doc, etc) keep your original 5MB limit
        if (file.size > 5 * 1024 * 1024) {
          errors.push(`File "${file.name}" exceeds 5MB.`);
          continue;
        }
        filteredFiles.push(file);
      }
    }

    if (errors.length) {
      errors.forEach((msg) => makeToastError(msg));
    }

    // Now enforce file upload limit
    const currentFileCount = files.length;
    const uploadLimit = fileUploadLimit ?? Infinity;

    if (currentFileCount >= uploadLimit) {
      makeToastError(`You can only upload up to ${uploadLimit} files.`);
      return;
    }

    const availableSlots = uploadLimit - currentFileCount;
    const filesToUpload = filteredFiles.slice(0, availableSlots);

    if (filesToUpload.length < filteredFiles.length) {
      makeToastError(
        `Only ${availableSlots} file(s) can be added. You've reached the maximum limit of ${uploadLimit}.`
      );
    }

    simulateProgress(filesToUpload);
  };

  //   const onDrop = (acceptedFiles: File[]) => {

  //     const validFiles = acceptedFiles.filter(
  //       (file) => file.size <= 5 * 1024 * 1024
  //     );

  //     if (validFiles.length < acceptedFiles.length) {
  //       makeToastError("Each file must be smaller than 5MB.");
  //     }

  //     const currentFileCount = files.length;
  //     const uploadLimit = fileUploadLimit ?? Infinity;

  //     if (currentFileCount >= uploadLimit) {
  //       makeToastError(`You can only upload up to ${uploadLimit} files.`);
  //       return;
  //     }

  //     const availableSlots = uploadLimit - currentFileCount;

  //     const filesToUpload = validFiles.slice(0, availableSlots);

  //     if (filesToUpload.length < validFiles.length) {
  //       makeToastError(
  //         `Only ${availableSlots} file(s) can be added. You've reached the maximum limit of ${uploadLimit}.`
  //       );
  //     }
  //    simulateProgress(filesToUpload);

  //     // validFiles.forEach((file) => {
  //     //   // const estimate = estimateUploadTime(file.size, 10); // simulate 10 Mbps
  //     //   setSelectedFile(file);
  //     // });

  //     // setFieldValue("file", [...files, ...validFiles]); // just set 'file'
  //     // validFiles.forEach(loadFileWithRealTime);
  //     // simulateProgress(validFiles);

  //   };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: addFileTypes ? addFileTypes : acceptedFileTypes, // Pass the readonly array to 'accept'
    multiple: true,
  });

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()} // Applying root props to the dropzone div
        className={cn(
          `border-2 border-dashed cursor-pointer bg-[#F8F8FF]
           ${
             (values.file ?? []).length === 0 ? "lg:h-[350px] " : "lg:h-[200px]"
           }   w-full  flex flex-col justify-center items-center mx-auto 
              border-[#384EB74D]  p-8  text-center rounded-sm transition-colors`,
          className
        )}
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

      {uploadingFiles.length > 0 &&
        uploadingFiles.map((file, i) => (
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
          {files.length > 0 && (
            <span className="font-semibold text-sm">Uploaded</span>
          )}
          {files.length > 0 &&
            files.map((file, i) => (
              <div
                key={i}
                className="border border-[#11AF22] p-2 flex justify-between items-center text-xs rounded-md"
              >
                <span className="text-black text-xs ">{file.name}</span>
                <button
                  type="button"
                  className="text-red-500 min-h-4 min-w-4 p-1 flex items-center justify-center rounded-full bg-red-100 text-xs"
                  onClick={() =>
                    setFieldValue(
                      `returns[${index}].file`,
                      files.filter((_, idx) => idx !== i)
                    )
                  }
                >
                  {/* 🗑 */}
                  <Icon
                    fontSize={20}
                    icon={"material-symbols-light:delete-outline"}
                  />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DragAndDropFilesWidget;
