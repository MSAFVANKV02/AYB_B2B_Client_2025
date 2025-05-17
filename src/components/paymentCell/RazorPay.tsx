import { ShippingInfoType } from "@/providers/redux/userSide/checkout-slice";
import { verify_Razorpay_Order_Api } from "@/services/user_side_api/checkout/route";
import { IAddressType } from "@/types/address-types";
import { makeToastError } from "@/utils/toaster";

export type RazorPayResult = {
  success: boolean;
  message?: string;
  data?: any;
};

export const RazorPay = async ({
  totalAmount,
  orderIdRazorPay,
  shipping_address,
  shipping_info,
}: {
  totalAmount: number;
  orderIdRazorPay: string;
  shipping_address: IAddressType | null;
  shipping_info: ShippingInfoType;
}): Promise<RazorPayResult> => {
  return new Promise((resolve) => {
    // console.log(totalAmount,'totalAmount');

    try {
      const key = "rzp_test_Zr5UV12tJ6kfu7";
      const options = {
        key,
        name: "URACCA",
        currency: "INR",
        amount: totalAmount * 100, // Razorpay expects the amount in paise
        order_id: orderIdRazorPay,
        description: "Order Payment",
        handler: async (response: any) => {
          const verificationData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyRes = await verify_Razorpay_Order_Api({
              ...verificationData,
              shipping_address: shipping_address,
              shipping_info: shipping_info,
            });

            if (verifyRes.status === 200 || verifyRes.status === 201) {
              // dispatch(resetCheckoutState({ checkoutStatus: "checked-out" }));

              // makeToast(verifyRes.data.message);
              resolve({ success: true });
            }

          } catch  {
            // console.error("Verification failed ", error);
            // makeToastError("Payment verification failed in backend.");
            resolve({ success: false });
          }
        },
        prefill: {
          name: `${shipping_address?.name}`,
          email: `${shipping_address?.email}`,
          contact: `${shipping_address?.mobile}`,
        },
        theme: {
          color: "#5f08b1",
        },
        modal: {
          ondismiss: () => {
            makeToastError("Payment process was canceled.");
            resolve({ success: false });
          },
        },
      };

      // Initialize Razorpay
      const razorpay = new (window as any).Razorpay(options);

      // Open the Razorpay payment window
      razorpay.open();

      // Handle payment failure
      razorpay.on("payment.failed", () => {
        makeToastError("Payment failed with razorpay");
        resolve({ success: false });
      });
    } catch {
      // console.error("Error initializing Razorpay", error);
      // makeToastError("Error initializing Razorpay");
      resolve({ success: false });
    }
  });
};
