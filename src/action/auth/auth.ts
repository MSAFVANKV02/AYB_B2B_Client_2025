import {
  Resend_Otp_Api,
  VerifyOtp_Login_Api,
} from "@/services/user_side_api/auth/route_url";

export const loginUserAction = async (data: {
  mobile: string;
  otp: string;
  deviceToken: string;
}) => {
    // console.log(data,'data inside actions');
    
  try {
    const response = await VerifyOtp_Login_Api(data);
    if (response.status === 200 || response.status === 201) {
      return {
        data: response.data,
        message: response.data.message,
        status: response.status,
      };
    }
  } catch (error) {
    // console.log(error, "error loin verify otp");
    if(error)
    return {    
      data: [],
      message: "Oops! something wrong",
      status: 500,
    };
  }
};

export const handleResendOtpAction = async (auth: string) => {
  try {
    const response = await Resend_Otp_Api({
      mobile: auth,
    });
    if (response.status === 200) {
      return {
        data: response.data,
        status: response.status,
        message: response.data.message,
      };
    }
  } catch (error: unknown) {
    if(error)

    
    if (error) {
      return {
        data: [],
        status: 500,
        message: "cant resend otp",
      };
    }
  }
};
