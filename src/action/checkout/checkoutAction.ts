import { RazorPay, RazorPayResult } from "@/components/paymentCell/RazorPay";
import { dispatch } from "@/providers/redux/hook";
import {
  FormDataType,
  resetCheckoutState,
  setCheckoutFormDataField,
  ShippingInfoType,
  TransactionDetails,
} from "@/providers/redux/userSide/checkout-slice";
import {
  get_All_Order_Api,
  submit_Order_Api,
} from "@/services/user_side_api/checkout/route";
import { IAddressType } from "@/types/address-types";
import { ICartTypes } from "@/types/cartTypes";
import { AxiosError } from "axios";

export type OrderSummaryType = {
  shipping_address: IAddressType | null;
  // shippingMethod: string;
  shipping_info: ShippingInfoType;
  payment_method: string;
  payment_details: TransactionDetails | null;
};

export const checkoutOrderAction = async (
  formData: FormDataType,
  cart: ICartTypes | null
) => {
  console.log(formData, "formData");

  try {
    dispatch(
      setCheckoutFormDataField({ field: "checkoutStatus", value: "loading" })
    );

    const payload = new FormData();

    if (formData.address) {
      payload.append("shipping_address", JSON.stringify(formData.address));
    }

    //   if (formData.shipping_info) {
    //     payload.append("shipping_info", JSON.stringify(formData.shipping_info));
    //   }
    if (formData.shipping_info) {
      Object.keys(formData.shipping_info).forEach((key) => {
        const shippingMethod = formData.shipping_info[key].shipping_method;
        const parcelPaymentMethod =
          formData.shipping_info[key].parcel_payment_method;

        // Append both shipping method and parcel payment method dynamically
        payload.append(
          `shipping_info[${key}][shipping_method]`,
          shippingMethod
        );
        payload.append(
          `shipping_info[${key}][parcel_payment_method]`,
          parcelPaymentMethod
        );
      });
    }

    payload.append("payment_method", formData.payment_method);

    // Append parcelOptions if they exist
    //   if (formData.parcelOptions) {
    //     payload.append("parcelOptions", JSON.stringify(formData.parcelOptions));
    //   }

    // Handle payment_details
    if (formData.payment_details) {
      // Directly append the known properties of payment_details
      if (formData.payment_details.remarks) {
        payload.append(
          "payment_details[remarks]",
          formData.payment_details.remarks
        );
      }

      if (formData.payment_details.transaction_id) {
        payload.append(
          "payment_details[transaction_id]",
          formData.payment_details.transaction_id
        );
      }

      if (formData.payment_details.payment_type) {
        payload.append(
          "payment_details[payment_type]",
          formData.payment_details.payment_type
        );
      }

      // Handle file upload for referral_doc if it exists
      if (formData.payment_details.referral_doc) {
        payload.append("referral_doc", formData.payment_details.referral_doc);
      }
    }

    for (const [key, value] of payload.entries()) {
      if (value instanceof File) {
        console.log(`${key}: [File] ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // const { data, status } = await submit_Order_Api(payload as unknown as OrderSummaryType);
    const { data, status } = await submit_Order_Api(payload);

    // const { data, status } = await submit_Order_Api({
    //   shipping_address: formData.address,
    //   shipping_info: formData.shipping_info,
    //   payment_method: formData.payment_method,
    //   payment_details: formData.payment_details,
    // });

    if (status === 200 || status === 201) {
      if (
        formData.payment_method === "cod" ||
        formData.payment_method === "offline_payment"
      ) {
        // makeToast(data.message);
        // dispatch(
        //   setCheckoutFormDataField({
        //     field: "checkoutStatus",
        //     value: "checked-out",
        //   })
        // );
        return {
          data: data.data,
          status: status,
          message: data.message,
        };
      }
      if (formData.payment_method === "razor_pay") {
        const result: RazorPayResult = await RazorPay({
          totalAmount: cart?.cartTotal,
          orderIdRazorPay: "",
          shipping_address: formData.address,
          shipping_info: formData.shipping_info,
          payment_method: formData.payment_method,
          payment_details: formData.payment_details,
        });
        console.log(result);
        
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(
      setCheckoutFormDataField({ field: "checkoutStatus", value: "nill" })
    );
    const err = error as AxiosError<{ message: string }>;
    return {
      data: [],
      status: 500,
      message:
        err.response?.data?.message || err.message || "Something went wrong",
    };
  } finally {
    dispatch(resetCheckoutState({ checkoutStatus: "checked-out" }));
  }
};


// 2 get orders ===================
export const getAllOrdersAction = async () => {
  try {
    const { data, status } = await get_All_Order_Api();
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
