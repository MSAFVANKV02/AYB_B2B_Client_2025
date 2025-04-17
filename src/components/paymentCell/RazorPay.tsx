// import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

// type RazorPayResult = {
//     success: boolean;
//     message?: string;
//   };

// export const RazorPay = (): Promise<RazorPayResult> => {
//     const { Razorpay } = useRazorpay();
   
//     return new Promise((resolve, reject) => {
//         try {
//             const options: RazorpayOrderOptions = {
//                 key: "rzp_test_DrLUTuWIXIiihx",
//                 amount: 50000, // Amount in paise
//                 currency: "INR",
//                 name: "Test Company",
//                 description: "Test Transaction",
//                 order_id: "order_9A33XWu170gUtm", // Generate order_id on server
//                 handler: (response) => {
//                   console.log("Payment Response:", response);
//                   resolve({ success: true, message: "Payment Successful!" });
//                 },
//                 prefill: {
//                   name: "John Doe",
//                   email: "john.doe@example.com",
//                   contact: "9999999999",
//                 },
//                 theme: {
//                   color: "#F37254",
//                 },
//               };
//               const razorpayInstance = new Razorpay(options);
//               razorpayInstance.open();
//         } catch (error) {
//             console.error("Payment Error:", error);
//             reject({ success: false, message: "Payment Failed!" });
//         }
//     });
// }
import { makeToastError } from "@/utils/toaster";
// import axios from "axios";

type RazorPayResult = {
    success: boolean;
    message?: string;
  };
export const RazorPay = async ({
  totalAmount,
  orderIdRazorPay,
  // address,

  // email
}: any): Promise<RazorPayResult> => {

  
  return new Promise((resolve) => {
    try {
      // console.log(process.env.RAZORPAY_KEY);
      
      const key = 'rzp_test_DrLUTuWIXIiihx';
      const options = {
        key: key,
        name: "URACCA",
        currency: "INR",
        amount: totalAmount * 100, // Razorpay requires the amount in paise
        order_id: orderIdRazorPay,
        description: "Order Payment",
        handler: async function (response: any) {
          // console.log(response);
          
          try {
            const verificationData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
           
            };
            console.log(verificationData);
            

            // const verifyRes = await axios.post(
            //   `${BACKENTURL}/order/verifyOrder`,
            //   verificationData,
            //   { withCredentials: true }
            // );

            // if (verifyRes.data.success) {
            //   makeToast(verifyRes.data.message);
            //   resolve({ success: true });
            // } else {
            //   makeToastError("Payment verification failed");
            //   resolve({ success: false });
            // }
          } catch (error) {
            console.error("Verification failed", error);
            makeToastError(
              "Payment verification failed due to a server error."
            );
            resolve({ success: false });
          }
        },
        prefill: {
        //   name: `${address.userName}`,
        //   email: `${email}`,
        //   contact: `${address.userMobile}`,
        },
        theme: {
          color: '#E56F61',
          // hide_topbar: true
      },
        modal: {
          ondismiss: function () {
            // Redirect user to a custom URL when the modal is closed/dismissed
            resolve({ success: false }); // Change to your desired URL
            // window.location.replace("/cart");
          },

        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function () {
        makeToastError("Payment failed. Please try again. razorpay");
        resolve({ success: false });
      });
      razorpay.on("modal.closed", function () {
        makeToastError("Payment process was canceled.");
        resolve({ success: false });
      });
    } catch (error) {
      console.error("Error initializing Razorpay",error);
      makeToastError("Error initializing Razorpay");
      resolve({ success: false });
    }
  });
};
