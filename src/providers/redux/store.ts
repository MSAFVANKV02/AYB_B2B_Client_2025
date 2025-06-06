import { configureStore } from "@reduxjs/toolkit";
import kycReducer from "@/providers/redux/userSide/KycSlice"
import authReducer from "@/providers/redux/userSide/UserAuthSlice"
import loadingReducer from "@/providers/redux/userSide/loadingSlice"
import categoryReducer from "@/providers/redux/userSide/category_Slice"
import ProductReducer from "@/providers/redux/userSide/product_Slice"
import CheckoutReducer from "@/providers/redux/userSide/checkout-slice"



import storage from 'redux-persist/lib/storage';
import {  persistReducer } from "redux-persist";
import {combineReducers} from '@reduxjs/toolkit'
// import { version } from "os";

const persistConfig = {
  key: 'root',
  version:1,
  storage,
};

const rootReducer = combineReducers({
  // user: userReducer,
  kyc: kycReducer, 
  auth: authReducer, 
  loading: loadingReducer,
  category: categoryReducer, //
  checkout: CheckoutReducer, 
  products: ProductReducer, 



});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
    devTools: import.meta.env.MODE !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these paths for non-serializable checks
          ignoredActions: ['persist/PERSIST'],
          ignoredPaths: ['register'], // Ignore the specific non-serializable value
        },
      }),
  });

  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
