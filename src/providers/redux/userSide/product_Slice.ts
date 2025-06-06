import {
  delete_Cart_All_Item_Api,
  delete_Cart_Size_Item_Api,
  delete_Cart_Variant_Item_Api,
  get_Cart_Item_Api,
} from "@/services/user_side_api/cart/route";
import {
  add_WishList_Api,
  get_WishList_Api,
  get_Recent_View_Api,
  add_Recent_View_Api,
} from "@/services/user_side_api/products/route";
import { ICartTypes } from "@/types/cartTypes";
import { IFinalProductTypes, Product } from "@/types/final-product-types";
import { makeToast } from "@/utils/toaster";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
// interface ProductState {
//   products: IFinalProductTypes[];
//   singleProduct: Product[],  // single product data
//   loading: boolean;
//   error: string | null;
// }
interface ProductState {
  products: IFinalProductTypes[];
  wishlist: IFinalProductTypes[];
  cart: ICartTypes | null;
  saveLaterCart: ICartTypes | null;
  recentView: IFinalProductTypes[];
  singleProduct: Product[];
  availableSizes: string[];
  availableColors: {
    colorName: string;
    colorCode: string;
  }[];
  availableBrands: string[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  } | null;
  loading: boolean;
  error: string | null;
}

export const getWishlistRedux = createAsyncThunk(
  "wishlist/getWishlistRedux",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_WishList_Api();
      // console.log(response.data.wishes);

      return response.data.wishes;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AddWishlistRedux = createAsyncThunk(
  "wishlist/addWishlistRedux",
  async (productId: string, { rejectWithValue }) => {
    // console.log(productId,'productId');

    try {
      const response = await add_WishList_Api(productId);
      // console.log(response);
      if (response.status === 200) {
        return productId;
      }
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

// recent view starts =======

export const getRecentViewRedux = createAsyncThunk(
  "recentView/getRecentViewRedux",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_Recent_View_Api();
      // console.log(response, "getRecentViewRedux");

      return response.data.recentlyViewed;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AddRecentViewRedux = createAsyncThunk(
  "recentView/addRecentViewRedux",
  async (productId: string, { rejectWithValue }) => {
    // console.log(productId,'productId');

    try {
      const response = await add_Recent_View_Api(productId);
      // console.log(response,'addRecentViewRedux');
      if (response.status === 200) {
        return response.data.recentlyViewed;
      }
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

// recent view Ends =======
// cart starts =======

export const getCartRedux = createAsyncThunk(
  "cart/getCartRedux",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_Cart_Item_Api();
      // console.log(JSON.stringify(response.data.data));
      // console.log(response.data.data);

      if (response.status === 200 || response.status === 201) {
        return response.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCartRedux = createAsyncThunk(
  "cart/deleteCartRedux",
  async (
    {
      productId,
      type,
      store,
      stock_variant,
      size,
      purchaseType,
      state,
    }: {
      productId: string;
      type: "all" | "variant" | "size";
      store?: string;
      stock_variant?: string;
      size?: string;
      purchaseType?: string;
      state: "cart" | "saveLater";
    },
    { rejectWithValue }
  ) => {
    try {
      // if(type === "size"){
      //   makeToast("Size deleted successfully");
      //   return {
      //     productId: productId,
      //     type: type,
      //   }
      const route =
        type === "variant"
          ? delete_Cart_Variant_Item_Api(productId)
          : type === "size"
            ? delete_Cart_Size_Item_Api({
                product: productId,
                store: store ?? "",
                stock_variant: stock_variant ?? "",
                size: size ?? "",
                purchaseType: purchaseType ?? "",
              })
            : delete_Cart_All_Item_Api();

      const response = await route;
      // console.log(JSON.stringify(response.data.data));
      // console.log(response.data.data);

      if (response.status === 200 || response.status === 201) {
       
        makeToast(response.data.message);
        return {
          productId: productId,
          type: type,
          state: state,
        };
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState: ProductState = {
  products: [],
  singleProduct: [],
  cart: null,
  saveLaterCart: null,
  recentView: [],
  availableSizes: [],
  availableColors: [],
  availableBrands: [],
  wishlist: [],
  pagination: null,
  loading: false,
  error: null,
};

// Category slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IFinalProductTypes>) => {
      state.products.push(action.payload);
    },
    setProducts: (state, action: PayloadAction<IFinalProductTypes[]>) => {
      state.products = action.payload;
    },
    setSaveLaterCartRedux: (
      state,
      action: PayloadAction<ICartTypes | null>
    ) => {
      state.saveLaterCart = action.payload;
    },
    setProductData: (
      state,
      action: PayloadAction<{
        products: IFinalProductTypes[];
        availableSizes: string[];
        availableColors: {
          colorName: string;
          colorCode: string;
        }[];
        availableBrands: string[];
        pagination: {
          total: number;
          totalPages: number;
          currentPage: number;
          limit: number;
        };
      }>
    ) => {
      state.products = action.payload.products;
      state.availableSizes = action.payload.availableSizes;
      state.availableColors = action.payload.availableColors;
      state.availableBrands = action.payload.availableBrands;
      state.pagination = action.payload.pagination;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (category) => category._id !== action.payload
      );
    },
    setSingleProducts: (state, action: PayloadAction<Product[]>) => {
      state.singleProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistRedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistRedux.fulfilled, (state, action) => {
        // console.log(action.payload,'action.payload');

        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(getWishlistRedux.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // ger Carts items ==== starts
      .addCase(getCartRedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartRedux.fulfilled, (state, action) => {
        // console.log(action.payload,'action.payload');

        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(getCartRedux.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // delete cart items =======
      .addCase(deleteCartRedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(deleteCartRedux.fulfilled, (state, action) => {
      //   // console.log(action.payload,'action.payload');

      //   const productId = action.payload;
      //   if (state.cart) {
      //     state.cart.items = state.cart.items
      //       .map((item) => ({
      //         ...item,
      //         products: item.products.filter((product) => {
      //           // console.log(product._id,'product._id, productId');

      //           return product._id !== productId;
      //         }),
      //       }))
      //       .filter((item) => item.products.length > 0); // Remove cart items with no products
      //   }
      //   state.loading = false;
      // })
      .addCase(deleteCartRedux.fulfilled, (state, action) => {
        const { productId, type, state: actionState } = action.meta.arg;
        // console.log(action.meta.arg, "action.meta.arg");

        if (!state.cart) return;

        switch (type) {
          case "all":
            if (actionState === "cart") {
              state.cart = null;
            } else {
              state.saveLaterCart = null;
            }
            break;
          
          case "variant": {
            const updatedItems = (
              actionState === "cart"
                ? state.cart?.items
                : state.saveLaterCart?.items
            )
              ?.map((item) => ({
                ...item,
                products: item.products.filter(
                  (product) => product._id !== productId
                ),
              }))
              .filter((item) => item.products.length > 0);

            if (actionState === "cart" && updatedItems) {
              state.cart!.items = updatedItems;
            } else if (actionState === "saveLater" && updatedItems) {
              state.saveLaterCart!.items = updatedItems;
            }
            break;
          }

          case "size": {
            const sizeToDelete = action.meta.arg?.size;
            const stockVariantToDelete = action.meta.arg?.stock_variant;
            const actionState = action.meta.arg?.state;

            if (!sizeToDelete || !stockVariantToDelete) break;

            const targetItems =
              actionState === "cart"
                ? state.cart?.items
                : state.saveLaterCart?.items;

            if (!targetItems) break;

            const updatedItems = targetItems
              .map((item) => ({
                ...item,
                products: item.products.map((product) => {
                  if (product._id !== productId) return product;

                  return {
                    ...product,
                    variations: product.variations.map((variant) => {
                      if (variant._id !== stockVariantToDelete) return variant;

                      return {
                        ...variant,
                        details: variant.details.filter(
                          (detail) => detail.size !== sizeToDelete
                        ),
                      };
                    }),
                  };
                }),
              }))
              .filter((item) =>
                item.products.some((product) =>
                  product.variations.some(
                    (variant) => variant.details.length > 0
                  )
                )
              );

            if (actionState === "cart") {
              if (state.cart) state.cart.items = updatedItems;
            } else {
              if (state.saveLaterCart) state.saveLaterCart.items = updatedItems;
            }

            break;
          }

          default:
            break;
        }

        state.loading = false;
      })

      .addCase(deleteCartRedux.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // get recent view products ========
      .addCase(getRecentViewRedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentViewRedux.fulfilled, (state, action) => {
        // console.log(action.payload,'action.payload');

        state.recentView = action.payload;
        state.loading = false;
      })
      .addCase(getRecentViewRedux.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // add recent view =========
      .addCase(AddRecentViewRedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddRecentViewRedux.fulfilled, (state, action) => {
        // console.log(action.payload,'action.payload');

        state.recentView = action.payload;
        state.loading = false;
      })
      .addCase(AddRecentViewRedux.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // add wishlist ==================
      .addCase(AddWishlistRedux.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddWishlistRedux.fulfilled, (state, action) => {
        const productId = action.payload;

        const existingIndex = state.wishlist.findIndex(
          (item) => item._id === productId
        );

        if (existingIndex !== -1) {
          // Product already in wishlist → remove it
          state.wishlist = state.wishlist.filter(
            (item) => item._id !== productId
          );
        } else {
          // Product not in wishlist → add it from products array
          const productToAdd = state.products.find(
            (item) => item._id === productId
          );
          if (productToAdd) {
            state.wishlist.push(productToAdd);
          }
        }

        state.loading = false;
      })
      .addCase(AddWishlistRedux.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });

    // starts getCategoriesWithSub route =====
  },
});

export const {
  addProduct,
  removeProduct,
  setSingleProducts,
  setProducts,
  setProductData,
  setSaveLaterCartRedux,
} = productSlice.actions;

export default productSlice.reducer;
