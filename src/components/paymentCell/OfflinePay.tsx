
import { Button } from "../ui/button";
import { resetPaymentDetails, setPaymentDetailsField } from "@/providers/redux/userSide/checkout-slice";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { useQueryData } from "@/hooks/useQueryData";
import { getPaymentDetailsAction } from "@/action/platform/platformAction";
import { IPaymentTypes } from "@/types/platform-types";
import UpiBankTransaction from "./Upi-bank-Transaction";

// type OfflinePayProps = {
//   totalAmount: number;
//   upiId: string;
//   handlePaymentSubmit: (
//     upiId: string,
//     referralDoc: File | null,
//     comment: string,
//     isPolicy: boolean
//   ) => void;
//   formData: FormDataType;
//   handleFormDataChange: (
//     field: keyof FormDataType,
//     value: FormDataValue
//   ) => void;
// };

export default function OfflinePay() {
  //   const inputRef = useRef(null);

  const { formData } = useAppSelector((state) => state.checkout);
  const { cart } = useAppSelector((state) => state.products);

  // const { dispatchModal } = useModal();

  const {
    data: fetchedData,
    // refetch:refetchBanner,
  } = useQueryData(
    ["payment-details"],
    () => getPaymentDetailsAction() // Wrap in an arrow function
  );

  // console.log(fetchedData);

  const { data: payments } = (fetchedData ?? {}) as {
    status?: number;
    data?: IPaymentTypes;
  };

  //   console.log(referralDoc);

  // Submit Document Data to FormData

  // const handleSubmit = () => {
  //   if (termsAccepted && userUpiId && termsAccepted) {
  //     handlePaymentSubmit(userUpiId, referralDoc, comment, termsAccepted);
  //   } else {
  //     makeToastError(
  //       "Please fill in all required fields and accept the terms."
  //     );
  //   }
  // };

  /// Qr Code Generation

  const upiPaymentUrl = `upi://pay?pa=${payments?.custom_upi}&pn=Merchant&am=${cart?.cartTotal}&cu=INR&tid=TXN123456`;

  if(!payments){
    return null
  }

  return (
    <div className="h-full flex flex-col overflow- sm:mt-0 mt-1">
      <div className=" w-full ">
        <h2 className=" text-xl font-semibold my-4 ml-3 ">Make payment</h2>

        {/* Tabs */}
        <div className="flex mb-4">
          <Button
            className={` ${formData.payment_details?.payment_type === "upi" ? "border-b-2 border-textMain bg-bgHardSoft hover:bg-bgHardSoft" : "bg-transparent border-b-2 hover:bg-bgHardSoft"} text-textMain rounded-none  w-full `}
            onClick={() => {
              // dispatch(
              //   setCheckoutFormDataField({
              //     field: "payment_details",
              //     value: {
              //       ...(formData.payment_details || {}),
              //       payment_type: "upi",
              //     } as TransactionDetails,
              //   })
              // );
              dispatch(
                setPaymentDetailsField({
                  field: "payment_type",
                  value: "upi",
                })
              );
              
            }}
          >
            UPI Payment
          </Button>
          <Button
            className={` ${formData.payment_details?.payment_type === "bank" ? "border-b-2 border-textMain bg-bgHardSoft hover:bg-bgHardSoft" : "bg-transparent border-b-2 hover:bg-bgHardSoft"} text-textMain rounded-none  w-full `}
            onClick={() => {
              // dispatch(
              //   setCheckoutFormDataField({
              //     field: "payment_details",
              //     value: {
              //       ...(formData.payment_details || {}),
              //       payment_type: "bank",
              //     },
              //   })
              // );
              dispatch(
                setPaymentDetailsField({
                  field: "payment_type",
                  value: "bank",
                })
              );
            }}
          >
            Bank Transfer
          </Button>
        </div>

        {/* UPI Transaction starts here ====== */}

        <UpiBankTransaction upiPaymentUrl={upiPaymentUrl} formData={formData} adminPaymentDetails={payments} />

        {/* {formData.payment_details?.payment_type === "upi" ? (
          <>
            <UpiTransaction upiPaymentUrl={upiPaymentUrl} />
          </>
        ) : (
          <>
          <UpiTransaction upiPaymentUrl={upiPaymentUrl} />
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
        )} */}
        {/* Buttons */}
        <div className="flex justify-end gap-4 px-4 py-6 text-sm mt-a">
          <button
            className="px-4 py-2 border rounded-lg text-gray-600"
            onClick={() => {
              // handleFormDataChange("transactionType", "upi");
              dispatch(resetPaymentDetails());
           
            }}
          >
            Cancel
          </button>
          <button
            // onClick={handleSubmit}
            className={`px-4 py-2 rounded-lg text-white ${ formData.payment_details?.transaction_id ? "bg-bgPrimaryVariant" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={ !formData.payment_details?.transaction_id}
          >
            Verify & Pay
          </button>
        </div>
        {/* Bank Transaction starts here ====== */}
      </div>
    </div>
  );
}
