import { loginUserAction } from "@/action/auth/auth";
import { useMutationData } from "../useMutationData";
import useZodForm from "../useZodForm";
import { userLoginVerifyOtpSchema } from "@/pages/UserSide/auth/UserLoginPage/schema";
import { dispatch } from "@/providers/redux/hook";
import { fetchAyabooUserDetails } from "@/providers/redux/userSide/UserAuthSlice";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
  // const [haveError, setHaveError] = useState(false)
  const navigate = useNavigate();

  const { mutate, isPending } = useMutationData(
    ["login-user"],
    (data: { otp: string; deviceToken: string; mobile: string }) =>
      loginUserAction(data),
    "user-data",
    (data) => {
      // console.log(data, "useLoginUser");
      // console.log(data.data.user, "data.data.user");

      if (data.status === 200 || data.status === 201) {
        // Save the timer to 0 (resend OTP timer reset)
        localStorage.setItem("otp-timer", "0");

        // Store user details in LocalStorage or Context if needed
        localStorage.setItem("userData", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);

        // 🔄 Fetch user details from Redux
        dispatch(fetchAyabooUserDetails());

        // 🗺️ **Navigation Logic**
        if (data.data.user.kycApproved && data.data.user.kycsubmitted) {
          // ✅ All verifications done, navigate to Home
          navigate(`/`);
          window.location.reload();
        } else if (
          data.data.user.isVerified &&
          data.data.user.isRegistered &&
          !data.data.user.kycsubmitted
        ) {
          // 🛂 KYC not submitted, navigate to KYC page
          navigate(`/kyc`);
        } else if (data.data.user.isVerified && !data.data.user.isRegistered) {
          // 🔄 User is not registered, navigate to Register page
          navigate(`/register/user-details?auth=${data.data.user.mobile}`);
        } else {
          // 🌐 Fallback to KYC if nothing matches
          navigate(`/kyc`);
        }

        // 🧹 **Clear Form Fields**
        reset();
      }
    }
  );

  const { errors, onFormSubmit, register, reset, setValue, watch } = useZodForm(
    userLoginVerifyOtpSchema,
    mutate
  );

  return { errors, onFormSubmit, register, isPending, reset, setValue, watch };
};
