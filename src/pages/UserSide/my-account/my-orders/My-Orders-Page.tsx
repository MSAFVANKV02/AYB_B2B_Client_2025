import { Button } from "@/components/ui/button";
import SettingsLayout from "../layout";
import { useState } from "react";
import OrderTab from "./OrderTab";
import {  IOrders, IOrdersType } from "@/types/orderTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQueryData } from "@/hooks/useQueryData";
import { getAllOrdersAction } from "@/action/checkout/checkoutAction";
import { useSearchFn } from "@/hooks/useSeach-Fn";
import Loader from "@/components/global/loader";

type IOrderTabs = "Order" | "Replace";


export default function MyOrdersPage() {
  const [switchOrderTabs, setSwitchOrderTab] = useState<IOrderTabs>("Order");

  const { data: fetchedBannerImages, isFetching } = useQueryData(
    ["banner-images"],
    () => getAllOrdersAction()
  );

  const { data: fetchedOrdersData } = (fetchedBannerImages ?? {}) as {
    status?: number;
    data?: IOrdersType;
  };

  const orderList = fetchedOrdersData?.orders ?? [];

  const {
    filteredData: filteredOrders,
    handleSearch,
    handleStatusFilter,
  } = useSearchFn<IOrders>(orderList);

  if (isFetching) {
    return (
      <SettingsLayout>
        <div className="h-full flex justify-center items-center">
          <Loader state={isFetching} color="black" />
        </div>
      </SettingsLayout>
    );
  }

  if (!fetchedOrdersData) return null;
  return (
    <SettingsLayout>
      <div className="flex gap-4">
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

      {/* <pre className="text-xs">
        {JSON.stringify(fetchedOrdersData, null, 4)}
      </pre> */}

      {/* Search & Filter Controls */}
      <div className="flex items-center sm:gap-4 my-5">
        <div className="flex items-center w-full border rounded-md">
          <input
            type="text"
            placeholder="Search by Product Name"
            onChange={handleSearch}
            className="border sm:px-4 px-1 sm:py-2 sm:text-sm text-xs sm:rounded-md rounded-l-md   flex-grow focus:outline-none border-none"
          />
          <button className="flex items-center gap-2 bg-bgHardSoft text-textMain sm:px-5 px-2 sm:text-sm text-xs sm:py-2 py-3 sm:rounded-md rounded-l-md ">
            <Icon
              icon={"hugeicons:search-01"}
              fontSize={20}
              className="sm:block hidden"
            />
            Search Order
          </button>
        </div>

        <select
          className="border px-4 sm:py-2 py-[0.70rem] sm:rounded-md rounded-r-md sm:text-sm text-xs"
          onChange={(e) => handleStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Tab Content */}

      {switchOrderTabs === "Order" ? (
        <div className="">
          <OrderTab orders={fetchedOrdersData} filteredOrder={filteredOrders} />
        </div>
      ) : (
        <>
          {/* <ReplaceOrderTab
        orders={orders}
        searchTerm={searchTerm}
        filterStatus={filterStatus}
      /> */}
        </>
      )}
    </SettingsLayout>
  );
}
