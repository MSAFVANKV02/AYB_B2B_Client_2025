import { ADD_SAVE_LATER_ITEM_URL,GET_SAVE_LATER_ITEM_URL } from "@/services/api/cart-urlPath";
import { API } from "../auth/route_url";

// 1. Add Cart Item API
export const add_Save_Later_Item_Api = async (data: {
    product: string
  store: string
  stock_variant: string
  preferred_size: string
}) =>
    await API.put(ADD_SAVE_LATER_ITEM_URL, data, { withCredentials: true });

// 2. Get Cart Item API
export const get_Save_Later_Item_Api = async () =>
    await API.get(GET_SAVE_LATER_ITEM_URL, { withCredentials: true });