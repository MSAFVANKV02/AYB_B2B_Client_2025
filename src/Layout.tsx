import "./App.css";

import { Outlet, useLocation } from "react-router-dom";
import { cn } from "./lib/utils";
import Footer from "./components/landings/footer_Sec/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Navbar from "./components/landings/navbar_Sec/Navbar";
// import { NavigationMenuBar } from "./components/landings/navbar_Sec/NavigationMenuBar";
import useNavbarItems from "./components/landings/navbar_Sec/navbarItems";
import NavigationMenuBar from "./components/landings/navbar_Sec/NavigationMenuBar";
function AppLayout() {
  const location = useLocation();
  const { navItems } = useNavbarItems();
  // const homePath = location.pathname === "/";
  // const accPath = location.pathname === "/my-account";

  const queryParams = new URLSearchParams(window.location.search);
  const auth = queryParams.get("auth");

  useEffect(() => {
    if (!auth) {
      localStorage.removeItem("otp-timer");
      localStorage.removeItem("otp-finished");
    }
  }, [auth]);

  return (
    <>
      <div
        className={cn(`min-h-screen flex flex-col justify-between`, {
          "debug-screens": import.meta.env.MODE === "development",
        })}
      >
       <div className="">
       <Navbar navItems={navItems} />
        {!location.pathname.startsWith("/my-account") && (
          <div className="w-full bg-[#F6F6F6] border-b select-none ">
            {/* <NavigationMenuBar /> */}
            <NavigationMenuBar />
          </div>
        )}
        <div className="max-w-screen-2xl mx-auto 2xl:px-0 xl:px-10 sm:px-5 px-1">
            <Outlet />
        </div>

      
       </div>
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default AppLayout;
