import {
  APPLY_COUPON_URL,
  REMOVE_COUPON_URL,
  SUBMIT_ORDER_URL,
  SUBMIT_RAZORPAY_ORDER_URL,
} from "@/services/api/cart-urlPath";
import { API } from "../auth/route_url";

import { ShippingInfoType } from "@/providers/redux/userSide/checkout-slice";
import { IAddressType } from "@/types/address-types";

// 1. Coupon Apply
export const apply_Coupon_Api = async (coupon: string) =>
  await API.post(
    APPLY_COUPON_URL,
    { couponCode: coupon },
    { withCredentials: true }
  );

// 1. Coupon remove

export const remove_Coupon_Api = async () =>
  await API.delete(REMOVE_COUPON_URL, { withCredentials: true });

// ==========






// ======= checkout section ========= ///
// 1. Coupon Apply
// export const submit_Order_Api = async (formData:OrderSummaryType) =>
//     await API.post(SUBMIT_ORDER_URL,{
//         payment_method:formData.payment_method,
//         payment_details:formData.payment_details,
//         shipping_info:formData.shipping_info,
//         shipping_address:formData.shipping_address,

//     }, { withCredentials: true });

export const submit_Order_Api = async (formData: FormData) => {
  return await API.post(SUBMIT_ORDER_URL, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 1. Coupon Apply
export interface IRazorpayType {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  shipping_address: IAddressType | null;
  shipping_info: ShippingInfoType;
}
export const verify_Razorpay_Order_Api = async (formData: IRazorpayType) =>
    API.post(
      SUBMIT_RAZORPAY_ORDER_URL,
      {
        razorpay_order_id: formData.razorpay_order_id,
        razorpay_payment_id: formData.razorpay_payment_id,
        razorpay_signature: formData.razorpay_signature,
        shipping_address: formData.shipping_address,
        shipping_info: formData.shipping_info,
      },
      { withCredentials: true }
    );