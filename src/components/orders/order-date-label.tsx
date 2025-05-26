import { IOrders, IStoreOrder } from "@/types/orderTypes";
import { DeliveredOrderIconSvg, ReturnOrderIconSvg } from "../icons/glob-icon";
import MyClock from "../myUi/MyClock";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  store: IStoreOrder;
  order: IOrders;
};

const OrderDateLabel = ({ store, order }: Props) => {
  return (
    <div className="flex sm:items-center sm:flex-row flex-col gap-3">
      <div className="flex items-center gap-1 sm:border-r sm:pr-2">
        <span className=" text-[#667085] text-xs ">Order Date :</span>

        <MyClock
          className="text-xs text-black"
          date={order.createdAt}
          showSeconds={false}
          showTime={false}
          use12Hour
        />
      </div>

      {store.order_status === "delivered" ? (
        <>
          {store.is_returned ? (
            <div className="text-[#92400E] flex items-center gap-1">
              <ReturnOrderIconSvg color="#92400E" />

              <span className="text-[#92400E]">
                Order Returned:{" "}
                <MyClock
                  className="text-[#92400E]"
                  addDays={10}
                  date={store.return_action_date}
                  showSeconds={false}
                  showTime={false}
                  use12Hour
                />
              </span>
            </div>
          ) : (
            <div className="text-black flex items-center gap-1">
              <DeliveredOrderIconSvg />

              <span className="text-black">
                Delivered in :{" "}
                <MyClock
                  className="text-black"
                  addDays={10}
                  date={store.delivery_date}
                  showSeconds={false}
                  showTime={false}
                  use12Hour
                />
              </span>
            </div>
          )}
        </>
      ) : store.order_status === "cancelled" ? (
        <div className="text-[#991B1B] flex items-center gap-1">
          <span className="text-[#991B1B]">
            Order Cancelled:{" "}
            <MyClock
              className="text-[#991B1B]"
              addDays={10}
              date={store.return_action_date}
              showSeconds={false}
              showTime={false}
              use12Hour
            />
          </span>
        </div>
      ) : (
        <div className="text-green-500 flex items-center gap-1">
          <Icon icon="hugeicons:delivery-truck-01" />

          <span className="text-green-500">
            Estimated delivery:{" "}
            <MyClock
              className="text-green-500"
              addDays={10}
              date={order.createdAt}
              showSeconds={false}
              showTime={false}
              use12Hour
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderDateLabel;
