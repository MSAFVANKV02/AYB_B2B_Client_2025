import { GET_PAYMENT_DETAILS_URL, GET_PLATFORM_SETTINGS } from "@/services/api/platform-urlPath";
import { API } from "../auth/route_url";


// 1. GET PLATFORM SETTINGS  API
export const get_Platform_Settings_Api = async () =>
    await API.get(GET_PLATFORM_SETTINGS, { withCredentials: true });


// 1. get pay details API
export const get_Payment_Details_Api = async () =>
    await API.get(GET_PAYMENT_DETAILS_URL, { withCredentials: true });