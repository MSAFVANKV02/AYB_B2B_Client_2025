import { SidebarNav } from "@/components/landings/manageProfile/SidbarNav";
import AyButton from "@/components/myUi/AyButton";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/my-account",
  },
  {
    title: "Order",
    href: "/my-account/my-orders",
  },
  {
    title: "My Return / Replace",
    href: "/my-account/return",
  },
  {
    title: "Wishlist",
    href: "/my-account/my-wishlist",
  },
  {
    title: "Chat with us",
    href: "/my-account/chat",
  },

  {
    title: "Notifications",
    href: "/my-account/notifications",
  },
  {
    title: "Credit Request",
    href: "/my-account/credit-request",
  },
  // {
  //   title: "wallet",
  //   href: "/my-account/wallet",
  // },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
  className?:string
}

export default function SettingsLayout({ children, className }: SettingsLayoutProps) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const logout = () => {
    Cookies.remove('us_b2b_tkn');
    window.location.reload();
    Cookies.remove('us_b2b_kyc');

    navigate("/"); // Replace with actual logout logic
  }
  return (
    <>
      <div className=" space-y-6 md:py-5 mb-10  mx-auto ">
        {/* <div className="flex  flex-col space-y-4   lg:flex-row lg:space-x-7 lg:space-y-0"> */}
        <div className="grid lg:grid-cols-12 grid-cols-1 xl:space-x-10 lg:space-x-5">

          <aside className="xl:-mx-4 xl:col-span-2 lg:col-span-3 flex-grow-0 lg:h-[70vh] bg-bgHardSoft sticky z-[1000] top-10  rounded-2xl sm:p-3 p-1 md:mt-0 mt-4 lg:flex hidden flex-col justify-between h-[80%]">
            <SidebarNav items={sidebarNavItems} />

            <div className="mt-4">
              <AyButton
                title="Sign Out"
                onClick={logout}
                outLineColor="black"
                variant="outlined"
                sx={{
                  width: "100%",
                  color: "gray",
                  border: "1px solid gray",
                  "&:hover": {
                    bgcolor: "var(--hardSoftColor)", // Optional hover color
                  },
                }}
              />
            </div>
          </aside>
          <div className={cn("flex-grow xl:col-span-10 lg:col-span-9 h-fit xl:p-10 sm:p-5 p-1",className)}>{children}</div>
        </div>
      </div>
    </>
  );
}
