import { IProductCreatedBy, IProductStatus, IToggleOptions } from "./productTypes"

export interface IFinalProductTypes {
    _id: string
    product: Product
    store: Store
    stock_sku: string
    variant_details: any
    history: History[]
    availableColors:string[];
    availableSizes:string[];
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Product {
    _id: string
    product_owner: string
    createdBy: IProductCreatedBy
    brand: Brand
    product_sku: string
    barcode: string
    keywords: string[]
    minimum_quantity: number
    product_name: string
    description: string
    categoryId: CategoryId
    tax_details: TaxDetails
    gallery_image: string[]
    thumbnails: string[]
    size_chart: string
    mrp: number
    basePrice: number
    samplePrice: number
    discount_type: string
    discount: number
    likes: any[]
    disLikes: any[]
    product_weight: number
    product_dimensions: ProductDimensions
    selectWise: string
    bundle_details: any[]
    is_free_shipping: boolean
    is_featured_product: boolean
    is_todays_deal: boolean
    is_best_selling: boolean
    is_published: boolean
    is_cod: boolean
    price_per_pieces: PricePerPiece[]
    variations: Variation[]
    status: IProductStatus
    isDeleted: boolean
    non_published_stores: IToggleOptions[]
    non_featured_stores: IToggleOptions[]
    non_todays_deal_stores: IToggleOptions[]
    requested_stores: RequestedStore[]
    slug: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Brand {
    _id: string
    name: string
    logo: string
  }
  
  export interface CategoryId {
    _id: string
    name: string
    slug: string
  }
  
  export interface TaxDetails {
    hsn_sac_number: string
    non_gst_goods: string
    calculation_types: string
    on_items_rate_details: OnItemsRateDetail[]
    igst: number
    state_tax: number
    central_tax: number
    isCess: boolean
    _id: string
  }
  
  export interface OnItemsRateDetail {
    greaterThan: number
    upto: number
    igst: number
    cgst: number
    sgst: number
    cess: number
    _id: string
  }
  
  export interface ProductDimensions {
    product_height: number
    product_length: number
    product_width: number
    _id: string
  }
  
  export interface PricePerPiece {
    minPiece: number
    maxPiece: number
    purchase_Amount: number
    _id: string
  }
  
  export interface Variation {
    image: string
    colorCode: string
    variant_name: string
    colorName: string
    sample: boolean
    details: Detail[]
  }
  
  export interface Detail {
    size: string
    discount: number
    selling_price: number
    skuId: string
    bundleQuantity: number
    stock: number
    stock_threshold: number
  }
  
  export interface RequestedStore {
    by: string
    request_count: number
    _id: string
  }
  
  export interface Store {
    bankDetails: BankDetails
    _id: string
    role: string
    createdBy: IProductCreatedBy
    subscription: boolean
    mobileVerified: boolean
    isRegistered: boolean
    adminStatus: string
    isBlocked: boolean
    name: string
    gstNumber: string
    Address: string
    storeCapacity: number
    state: string
    country: string
    pinCode: string
    googleLocation: GoogleLocation
    manager: string
    emailId: string
    phoneNumber: string
    userName: string
    password: string
    registrationType: string
    aadhaarCard: string
    panCard: string
    localBodyLicense: string
    roomRentAgreement: string
    gstCertificate: string
    totalSalessAmount: number
    totalOrders: number
    mostPurchasedProducts: any[]
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface BankDetails {
    accountName: string
    accountNumber: string
    ifscCode: string
    shiftCode: string
    upiId: string
  }
  
  export interface GoogleLocation {
    latitude: number
    longitude: number
    _id: string
  }
  
  export interface History {
    status: string
    quantity: number
    updatedBy: string
    _id: string
    timestamp: string
  }
  