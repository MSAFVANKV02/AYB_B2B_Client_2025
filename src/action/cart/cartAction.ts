import { add_Cart_Item_Api } from "@/services/user_side_api/cart/route";
import {
  add_Save_Later_Item_Api,
  get_Save_Later_Item_Api,
} from "@/services/user_side_api/saveLater/route";

export const addToCartAction = async (items: any) => {
  try {
    const { data, status } = await add_Cart_Item_Api(items);

    if (status === 200 || status === 201) {
      return {
        status: status,
        message: data.message,
        data: data.data,
      };
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      data: [],
      message: "Failed to add item to cart",
      status: 404,
    };
  }
};

export const addSaveLaterAction = async (data: {
  product: string;
  store: string;
  stock_variant: string;
  preferred_size: string;
}) => {
  try {
    const response = await add_Save_Later_Item_Api({
      product: data.product,
      store: data.store,
      stock_variant: data.stock_variant,
      preferred_size: data.preferred_size,
    });

    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        message: response.data.message,
        data: response.data.data,
      };
    }
  } catch (error) {
    console.error("Error adding to saveLater:", error);
    return {
      data: [],
      message: "Failed to add item to saveLater",
      status: 404,
    };
  }
};

export const getSaveLaterAction = async () => {
  try {
    const response = await get_Save_Later_Item_Api();

    // console.log(response.data.data,'response save laetr');

    if (response.status === 200 || response.status === 201) {
      return {
        data: response.data.data,
        message: response.data.message,
        status: response.status,
      };
    }
  } catch (error) {
    if (error) {
      console.error("Error adding to saveLater:",error);
      return {
        data: [],
        message: "Failed to add item to saveLater",
        status: 404,
      };
    }
  }
};
