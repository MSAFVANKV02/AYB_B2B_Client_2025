import { useQueryData } from "@/hooks/useQueryData";
import { getAllAvailableColors, getAllProductAction, getProductWithSlugAction } from "./productAction";
import { IFinalProductTypes } from "@/types/final-product-types";
import { IFilterProducts, IGetAllFilterKey } from "@/services/user_side_api/products/route";

export interface IColors {
  colorName: string
  colorCode: string
}

export const ProductData = (
  filterData?: { key: IGetAllFilterKey; value: string }[],
  filter?: IFilterProducts

) => {
  const queryKey = ["all-products", filterData, filter];
  const {
    data: fetchedProducts,
    isFetching,
    refetch,
  } = useQueryData(queryKey, () => getAllProductAction(filterData,filter));

  const { data: products = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IFinalProductTypes[];
  };

  // console.log(products,'filter response');
  

  return {
    products,
    isFetching,
    refetch,
  };
};

// #2. this func used for fetching product details
export const ProductDataWithSlug = () => {
  const {
    data: fetchedProducts,
    isFetching,
    refetch,
  } = useQueryData(["product-details"], () => getProductWithSlugAction());

  const { data: products = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IFinalProductTypes[];
  };

  return {
    products,
    isFetching,
    refetch,
  };
};

// 3. get all colors destucture
export const AllAvailableColors = () => {
  const {
    data: fetchedProducts,
    isFetching,
    refetch,
  } = useQueryData(["all-colors"], () => getAllAvailableColors());

  const { data: products = [] } = (fetchedProducts ?? {}) as {
    status?: number;
    data?: IColors[];
  };

  return {
    products,
    isFetching,
    refetch,
  };
};
