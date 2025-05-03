
import { get_All_Banner_Image_Api } from "@/services/user_side_api/banners/route";
import { IAdsBannerTypes } from "@/types/ads.bannerTypes";

export const getAllAddedCoverImages = async (
  banner_type: IAdsBannerTypes
  // filters?: { key: string; value: string }[]
) => {
  try {
    // const route = banner_type === "todays-deal" ? get_TodaysDeals_Products_Api(filters): get_All_Banner_Image_Api(banner_type);

    const { data, status } = await get_All_Banner_Image_Api(banner_type);
    console.log(data);

    if (status === 200) {
      // if(banner_type === ""){
      //   return {
      //     data: data,
      //     message: data.message,
      //     status: status,
      //   };
      // }
      return {
        data: data.data,
        message: data.message,
        status: status,
      };
    }
    return {
      data: [],
      message: "Failed to fetch images",
      status,
    };
  } catch (error: any) {
    // console.error("error in get all cover images");
    return {
      data: [],
      message: error.response.data.message || "error getting all cover images",
      status: 404,
    };
  }
};
