import { dispatch } from "@/redux/hook";
import { setProductData } from "@/redux/userSide/product_Slice";
import {
  get_All_Available_Colors_Api,
  get_All_Products_Api,
  IFilterProducts,
  IGetAllFilterKey,
} from "@/services/user_side_api/products/route";

export const getAllProductAction = async (
  filterData?: { key: IGetAllFilterKey; value: string }[],
  filter?: IFilterProducts
) => {
  try {
    const response = await get_All_Products_Api(filterData, filter);
    // console.log(response)
    if (response.status === 200 || response.status === 201) {
      dispatch(
        setProductData({
          products: response.data.data,
          availableSizes: response.data.availableSizes,
          availableColors: response.data.availableColors,
          availableBrands: response.data.availableBrands,
          pagination: response.data.pagination,
        })
      );

      return {
        data: response.data.data,
        message: response.data.message,
        status: response.status,
      };
    } else{
      return {
        data: [],
        message: response.data.message,
        status: response.status,
      };
    }
  } catch (error: any) {
    console.error(error);
    if (error) {
      return {
        data: [],
        message: error.response.message,
        status: error.response?.status || 500,
      };
    }
  }
};

export const getAllAvailableColors = async () => {
  try {
    const response = await get_All_Available_Colors_Api();
    // console.log(response)
    if (response.status === 200 || response.status === 201) {
      return {
        data: response.data.data,
        message: response.data.message,
        status: response.status,
      };
    }
  } catch (error: any) {
    // console.error(error);
    if (error) {
      return {
        data: [],
        message: error.response.message,
        status: error.response?.status || 500,
      };
    }
  }
};

export const getProductWithSlugAction = async () => {
  try {
    const response = await get_All_Products_Api();
    // console.log(response)
    if (response.status === 200 || response.status === 201) {
      return {
        data: response.data.data,
        message: response.data.message,
        status: response.status,
      };
    }
  } catch (error: any) {
    // console.error(error);
    if (error) {
      return {
        data: [],
        message: error.response.message,
        status: error.response?.status || 500,
      };
    }
  }
};
