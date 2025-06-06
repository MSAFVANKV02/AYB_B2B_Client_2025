import { IAddressType } from "@/types/address-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FormDataValue =
  | string
  | IAddressType
  | ParcelOptionsType
  | TransactionDetails
  | null;

export type ParcelOptionsType = {
  id: number;
  logo: string;
  serviceName: string;
  pricePerKg: number;
  orderDetails: {
    weight: number;
    parcelPrice: number;
    boxQty: number;
  };
};

export type TransactionDetails = {
  remarks: string;
  referral_doc: File | null;
  transaction_id: string;
  payment_type: "upi" | "bank";
  is_policy_verified?: boolean;
};

export type ShippingInfoType = {
  [storeId: string]: {
    shipping_method: string;
    parcel_payment_method: string;
  };
};

export type FormDataType = {
  address: IAddressType | null;
  // shippingMethod: string;
  shipping_info: ShippingInfoType;
  parcelOptions: ParcelOptionsType | null;
  parcelMethod: string;
  payment_method: "offline_payment"|"razorpay"|"cod"|"";
  transactionType: "upi" | "bank";
  payment_details: TransactionDetails | null;
  checkoutStatus: "completed" | "nill" | "loading"|"checked-out";
};

interface CheckoutState {
  formData: FormDataType;
  loading: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  formData: {
    address: null,
    shipping_info: {},
    parcelOptions: null,
    parcelMethod: "",
    payment_method: "",
    transactionType: "upi",
    payment_details: null,
    checkoutStatus: "nill",
  },
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // setCheckoutFormDataField: (
    //   state,
    //   action: PayloadAction<{ field: keyof FormDataType; value: any }>
    // ) => {
    //   if (!state.formData) {
    //     state.formData = {
    //       // provide a fallback object
    //       address: null,
    //       shipping_info: {},
    //       parcelOptions: null,
    //       parcelMethod: "",
    //       payment_method: "",
    //       transactionType: "upi",
    //       payment_details: null,
    //       checkoutStatus: "nill",
    //     };
    //   }
    //   state.formData[action.payload.field] = action.payload.value;
    // },
    setCheckoutFormDataField: <K extends keyof FormDataType>(
      state: CheckoutState,
      action: PayloadAction<{ field: K; value: FormDataType[K] }>
    ) => {
      state.formData[action.payload.field] = action.payload.value;
    },    
    setShippingInfo: (
      state,
      action: PayloadAction<{
        storeId: string;
        shipping_method: string;
        parcel_payment_method?: string; // optional fallback to 'to_pay'
      }>
    ) => {
      const {
        storeId,
        shipping_method,
        parcel_payment_method = "to_pay",
      } = action.payload;
      state.formData.shipping_info[storeId] = {
        shipping_method,
        parcel_payment_method,
      };
    },
    setPaymentDetailsField: <K extends keyof TransactionDetails>(
      state: CheckoutState,
      action: PayloadAction<{ field: K; value: TransactionDetails[K] }>
    ) => {
      if (!state.formData.payment_details) {
        state.formData.payment_details = {
          remarks: "",
          referral_doc: null,
          transaction_id: "",
          payment_type: "upi",
        };
      }

      state.formData.payment_details[action.payload.field] =
        action.payload.value;
    },
    resetPaymentDetails: (state) => {
      state.formData.payment_details = {
        remarks: "",
        referral_doc: null,
        transaction_id: "",
        payment_type: "upi",
        // is_policy_verified: false,
      };
    },

    // resetCheckoutState: (state) => {
    //   const existingAddress = state.formData.address; // keep the current address
    
    //   state.formData = {
    //     address: existingAddress, // restore the saved address
    //     shipping_info: {},
    //     parcelOptions: null,
    //     parcelMethod: "",
    //     payment_method: "",
    //     transactionType: "upi",
    //     payment_details: null,
    //     checkoutStatus: "nill",
    //   };
    // },
    resetCheckoutState: (
      state,
      action: PayloadAction<Partial<FormDataType> | undefined>
    ) => {
      const overrides = action.payload || {};
      const existingAddress = state.formData.address;
    
      state.formData = {
        address: existingAddress,
        shipping_info: {},
        parcelOptions: null,
        parcelMethod: "",
        payment_method: "",
        transactionType: "upi",
        payment_details: null,
        checkoutStatus: "nill",
        ...overrides, // apply any overrides
      };
    },
    
    
  },
});

export const {
  setCheckoutFormDataField,
  resetCheckoutState,
  setShippingInfo,
  setPaymentDetailsField,
  resetPaymentDetails,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
