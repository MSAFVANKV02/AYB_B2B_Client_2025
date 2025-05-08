import { APPLY_COUPON_URL } from "@/services/api/cart-urlPath";
import { API } from "../auth/route_url";




// 1. GET PLATFORM SETTINGS  API
export const apply_Coupon_Api = async (coupon:string) =>
    await API.post(APPLY_COUPON_URL,{couponCode:coupon}, { withCredentials: true });
