import axios from "axios";
import { SEND_OTP_USER_LOGIN } from "@/utils/urlPath";
import { AxiosResponse } from "axios";
import { IUserProps } from "@/types/userTypes";

export interface OtpResponse {
  status: number;
  success?: boolean;
  data?: {
    success: boolean;
    message: string;
    user:IUserProps
  };
}



export const userLoginSendOtp = async (
  mobile: string
): Promise<AxiosResponse<OtpResponse>> => {
  const response = await axios.post<OtpResponse>(SEND_OTP_USER_LOGIN, { mobile });
//   console.log(response, 'response in api page');
  
  return response; // Return the full Axios response
};

// =================================================================

// 2.
