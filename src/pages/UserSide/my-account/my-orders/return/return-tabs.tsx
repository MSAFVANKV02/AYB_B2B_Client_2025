import MyClock from "@/components/myUi/MyClock";
import ReturnTabTables from "@/components/orders/return-order-sec/get/return-tab-tables";
import { IReturnOrders } from "@/types/return_order_types";

type Props = {
  orders: IReturnOrders;
};

const ReturnTabsMain = ({ orders }: Props) => {
  return (
    <div className="border   rounded-md flex flex-col gap-2">
      {/* 1 */}
      <div className=" sm:px-5 px-2 py-3 space-y-2">
        <div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between">
          <p className="xm:text-sm text-xs font-medium">
            Return ID: {orders.return_id}
          </p>

          <p className="xm:text-sm text-xs font-medium">
            Date Submitted : {""}
            <span className="xm:text-sm text-xs">
              <MyClock
                date={orders.createdAt}
                showSeconds={false}
                showTime={false}
                className="text-xs"
              />
            </span>
          </p>
        </div>
        <div className="">
          <p className="xm:text-sm text-xs font-medium">
            Store Name : {""}
            <span className="xm:text-sm text-xs">{orders.store_id.name}</span>
          </p>
        </div>
      </div>

      {/* 2. table starting here =======
      ================================ */}
      <ReturnTabTables products={orders.items} />
    </div>
  );
};

export default ReturnTabsMain;
