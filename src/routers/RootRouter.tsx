import { createBrowserRouter } from "react-router-dom";

// Lazy load components
import {
  App,
  ErrorPage,
  About,
  OtpVerificationPage,
  UserDetails,
  UserLogin,
  HomePage,
  KycDetails,
  KycLayout,
  MainHome,
  AppLayout,
} from "./page-routers";

// import App from "@/App";
// import ErrorPage from "@/pages/ErrorPage";
// import About from "@/pages/UserSide/About/About";

// import OtpVerificationPage from "@/pages/UserSide/auth/OtpVerificationPage";
// import Register from "@/pages/UserSide/auth/Register";
// import UserDetails from "@/pages/UserSide/auth/UserDetails";
// import UserLogin from "@/pages/UserSide/auth/UserLoginPage/UserLogin";
// import HomePage from "@/pages/UserSide/Home/Home";
// import KycDetails from "@/pages/UserSide/UserKycPage/KycDetails/KycDetails";
// import KycLayout from "@/KycLayout";
// import MainHome from "@/pages/UserSide/Home/MainHome";
// import AppLayout from "@/Layout";
// import AdmLayout from "@/AdmLayout";
// import DashboardLayoutBasic from "@/pages/adminSide/Dashboard";

import KycHome from "@/pages/UserSide/UserKycPage/KycHome";
import { ScrollProvider } from "@/providers/context/ScrollContext";
import ProtectedRoute from "@/middlewares/ProtectedRoute";
import { isAuthenticated } from "@/middlewares/IsAuthenticated";

import Products from "@/pages/UserSide/Prod_pages/ProductDetails/Products-detail-page";
import ShoppingCart from "@/pages/UserSide/cart/page";

import ConfirmOrder from "@/components/checkout/Confirm-Order";
import SettingsProfilePage from "@/pages/UserSide/my-account/my-profile-page";
import MyOrdersPage from "@/pages/UserSide/my-account/my-orders/My-Orders-Page";
import SingleOrderPage from "@/pages/UserSide/my-account/my-orders/single-order/Single-Order-Page";
import ChatPage from "@/pages/UserSide/my-account/chat/Chat-Page";
import WishlistPage from "@/pages/UserSide/my-account/wishlist/wishlist-page";
import UseReviewPage from "@/pages/UserSide/my-account/reviews/use-review-page";
import UseReturnPage from "@/pages/UserSide/my-account/return_user/user-return-page";
import { Suspense } from "react";
import PreloaderPage from "@/preloader-page";
import PageOnBuild from "@/components/myUi/PageOnBuild";
import { MyAccountLayout, StoreLayout } from "@/layouts/Sidbar_Layout";
import StoreRegisterPage from "@/pages/UserSide/auth/store/store-register-page";
import StoreRegisterForm from "@/pages/UserSide/auth/store/store_register_form";
import SellerRegisterPage from "@/pages/seller/seller-register-page";
import SellerRegisterForm from "@/pages/seller/seller_register_form";
import AllKindProducts from "@/pages/UserSide/Prod_pages/all_pages/all-kind-products";
import NotificationsPage from "@/pages/UserSide/my-account/notifications/notifications-page";
import PurchasePage from "@/pages/UserSide/cart/checkout/page";
// import PreloaderPage from "@/preloader-page";

// import withAuth from "@/middlewares/WithAuth";

// const ProtectedHomePage = withAuth(HomePage);
// const ProtectedRegister = withAuth(Register);
// const ProtectedUserLogin = withAuth(UserLogin);
// const NonProtectedAbout = withAuth(About); // Assuming About is non-protected
// const NonProtectedOtpVerification = withAuth(OtpVerificationPage);
// const NonProtectedUserDetails = withAuth(UserDetails);

const isLogged = isAuthenticated();

const rootRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<PreloaderPage />}>
          <ScrollProvider>{isLogged ? <AppLayout /> : <App />}</ScrollProvider>
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: "/",
          element: (
            <ProtectedRoute isProtected={true} isHomeLogin={true}>
              {isLogged ? <MainHome /> : <HomePage />}
            </ProtectedRoute>
          ),
          // errorElement: <ErrorPage />,
        },
        // {
        //   path: "/saloon",
        //   element: (
          
        //       <SaloonLandingPage />
            
        //   ),
        // },
        // {
        //   path: "/register",
        //   element: (
        //     <ProtectedRoute isProtected={true}>
        //       <Register />{" "}
        //     </ProtectedRoute>
        //   ),
        // },
        // {
        //   path: "/loader",
        //   element: (
        //     <ProtectedRoute isProtected={true}>
        //       <PreloaderPage />{" "}
        //     </ProtectedRoute>
        //   ),
        // },sd
        {
          path: "/login",
          element: (
            <ProtectedRoute isProtected={false}>
              <UserLogin />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/about",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <About />{" "}
            </ProtectedRoute>
          ),
        },
        // {
        //   path: "/folder",
        //   element: (
        //     <ProtectedRoute isProtected={true}>
        //       {" "}
        //       <FolderStructure />{" "}
        //     </ProtectedRoute>
        //   ),
        // },
        {
          path: "/register/otp-verification",
          element: (
            <ProtectedRoute isProtected={true}>
              <OtpVerificationPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register/user-details",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <UserDetails />
            </ProtectedRoute>
          ),
        },
        // {
        //   path: "/category/:slug",
        //   element: (
        //     <ProtectedRoute isProtected={true}>
        //       {" "}
        //       <CategoryProductsPage />
        //     </ProtectedRoute>
        //   ),
        // },
        {
          path: "/page/:page/:slug",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <AllKindProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/page/:page",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <AllKindProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product/:slug",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <ShoppingCart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart/checkout",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              {/* <CheckoutPageOld /> */}
              <PurchasePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart/checkout/order-confirmation",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <ConfirmOrder />
            </ProtectedRoute>
          ),
        },
        {
          path: "/my-account",
          element: <MyAccountLayout />, // Parent layout for Sales
          children: [
            { path: "", element: <SettingsProfilePage /> },
            { path: "my-orders", element: <MyOrdersPage /> },
            { path: "my-orders/:slug", element: <SingleOrderPage /> },
            {
              path: "my-orders/:slug/review/:orderId",
              element: <UseReviewPage />,
            },
            { path: "chat", element: <ChatPage /> },
            { path: "my-wishlist", element: <WishlistPage /> },
            { path: "return", element: <UseReturnPage /> },
            { path: "notifications", element: <NotificationsPage /> },
            { path: "credit-request", element: <PageOnBuild /> },
          ],
        },
      ],
    },
    // === store ===
    {
      path: "/become",
      element: <StoreLayout />,
      children: [
        {
          path: "seller/register",
          element: (
            <ProtectedRoute isProtected={true}>
              <SellerRegisterPage />{" "}
            </ProtectedRoute>
          ),
        
        },
        {
          path: "seller/register/:token",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <SellerRegisterForm />{" "}
            </ProtectedRoute>
          ),
        },
        // stores===q
        {
          path: "store/register",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <StoreRegisterPage />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "store/register/:token",
          element: (
            <ProtectedRoute isProtected={true}>
              {" "}
              <StoreRegisterForm />{" "}
            </ProtectedRoute>
          ),
        },
      ],
    },

    // ===== KYC Sections ============
    {
      path: "/kyc",

      element: (
        <Suspense fallback={<PreloaderPage />}>
          {/* <ScrollProvider> */}
          <ProtectedRoute>
            <KycLayout />
          </ProtectedRoute>
          {/* </ScrollProvider> */}
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: "/kyc",
          element: <KycHome />,
        },
        {
          path: "details",
          element: <KycDetails />,
        },
      ],
    },
    //   ===== Admin Sections =================================
    // {
    //   path: "/admin",

    //   element: <AdmLayout />,
    //   children: [
    
    //     {
    //       path: "dashboard",
    //       element: <DashboardLayoutBasic />, // Loads at "/admin/dashboard"
    //     },
    //     {
    //       path: "orders/pending",
    //       element: <UserDetails />, // Loads at "/admin/dashboard"
    //     },
    //     {
    //       path: "orders/completed",
    //       element: <UserDetails />, // Loads at "/admin/dashboard"
    //     },
    //   ],
    // },
    {
      path: "*",

      element: (
        <Suspense fallback={<PreloaderPage />}>
          <ErrorPage />
        </Suspense>
      ),
    },
  ],
  { basename: "/" }
);

export default rootRouter;
