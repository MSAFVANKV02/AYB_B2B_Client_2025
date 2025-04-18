import { ADD_CART_ITEM_URL } from "@/services/api/cart-urlPath";
import { API } from "../auth/route_url";

export const add_Cart_Item_Api = async (items: any) =>
  await API.post(ADD_CART_ITEM_URL, items, { withCredentials: true });
