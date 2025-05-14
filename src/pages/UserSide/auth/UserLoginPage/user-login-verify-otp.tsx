import { handleResendOtpAction } from "@/action/auth/auth";
import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import AyButton from "@/components/myUi/AyButton";
import MyBackBtn from "@/components/myUi/myBackBtn";
import { useLoginUser } from "@/hooks/auth/use-use-auth";
import OtpTimer from "@/hooks/otp-timer";
import { useMutationData } from "@/hooks/useMutationData";
import { getDeviceToken } from "@/lib/firebase";
import { makeToastError } from "@/utils/toaster";
import { useEffect, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setShowOtpLogin: (value: boolean) => void;
  setMessage: (value: string) => void;
};

const UserLoginVerifyOtp = ({  setShowOtpLogin }: Props) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const auth = queryParams.get("auth");
  const otpTimerRef = useRef<any>(null);

  const [success,setSuccess] =useState(false)

  const { mutate, isPending: isResendPending  } = useMutationData(
    ["resend-otp"],
    () => handleResendOtpAction(auth as string),
    "workspace-auth",
    (data) => {
      //   makeToast("OTP resent successfully!");
      if (data.status === 200 || data.status === 201) {
        otpTimerRef.current?.handleReset();
        setSuccess(true)
      }
    }
  );

//   console.log(data,'datadatadatadatadata');
  
  // Hooks from useLoginUser
  const { errors, isPending, onFormSubmit, register, watch, setValue } =
    useLoginUser();

  // Set the mobile number from query params if available
  useEffect(() => {
    if (auth) {
      setValue("mobile", auth);
    }
  }, [auth, setValue]);

  // Form submission handler
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent page refresh
      const token = await getDeviceToken();
      setValue("deviceToken", token); // Store the token in form state
      onFormSubmit(); // Call the mutation
    },
    [onFormSubmit, setValue]
  );

  // Resend OTP handler
  const resendOtp = async () => {
    if (!isResendPending) {
      if (auth) {
        mutate(auth); // Call resend mutation with mobile number
      } else {
        makeToastError("Auth parameter is missing. Please try again.");
      }
    }
  };

  // Back button click handler
  const handleBack = () => {
    setShowOtpLogin(false);
    localStorage.removeItem("otp-timer");
    localStorage.removeItem("otp-finished");
    navigate("/login");
  };

  return (
    <div className="w-full lg:w-1/2 p-8 relative bg-[#F5E9FF] flex flex-col justify-center items-center">
      <div className="absolute top-4 left-4 cursor-pointer text-textMain">
        <MyBackBtn clickEvent={handleBack} />
      </div>

      <img
        src="/img/Background Images/Group 1117.png"
        alt="logo"
        className="w-36 mb-4"
      />

      <p className="font-extrabold text-2xl mb-2">Verify Mobile Number</p>
      <p className="text-gray-500 text-center sm:px-11 px-5 mb-6">
        Enter the 6-digit verification code sent to{" "}
        <b className="text-black">Mobile Number</b>
      </p>

      <form
        onSubmit={onSubmit}
        className="w-full space-y-5 mx-auto flex flex-col items-center justify-center"
      >
        <FormGenerator
          register={register}
          setValue={setValue}
          watch={watch}
          name="otp"
          placeholder="Enter OTP"
          //   label="Otp"
          errors={errors}
          inputType="otp"
          type="number"
        />
        {/* 538960 */}
        <OtpTimer
          resendOtp={resendOtp}
          initialTime={60}
          success={success}
        //   ref={otpTimerRef}
          //   onTimerFinish={() => makeToast("You can resend OTP now.")}
        />

        <div className="w-full bg-red-100">
          <AyButton
            disabled={isPending || isResendPending}
            type="submit"
            sx={{
              width: "100%",
              height:"40px",
              borderRadius:"8px"
            }}
          >
            <Loader state={isPending}>
              {isResendPending ? "Resending..." : "Verify Otp"}
            </Loader>
          </AyButton>
        </div>
      </form>
    </div>
  );
};

export default UserLoginVerifyOtp;
