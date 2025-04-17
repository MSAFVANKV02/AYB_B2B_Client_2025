import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav
      className={classNames(
        "flex flex-wrap lg:flex-col gap-1 lg:space-x-0 lg:space-y-1 ",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        // const isActive =
        // location.pathname === item.href || // Exact match
        // (item.href.includes("/:") && location.pathname.startsWith(item.href.split("/:")[0]));
        const isActive =
          location.pathname === item.href || // Exact match
          (item.href.includes("/my-orders") &&
            location.pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            to={item.href}
            className={classNames(
              "px-4 py-3 rounded-lg text-sm font-medium",
              isActive
                ? "bg-bgPrimaryVariant text-white hover:bg-bg"
                : "hover:bg-transparent hover:underline lg:border-none border",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
