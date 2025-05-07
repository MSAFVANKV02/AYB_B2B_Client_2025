
import { get_Category_Api, get_Category_With_Sub_Api } from "@/services/user_side_api/category/route";
import { ICategory } from "@/types/categorytypes";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
interface CategoryState {
  categories: ICategory[]; // Make sure to type it as ICategory[]
  loading: boolean;
  error: string | null;
}

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (admin:"admin"|"", { rejectWithValue }) => {
    try {
      const response = await get_Category_Api(admin)
      const categoriesData = response.data.categories;
      // console.log(categoriesData,'listcategories==== category slice');
      

      const parentMap = new Map(
        categoriesData.map((category: any) => [category._id, category.name])
      );

      const categoriesWithParentName = categoriesData.map((category: any) => ({
        ...category,
        parent: parentMap.get(category.parentId) || "No Parent",
      }));

      return categoriesWithParentName;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCategoriesWithSub = createAsyncThunk(
  "category/getCategoriesWithSub",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_Category_With_Sub_Api()
      const categoriesData = response.data.categories;
      // console.log(categoriesData,'listcategories==== category slice');
      

      const parentMap = new Map(
        categoriesData.map((category: any) => [category._id, category.name])
      );

      const categoriesWithParentName = categoriesData.map((category: any) => ({
        ...category,
        parent: parentMap.get(category.parentId) || "No Parent",
      }));

      return categoriesWithParentName;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload); // This is fine, no need to return anything
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload; // This is useful for setting initial data
    },
  },
  extraReducers:(builder) => {
    builder
    .addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    })
    // starts getCategoriesWithSub route =====
    .addCase(getCategoriesWithSub.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCategoriesWithSub.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    })
    .addCase(getCategoriesWithSub.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    })
  }
});

export const { addCategory, removeCategory, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
