import { IOrders, IOrdersType } from "@/types/orderTypes";
import Image from "@/components/global/image";
import { encodeId } from "@/utils/encorder";
import VerifiedLabel from "@/components/global/verivied-label";
import MyClock from "@/components/myUi/MyClock";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
// import InvoicePdf from "@/components/global/invoice"

import TrackInvoiceBtn from "@/components/orders/order-buttons/track-invoice-btn";
import useNavigateClicks from "@/hooks/useClicks";
import AyButton from "@/components/myUi/AyButton";
import OrderStepperOne from "@/components/orders/orders-steppers/order_stepper_one";

type Props = {
  orders: IOrdersType;
  filteredOrder: IOrders[];
};

export default function OrderTab({  filteredOrder }: Props) {
  // const [showRawJson, setShowRawJson] = useState(false);

  // const handleDelete = () => {
  //   const id = window.prompt("Enter the Order ID to delete:");
  //   if (id) {
  //     if (id === "all") {
  //       return API.delete(`/api/order/orders`, {
  //         withCredentials: true,
  //       });
  //     }
  //     API.delete(`/api/order/orders`, {
  //       params: { id },
  //       withCredentials: true,
  //     })
  //       .then(() => alert("Order deleted successfully."))
  //       .catch(() => alert("Failed to delete the order."));
  //   }
  // };

  const { handleClick } = useNavigateClicks();

  const supports = [
    {
      id: 1,
      title: "Product Support",
      link: "",
    },
    {
      id: 2,
      title: "Leave Seller Feedback",
      link: "",
    },
    {
      id: 3,
      title: "Rate & Review this product",
      link: "",
    },
  ];

  return (
    <section className="space-y-2  bg-[#F9F9F9]">
       <OrderStepperOne />
      {/* <div className="flex items-center justify-between">
        <h3 className="text-sm underline">
          Showing {filteredOrder.length} of {orders.orders.length} orders
        </h3>
        <button
          onClick={() => setShowRawJson(!showRawJson)}
          className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
        >
          <Icon
            icon={showRawJson ? "lucide:chevron-up" : "lucide:chevron-down"}
            className="inline mr-1"
          />
          {showRawJson ? "Hide" : "Show"} Raw Orders
        </button>
      </div> */}

      {/*

      {showRawJson && (
        <div className="bg-gray-50 p-4 rounded border text-xs overflow-auto max-h-96 whitespace-pre-wrap">
          <pre>{JSON.stringify(orders, null, 2)}</pre>
        </div>
      )} */}

      {/* <button
        className=""
        onClick={() => {
          handleDelete();
        }}
      >
        delete
      </button> */}
      {filteredOrder.map((order) => (
        <div className=" space-y-4" key={order._id}>
          {order.store_orders.map((store) => {
            const totalQty = store.items.reduce((sum, item) => {
              const itemQty = item.product.variations.reduce(
                (varSum, variation) => {
                  return (
                    varSum +
                    variation.details.reduce(
                      (detSum, detail) => detSum + detail.quantity,
                      0
                    )
                  );
                },
                0
              );
              return sum + itemQty;
            }, 0);
            // const filteredStoreItems: IFlatOrderItem[] = filteredOrder.flatMap((order) =>
            //   order.store_orders.flatMap((store2) => {
            //     if (store2.store_order_id !== store.store_order_id) return [];
            //     return store2.items.map((item, index) => ({
            //       ...item,
            //       store: store2,
            //       order: order,
            //       showVerifiedLabel: index === 0,
            //     }));
            //   })
            // );

            return (
              <div className="h-fit w-full sm:p-4 p-2 relative flex flex-col rounded-lg justify-between sm:gap-5 gap-3 bg-white">
                {/* 1. */}
               
                {/* ==== */}
                <div className="flex flex-col gap-3">
                  <div className="w-full flex md:flex-row flex-col justify-between md:items-center gap-3 ">
                    <div className="">
                      <h5 className="font-semibold text-[#344054] sm:text-xl text-lg ">
                        Order Id: {store.store_order_id}
                      </h5>
                    </div>

                    {/* 2 */}
                    <TrackInvoiceBtn orders={order} storeOrders={store} />
                  </div>

                  {/* 1.2 */}
                  <div className="flex items-center sm:flex-row flex-col gap-3">
                    <div className="flex items-center gap-1 sm:border-r sm:pr-2">
                      <span className=" text-[#667085] text-xs ">
                        Order Date :
                      </span>

                      <MyClock
                        className="text-xs text-black"
                        date={order.createdAt}
                        showSeconds={false}
                        showTime={false}
                        use12Hour
                      />
                    </div>

                    {store.order_status === "delivered" ? (
                      <div className="text-black flex items-center gap-1">
                        <Icon icon="hugeicons:package-delivered" />

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
                </div>

                {/* 2. */}

                <Separator />

                {/* 3 . */}

                <VerifiedLabel {...store.store_info} version="v2" />

                <div className="flex flex-col gap-3 max-h-[200px] overflow-auto ">
                  {store.items.map((items) => {
                    return (
                      <div className="flex gap-3 justify-between w-full">
                        {/* 4. */}

                        <div className="flex gap-3">
                          <Image
                            src={items.product.variations[0].image}
                            link={`/my-account/my-orders/${encodeId(order.order_id)}/${encodeId(store.store_order_id)}`}
                            className="h-16 w-16 bg-gray-200 rounded-lg"
                            classNameImg="w-full h-full object-contain"
                          />

                          <div className="flex flex-col gap-1">
                            <span className="capitalize tex-sm text-black overflow-hidden truncate">
                              {items.product.product_name}
                            </span>
                            <span className="text-xs text-black ">
                              Total Quantity : {totalQty}{" "}
                            </span>
                            {store.order_status === "delivered" && (
                              <span className="text-xs text-black ">
                                Return window closed on :{" "}
                                <MyClock
                                  className=" text-xs"
                                  addDays={10}
                                  date={store.delivery_date}
                                  showSeconds={false}
                                  showTime={false}
                                  use12Hour
                                />
                              </span>
                            )}
                          </div>
                        </div>
                        {/* 5. */}
                        {store.order_status === "delivered" && (
                          <div className="flex items-center gap-1">
                            {supports.map((support, index) => (
                              <Link
                                to=""
                                key={index}
                                className="border text-xs p-2 rounded-full bg-[#F9F9F9] text-[#4E4E4E] "
                              >
                                {support.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <AyButton
                    variant="outlined"
                    outLineColor="gray"
                    sx={{
                      fontSize:"0.7rem",
                      color:"black"
                    }}
                    onClick={() => {
                      handleClick(
                        `/my-account/my-orders/${encodeId(order.order_id)}/${encodeId(store.store_order_id)}`
                      );
                    }}
                  >
                   View Orders
                  </AyButton>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* {filteredOrder.map((order) => (
        <div key={order._id} className="flex flex-col justify-between">
          <div className="pt-3 space-y-4">
            {order.store_orders.map((store, index) => {
              if (index === 0) {
                return (
                  <div
                    key={store._id}
                    className="h-fit w-full flex flex-col rounded-lg justify-between gap-5 bg-white"
                  >
                    <InvoicePdf orders={order} storeOrders={store} />
                  </div>
                );
              }
              return null; // Don't forget this to avoid warnings
            })}
          </div>
        </div>
      ))} */}
    </section>
  );
}
