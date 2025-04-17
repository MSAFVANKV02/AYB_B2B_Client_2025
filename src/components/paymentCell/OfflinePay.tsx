import  { useState } from "react";

import { Button } from "../ui/button";
import {
  FormDataType,
  FormDataValue,
} from "@/pages/UserSide/cart/checkout/page";

// icons
import { makeToastError } from "@/utils/toaster";
import UpiTransaction from "./UpiTransaction";
import BankTransfer from "./BankTransfer";

type OfflinePayProps = {
  totalAmount: number;
  upiId: string;
  handlePaymentSubmit: (
    upiId: string,
    referralDoc: File | null,
    comment: string,
    isPolicy: boolean
  ) => void;
  formData: FormDataType;
  handleFormDataChange: (
    field: keyof FormDataType,
    value: FormDataValue
  ) => void;
};

export default function OfflinePay({
  totalAmount,
  upiId,
  handlePaymentSubmit,
  formData,
  handleFormDataChange,
}: OfflinePayProps) {
  //   const inputRef = useRef(null);
  const [userUpiId, setUserUpiId] = useState("");
  const [referralDoc, setReferralDoc] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  //   console.log(referralDoc);

  // Submit Document Data to FormData

  const handleSubmit = () => {
    if (termsAccepted && userUpiId && termsAccepted) {
      handlePaymentSubmit(userUpiId, referralDoc, comment, termsAccepted);
    } else {
      makeToastError(
        "Please fill in all required fields and accept the terms."
      );
    }
  };

  /// Qr Code Generation

  const upiPaymentUrl = `upi://pay?pa=${upiId}&pn=Merchant&am=${totalAmount}&cu=INR&tid=TXN123456`;

  return (
    <div className="h-full flex flex-col overflow- sm:mt-0 mt-1">
      <div className=" w-full ">
        <h2 className=" text-xl font-semibold my-4 ml-3 ">Make payment</h2>

        {/* Tabs */}
        <div className="flex mb-4">
          <Button
            className={` ${formData.transactionType === "upi" ? "border-b-2 border-textMain bg-bgHardSoft hover:bg-bgHardSoft" : "bg-transparent border-b-2 hover:bg-bgHardSoft"} text-textMain rounded-none  w-full `}
            onClick={() => handleFormDataChange("transactionType", "upi")}
          >
            UPI Payment
          </Button>
          <Button
            className={` ${formData.transactionType === "bank" ? "border-b-2 border-textMain bg-bgHardSoft hover:bg-bgHardSoft" : "bg-transparent border-b-2 hover:bg-bgHardSoft"} text-textMain rounded-none  w-full `}
            onClick={() => handleFormDataChange("transactionType", "bank")}
          >
            Bank Transfer
          </Button>
        </div>

        {/* UPI Transaction starts here ====== */}

        {formData.transactionType === "upi" ? (
          <>
            <UpiTransaction
              referralDoc={referralDoc}
              setComment={setComment}
              setReferralDoc={setReferralDoc}
              setTermsAccepted={setTermsAccepted}
              setUserUpiId={setUserUpiId}
              upiPaymentUrl={upiPaymentUrl}
              userUpiId={userUpiId}
              comment={comment}
              termsAccepted={termsAccepted}
            />
          </>
        ) : (
          <>
             <BankTransfer
              referralDoc={referralDoc}
              setComment={setComment}
              setReferralDoc={setReferralDoc}
              setTermsAccepted={setTermsAccepted}
              setUserUpiId={setUserUpiId}
              upiPaymentUrl={upiPaymentUrl}
              userUpiId={userUpiId}
              comment={comment}
              termsAccepted={termsAccepted}
            />
          </>
        )}
        {/* Buttons */}
        <div className="flex justify-end gap-4 px-4 py-6 text-sm mt-a">
          <button className="px-4 py-2 border rounded-lg text-gray-600"
          onClick={()=>{
            // handleFormDataChange("transactionType", "upi");
            setUserUpiId("");
            setReferralDoc(null);
            setComment("");
            setTermsAccepted(false);
          }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-lg text-white ${termsAccepted && userUpiId ? "bg-bgPrimaryVariant" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!termsAccepted || !userUpiId}
          >
            Verify & Pay
          </button>
        </div>
        {/* Bank Transaction starts here ====== */}
      </div>
    </div>
  );
}
