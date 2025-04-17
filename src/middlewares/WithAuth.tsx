// // withAuth.tsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

// interface WithAuthProps {
//   children: React.ReactNode;
//   isProtected: boolean; // Whether the route is protected or not
// }

// const withAuth = (WrappedComponent: React.FC) => {
//   return ({ isProtected, ...props }: WithAuthProps) => {
//     const [cookies] = useCookies(["us_b2b_tkn"]);

//     const isAuthenticated = !!cookies.us_b2b_tkn;

//     // If it's a protected route and the user is not authenticated
//     if (isProtected && !isAuthenticated) {
//       return <Navigate to="/login" replace />;
//     }

//     // If it's a non-protected route and the user is authenticated
//     if (!isProtected && isAuthenticated) {
//       return <Navigate to="/kyc" replace />;
//     }

//     // Render the wrapped component if authentication is handled
//     return <WrappedComponent {...(props as any)} />;
//   };
// };

// export default withAuth;
