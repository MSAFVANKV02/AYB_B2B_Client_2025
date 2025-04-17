import Logo from "@/components/landings/navbar_Sec/Logo";
import { Separator } from "@/components/ui/separator";
import usePageTitle from "@/hooks/usePageTitle";
import ProtectedRoute from "@/middlewares/ProtectedRoute";
import { Outlet, useLocation } from "react-router-dom";

export const MyAccountLayout = () => {
  {
    usePageTitle("Ayaboo | My Account");
  }
  return (
    <div>
      <ProtectedRoute isProtected={true}>
        <Outlet />
      </ProtectedRoute>
    </div>
  );
};

export const StoreLayout = () => {
  const { pathname } = useLocation();

  
  const titleName = pathname.includes("seller") ? "Ayaboo | Seller" : "Ayaboo | Store";
  const headingName = pathname.includes("seller") ? "Register Seller" : "Register Store";

  usePageTitle(titleName); 
  
  return (
    <div className="bg-gray-50 ">
      <div className="flex justify-between w-full fixed top-5 left-0 right-0 px-5 items-center">
        <div className="ml-">
          <Logo
            logoTextCss={{
              color:
                pathname === "/become/store/register" ||
                pathname === "/become/store/register/"
                  ? `black`
                  : "white",
            }}
          />
        </div>
        <h1 className="sm:text-lg text-sm font-bold text-white select-none">
          {headingName}
        </h1>

        {/* {getErrors(errors)} */}
      </div>
      <div className="">
        <Outlet />
      </div>
      

      <Separator />

      {/* footer ==== */}
      <footer className="w-full max-w-screen-2xl text-sm mx-auto p-6 select-none flex justify-center">
        <ul>
          <li>Haashtechnologies Pvt Ltd &copy; 2025 | haash.tech</li>
        </ul>
      </footer>
    </div>
  );
};
