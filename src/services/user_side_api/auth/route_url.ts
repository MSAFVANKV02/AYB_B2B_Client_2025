import axios from "axios";
import {
  CURRENT_USER_URL,
  RESEND_OTP_USER,
  SEND_OTP_REGISTER_USER,
  SEND_OTP_USER_LOGIN,
  SUBMIT_USER_DETAILS_REGISTRATION,
  UPLOAD_USER_KYC,
  USER_LOGIN_OTP_VERIFICATION,
  USER_LOGOUT,
  VERIFY_OTP_REGISTER_USER,
} from "../../../utils/urlPath";
// import Cookies from "js-cookie";
// ========
// "dev": "vite --port 5173",
// ==========
// const token = Cookies.get("st_b2b_tkn") || Cookies.get("us_b2b_tkn");
// console.log(token,'token');
// const token = Cookies.get("us_b2b_tkn");
// const token2 = Cookies.get("us_tkn_kyc");

export const API = axios.create({
  baseURL: `${
    import.meta.env.MODE == "development"
      ? "http://localhost:4000"
      : "https://gateway.ayaboo.com"
  }`,
  // headers: {
  //   Authorization: `Bearer ${token || token2}`,
  // },
});

type IFormData = {
  name: string;
  shopName?: string;
  pinCode?: string;
  policyVerified: boolean;
  isWhatsappApproved: boolean;
};

// 1.  Registration =================================================
export const SendOtp_Register_Api = async (data: { mobile: string }) =>
  await API.post(SEND_OTP_REGISTER_USER, data, { withCredentials: true });
// -------------------------Send Otp For Registration---------------------------------------

export const Verify_Register_Api = async (data: {
  mobile: string | null;
  otp: string;
}) => await API.post(VERIFY_OTP_REGISTER_USER, data, { withCredentials: true });
// ------------------------Verify Otp For Registration----------------------------------------

export const Resend_Otp_Api = async (data: { mobile: string | null }) =>
  await API.post(RESEND_OTP_USER, data, { withCredentials: true });
// --------------------------Resend Otp--------------------------------------

export const User_Details_Registration_Api = async (
  data: IFormData & { mobile: string | null }
) =>
  await API.post(SUBMIT_USER_DETAILS_REGISTRATION, data, {
    withCredentials: true,
  });
// ------------------------------User Details Collecting Registration----------------------------------

// 2, Kyc Submission After Registration =================================
export const Kyc_Submit_Api = async (data: FormData) =>
  await API.post(UPLOAD_USER_KYC, data, { withCredentials: true });
// -----------------------Submit Kyc Details User-----------------------------------------

// ==== 3. User Login Details --------------------------------
export const SendOtp_Login_Api = async (data: { mobile: string }) =>
  await API.post(SEND_OTP_USER_LOGIN, data, { withCredentials: true });
// -------------------------Send Otp For Login---------------------------------------

export const VerifyOtp_Login_Api = async (data: {
  mobile: string;
  otp: string;
  deviceToken: string;
}) =>
  await API.post(USER_LOGIN_OTP_VERIFICATION, data, { withCredentials: true });
// ------------------------Verify Otp For Login----------------------------------------

export const Logout_User_Api = async () =>
  await API.post(USER_LOGOUT, {}, { withCredentials: true });
// ------------------------Logout User----------------------------------------

// ==== 4. User Current_User Details --------------------------------
export const Current_User_Api = async () =>
  await API.get(CURRENT_USER_URL, { withCredentials: true });
