import { IFilterOrders } from "@/types/orderTypes";
import { API } from "../auth/route_url";
import {
  CANCEL_ORDERS_URL,
  GET_ALL_ORDERS_URL,
  GET_ALL_RETURN_ORDERS_URL,
} from "@/services/api/order-urlPath";

export const get_All_Order_Api = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  const params: Record<string, string> = {};

  if (filter) {
    filter.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return await API.get(GET_ALL_ORDERS_URL, { params, withCredentials: true });
};

export const get_All_Return_Orders_Api = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  const params: Record<string, string> = {};

  if (filter) {
    filter.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return await API.get(GET_ALL_RETURN_ORDERS_URL, {
    params,
    withCredentials: true,
  });
};

export const cancelOrderApi = (store_order_id: string) =>
  API.patch(
    `${CANCEL_ORDERS_URL}/${store_order_id}/cancel`,
    {},
    { withCredentials: true }
  );
