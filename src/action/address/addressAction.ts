import { AddressForm } from "@/pages/UserSide/my-account/user-address/create_Address_Form";
import { create_Address_Api } from "@/services/user_side_api/address/route";
import { makeToast } from "@/utils/toaster";

export const createNewAddressAction = async (data: AddressForm) => {
  try {
    const response = await create_Address_Api(data);
    if (response.status === 200 || response.status === 201) {
      makeToast(response.data.message || "success");
      return {
        data: response.data.user,
        status: response.status,
        message: response.data.message,
      };
    }
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      // makeToast(error.response.data.message || "error");
      return {
        data: [],
        status: error.response.status,
        message: error.response.data.message,
      };
    } else {
      // makeToast("Network Error");
      return {
        data: null,
        status: 500,
        message: "Network Error",
      };
    }
  }
};
