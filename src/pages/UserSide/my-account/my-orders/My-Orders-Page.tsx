import SettingsLayout from "../layout";
import OrderTab from "./OrderTab";
import { IOrders, IOrdersType } from "@/types/orderTypes";
import { useQueryData } from "@/hooks/useQueryData";
import { getAllOrdersAction } from "@/action/checkout/checkoutAction";
import { useSearchFn } from "@/hooks/useSeach-Fn";
import Loader from "@/components/global/loader";
import { Input } from "@/components/ui/input";
import OrderTabPagination from "@/components/orders/order-tab-pagination";
import { useSearchParams } from "react-router-dom";
import MyPageTab from "@/components/myUi/MyTab";
import { useWindowWidth } from "@react-hook/window-size";
import OrderSideBar from "@/components/orders/order-sidebar";
import NoOrders from "@/components/orders/no-order";
import { useMemo } from "react";

// type IOrderTabs = "Order" | "Replace";

export default function MyOrdersPage() {
  const onlyWidth = useWindowWidth();

  const [searchParams] = useSearchParams();
  const pageQ = searchParams.get("page") ?? "1";
  const type = searchParams.get("type") ?? "pending";

  const { data: fetchedBannerImages, isFetching } = useQueryData(
    ["all-orders",pageQ,type],
    () =>
      getAllOrdersAction([
        { key: "page", value: pageQ },
        { key: "status", value: type },
        // {key:"limit", value: "1"},
      ]),
    { disableRefetch: true }
  );

  const { data: fetchedOrdersData } = (fetchedBannerImages ?? {}) as {
    status?: number;
    data?: IOrdersType;
  };

  console.log(fetchedOrdersData, "fetchedOrdersData");

  // const orderList = fetchedOrdersData?.orders ?? [];
  const orderList = useMemo(() => {
    return fetchedOrdersData?.orders ?? [];
  }, [fetchedOrdersData]);

  const { filteredData: filteredOrders, handleSearch } =
    useSearchFn<IOrders>(orderList??[]);

  if (isFetching) {
    return (
      <SettingsLayout>
        <div className="h-[80dvh] flex justify-center items-center">
          <Loader state={isFetching} color="gray" />
        </div>
      </SettingsLayout>
    );
  }


  return (
    <SettingsLayout>
      {/* Search & Filter Controls */}

      <div className="flex lg:items-center lg:flex-row flex-col justify-between sm:gap-4 gap-2 ">
        <div className="sm:w-1/2">
          <h4 className="sm:text-2xl text-xl">My Orders</h4>
        </div>
        <div className="flex items-center sm:w-1/2 border rounded-[10px] overflow-hidden">
          <Input
            type="search"
            placeholder="Fast Search..."
            onChange={handleSearch}
            className="border  text-xs rounded-xl   flex-grow focus:outline-none border-none"
          />
        </div>
      </div>

     <div   
     className={`${onlyWidth < 640 ? "block" : "hidden"} `}
     >
     <OrderSideBar />
     </div>

      <MyPageTab
        hiddenTabList={onlyWidth < 640 === false}
        tabsListCss="border-b-2 rounded-none border-gray-300 w-fit p-0 bg-transparent"
        triggerActiveCss="relative text-black border-none shadow-none data-[state=active]:shadow-none data-[state=active]:bg-[#F9F9F9] font-semibold after:content-[''] after:absolute
         after:bottom-[-1px] after:left-0 after:h-[2px] after:w-full after:bg-black"
        triggerDefaultCss="text-gray-500 border-none shadow-none"
        tabs={[
          {
            title: "All",
            url: "/my-account/my-orders?type=pending",
            value: "pending",
            // TriggerCss:
            //   "bg-transparent rounded-none data-[state=active]:text-black min-w-4 px-0 text-start data-[state=active]:bg-red-300 data-[state=active]:shadow-none py-0 ",
            // tabCss:
            //   "bg-transparent text-sm px-0 border-none md:rounded-none rounded-none bg-red-300 space-x-4",
            children: (
              <div className="bg-white sm:mt-5">
                {fetchedOrdersData ? (
                  <OrderTab
                    orders={fetchedOrdersData}
                    filteredOrder={filteredOrders}
                  />
                ) : (
                  <div className="">
                    <NoOrders />
                  </div>
                )}
              </div>
            ),
          },
          {
            title: "Order on process ",
            url: "/my-account/my-orders?type=processing",
            value: "processing",
            children: (
              <div className="bg-white sm:mt-5">
                {fetchedOrdersData ? (
                  <OrderTab
                    orders={fetchedOrdersData}
                    filteredOrder={filteredOrders}
                  />
                ) : (
                  <div className="">
                    <NoOrders />
                  </div>
                )}
              </div>
            ),
          },
          {
            title: "Delivered",
            url: "/my-account/my-orders?type=delivered",
            value: "delivered",
            children: (
              <div className="bg-white sm:mt-5">
                {fetchedOrdersData ? (
                  <OrderTab
                    orders={fetchedOrdersData}
                    filteredOrder={filteredOrders}
                  />
                ) : (
                  <div className="">
                    <NoOrders />
                  </div>
                )}
              </div>
            ),
          },
          {
            title: "Cancelled",
            url: "/my-account/my-orders?type=cancelled",
            value: "cancelled",
            children: (
              <div className="bg-white sm:mt-5">
                {fetchedOrdersData ? (
                  <OrderTab
                    orders={fetchedOrdersData}
                    filteredOrder={filteredOrders}
                  />
                ) : (
                  <div className="">
                    <NoOrders />
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />

      {fetchedOrdersData && fetchedOrdersData.total > fetchedOrdersData.limit && (
        <OrderTabPagination order={fetchedOrdersData} />
      )}
    </SettingsLayout>
  );
}
