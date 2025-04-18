import { useMutationData } from "./useMutationData";
import { addToCartAction } from "@/action/cart/cartAction";

export const useAddNewCart = () => {
//   const client = useQueryClient();
  const { mutate, data, status } = useMutationData(
    ["add-cart"], // Ensure unique mutation key per product
    ( items :any) => addToCartAction(items), // Pass newStatus
    "cart-status",
    () => {
    //   if (data.status === 200 || data.status === 201) {
    //     client.invalidateQueries({ queryKey: ["all-notifications"] });
    //   }
      //
    }
  );

//   console.log(data, "data");
  

  const onAddNewCart = (items: any) => {
    mutate(items);
  };

  return { onAddNewCart, data, status };
};
