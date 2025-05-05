import { useQueryClient } from "@tanstack/react-query";
import { useMutationData } from "../useMutationData";
import { addSaveLaterAction } from "@/action/cart/cartAction";
import { dispatch } from "@/redux/hook";
import { getCartRedux } from "@/redux/userSide/product_Slice";

export const useUpdateSaveLater = () => {
  const client = useQueryClient();
  const { mutate } = useMutationData(
    ["save-later"], // Ensure unique mutation key per product
    (data: {
      product: string;
      store: string;
      stock_variant: string;
      preferred_size: string;
    }) => addSaveLaterAction(data), // Pass newStatus
    "get-save-later",
    (data) => {
      // console.log(data);
      
      if (data.status === 200 || data.status === 201) {
        client.invalidateQueries({ queryKey: ["save-later"] });
        dispatch(getCartRedux());
      }
      //
    }
  );

  const onAddOrRemoveSaveLater = (data: {
    product: string;
    store: string;
    stock_variant: string;
    preferred_size: string;
  }) => {
    mutate(data);
  };

  return { onAddOrRemoveSaveLater };
};
