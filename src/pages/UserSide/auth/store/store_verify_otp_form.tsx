// import {
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import OtpTimer from "@/hooks/otp-timer";
// import { register_Resend_otp_store_Api } from "@/services/user_side_api/store/route";
// import { makeToast, makeToastError } from "@/utils/toaster";
// import axios from "axios";
// import { Field, ErrorMessage } from "formik";
// import { useState, useRef } from "react";

// type Props = {
//   setFieldValue: (field: string, value: unknown) => void;
//   isSubmitting?: boolean;
//   values?: any;
// };

// export default function StoreVerifyOtpForm({
//   setFieldValue,
// }: Props) {
//   const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const [otpValues, setOtpValues] = useState(Array(6).fill(""));
//   // const [loading, setLoading] = useState(false);

//   const handleOtpChange = (index: number, value: string) => {
//     const trimmedValue = value.trim().slice(-1); // Trim whitespace and keep only the last character
//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = trimmedValue;
//     setOtpValues(newOtpValues);
//     setFieldValue("otp", newOtpValues.join(""));

//     // Automatically move focus to the next field if not the last field
//     if (trimmedValue && index < otpValues.length - 1) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleBackspace = (
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (e.key === "Backspace") {
//       const newOtpValues = [...otpValues];
//       if (newOtpValues[index] === "" && index > 0) {
//         // Move focus to the previous field if current field is empty
//         otpRefs.current[index - 1]?.focus();
//       }
//       newOtpValues[index] = "";
//       setOtpValues(newOtpValues);
//       setFieldValue("otp", newOtpValues.join(""));
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
//     const pastedData = e.clipboardData
//       .getData("Text")
//       .trim() // Trim whitespace from the pasted data
//       .slice(0, otpValues.length); // Limit to the length of the OTP fields
//     const newOtpValues = pastedData.split("").slice(0, otpValues.length);

//     newOtpValues.forEach((char, index) => {
//       otpRefs.current[index]?.focus();
//     });

//     setOtpValues(newOtpValues);
//     setFieldValue("otp", newOtpValues.join(""));
//     e.preventDefault(); // Prevent default paste behavior
//   };

//   const handleFocus = (index: number) => {
//     otpRefs.current[index]?.select();
//   };

//   const handleResendOtp = async () => {
//     const mobile =  localStorage.getItem("store_reg_num") ?? "";
//     // console.log("handleResendOtp:");
//     try {
//       const response = await register_Resend_otp_store_Api(mobile);
//     console.log("handleResendOtp:",response);

//       if (response.status === 200) {
//         makeToast("OTP Resent Successfully");
//       }
//     } catch (error: unknown) {
//       console.log("Unexpected error:", error);
//       if (axios.isAxiosError(error)) {
//         if (error.response?.data.success === false) {
//           makeToastError(error.response?.data.message);
//         }
//       } else {
//         console.log("Unexpected error:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <CardHeader>
//         <CardTitle>Verify OTP</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <CardDescription>
//           Enter the 6-digit OTP sent to your registered mobile number.
//         </CardDescription>
//         <div
//           className="flex justify-center gap-2"
//           onPaste={handlePaste} // Handle paste event on the wrapper div
//         >
//           {otpValues.map((value, index) => (
//             <Field
//               name={`otp[${index}]`}
//               key={index}
//               as="input"
//               type="number"
//               maxLength={1}
//               value={value}
//               className="border text-center text-xl rounded-md bg-white border-black w-10 h-12"
//               innerRef={(el: HTMLInputElement) => (otpRefs.current[index] = el)}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                 handleOtpChange(index, e.target.value)
//               }
//               onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
//                 handleBackspace(index, e)
//               }
//               onFocus={() => handleFocus(index)}
//             />
//           ))}
//         </div>
//         <ErrorMessage
//           name="otp"
//           component="span"
//           className="text-red-500 text-xs"
//         />

//         <OtpTimer
//           resendOtp={handleResendOtp}
//           initialTime={60}
//           onTimerFinish={() => makeToast("You can resend OTP now.")}
//         />
//       </CardContent>
//     </div>
//   );
// }
// =================================================================

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  
  FormMessage,
} from "@/components/ui/form";
import { register_Resend_otp_store_Api, register_Verify_otp_store_Api } from "@/services/user_side_api/store/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useRef, useState } from "react";

import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import AyButton from "@/components/myUi/AyButton";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import OtpTimer from "@/hooks/otp-timer";

const formSchema = z.object({
  otp: z.string().min(6, { message: "OTP is required." }),
});

interface FormData {
  otp: string;
}

export default function StoreVerifyOtpForm() {
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
     
    },
  });

  const onSubmit = async (data: FormData) => {
    const mobile =  localStorage.getItem("store_reg_num") ?? "";
    // console.log(data.otp,'responce in page');
    try {
      setLoading(true);
      // const response = await userLoginSendOtp(data.mobile4OTP);
      const response = await register_Verify_otp_store_Api({
        mobile: mobile,
        otp_Store: data.otp,
      });
      // response coming from userLoginSendOtp

      if (response.status === 200) {
        makeToast(`${response.data.message}`);
        form.reset();
      
        navigate(`/become/store/register/${response.data.token}`);
        localStorage.setItem("otp-timer", "0");
        localStorage.removeItem("otp-finished");
      }
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.success === false) {
          makeToastError(error.response?.data.message);
        }
      } else {
        console.log("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const mobile =  localStorage.getItem("store_reg_num") ?? "";
    // console.log("handleResendOtp:");
    try {
      const response = await register_Resend_otp_store_Api(mobile);
    // console.log("handleResendOtp:",response);

      if (response.status === 200) {
        makeToast("OTP Resent Successfully");
        form.reset();
      }
    } catch (error: unknown) {
      console.log("Unexpected error:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.success === false) {
          makeToastError(error.response?.data.message);
        }
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle>Verify One Time Password</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <CardContent className="space-y-2 flex flex-col justify-center items-center">
            <CardDescription>
              Sign up for a stockist account to list products, manage your
              inventory, and earn commission.
            </CardDescription>
            <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="flex items-start my-2">
                      Verify Your OTP
                    </FormLabel> */}
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value} // Bind value from react-hook-form
                        onChange={field.onChange} // Handle change for OTP input
                      >
                        <InputOTPGroup className="space-x-2 rounded-none">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              ref={firstInputRef}
                              className="border text-center text-xl rounded-md bg-white border-black"
                              onChange={(e) => {
                                const target = e.target as HTMLInputElement; // Cast target to HTMLInputElement
                                const otpValue = target.value;
                                field.onChange(otpValue); // Update the form state
                              }}
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <OtpTimer
                resendOtp={handleResendOtp}
                initialTime={60}
                onTimerFinish={() => makeToast("You can resend OTP now.")}
              />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <AyButton
              title="Verify OTP"
              type="submit"
              loading={loading}
              sx={{
                width: "100%",
                height: "40px",
              }}
            />
            <div className="flex text-xs gap-2 items-center">
              <p className="text-sm">Already a Supplier</p> ?
              <Link
                to="https://store.ayaboo.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-400 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}