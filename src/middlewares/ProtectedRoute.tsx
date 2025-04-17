import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAuthenticated_4_Kyc } from "./IsAuthenticated";


interface ProtectedRouteProps {
  children: React.ReactNode;
  isProtected?: boolean;
  isHomeLogin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isProtected,
}) => {
  const isLoggedInKyc = isAuthenticated_4_Kyc();
  const isLogged = isAuthenticated();
  // const {user} = useAppSelector((state)=> state.auth);

  // const navigate = useNavigate(); 


  // useEffect(() => {
  //   checkAuthKyc().then((data) => {
  //     if (data?.authenticated) {
  //       if (!window.location.pathname.startsWith("/kyc")) {
  //         navigate("/kyc", { replace: true }); // ✅ Use navigate() instead
  //       }
  //     } else {
  //       navigate("/", { replace: true });
  //     }
  //   });
  // }, [navigate]); 

  // If logged in and trying to access a protected route that's not KYC, redirect to KYC

  const protectedRoutes = [
    "/products",
    "/category",
    "/cart",
    "/checkout",
    "/my-account",
  ];

  if (
    isLoggedInKyc &&
    isProtected &&
    window.location.pathname !== "/kyc" &&
    !window.location.pathname.startsWith("/kyc/")
  ) {
    return <Navigate to="/kyc" replace />;
  }

  // If not logged in KYC and trying to access "/kyc", redirect to home
  if (
    !isLoggedInKyc &&
    (window.location.pathname === "/kyc" ||
      window.location.pathname.startsWith("/kyc/"))
  ) {
    return <Navigate to="/" replace />;
  }

  if (
    isLogged &&
    (window.location.pathname === "/about" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register/user-details" ||
      window.location.pathname.startsWith("/register/otp-verification"))
  ) {
    return <Navigate to="/" replace />;
  }

  if (
    !isLogged &&
    protectedRoutes.some((path) => window.location.pathname.startsWith(path)) 
    
  ) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated and on a non-protected route, allow access
  if (!isLoggedInKyc && !isProtected) {
    return <>{children}</>;
  }

  // Allow authenticated users to access protected routes
  return <>{children}</>;
};

export default ProtectedRoute;
