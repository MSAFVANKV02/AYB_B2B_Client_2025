import {
  CREATE__RECENT_VIEW_URL,
  CREATE_WISHLIST_URL,
  GET_ALL_AVAILABLE_COLORS_URL,
  GET_ALL_PRODUCT_URL,
  GET_ALL_RECENT_VIEW_URL,
  GET_ALL_WISHLIST_URL,
  GET_PRODUCT_BY_SLUG_URL,
} from "@/services/api/product-urlPath";
import { API } from "../auth/route_url";

// export const get_All_Products_Api = async () =>
//   API.post(GET_ALL_PRODUCT_URL,{}, { withCredentials: true });

export type IGetAllFilterKey = "category"|"product"|"brand"|"color"|"sort"|"page"|"limit"|""
export interface IFilterProducts {
  size: any
  colors: any
  priceRange: number[]
  brands: any[]
  minimumQuantity: number
}

export const get_All_Products_Api = (
  filterData?: { key: IGetAllFilterKey; value: string }[],
  filter?: IFilterProducts
) => {
  const params: Record<string, string> = {};

  if (filterData) {
    filterData.forEach((filter) => {
      params[filter.key] = filter.value; // ✅ Convert array to query parameters
    });
  }

  return API.post(GET_ALL_PRODUCT_URL,{filter}, {
    withCredentials: true,
    params, // ✅ Send dynamic query params
  });
};

// 2 get product details with slug
export const get_Product_Details_With_Slug_Api = async (slug: string) =>
  API.get(`${GET_PRODUCT_BY_SLUG_URL}/${slug}`, { withCredentials: true });


// 3 . get all available colors

export const get_All_Available_Colors_Api = async () =>
  API.get(`${GET_ALL_AVAILABLE_COLORS_URL}`, { withCredentials: true });



// # == WISHLIST ROUTES ======
export const get_WishList_Api = async () =>
  API.get(`${GET_ALL_WISHLIST_URL}`, { withCredentials: true });

export const add_WishList_Api = async (productId:string) =>
  API.post(`${CREATE_WISHLIST_URL}`,{productId}, { withCredentials: true });


// # == Recent View ROUTES ======
export const get_Recent_View_Api = async () =>
  API.get(`${GET_ALL_RECENT_VIEW_URL}`, { withCredentials: true });

export const add_Recent_View_Api = async (productId:string) =>
  API.post(`${CREATE__RECENT_VIEW_URL}`,{productId}, { withCredentials: true });