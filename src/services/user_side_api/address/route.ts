import { CREATE_NEW_ADDRESS_URL, DELETE_ADDRESS_URL, UPDATE_ADDRESS_URL } from "@/services/api/address-urlPath";
import { API } from "../auth/route_url";
import { AddressForm } from "@/pages/UserSide/my-account/user-address/create_Address_Form";

export const create_Address_Api = async (data: AddressForm) =>
  await API.post(CREATE_NEW_ADDRESS_URL,  data , { withCredentials: true });

// update address
export const update_Address_Api = async (data: AddressForm,addressId: string) =>
    await API.put(`${UPDATE_ADDRESS_URL}/${addressId}`,  data , { withCredentials: true });


// delete address
export const delete_Address_Api = async (addressId: string) =>
    await API.delete(`${DELETE_ADDRESS_URL}/${addressId}`, { withCredentials: true });
  