import { CREATE_STORE_USER, RESEND_OTP_STORE_REGISTER, SEND_OTP_STORE_REGISTER, VERIFY_OTP_STORE_REGISTER } from "@/utils/urlPath";
import { API } from "../auth/route_url";



export const register_send_otp_store_Api = async (mobile:string) =>
    await API.post(SEND_OTP_STORE_REGISTER,{mobile}, { withCredentials: true });


// 2. verify Otp =================================================
export const register_Verify_otp_store_Api = async (data:{mobile:string,otp_Store:string}) =>
    await API.post(VERIFY_OTP_STORE_REGISTER,data, { withCredentials: true });


//   --- create store ------------------------------
export const Create_Store_Api = async (data:any) =>
    await API.post(`${CREATE_STORE_USER}`,data, { withCredentials: true });


export const register_Resend_otp_store_Api = async (mobile:string) =>
    await API.post(RESEND_OTP_STORE_REGISTER,{mobile}, { withCredentials: true });


