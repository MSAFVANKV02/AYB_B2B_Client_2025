import { useMutationData } from "../useMutationData";
import { checkoutOrderAction } from "@/action/checkout/checkoutAction";
import { dispatch } from "@/providers/redux/hook";
import { getCartRedux } from "@/providers/redux/userSide/product_Slice";
import { FormDataType } from "@/providers/redux/userSide/checkout-slice";
import { ICartTypes } from "@/types/cartTypes";

type SubmitPayload = {
  formData: FormDataType;
  cart?: ICartTypes | null;
};

export const useSubmitOrder = () => {
  const { mutate, data, status } = useMutationData(
    ["submit-order"],
    ({ formData }: SubmitPayload) => checkoutOrderAction(formData),
    "submit-order-toast",
    (res) => {
      console.log(res);
      
      if (res?.status === 200 || res?.status === 201) {
        dispatch(getCartRedux());
      }
    }
  );

  const onSubmitOrder = (formData: FormDataType, cart: ICartTypes | null) => {
    mutate({ formData, cart });
  };

  return { onSubmitOrder, data, status };
};
