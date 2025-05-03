

  export interface IBannerImageTypes {
    _id: string
  banner_type: string
  banner: string
  redirectUrl: string
  context: string
  priority: number
  isEnable: boolean
  ownerType: string
  ownerId: IOwnerId
  dbModel: string
  createdAt: string
  updatedAt: string
  __v: number
  }
  
  
  export interface IOwnerId {
    _id: string
    name: string
    email: string
    mobile: string
    role: string
  }
export type IAdsBannerTypes =
  | "flash_banners"
  | "home_slider_1"
  | "home_slider_2"
  | "home_slider_3"
  | "ads"
  | "kyc_slider"
  | "login_page"
  |"";
