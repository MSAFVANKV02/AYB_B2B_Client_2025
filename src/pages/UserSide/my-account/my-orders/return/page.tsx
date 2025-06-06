import { useQueryData } from "@/hooks/useQueryData";
import SettingsLayout from "../../layout";
import { useSearchParams } from "react-router-dom";
import { useSearchFn } from "@/hooks/useSeach-Fn";
import { useMemo } from "react";
import Loader from "@/components/global/loader";
import { getAllReturnedOrdersAction } from "@/action/orders/odrerAction";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReturnTabsMain from "./return-tabs";
import { IReturnOrders, IReturnOrderTypes } from "@/types/return_order_types";
import { OrderNotFoundSvgIcon } from "@/components/icons/glob-icon";
import { useModal } from "@/providers/context/modal-context";
import ReturnTablesProductDetails from "@/components/orders/return-order-sec/get/return-tables-product-details";

const ReturnOrderPage = () => {
  const { modalState } = useModal();

  const [searchParams] = useSearchParams();
  const pageQ = searchParams.get("page") ?? "1";
  const type = searchParams.get("type") ?? "pending";

  const { data: fetchedReturnOrders, isFetching } = useQueryData(
    ["return-orders", pageQ, type],
    () =>
      getAllReturnedOrdersAction([
        { key: "page", value: pageQ },
        // {key:"limit", value: "1"},
      ])
  );

  const { data: orders } = (fetchedReturnOrders ?? {}) as {
    status?: number;
    data?: IReturnOrderTypes;
  };

  const orderList = useMemo(() => {
    return orders?.return_orders ?? [];
  }, [orders]);

  const { filteredData: filteredOrders } =
    useSearchFn<IReturnOrders>(orderList ?? []);

  if (isFetching) {
    return (
      <SettingsLayout>
        <div className="h-[80dvh] flex justify-center items-center">
          <Loader state={isFetching} color="gray" />
        </div>
      </SettingsLayout>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <SettingsLayout>
        <div className="h-[60dvh] select-none flex flex-col justify-center gap-7 items-center">
          <div className="">
            <OrderNotFoundSvgIcon />
          </div>
          <div className="">
            <p className="text-center font-medium">
              You haven’t requested <br />
              any returns or replacements yet.
            </p>
          </div>
        </div>
      </SettingsLayout>
    );
  }

  // console.log(orders, "fetchedOrdersData");
  return (
    <SettingsLayout className="space-y-5">
      {/* <pre className="text-xs h-[200px] overflow-auto">{JSON.stringify(filteredOrders, null, 4)}</pre> */}
      <div className="flex lg:items-center lg:flex-row flex-col justify-between sm:gap-4 gap-2 ">
        <div className="sm:w-1/2">
          <h4 className="sm:text-2xl text-lg">Return / Replacement History</h4>
        </div>
        <div className="flex items-center ">
          <Select>
            <SelectTrigger className="w-[150px] text-xs">
              <SelectValue placeholder="Sort by: All" className="text-xs" />
            </SelectTrigger>
            <SelectContent className="text-xs text-blue-500 ">
              <SelectItem
                style={{
                  fontSize: "10px",
                }}
                value="rejected"
              >
                {" "}
                <span className="text-xs">Rejected</span>
              </SelectItem>
              <SelectItem value="approved">
                {" "}
                <span className="text-xs">Approved</span>
              </SelectItem>
              <SelectItem value="all">
                {" "}
                <span className="text-xs">All</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {modalState.isOpen && modalState.type === "return-product-details" ? (
        <div className="">
          <ReturnTablesProductDetails />
        </div>
      ) : (
        filteredOrders.map((orders) => {
          return <ReturnTabsMain orders={orders} />;
        })
      )}
    </SettingsLayout>
  );
};

export default ReturnOrderPage;
