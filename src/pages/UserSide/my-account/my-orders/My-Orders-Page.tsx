
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

// type IOrderTabs = "Order" | "Replace";

export default function MyOrdersPage() {

  const [searchParams] = useSearchParams();
  const pageQ = searchParams.get("page") ?? "1";

  const { data: fetchedBannerImages, isFetching } = useQueryData(
    ["banner-images", pageQ],
    () =>
      getAllOrdersAction([
        { key: "page", value: pageQ },
        // {key:"limit", value: "1"},
      ]),
    { disableRefetch: true }
  );

  const { data: fetchedOrdersData } = (fetchedBannerImages ?? {}) as {
    status?: number;
    data?: IOrdersType;
  };

  const orderList = fetchedOrdersData?.orders ?? [];

  const {
    filteredData: filteredOrders,
    handleSearch,
  } = useSearchFn<IOrders>(orderList);

  if (isFetching) {
    return (
      <SettingsLayout>
        <div className="h-[80dvh] flex justify-center items-center">
          <Loader state={isFetching} color="gray" />
        </div>
      </SettingsLayout>
    );
  }

  if (!fetchedOrdersData) return null;
  return (
    <SettingsLayout>
      {/* Search & Filter Controls */}
      
      <div className="flex lg:items-center lg:flex-row flex-col justify-between sm:gap-4 ">
        <div className="w-1/2">
          <h4 className="text-2xl">
            My Orders
          </h4>
        </div>
        <div className="flex items-center w-1/2 border rounded-[10px] overflow-hidden">
          <Input
            type="search"
            placeholder="Fast Search..."
            onChange={handleSearch}
            className="border  text-xs rounded-xl   flex-grow focus:outline-none border-none"
          />
        </div>
      </div>

      <MyPageTab
        tabsListCss="border-b-2 rounded-none border-gray-300 w-fit p-0 bg-transparent"
        triggerActiveCss="relative text-black border-none shadow-none data-[state=active]:shadow-none data-[state=active]:bg-[#F9F9F9] font-semibold after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:h-[2px] after:w-full after:bg-black"
        triggerDefaultCss="text-gray-500 border-none shadow-none"
        tabs={[
          {
            title: "All",
            url: "/my-account/my-orders?type=all",
            value: "all",
            // TriggerCss:
            //   "bg-transparent rounded-none data-[state=active]:text-black min-w-4 px-0 text-start data-[state=active]:bg-red-300 data-[state=active]:shadow-none py-0 ",
            // tabCss:
            //   "bg-transparent text-sm px-0 border-none md:rounded-none rounded-none bg-red-300 space-x-4",
            children: (
              <div className="bg-white mt-5">
                <OrderTab
                  orders={fetchedOrdersData}
                  filteredOrder={filteredOrders}
                />
              </div>
            ),
          },
          {
            title: "Order on process ",
            url: "/my-account/my-orders?type=pending",
            value: "pending",
            children: <div>asa</div>,
          },
        ]}
      />



      {fetchedOrdersData.total > fetchedOrdersData.limit && (
        <OrderTabPagination order={fetchedOrdersData} />
      )}
    </SettingsLayout>
  );
}
