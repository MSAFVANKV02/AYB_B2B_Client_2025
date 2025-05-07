import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Link, useLocation } from "react-router-dom";
import { INavbarItems } from "./Navbar";
import { Box } from "@mui/material";
import { useAppSelector } from "@/providers/redux/hook";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NavItem = {
  href: string;
  title: string;
};

// type FooterLink = {
//   href: string;
//   label: string;
// };

type IPropsNavbar = {
  // logo?: string;
  navItems?: INavbarItems[]; // Array of NavItem type
  // footerLinks?: FooterLink[]; // Array of FooterLink type
};

export function Sidebar({ navItems = [] }: IPropsNavbar) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Ensure this is used for active link styling
  const { user, isUserLogged } = useAppSelector((state) => state.auth);

  // const navigate = useNavigate();

  // Define footer links
  const footerLinks = [
    { href: "/careers", label: "Careers" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/facebook", label: "Facebook" },
    { href: "/instagram", label: "Instagram" },
    { href: "/twitter", label: "Twitter" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  // const logout = () => {
  //   Cookies.remove('us_b2b_tkn');
  //   window.location.reload();
  //   Cookies.remove('us_b2b_kyc');

  //   navigate("/"); // Replace with actual logout logic
  // }

  return (
    <Drawer
      direction="left"
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      {/* Hamburger Icon for opening the Drawer */}
      <DrawerTrigger asChild className="cursor-pointer">
        <Icon
          icon={"quill:hamburger"}
          fontSize={30}
          className="text-textMain"
        />
      </DrawerTrigger>

      {/* Drawer Content */}
      <DrawerContent className="bg-white text-black w-full border-none z-[20001]">
        <DrawerHeader className="p-4 bg-bg flex justify-between items-center w-full ">
          {/* Close button */}
          <Box display="flex" alignItems="center">
            <DrawerClose asChild>
              <Button
                variant="noStyle"
                className=" bg-transparent text-white font-bold border-none text-xl  px-0 "
              >
                <Icon icon={"mdi:close"} />
              </Button>
            </DrawerClose>
            {/* <Avatar sx={{ width: 24, height: 24, mx: "0.70rem" }} /> */}
            {isUserLogged && (
              <>
            <Box
            display={'flex'}
            alignItems={"center"}
            gap={"2px"}
            >
            <Avatar className="w-9 h-9 cursor-pointer">
                  {/* <AvatarImage src={currentAdmin?.avatar} /> */}
                  <AvatarFallback className=" bg-bgSoft backdrop-blur-sm">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-white">{user?.name}</span>
            </Box>
              </>
            )}
          </Box>

          <img
            src="/img/logo/white_log.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-"
          />
        </DrawerHeader>

        {/* Menu Items */}
        <div className="my-aut flex flex-col justify-between h-full mb-4">
          <div className="flex flex-col   space-y-2 p-2">
            {navItems.map((item: NavItem, index: number) => (
              <DrawerClose asChild key={index}>
                <Link
                  to={item.href}
                  className={`sm:text-lg text-sm text-start border p-3 rounded-lg hover:bg-gray-50 duration-300 transition-all ${
                    item.href === location.pathname
                      ? "text-purple-500 underline underline-offset-4 font-semibold"
                      : "text-black"
                  }`}
                >
                  {item.title}
                </Link>
              </DrawerClose>
            ))}
          </div>
          {/* <div className="px-4 flex items-center justify-center mt-auto">
            <AyButton
            title="Sign Out"
            variant="outlined"
            outLineColor="gray"
            sx={{
              width: "100%",
              height: "50px",
            }}
            onClick={logout}
            />
          </div> */}
        </div>
        {/* Sign Out Button */}

        {/* Footer Links */}
        <DrawerFooter
          className="p-4"
          style={{
            backgroundImage: `url('img/Background Images/DoodleBG_image.png')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
          }}
        >
          <div>
            {/* Footer sub title starts */}
            <ul className="grid grid-cols-3 justify-between text-sm">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <DrawerClose asChild>
                    <Link to={link.href} className="text-gray-300">
                      {link.label}
                    </Link>
                  </DrawerClose>
                </li>
              ))}
            </ul>
            {/* Footer sub title ends */}
          </div>
          <div className="space-y-2">
            <h5 className="text-textSec font-bold">Get in touch!</h5>
            <p className="text-gray-400">We can help you, Send your queries.</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Message"
                className="w-full p-2 text-black text-xs rounded-md"
              />
              <Button className="text-white bg-purple-500 hover:bg-purple-600">
                <Icon icon="mdi:send" />
              </Button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
