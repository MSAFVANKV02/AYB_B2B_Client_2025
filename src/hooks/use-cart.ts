import { dispatch } from "@/providers/redux/hook";
import { useMutationData } from "./useMutationData";
import { addToCartAction } from "@/action/cart/cartAction";
import { getCartRedux } from "@/providers/redux/userSide/product_Slice";

export const useAddNewCart = () => {
//   const client = useQueryClient();
  const { mutate, data, status } = useMutationData(
    ["add-cart"], // Ensure unique mutation key per product
    ( items :any) => addToCartAction(items), // Pass newStatus
    ["cart-status"],
    (data) => {
      if (data.status === 200 || data.status === 201) {
        dispatch(getCartRedux());
      }
      
    }
  );

//   console.log(data, "data");
  

  const onAddNewCart = (items: any) => {
    mutate(items);
  };

  return { onAddNewCart, data, status };
};
