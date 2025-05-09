import { APPLY_COUPON_URL, GET_ALL_ORDERS_URL, REMOVE_COUPON_URL, SUBMIT_ORDER_URL } from "@/services/api/cart-urlPath";
import { API } from "../auth/route_url";
import { OrderSummaryType } from "@/action/checkout/checkoutAction";




// 1. Coupon Apply
export const apply_Coupon_Api = async (coupon:string) =>
    await API.post(APPLY_COUPON_URL,{couponCode:coupon}, { withCredentials: true });


// 1. Coupon remove

export const remove_Coupon_Api = async () =>
    await API.delete(REMOVE_COUPON_URL, { withCredentials: true });




export const get_All_Order_Api = async () =>
    await API.delete(GET_ALL_ORDERS_URL, { withCredentials: true });

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
export const verify_Razorpay_Order_Api = async (formData:OrderSummaryType) =>
    await API.post(SUBMIT_ORDER_URL,{
        payment_method:formData.payment_method,
        payment_details:formData.payment_details,
        shipping_info:formData.shipping_info,
        shipping_address:formData.shipping_address,

    }, { withCredentials: true });