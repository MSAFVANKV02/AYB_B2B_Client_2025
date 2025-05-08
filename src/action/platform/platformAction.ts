import { get_Payment_Details_Api, get_Platform_Settings_Api } from "@/services/user_side_api/platform/route";

export const getPlatformSettingsAction = async () => {
  try {
    const { data, status } = await get_Platform_Settings_Api();

    if (status === 200 || status === 201) {
      return {
        data: data.data,
        message: data.message,
        status: status,
      };
    }
  } catch (error) {
    if (error) {
      return {
        data: [],
        message: "failed fetching data",
        status: 500,
      };
    }
  }
};


// 2.

export const getPaymentDetailsAction = async () => {
    try {
      const { data, status } = await get_Payment_Details_Api();
  
      if (status === 200 || status === 201) {
        return {
          data: data.data,
          message: data.message,
          status: status,
        };
      }
    } catch (error) {
      if (error) {
        return {
          data: [],
          message: "failed fetching data",
          status: 500,
        };
      }
    }
  };
  