import { add_Cart_Item_Api } from "@/services/user_side_api/cart/route";

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
