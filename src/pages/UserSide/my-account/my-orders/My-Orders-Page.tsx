import { Button } from "@/components/ui/button";
import SettingsLayout from "../layout";
import { useState } from "react";
import OrderTab from "./OrderTab";
import ReplaceOrderTab from "./ReplaceOrderTab";
import { IOrder } from "@/types/orderTypes";
import { Icon } from "@iconify/react/dist/iconify.js";

type IOrderTabs = "Order" | "Replace";

export const orders: IOrder[] = [
  {
    id: 1,
    slug: "order-1",
    productName: "Oversized 100% Cotton 190GSM Plain White T-Shirt",
    subtotal: 2003,
    orderDate: "2024-01-01",
    deliveryDate: "2024-01-10",
    deliveryStatus: "Delivered",
    OrderStatus: "Confirmed",
    paymentStatus: "Confirmed",
    itemQuantity: [
      { size: "S", count: 1, color: "red" },
      { size: "S", count: 1, color: "pink" },
      { size: "S", count: 1, color: "beige" },
    ],
  },
  {
    id: 1,
    slug: "order-2",
    productName: "New Cloths",
    subtotal: 2003,
    orderDate: "2024-01-01",
    deliveryDate: "2024-01-10",
    deliveryStatus: "Pending",
    OrderStatus: "Confirmed",
    paymentStatus: "Confirmed",
    itemQuantity: [
      { size: "S", count: 1, color: "red" },
      { size: "S", count: 1, color: "pink" },
      { size: "S", count: 1, color: "beige" },
    ],
  },
  // Add more orders here
];

export default function MyOrdersPage() {
  const [switchOrderTabs, setSwitchOrderTab] = useState<IOrderTabs>("Order");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");



  return (
    <SettingsLayout>
      <div className="flex gap-4">
        {/* Tab Buttons */}
        <Button
          variant="link"
          className={`p-0 ${switchOrderTabs === "Order" ? "font-bold text-black" : "text-gray-500"} `}
          onClick={() => setSwitchOrderTab("Order")}
        >
          My Orders
        </Button>
        <Button
          variant="link"
          className={`p-0 ${switchOrderTabs === "Replace" ? "font-bold text-black" : "text-gray-500"} `}
          onClick={() => setSwitchOrderTab("Replace")}
        >
          Replace Orders
        </Button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex items-center sm:gap-4 my-5">
        <div className="flex items-center w-full border rounded-md">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border sm:px-4 px-1 sm:py-2 sm:text-sm text-xs sm:rounded-md rounded-l-md   flex-grow focus:outline-none border-none"
          />
          <button
            className="flex items-center gap-2  
           bg-bgHardSoft text-textMain sm:px-5 px-2 sm:text-sm text-xs sm:py-2 py-3 sm:rounded-md rounded-l-md "
          >
            <Icon
              icon={"hugeicons:search-01"}
              fontSize={20}
              className="sm:block hidden"
            />
            Search Order
          </button>
        </div>
        {/* sorting select starts */}
        <select
          className="border px-4 sm:py-2 py-[0.70rem] sm:rounded-md rounded-r-md sm:text-sm text-xs"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Tab Content */}
      {switchOrderTabs === "Order" ? (
        <OrderTab
          orders={orders}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
        />
      ) : (
        <ReplaceOrderTab
          orders={orders}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
        />
      )}
    </SettingsLayout>
  );
}
