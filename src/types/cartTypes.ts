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
    items: Item[]
    totalItems: number
    cartValue: number
    discountValue: number
    couponDiscountAmount: number
    shippingCharge: number
    subTotalExclTax: number
    gst: ICartGst
    cess: number
    cartTotal: number
  }

  export interface Item {
    store: Store
    products: Product[]
  }

  export interface ICartGst {
    igst: number
    sgst: number
    cgst: number
  }
  