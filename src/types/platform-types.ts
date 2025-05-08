export interface IPlatformSetType {
    payment_methods: PaymentMethods
    delivery_options: DeliveryOptions
    _id: string
    coupon_system_enabled: boolean
    chat_enabled: boolean
    maintenance_mode: boolean
    seller_registration: boolean
    store_registration: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface PaymentMethods {
    razorpay: boolean
    cod: boolean
    offline: boolean
  }
  
  export interface DeliveryOptions {
    pickup_from_po: boolean
    door_delivery: boolean
    store_pickup: boolean
  }

  
//   =====
export interface IPaymentTypes {
    bank_account: IPaymentBankAccountTypes
    _id: string
    contact_number: number
    wa_number: number
    custom_upi: string
    upi_banner: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface IPaymentBankAccountTypes {
    account_number: string
    account_name: string
    ifsc_code: string
    swift_code: string
    bank_name: string
  }
  