import { useQueryData } from "@/hooks/useQueryData";
import SettingsLayout from "../../layout";
import { useSearchParams } from "react-router-dom";
import { IOrders, IOrdersType } from "@/types/orderTypes";
import { useSearchFn } from "@/hooks/useSeach-Fn";
import { useMemo } from "react";
import Loader from "@/components/global/loader";
import { Input } from "@/components/ui/input";
import { getAllReturnedOrdersAction } from "@/action/orders/odrerAction";



const ReturnOrderPage = () => {
  const [searchParams] = useSearchParams();
  const pageQ = searchParams.get("page") ?? "1";
  const type = searchParams.get("type") ?? "pending";

  const { data: fetchedReturnOrders, isFetching } = useQueryData(
    ["return-orders", pageQ, type],
    () =>
      getAllReturnedOrdersAction([
        { key: "page", value: pageQ },
        { key: "status", value: type },
        // {key:"limit", value: "1"},
      ])
  );

  const { data: orders } = (fetchedReturnOrders ?? {}) as {
    status?: number;
    data?: IOrdersType;
  };

  const orderList = useMemo(() => {
    return orders?.orders ?? [];
  }, [orders]);

  const { filteredData: filteredOrders, handleSearch } = useSearchFn<IOrders>(
    orderList ?? []
  );

  if (isFetching) {
    return (
      <SettingsLayout>
        <div className="h-[80dvh] flex justify-center items-center">
          <Loader state={isFetching} color="gray" />
        </div>
      </SettingsLayout>
    );
  }

  console.log(orders, "fetchedOrdersData");
  return (
    <SettingsLayout>
      <pre className="text-xs">{JSON.stringify(filteredOrders, null, 4)}</pre>
      <div className="flex lg:items-center lg:flex-row flex-col justify-between sm:gap-4 gap-2 ">
        <div className="sm:w-1/2">
          <h4 className="sm:text-2xl text-xl">Return Orders</h4>
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
    </SettingsLayout>
  );
};

export default ReturnOrderPage;
