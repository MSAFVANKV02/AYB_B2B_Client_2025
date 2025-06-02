import {
  cancelOrderApi,
  get_All_Order_Api,
  get_All_Return_Orders_Api,
} from "@/services/user_side_api/orders/route";
import { IFilterOrders } from "@/types/orderTypes";
import { AxiosError } from "axios";

export const getAllOrdersAction = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  try {
    const { data, status } = await get_All_Order_Api(filter);
    if (status === 200 || status === 201) {
      return {
        data: data.data,
        message: data.message,
        status: status,
      };
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      data: [],
      status: 500,
      message:
        err.response?.data?.message || err.message || "Something went wrong",
    };
  }
};

export const getAllReturnedOrdersAction = async (
  filter?: { key: IFilterOrders; value: string }[]
) => {
  try {
    const { data, status } = await get_All_Return_Orders_Api(filter);
    //   console.log(data,'data');

    if (status === 200 || status === 201) {
      return {
        data: data.data,
        message: data.message,
        status: status,
      };
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return {
      data: [],
      status: 500,
      message:
        err.response?.data?.message || err.message || "Something went wrong",
    };
  }
};

//   cancel orders
export const cancelOrdersAction = async (store_order_id: string) => {
  try {
    const { data, status } = await cancelOrderApi(store_order_id);
      console.log(data,'data');

    if (status === 200 || status === 201) {
      return {
        data: data.data,
        message: data.message,
        status: status,
      };
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.log(error,'err');
    
    return {
      data: [],
      status: 500,
      message:
        err.response?.data?.message || err.message || "Something went wrong",
    };
  }
};
