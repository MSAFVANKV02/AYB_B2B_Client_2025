import { Product, Store } from "./final-product-types";

export type ICart = {
    _id?: string;
    size: string;
    color: string;
    price: string;
    image: string;
    quantity: number;
  }

  export interface ICartTypes {
    items: CartItemsType[]
    totalItems: number
    cartValue: number
    discountValue: number
    couponDiscountAmount: number
    shippingCharge: number
    subTotalExclTax: number
    // gst: ICartGst
    gst: number
    cess: number
    cartTotal: number
    coupon:string
    appliedCoupon:string

  }

  export interface CartItemsType {
    store: Store
    products: Product[]
  }

  export interface ICartGst {
    igst: number
    sgst: number
    cgst: number
  }
  