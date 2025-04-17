import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  clearKycDetails,
  restProofType,
  uploadFile,
} from "@/redux/userSide/KycSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { makeToast, makeToastError } from "@/utils/toaster";
import ClipLoader from "react-spinners/ClipLoader";
// import { UPLOAD_USER_KYC } from "@/utils/urlPath";
import axios from "axios";
import { Kyc_Submit_Api } from "@/services/user_side_api/auth/route_url";
import { setLoadingState } from "@/redux/userSide/loadingSlice";
import PdfFile from "@/components/myUi/PdfFile";
import { fetchAyabooUserDetails } from "@/redux/userSide/UserAuthSlice";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

const FILE_SIZE_LIMIT = 11 * 1024 * 1024; // 1 MB

export default function KycUpload() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { userKyc } = useAppSelector((state) => state.auth);

  const {
    businessName,
    emailId,
    buildingName,
    street,
    pinCode,
    state,
    country,
    proofType,
    proof,
    gstNumber,
  } = useAppSelector((state) => state.kyc);
  // const uploadDetails = useAppSelector((state) => state.kyc);
  const kycDetails = useAppSelector((state) => state.kyc);

  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  // const [fileURL, setFileURL] = useState<string | null>(kycDetails?.proof || null);
  // const [fileURL, setFileURL] = useState<string | null>(
  //   kycDetails?.proof
  //     ? typeof kycDetails.proof === "string"
  //       ? kycDetails.proof
  //       : URL.createObjectURL(kycDetails.proof)
  //     : null
  // );
  const [fileURL, setFileURL] = useState<string | null>(() => {
    if (kycDetails?.proof) {
      if (typeof kycDetails.proof === "string") {
        return kycDetails.proof; // If it's already a URL, use it directly.
      } else if (kycDetails.proof instanceof Blob) {
        return URL.createObjectURL(kycDetails.proof); // Generate a URL for the Blob/File.
      }
    }
    return userKyc?.proof || null; // Fallback to `userKyc.proof` or `null`.
  });

  // const {  handleLogout} = useAuth();
  // console.log(fileURL, "fileURL?.proof");

  const chooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > FILE_SIZE_LIMIT) {
        setFileError(
          `File size must be less than ${(
            FILE_SIZE_LIMIT /
            (1024 * 1024)
          ).toFixed(2)} MB`
        );
        return;
      }
      if (file.type !== "application/pdf") {
        setFileError("Only PDF files are allowed");
        return;
      }

      setFileError(null);

      // Create the file URL for displaying
      const fileURL = URL.createObjectURL(file);
      setFileURL(fileURL);

      // Dispatch the complete file object to Redux
      dispatch(uploadFile(file));
    }
  };

  const handleSubmit = async () => {
    if (!proof && !userKyc?.proof) {
      makeToastError("Please upload a PDF file");
      return;
    }
    if (!fileURL) {
      makeToastError("Please upload a PDF file");
      return;
    }

    // setLoading(true); // Set loading state to true
    // makeToast("KYC submitted successfully");
    // dispatch(clearKycDetails());
    // handleLogout('/');
    // navigate(`/`);
    // const token = "b2bdevtokenwithdummy00data"
    // Cookies.set('us_b2b_tkn', token, {
    //   expires: 1, // 7 days
    //   secure: true, // Use HTTPS
    //   sameSite: 'strict', // Prevent cross-site CSRF
    // });

    try {
      setLoading(true);
      const formData = new FormData();

      // Append all KYC details to FormData
      formData.append("businessName", businessName);
      formData.append("emailId", emailId);
      formData.append("buildingName", buildingName);
      formData.append("street", street);
      formData.append("pinCode", pinCode);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("proofType", proofType || ""); // Append proofType, ensure it's a string
      if (proof) {
        formData.append("proof", proof); // Append the uploaded file
      }
      formData.append("gstNumber", gstNumber); // Append the uploaded file

      const response = await Kyc_Submit_Api(formData);
      dispatch(setLoadingState(true));
      if (response.status === 200) {
        // dispatch(saveKycDetails(response.data.kyc));
        dispatch(fetchAyabooUserDetails());
        dispatch(clearKycDetails());

        // handleLogout('/');
        navigate(`/`, { replace: true });
        makeToast("KYC submitted successfully");
      }
    } catch (error: unknown) {
      console.log("Unexpected error:", error);
      dispatch(setLoadingState(false));
      if (axios.isAxiosError(error)) {
        makeToastError(error.response?.data.message || "Failed to submit KYC");
      } else {
        console.log("Unexpected error:", error);
      }
    } finally {
      setLoading(false); // Set loading state back to false
      dispatch(setLoadingState(false));
    }
  };

  return (
    <div className="md:p-6">
      <h2 className="text-xl font-semibold mb-4 sm:text-start text-center">Complete Shop's KYC</h2>

      {/* file upload section ===== */}

      <div className="flex sm:flex-row flex-col justify-between gap-3 items-center md:p-10 p-4 bg-gray-100 rounded-xl mb-6">
        <div className="flex flex-col sm:items-start items-center gap-5">
          <div>
            <h4 className="font-bold">{proofType}</h4>
            <p>{proofType} verifies in 10 mins.</p>
          </div>

          <div className="flex flex-col gap-2">
            <small>Browse, Gallery or Files.</small>
            <div>
              <input
                type="file"
                accept="application/pdf"
                ref={inputRef}
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                variant="outline"
                className="p-[10px] w-[205px] h-[48px] bg-white flex items-center gap-2 text-center text-black rounded-lg border"
                onClick={chooseFile}
                type="button"
              >
                <Icon icon="material-symbols-light:upload" fontSize={20} />{" "}
                {fileURL ? "Change" : "Upload"}
              </Button>
            </div>
            
          </div>
          {/* change proof type  */}
          <span
              className="text-xs underline text-blue-500 cursor-pointer capitalize"
              onClick={() => {
                dispatch(restProofType());
              }}
            >
              Change Proof Type
            </span>
        </div>

        {/* Save to Db button ====== */}
        <Button variant={`b2bStyle`} className="px-11" onClick={handleSubmit}>
          {loading ? <ClipLoader color="#ffff" size={20} /> : " Submit"}
        </Button>
      </div>

      {/* file upload section ===== */}

      {/* File Upload Feedback */}
      {fileError && <p className="text-red-600 mb-4">{fileError}</p>}

      <div className="mt-6 flex  flex-row gap-4 justify-between">
        <div>
          <h4 className="font-medium">Certificate must clearly show:</h4>
          <ul className="list-inside list-disc mt-2">
            <li className="text-sm flex items-center gap-1">
              <Icon
                icon="bitcoin-icons:verify-filled"
                className="text-green-600"
                fontSize={25}
              />
              Registration Number
            </li>
            <li className="text-sm flex items-center gap-1">
              <Icon
                icon="bitcoin-icons:verify-filled"
                className="text-green-600"
                fontSize={25}
              />
              Legal Name
            </li>
            <li className="text-sm flex items-center gap-1">
              <Icon
                icon="bitcoin-icons:verify-filled"
                className="text-green-600"
                fontSize={25}
              />
              Trade Name
            </li>
          </ul>
        </div>

        {/* Show Uploaded File */}
        {fileURL ? (
          <>
            {/* <MyPdf value={`${fileURL}`}  isPdfShown  /> */}
            {/* <PdfFile fileURL={fileURL} /> */}
            <div>
             <p>See Sample:</p>
             <div className="mt-4 relative sm:float-right">
               <a href={fileURL} target="_blank" rel="noopener noreferrer">
                

                 <PdfFile fileURL={fileURL} />
                 <div className="absolute w-16 h-24 bg-black/10 top-0 rounded-md flex items-center justify-center ">
                   <Icon
                     icon="system-uicons:capture"
                     fontSize={25}
                     color="#fff"
                   />
                 </div>
               </a>
             </div>
           </div>
          </>
        ) : (
          <div className="w-16 h-24 bg-black/20 flex items-center justify-center">
            <Icon icon="system-uicons:capture" />
          </div>
        )}

        {/* <div className="mt-4">
            <p>Uploaded File: {proof.name}</p>
            <a
              href={fileURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline"
            >
              <PdfFile file={fileURL}/>
            </a>
          </div> */}
      </div>
    </div>
  );
}
