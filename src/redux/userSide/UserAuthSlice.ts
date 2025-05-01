import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Assuming your store is in ../store
import { IKycProps, IUserProps } from "@/types/userTypes";
import { Current_User_Api } from "@/services/user_side_api/auth/route_url";
import { IAddressType } from "@/types/address-types";
import { delete_Address_Api } from "@/services/user_side_api/address/route";
import { makeToastError } from "@/utils/toaster";

// Define the shape of your state
interface AuthState {
  user: IUserProps | null;
  userKyc: IKycProps | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isUserLogged: boolean;
  isUserLoggedKyc: boolean;
  address:IAddressType[] | null;
}

// Define the User type
// interface User {
//   id: number;
//   username: string;
// }

// Initial state
const initialState: AuthState = {
  user: null,
  userKyc: null,
  token: null,
  isLoading: false,
  isUserLogged: false,
  isUserLoggedKyc: false,
  error: null,
  address: [],
};

export const fetchAyabooUserDetails = createAsyncThunk<
  { user: IUserProps; kyc: IKycProps; token: string }, // Fulfilled return type
  void, // Thunk argument type
  { rejectValue: { error: string; message: string; success: boolean } } // Rejected value type
>("user/fetchAyabooUserDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await Current_User_Api();
    // console.log(response,'response');
    
    if (response.status === 200 || response.data.success === true) {
      return response.data;
    } else {
      return rejectWithValue({
        error: "Failed",
        message: response.data?.message || "Failed to fetch user details",
        success: false,
      });
    }
  } catch (error: any) {
    console.log(error,'error get current user details');
    return rejectWithValue(
      error.response?.data || {
        error: "Network error",
        message: "Unable to fetch data",
        success: false,
      }
    );
  }
});

// delete address

export const deleteAddressRedux = createAsyncThunk(
  "wishlist/addWishlistRedux",
  async (id: string, { rejectWithValue }) => {
    // console.log(id,'id');

    try {
      const response = await delete_Address_Api(id);
      // console.log(response);
      if (response.status === 200) {
        return id;
      }
    } catch (error: any) {
      // console.log(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isUserLogged = false;
    },
    setUserData: (state, action: PayloadAction<IUserProps>) => {
      state.user = action.payload;
      state.isUserLogged = true;
    },
    // setAddressReducers: (state, action: PayloadAction<IAddressType>)=> {
    //   const newAddress = action.payload;
    //   // console.log(newAddress,'newAddress');
      
    //   if (state.address) {
    //     state.address = [...state.address, newAddress];
    //   } else {
    //     state.address = [newAddress];
    //   }
    // } ,
    setAddressReducers: (state, action: PayloadAction<IAddressType[]>) => {
      state.address = action.payload;
    },
    
    setLoginKycUser: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedKyc = action.payload;
      // state.isUserLogged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAyabooUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAyabooUserDetails.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: IUserProps;
            kyc: IKycProps;
            token: string;
          }>
        ) => {
          state.isLoading = false;
          state.isUserLogged = true;
          state.user = action.payload.user;
          state.userKyc = action.payload.kyc;
          state.token = action.payload.token;
          state.address = action.payload.user?.addresses
        }
      )
      .addCase(
        fetchAyabooUserDetails.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isUserLogged = false;
          state.user = null;
          state.userKyc = null;
          state.error = action.payload?.message || "Unknown error";
        }
      )
      // address delete
      .addCase(deleteAddressRedux.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAddressRedux.fulfilled, (state, action) => {
        const addressId = action.payload;

        // console.log(addressId,'addressId');
        // console.log(state.address,'state.address');
        

        state.isLoading = false;
        state.address = state.address ? state.address.filter(
          (address) => address._id !== addressId
        ) : null;
        
      })
      .addCase(deleteAddressRedux.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        makeToastError(
          action.payload as string || "Failed to delete address"
        )
      });
  },
});

export const { logoutUser, setUserData, setLoginKycUser, setAddressReducers } = authSlice.actions;

export default authSlice.reducer;

// Selector to get the auth state
export const selectAuth = (state: RootState) => state.auth;
