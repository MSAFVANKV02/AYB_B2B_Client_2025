import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { makeToast, makeToastError } from "@/utils/toaster";
// import ClipLoader from "react-spinners/ClipLoader";
const ClipLoader = React.lazy(() => import("react-spinners/ClipLoader"));
import OtpTimer from "@/hooks/otp-timer";
import { Resend_Otp_Api, Verify_Register_Api } from "@/services/user_side_api/auth/route_url";
// Define the Zod schema for OTP validation
const formSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits." })
    .regex(/^\d+$/, { message: "OTP must only contain digits." }), // Ensure only digits are allowed
});

interface FormData {
  otp: string;
}

function OtpVerificationPage() {
  const navigate = useNavigate();
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const auth = queryParams.get("auth");

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/register");
  //   }
  // }, [ auth]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log(`OTP entered: ${data.otp}`);
    setLoading(true);

    try {
      const response = await Verify_Register_Api({
        otp: data.otp,
        mobile: auth,
      });
      // console.log(response.data,'response.data otp verifying');

      if (response.status === 200) {
        localStorage.removeItem("mobileNumber");
        if (response.data.success) {
          makeToast("Otp Verified Successfully.");
          // Navigate to the user details page
          navigate(`/register/user-details?auth=${auth}`);
        }
      }
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        // console.log(
        //   "Error sending OTP:",
        //   error.response?.data || error.message
        // );
        if (error.response?.status === 500) {
          makeToastError("Enter Valid Mobile");
        } else if (error.response?.data.success === false) {
          makeToastError(error.response?.data.message);
        }
      } else {
        // console.log("Unexpected error:", error);
      }
    }

    // Here, you can add your logic to send the OTP for verification
    // e.g., making an API call to verify the OTP
  };

  // const dummySubmit = () => {
  //   Cookies.remove('us_b2b_tkn');
  //   makeToast("Otp Verified Successfully.");
  //   navigate(`/register/user-details?auth=${auth}`);

  // }

  // # ====  Resend the OTP =================
  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await Resend_Otp_Api({
        mobile: auth,
      });
      if (response.status === 200) {
        makeToast("OTP Resent Successfully");
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="h-screen w-screen flex relative">
      <img
        src="/img/Background Images/Group 1109.svg"
        alt=""
        className="absolute object-cover top-0 left-0 bottom-0 right-0 w-full h-full"
      />
      <div className="bg-[#F5E9FF] max-w-[350px] h-fit backdrop-blur-2xl rounded-2xl p-5 flex flex-col gap-3 m-auto">
        <ArrowLeft
          onClick={() => {
            localStorage.removeItem("otp-timer");
            localStorage.removeItem("otp-finished");
            navigate("/register");
          }}
          className="cursor-pointer"
        />
        <div className="flex flex-col w-full justify-center items-center space-y-5">
          <img
            src="/img/Background Images/Group 1117.png"
            alt="login page b2b"
            className="w-28 h-28"
          />
          <h4 className="font-bold">Verify Mobile Number</h4>
          <div className="text-gray-400 text-center text-sm capitalize">
            <span>Enter the 6-digit OTP sent to your mobile number</span> - <span className="text-black">{auth}</span> .
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* OTP Input Field */}
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

              <Button
                type="submit"
                variant="b2bStyle"
                className="w-full"
                size="b2b"
              >
                {loading ? (
                  <ClipLoader color="#ffff" size={20} />
                ) : (
                  " Verify OTP"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerificationPage;
