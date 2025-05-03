import { IAdsBannerTypes } from "@/types/ads.bannerTypes";

import { GET_ALL_BANNER_IMAGES_URL } from "../../api/banners-urlPath";
import { API } from "../auth/route_url";

export interface RootBannerImageApi {
  bannerImages: IBannerImageApi[];
}

export interface IBannerImageApi {
  banner_type: IAdsBannerTypes;
  banner: string;
  redirectUrl: string;
  context: string;
  priority: number;
  isEnable: boolean;
}

// 1. create cover images

export const get_All_Banner_Image_Api = async (banner_type: IAdsBannerTypes) =>
  await API.get(`${GET_ALL_BANNER_IMAGES_URL}`, {
    withCredentials: true,
    params: {
      banner_type,
    },
  });
