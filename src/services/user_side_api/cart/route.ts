import {
  ADD_CART_ITEM_URL,
  DELETE_CART_ITEM_URL,
  DELETE_CART_SIZE_ITEM_URL,
  GET_CART_ITEM_URL,
} from "@/services/api/cart-urlPath";
import { API } from "../auth/route_url";

// 1. Add Cart Item API
export const add_Cart_Item_Api = async (items: any) =>
  await API.post(ADD_CART_ITEM_URL, items, { withCredentials: true });

// 2. Get Cart Item API
export const get_Cart_Item_Api = async () =>
  await API.get(GET_CART_ITEM_URL, { withCredentials: true });

// 3. Delete Cart Item with variant API
export const delete_Cart_Variant_Item_Api = async (productId: string) =>
  await API.delete(`${DELETE_CART_ITEM_URL}/${productId}`, {
    withCredentials: true,
  });

// 4. Delete Cart Item API
export const delete_Cart_All_Item_Api = async () =>
  await API.delete(`${DELETE_CART_ITEM_URL}`, { withCredentials: true });

// 5. Delete Cart size Item API\
export const delete_Cart_Size_Item_Api = async (data: {
  product: string;
  store: string;
  stock_variant: string;
  size: string;
  purchaseType: string;
}) =>
  await API.put(
    `${DELETE_CART_SIZE_ITEM_URL}`,
     data ,
    { withCredentials: true }
  );
