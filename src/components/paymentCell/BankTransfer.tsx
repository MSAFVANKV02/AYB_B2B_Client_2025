import { Icon } from "@iconify/react/dist/iconify.js";
import { Checkbox } from "@mui/material";
import React, { useRef } from "react";

// icons
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

type Props = {
  upiPaymentUrl: string;
  setUserUpiId: (upiId: string) => void;
  setReferralDoc: (referralDoc: File | null) => void;
  referralDoc: File | null;
  setComment: (comment: string) => void;
  comment?: string;
  termsAccepted?: boolean;
  setTermsAccepted: (termsAccepted: boolean) => void;
  userUpiId: string;
};

export default function BankTransfer({
  
  setUserUpiId,
  setReferralDoc,
  referralDoc,
  setComment,
  setTermsAccepted,
  termsAccepted,
  comment,
  userUpiId,
}: Props) {
  const inputRef = useRef(null);

  const chooseFile = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  //// File upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReferralDoc(event.target.files[0]);
    }
  };

  return (
    <div className="px-5">
      {/* Bank Details  Section */}
      <div className="flex flex-col  my-7 relative text-sm gap-2">
        <span>Name:</span>
        <span>Account Number:</span>
        <span>IFCE code:</span>
        <span>Swift code:</span>
        <span>Bank name:</span>
      </div>

      {/* ======= */}

      {/* UPI ID Input */}
      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={userUpiId}
        onChange={(e) => setUserUpiId(e.target.value)}
        className=" w-full px-4 py-3 mb-4 border border-black text-sm rounded-lg focus:outline-none focus:ring focus:ring-textHardSoft"
      />

      {/* Upload Referral Document */}
      <div className="mb-4">
        <label htmlFor="referralDoc" className="text-sm text-gray-500">
          Upload Referral Document
        </label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          id="referralDoc"
          onChange={handleFileUpload}
          className="hidden w-full mt-2"
        />
        <div
          className="w-full h-12 border border-black gap-3 rounded-lg flex items-center justify-center text-sm text-black cursor-pointer"
          onClick={() => chooseFile(inputRef)}
        >
          <FileUploadOutlinedIcon fontSize="small" /> Upload
        </div>
        {referralDoc ? (
          referralDoc.type === "application/pdf" ? (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Icon icon="material-symbols-light:attachment" />
              {referralDoc.name}
            </div>
          ) : (
            <img
              src={URL.createObjectURL(referralDoc)}
              alt={referralDoc.name}
              className="w-14 h-auto mt-2"
            />
          )
        ) : null}
      </div>

      {/* Comment Section */}
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-black rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
      />

      {/* Contact Information */}
      <div className="grid grid-cols-2 text-sm text-textGray">
        <div className="border-r ">
          <p className="leading-6 text-sm ">
            If you have any complaint or doubts, feel free to contact us:
          </p>
        </div>
        <div className="flex gap-2 items-center  flex-col justify-center w-full ">
          <div className="text-sm flex items-center gap-1">
            <Icon icon="lets-icons:phone-light" /> <span>9744888444</span>{" "}
          </div>
          <div className="text-sm flex items-center gap-1">
            <Icon icon="logos:whatsapp-icon" /> <span>9744888444</span>
          </div>
        </div>
      </div>

      <div className="">
        <span className="text-sm">
          The payment process will depend on your bank and will be completed
          after we verify your details.
        </span>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center text-xs text-gray-500 mb-4">
        <Checkbox
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
          color="primary"
        />
        <span>
          I have read and agree to the{" "}
          <a href="/terms" className="text-textMain underline">
            terms and conditions
          </a>
        </span>
      </div>
    </div>
  );
}
