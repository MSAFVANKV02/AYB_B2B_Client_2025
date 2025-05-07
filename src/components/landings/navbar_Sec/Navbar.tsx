import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Input } from "@/components/ui/input";
import AccountMenu from "./AccountMenu";
import Logo from "./Logo";

import { useAppDispatch, useAppSelector } from "@/providers/redux/hook";
import { useEffect } from "react";
import { fetchAyabooUserDetails } from "@/providers/redux/userSide/UserAuthSlice";
import { useAuth } from "@/providers/AuthContext";
import {
  isAuthenticated,
  isAuthenticated_4_Kyc,
} from "@/middlewares/IsAuthenticated";
import { getCartRedux, getWishlistRedux } from "@/providers/redux/userSide/product_Slice";

export type INavbarItems = {
  href: string;
  title: string;
  icon: JSX.Element;
  current: boolean;
  // subItems?: INavbarItems[];
};
type NavbarProps = {
  navItems: INavbarItems[];
};

function Navbar({ navItems }: NavbarProps) {
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { handleLogout } = useAuth();
  const isLoggedInKyc = isAuthenticated_4_Kyc();
  const isLogged = isAuthenticated();
  // console.log(isUserLogged,'slice');
  // console.log(error,'user navbar');

  // const navigate = useNavigate();
  // const isLoggedIn4Kyc = isAuthenticated_4_Kyc();
  // const { handleLogout } = useAuth();

  useEffect(() => {
    // dispatch(fetchAyabooUserDetails());

    if (isLoggedInKyc || isLogged) {
      dispatch(fetchAyabooUserDetails());
      dispatch(getWishlistRedux());
      dispatch(getCartRedux());
    }

    if (isLoggedInKyc && user?.kycStatus === "approved") {
      handleLogout("/login");
      return;
    }

    if (
      (user?.kycStatus !== "approved" && user?.isVerified === false) ||
      !user ||
      user?.isRegistered === false ||
      error
    ) {
      // enable this after correct backend current user for kyc also =====
      // handleLogout("/login");

      const timeoutId = setTimeout(() => {
        // handleLogout('/login');
      }, 10000); // 10 seconds delay

      return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, isLoggedInKyc]);

  return (
    <nav
      className={`w-full  flex py-5 bg-transparent ${
        location.pathname === "/" && " "
      } max-w-screen-2xl md:mx-auto z-50 px-3`}
    >
      <div className="flex justify-between w-full">
        {/* Navbar Logo */}
        <Logo />

        <div className="lg:flex hidden items-center ">
          {/* ==== Search Bar  starting------ */}

          <div className="flex items-center border rounded-lg h-fit overflow-hidden">
            <Input
              type="text"
              placeholder="Search"
              className="border-none outline-none w-[300px] h-full"
            />
            <Icon
              icon={`mynaui:search`}
              fontSize={25}
              className="text-gray-400"
            />
          </div>
          {/* ==== Search Bar ending ------ */}

          {/*  Icons Starting === */}
          <div className="">
            {/* {user ? (
              <>
                <div className="bg-bg h-10 w-10 rounded-full cursor-pointer group  text-white flex justify-center items-center relative">
                  {user.name.slice(0, 1)}

                  Modal should appear correctly on hover
                  <div className="absolute hidden group-hover:block top-full -right-1/2  z-10  items-center p-4">
                    <div className=" w-[200px] p-2 rounded-lg flex flex-col  bg-bgSoft shadow-lg">
                      <span className="text-sm font-semibold text-center text-black">
                        {user.name}
                      </span>
                      <Button
                        className="mt-2"
                        variant={"b2bStyle"}
                        onClick={() => {
                          Cookies.remove("us_tkn_kyc");
                          handleLogout("/");
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
          
                <AccountMenu />
              </>
            )} */}
            {/* {
             isUserLogged &&(
                <AccountMenu />
              )
            } */}
            <AccountMenu />

            {/* <Icon icon={`ph:bell-light`} fontSize={25} className="" /> */}
            {/* <Icon icon={`mynaui:cart`} fontSize={25} className="" /> */}
          </div>
        </div>

        <div className="lg:hidden block  ">
          <Sidebar navItems={navItems} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
