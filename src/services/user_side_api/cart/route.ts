import { ADD_CART_ITEM_URL, DELETE_CART_ITEM_URL, GET_CART_ITEM_URL } from "@/services/api/cart-urlPath";
import { API } from "../auth/route_url";

// 1. Add Cart Item API
export const add_Cart_Item_Api = async (items: any) =>
  await API.post(ADD_CART_ITEM_URL, items, { withCredentials: true });

// 2. Get Cart Item API
export const get_Cart_Item_Api = async () =>
  await API.get(GET_CART_ITEM_URL, { withCredentials: true });

// 3. Delete Cart Item API
export const delete_Cart_Item_Api = async (productId: string) =>
  await API.delete(`${DELETE_CART_ITEM_URL}/${productId}`, { withCredentials: true });