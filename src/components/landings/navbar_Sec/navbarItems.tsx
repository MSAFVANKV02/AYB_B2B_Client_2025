import { HomeIcon } from 'lucide-react';


export default function useNavbarItems() {
    const navItemsKyc = [
        {
          title: "Home",
          href: "/",
          icon: <HomeIcon />,
          current: true,
        },
        {
          title: "About",
          href: "/about",
          icon: <HomeIcon />,
          current: true,
        },
      ];

      const navItems = [
        {
          title: "Cart",
          href: "/cart",
          icon: <HomeIcon />,
          current: true,
        },
        {
          title: "Orders",
          href: "/my-account/my-orders",
          icon: <HomeIcon />,
          current: true,
        },
        {
          title: "Wishlist",
          href: "/my-account/my-wishlist",
          icon: <HomeIcon />,
          current: true,
        },
        {
          title: "Accounts",
          href: "/my-account",
          icon: <HomeIcon />,
          current: true,
        },
      
       
        {
          title: "Chat with us",
          href: "/my-account/chat",
          icon: <HomeIcon />,
          current: true,
        },
        {
          title: "Return or Replace",
          href: "/my-account/return",
          icon: <HomeIcon />,
          current: true,
        },
      
      ];
  return {
    navItemsKyc,
    navItems
  }
}