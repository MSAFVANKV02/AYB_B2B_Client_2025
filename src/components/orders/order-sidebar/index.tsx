import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const OrderSideBar = () => {
  const currentRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
    const type = searchParams.get("type") ?? "pending";
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 1, name: "Pending", icon: "openmoji:order", type: "pending" },
    { id: 2, name: "Processing", icon: "openmoji:order", type: "processing" },
    { id: 3, name: "Delivered", icon: "openmoji:order", type: "delivered" },
    { id: 4, name: "Cancelled", icon: "openmoji:order", type: "cancelled" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currentRef.current && !currentRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (type: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("type", type);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)} className="mt-3">
        <Icon icon="openmoji:hamburger-menu" className="text-2xl" />
      </button>

      <aside
        className={`fixed bg-black/15 z-[1001] top-0 bottom-0 left-0 ${open ? "w-full translate-x-0" : "-translate-x-full"} duration-300 ease-in-out`}
      >
        <div
          ref={currentRef}
          className={`flex flex-col gap-3 w-3/4 bg-white h-full pointer-events-auto ${
            open ? "opacity-100 p-5" : "opacity-0"
          }`}
        >
          <ul className="flex flex-col">
            <button onClick={() => setOpen(false)} className="flex justify-end mb-5">
              <Icon icon="material-symbols-light:close-rounded" className="text-2xl" />
            </button>

            {sidebarItems.map((item) => (
              <li
                key={item.id}
                className={`text-xs ${type === item.type ?"font-bold":""} p-3 cursor-pointer`}
                onClick={() => handleItemClick(item.type)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default OrderSideBar;
