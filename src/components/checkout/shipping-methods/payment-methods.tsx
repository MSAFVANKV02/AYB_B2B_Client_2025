import { getPlatformSettingsAction } from "@/action/platform/platformAction";
import { useQueryData } from "@/hooks/useQueryData";

import { useModal } from "@/providers/context/modal-context";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { resetPaymentDetails, setCheckoutFormDataField } from "@/providers/redux/userSide/checkout-slice";
import { IPlatformSetType } from "@/types/platform-types";

function PaymentMethods() {
  const { formData } = useAppSelector((state) => state.checkout);

  const {dispatchModal} = useModal()

  const {
    data: fetchedData,
    // refetch:refetchBanner,
  } = useQueryData(
    ["platform-settings"],
    () => getPlatformSettingsAction() // Wrap in an arrow function
  );

  // console.log(fetchedData);

  const { data: settings } = (fetchedData ?? {}) as {
    status?: number;
    data?: IPlatformSetType;
  };


  if(!settings){
    return null
  }


  const paymentMethods = [
    {
      id: 1,
      label: "RazorPay",
      value: "razorpay",
      icon: "/paymentImg/image 125.png",
      isEnabled: settings?.payment_methods?.razorpay,
    },
    {
      id: 2,
      label: "Offline Payment",
      value: "offline_payment",
      icon: "/paymentImg/Group 1163.png",
      isEnabled: settings?.payment_methods?.offline,
    },
    {
      id: 3,
      label: "Cash On Delivery",
      value: "cod",
      icon: "/paymentImg/Group 1164.png",
      isEnabled: settings?.payment_methods?.cod,
    },
  ];

  return (
    <div>
      <div className="flex sm:flex-row flex-col sm:gap-4  select-none">
        {paymentMethods
          .filter((item) => item.isEnabled)
          .map((pay, index) => (
            <div
              key={index}
              // className={`flex gap-1 sm:flex-col items-center px-2 sm:py-2 py-1 sm:w-auto text-sm ${
              //   pay.value === formData.payment_method
              //     ? "text-textMain border  border-[#5F08B1] bg-bgSoft"
              //     : "text-black border border-black"
              // } sm:rounded-md cursor-pointer`}
              className={`flex gap-1 sm:flex-col items-center px-2 sm:py-2 py-1 sm:w-auto text-sm 
                ${
                  pay.value === formData.payment_method
                    ? `text-textMain border border-[#5F08B1] bg-bgSoft ${
                        index === 1 ? "sm:border-b border-b-0 sm:border-t border-t-0" : ""
                      }`
                    : `text-black border ${index === 1 ? "sm:border-b border-b-0 sm:border-t border-t-0" : ""} border-black`
                } sm:rounded-md cursor-pointer`}
              
              onClick={() => {
                if(pay.value !== "offline_payment"){
                  dispatch(resetPaymentDetails())
                }
                dispatch(
                  setCheckoutFormDataField({
                    field: "payment_method",
                    value: pay.value,
                  })
                );
                if(pay.value === "offline_payment"){
                  dispatchModal({modalType:"offlinePay",type:"OPEN_MODAL"})
                }
              }}
            >
              <img
                src={pay.icon}
                className={` sm:w-full sm:h-auto h-11 w-28 object-cover ${pay.label === formData?.payment_method ? "text-textMain" : ""} `}
              />
              <span className="sm:py-3 py-2">{pay.label}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
