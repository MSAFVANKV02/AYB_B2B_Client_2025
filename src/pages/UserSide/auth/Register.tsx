import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PhoneInput, { CountryData } from "react-phone-input-2";
import { makeToast, makeToastError } from "@/utils/toaster";
import "react-phone-input-2/lib/style.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "@/redux/hook";
import { setUserData } from "@/redux/userSide/UserAuthSlice";
import { SendOtp_Register_Api } from "@/services/user_side_api/auth/route_url";
// import { SEND_OTP_REGISTER_USER } from "@/utils/urlPath";

// Define the Zod schema for phone number validation
const formSchema = z.object({
  mobile: z
    .string()
    .min(13, { message: "Phone number must be exactly 10 digits." }),
  mobile4OTP: z.string().min(10, { message: "Mobile number is required." }), // Add validation for mobile4OTP if necessary
});

interface FormData {
  mobile: string;
  mobile4OTP: string;
}

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  // const [loading, ] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      mobile4OTP: "",
    },
  });

  
  

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setLoading(true); // Start loading

    try {
      const response = await SendOtp_Register_Api({ mobile: data.mobile4OTP });

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("mobileNumber", data.mobile);

        if (user) {
          if (user.isVerified && user.isRegistered) {
            if (user.kycApproved) {
              makeToast(`OTP sent to ${data.mobile4OTP}`);
              navigate(`/login`);
            } else if (!user.kycsubmitted) {
              makeToast(`OTP sent to ${data.mobile4OTP}`);
              navigate(`/kyc`);
              dispatch(setUserData(user));
            } else {
              makeToast(`OTP sent to ${data.mobile4OTP}`);
              navigate(`/kyc`);
            }
          } else {
            makeToast(`OTP sent to ${data.mobile4OTP}`);
            navigate(`/register/otp-verification?auth=${data.mobile4OTP}`);
          }
        } else {
          makeToastError("Unexpected error occurred. Please try again.");
        }
      }
    } catch (error: unknown) {
      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;

        // Handle specific status codes or error cases
        if (
          status === 400 &&
          data?.user?.isVerified &&
          data?.user?.isRegistered && 
          data?.user?.kycsubmitted
        ) {
          navigate("/login");
        } else if (data?.success === false) {
          makeToastError(data.message || "An error occurred");
        } else {
          console.error("Unhandled Axios error:", data || error.message);
        }
      } else {
        // Handle unexpected errors
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };

  //   const dummySubmit = (data:FormData) => {
  //   makeToast("Otp Verified Successfully.");
  //   navigate(`/register/otp-verification?auth=${data.mobile}`);

  // }

  useEffect(() => {
    const savedMobileNumber = localStorage.getItem("mobileNumber");
    if (savedMobileNumber) {
      form.setValue("mobile", savedMobileNumber);
      form.setValue("mobile4OTP", savedMobileNumber.split('-')[1]); // Adjust if format changes
    }
  }, [form]);
  

  useEffect(() => {
    // console.log(form.getValues(),'mobile4OTP register');
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="h-screen w-screen flex relative">
      <img
        src="/img/Background Images/Group 1109.svg"
        alt=""
        className="absolute object-cover top-0 left-0 bottom-0 right-0 w-full h-full"
      />

      <div className="bg-[#F5E9FF] sm:max-w-[350px] max-w-[90%] h-fit backdrop-blur-2xl rounded-2xl p-5 flex flex-col gap-3 m-auto">
        <ArrowLeft onClick={() => navigate("/")} className="cursor-pointer" />

        <div className="flex flex-col w-full justify-center items-center space-y-5">
          {/* image */}
          <img
            src="/img/Background Images/Group 1107.png"
            alt="login page b2b"
            className="w-32 h-32"
          />
          <p className="font-bold">Enter Mobile Number</p>

          <p className="text-gray-400 text-center">
            Enter your 10-digit mobile number to receive the verification code.
          </p>

          {/* === form starting ======== */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-start my-2">
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        country={"in"}
                        preferredCountries={["in", "us", "sa", "ae"]}
                        enableSearch={true}
                        placeholder="Valid mobile"
                        value={field.value}
                        inputStyle={{ width: "100%" }}
                        buttonStyle={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onChange={(value, data: CountryData) => {
                          const dialCode = data?.dialCode || "";
                          let phoneNumber = value;

                          if (phoneNumber.startsWith(dialCode)) {
                            phoneNumber = phoneNumber.slice(dialCode.length);
                          }

                          form.setValue("mobile", `${dialCode}-${phoneNumber}`);
                          form.setValue("mobile4OTP", phoneNumber);
                        }}
                        inputClass="w-full p-5 mt-1 rounded-xl border border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  variant="b2bStyle"
                  className="w-full "
                  size="b2b"
                >
                  {loading ? (
                    <ClipLoader color="#ffff" size={20} />
                  ) : (
                    " Get Verification Code"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
