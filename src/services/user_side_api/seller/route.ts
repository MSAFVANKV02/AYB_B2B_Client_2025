import {
  CREATE_SELLER_USER,
  RESEND_OTP_SELLER_REGISTER,
  SEND_OTP_SELLER_REGISTER,
  VERIFY_OTP_SELLER_REGISTER,
} from "@/utils/urlPath";
import { API } from "../auth/route_url";

export const register_send_otp_Seller_Api = async (mobile: string) =>
  await API.post(
    SEND_OTP_SELLER_REGISTER,
    { mobile },
    { withCredentials: true }
  );

// 2. verify Otp =================================================
export const register_Verify_otp_Seller_Api = async (data: {
  mobile: string;
  otp_Seller: string;
}) =>
  await API.post(VERIFY_OTP_SELLER_REGISTER, data, { withCredentials: true });

//   --- create SELLER ------------------------------
export const Create_Seller_Api = async (data: any) =>
  await API.post(`${CREATE_SELLER_USER}`, data, { withCredentials: true });

export const register_Resend_otp_Seller_Api = async (mobile: string) =>
  await API.post(
    RESEND_OTP_SELLER_REGISTER,
    { mobile },
    { withCredentials: true }
  );
