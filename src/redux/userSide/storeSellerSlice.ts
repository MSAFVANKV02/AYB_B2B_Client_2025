

import { StoreTypes } from "@/types/storeTypes";
import { createSlice } from "@reduxjs/toolkit";

type FormData = {
  storeSeller: StoreTypes[];
  isLoading: boolean;
  error: string | null;
};
// type DataGet = "seller" | "store" | "storeSeller"
// Initial state
const initialState: FormData = {
  storeSeller: [],
  isLoading: false,
  error: null,
};

// Async thunk for login
// export const fetchSellerOrStoreDetails = createAsyncThunk(
//   "storeSeller/fetchSellerOrStoreDetails",
//   async (role:DataGet, { rejectWithValue }) => {
//     try {
//       const response = await Get_Store_Api(role);
//       // console.log(response);

//       if (response.status == 200 || response.data.success === true) {
//         // console.log(response.data,'storeSeller response');
//         return response.data.stores
//       } else {
//         return rejectWithValue("Failed to fetch storeSeller details");
//       }
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response ? error.response.data : "Network error"
//       );
//     }
//   }
// );

const storeSellerSlice = createSlice({
  name: "storeSeller",
  initialState,
  reducers: {
  
    setStoreData: (state, action) => {
      state.storeSeller = action.payload;
    },
  },
  extraReducers: () => {
    // builder
    //   .addCase(fetchSellerOrStoreDetails.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchSellerOrStoreDetails.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.storeSeller = action.payload;
    //   })
    //   .addCase(fetchSellerOrStoreDetails.rejected, (state, action) => {
    //     state.isLoading = false;

    //     // Check if payload is a string or an object and handle accordingly
    //     if (typeof action.payload === "string") {
    //       state.error = action.payload; // String error message
    //     } else if (action.payload && typeof action.payload === "object") {
    //       // Cast payload to 'any' to safely access 'data'
    //       const errorPayload = action.payload as any;
    //       state.error = errorPayload?.data?.message || "Unknown error";
    //     } else {
    //       state.error = "Unknown error";
    //     }
    //   });
  },
});

export const {  setStoreData } = storeSellerSlice.actions;

export default storeSellerSlice.reducer;

// Selector to get the auth state
// export const selectAuth = (state) => state.auth;
