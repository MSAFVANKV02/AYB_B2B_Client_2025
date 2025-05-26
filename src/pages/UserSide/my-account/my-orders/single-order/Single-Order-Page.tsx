// import SettingsLayout from "../../layout";

// import { IFlatOrderItem, IOrders } from "@/types/orderTypes";
// import "@/assets/css/remover.css";

// // import GstDropDown from "@/components/myUi/GstDropDown";
// import { useParams } from "react-router-dom";
// import { decodeId } from "@/utils/encorder";
// import { useQueryData } from "@/hooks/useQueryData";
// import { getAllOrdersAction } from "@/action/checkout/checkoutAction";

// import Loader from "@/components/global/loader";
// import { OrderStatusStepper } from "@/components/orders/order_stepper";
// import SingleOrderActionBtn from "@/components/orders/single-order-widgets/single-order-action-btn";
// import MyClock from "@/components/myUi/MyClock";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { Separator } from "@/components/ui/separator";
// import VerifiedLabel from "@/components/global/verivied-label";
// import DetailedProductOverview from "@/components/orders/single-order-widgets/detailed-product-overview";

// export default function SingleOrderPage() {
//   const { orderId, storeOrderId } = useParams();
//   const decodedOrderId = decodeId(orderId ?? "");
//   const decodedStoreOrderId = decodeId(storeOrderId ?? "");

//   // const onlyWidth = useWindowWidth();
//   // const { handleClick } = useNavigateClicks();

//   const {
//     data: fetchedOrders,
//     isFetching,
//     refetch,
//   } = useQueryData(
//     ["order-details", orderId, storeOrderId],
//     async () => {
//       const res = await getAllOrdersAction([
//         { key: "order_id", value: decodedOrderId },
//       ]);

//       // console.log(res,'res res');

//       if (res?.status === 200 && res.data) {
//         // Perform your flatMap logic here directly after validating response
//         // const filteredItems: IFlatOrderItem[] = res.data.orders.flatMap(
//         //   (order: IOrders) =>
//         //     order.store_orders.flatMap((store) =>
//         //       store.items
//         //         .filter((item) => item.product_order_id === decodedStoreOrderId)
//         //         .map((item, index) => ({
//         //           ...item,
//         //           store,
//         //           order,
//         //           showVerifiedLabel: index === 0,
//         //         }))
//         //     )
//         // );
//         const filteredItems: IFlatOrderItem[] = res.data.orders.flatMap(
//           (order: IOrders) =>
//             order.store_orders
//               .filter((store) => store.store_order_id === decodedStoreOrderId) // filter stores here
//               .flatMap((store) =>
//                 store.items.map((item, index) => ({
//                   ...item,
//                   store,
//                   order,
//                   showVerifiedLabel: index === 0,
//                 }))
//               )
//         );

//         // Return in the proper structure
//         return {
//           status: res.status,
//           data: filteredItems,
//         };
//       }

//       return { status: 500, data: [] };
//     },
//     { disableRefetch: true }
//   );

//   // Properly type the returned data
//   const orders: IFlatOrderItem[] = fetchedOrders?.data ?? [];

//   // const { data: orders } = (fetchedOrders ?? {}) as {
//   //   status?: number;
//   //   data?: IOrdersType;
//   // };

//   // console.log(fetchedOrders, "fetchedOrdersData");
//   if (isFetching) {
//     return (
//       <SettingsLayout>
//         <div className="h-[80dvh] flex justify-center items-center">
//           <Loader state={isFetching} color="gray" />
//         </div>
//       </SettingsLayout>
//     );
//   }

//   return (
//     <SettingsLayout>
//       <div className="flex h-fit lg:flex-row min-h-[80dvh] gap-5 flex-col justify-between">
//         <div className="flex flex-col gap-4 lg:w-[70%] w-full ">
//           {/* <div className="bg-gray-50 p-4 rounded border text-xs overflow-auto max-h-96 whitespace-pre-wrap">
//             <pre>{JSON.stringify(orders[0].store.delivery_date, null, 2)}</pre>
//           </div> */}

//           {/* <MyBackBtn icon={"bx:arrow-back"} /> */}

//           <div className="w-full flex justify-between">
//             <h5 className="text-xl font-semibold">Order Details</h5>
//             {/* 1. */}
//             <SingleOrderActionBtn orders={orders[0]} />
//           </div>
//           {orders?.map((item, index) => {
//             const totalQty = item.store.items.reduce((sum, item) => {
//               const itemQty = item.product.variations.reduce(
//                 (varSum, variation) => {
//                   return (
//                     varSum +
//                     variation.details.reduce(
//                       (detSum, detail) => detSum + detail.quantity,
//                       0
//                     )
//                   );
//                 },
//                 0
//               );
//               return sum + itemQty;
//             }, 0);
//             return (
//               <div className="flex flex-col gap-4" key={index}>
//                 {/* 2. shipping and payment section =======
//               ==================================== */}
//                 <div className="bg-white p-3 rounded-lg grid lg:grid-cols-2 grid-cols-1">
//                   {/* a. grid 1 ---- */}
//                   <div className="flex flex-col gap-2">
//                     <span className="font-semibold text-sm">Ship to:</span>
//                     <div className="w-3/4 flex flex-col">
//                       <span className="">
//                         {item.order.shipping_address.name}
//                       </span>
//                       <span className="">
//                         {item.order.shipping_address.street}
//                       </span>
//                       <span className="">
//                         {item.order.shipping_address.state},{" "}
//                         {item.order.shipping_address.country}
//                       </span>
//                     </div>
//                   </div>
//                   {/* b. grid 2 ---- */}
//                   <div className="flex flex-col gap-2">
//                     <span className="font-semibold text-sm">
//                       Payment method
//                     </span>

//                     <div className="">
//                       {item.order.payment_method === "offline_payment" ? (
//                         <div className="flex flex-col">
//                           <span className="">
//                             <b className="text-black">Payment Method : </b>
//                             Offline Payment
//                           </span>
//                           <span className="">
//                             <b className="text-black">Payment Type : </b>
//                             {item.order.payment_details.payment_type}
//                           </span>
//                         </div>
//                       ) : (
//                         <div className="flex flex-col">
//                           <span className="capitalize">
//                             <b className="text-black">Payment Method : </b>
//                             {item.order.payment_method}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* 3. Order Product Details section =======
//               ==================================== */}
//                 <div className="bg-white p-3 rounded-lg flex flex-col gap-3 ">
//                   <div className="flex flex-col">
//                     <h5 className="font-semibold text-[#344054] text-xl ">
//                       Order Id: {item.store.store_order_id}
//                     </h5>
//                     {/* ---------- */}
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center gap-1 border-r pr-2">
//                         <span className=" text-[#667085] text-xs ">
//                           Order Date :
//                         </span>

//                         <MyClock
//                           className="text-xs text-black"
//                           date={item.order.createdAt}
//                           showSeconds={false}
//                           showTime={false}
//                           use12Hour
//                         />
//                       </div>

//                       {item.store.order_status === "delivered" ? (
//                         <div className="text-black flex items-center gap-1">
//                           <Icon icon="hugeicons:package-delivered" />

//                           <span className="text-black">
//                             Delivered in :{" "}
//                             <MyClock
//                               className="text-black"
//                               addDays={10}
//                               date={item.store.delivery_date}
//                               showSeconds={false}
//                               showTime={false}
//                               use12Hour
//                             />
//                           </span>
//                         </div>
//                       ) : (
//                         <div className="text-green-500 flex items-center gap-1">
//                           <Icon icon="hugeicons:delivery-truck-01" />

//                           <span className="text-green-500">
//                             Estimated delivery:{" "}
//                             <MyClock
//                               className="text-green-500"
//                               addDays={10}
//                               date={item.order.createdAt}
//                               showSeconds={false}
//                               showTime={false}
//                               use12Hour
//                             />
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     {/* ---------- */}
//                   </div>
//                   <Separator />

//                   {item.showVerifiedLabel && (
//                     <VerifiedLabel {...item.store.store_info} version="v2" />
//                   )}

//                   {/* 4. detail of products ======== */}
//                   <DetailedProductOverview totalQty={totalQty} orders={item} />
//                 </div>
//               </div>
//             );
//           })
//           }
//         </div>

//         <div className="lg:w-[30%] w-full ">
//           <div className="sticky top-4 bg-white p-3 rounded-lg shadow-sm">
//             {/* <OrderStatusStepper order={orders} /> */}

//             <OrderStatusStepper orderDetails={orders} refetch={refetch} />
//           </div>
//         </div>
//       </div>

//       {/* <div className="mt-20 sticky bottom-0 bg-white pb-5">
//         <Separator />
//         <div className="flex justify-between my-5 gap-2 flex-wrap">
//           <button type="button" className="text-sm text-gray-500 hover:underline">
//             Cancel Order
//           </button>
//           <div className="flex sm:items-center sm:gap-4 gap-2 flex-wrap">
//             <button className="underline underline-offset-4 text-sm">
//               Chat with us
//             </button>

//             <AyButton
//               title="Rate & review this product"
//               onClick={() => handleClick(`${window.location.pathname}/review/4353453453453`)}
//               variant="outlined"
//               outLineColor="#CACACA"
//               sx={{
//                 width: "fit-content",
//                 px: "20px",
//                 color: "#5B5B5B",
//                 ml: onlyWidth > 768 ? "2rem" : "",
//               }}
//             />

//             <AyButton
//               title="Invoice"
//               variant="outlined"
//               outLineColor="gray"
//               icon="material-symbols-light:download"
//               iconSize={20}
//               sx={{
//                 width: "fit-content",
//                 px: "20px",
//               }}
//             />
//           </div>
//         </div>
//       </div> */}
//     </SettingsLayout>
//   );
// }
import SettingsLayout from "../../layout";

import { IFlatOrderItem, IOrders } from "@/types/orderTypes";
import "@/assets/css/remover.css";
import { useParams } from "react-router-dom";
import { decodeId } from "@/utils/encorder";
import { useQueryData } from "@/hooks/useQueryData";
import { getAllOrdersAction } from "@/action/checkout/checkoutAction";

import Loader from "@/components/global/loader";
import { OrderStatusStepper } from "@/components/orders/orders-steppers/order_stepper";
import SingleOrderActionBtn from "@/components/orders/single-order-widgets/single-order-action-btn";

import { Separator } from "@/components/ui/separator";
import VerifiedLabel from "@/components/global/verivied-label";
import DetailedProductOverview from "@/components/orders/single-order-widgets/detailed-product-overview";
import OrderSummary from "@/components/orders/single-order-widgets/order-detials-summary";
import MyBackBtn from "@/components/myUi/myBackBtn";

import OrderDateLabel from "@/components/orders/order-date-label";

export default function SingleOrderPage() {
  const { orderId, storeOrderId } = useParams();
  const decodedOrderId = decodeId(orderId ?? "");
  const decodedStoreOrderId = decodeId(storeOrderId ?? "");

  const {
    data: fetchedOrders,
    isFetching,
    refetch,
  } = useQueryData(
    ["order-details", orderId, storeOrderId],
    async () => {
      const res = await getAllOrdersAction([
        { key: "order_id", value: decodedOrderId },
      ]);
      if (res?.status === 200 && res.data) {
        const filteredItems: IFlatOrderItem[] = res.data.orders.flatMap(
          (order: IOrders) =>
            order.store_orders
              .filter((store) => store.store_order_id === decodedStoreOrderId)
              .flatMap((store) =>
                store.items.map((item, index) => ({
                  ...item,
                  store,
                  order,
                  showVerifiedLabel: index === 0,
                }))
              )
        );
        return { status: res.status, data: filteredItems };
      }
      return { status: 500, data: [] };
    },
    { disableRefetch: true }
  );

  const orders: IFlatOrderItem[] = fetchedOrders?.data ?? [];

  if (isFetching) {
    return (
      <SettingsLayout>
        <div className="h-[80dvh] flex justify-center items-center">
          <Loader state={isFetching} color="gray" />
        </div>
      </SettingsLayout>
    );
  }

  // Group items by product_id
  const grouped = orders.reduce<Record<string, IFlatOrderItem[]>>(
    (acc, item) => {
      const key = item.product_id;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {}
  );

  const groupedOrders = Object.values(grouped);

  return (
    <SettingsLayout>
      <div className="flex h-fit lg:flex-row min-h-[80dvh] gap-5 flex-col justify-between">
        <div className="flex flex-col sm:gap-4 gap-3 lg:w-[70%] w-full">
          <MyBackBtn icon={"bx:arrow-back"} />
          <div className="w-full flex sm:flex-row flex-col gap-3 justify-between">
            <h5 className="text-xl font-semibold">Order Details</h5>
            {/* <SingleOrderActionBtn orders={orders[0]} /> */}
            <SingleOrderActionBtn />

          </div>

          {groupedOrders.map((group, index) => {
            const firstItem = group[0];
            const { order, store } = firstItem;

            const totalQty = group.reduce((sum, item) => {
              const itemQty = item.product.variations.reduce(
                (varSum, variation) =>
                  varSum +
                  variation.details.reduce(
                    (detSum, detail) => detSum + detail.quantity,
                    0
                  ),
                0
              );
              return sum + itemQty;
            }, 0);

            return (
              <div className="flex flex-col gap-4" key={index}>
                {/* Shipping + Payment Info */}
                {index === 0 && (
                  <div className="bg-white p-3 rounded-lg flex md:flex-row flex-col md:gap-0 gap-3">
                    <div className="flex flex-col gap-2 md:w-1/2 w-full break-words whitespace-pre-line">
                      <span className="font-semibold text-sm">Ship to:</span>
                      <div className="md:w-3/4 w-full flex flex-col">
                        <span>{order.shipping_address.name}</span>
                        <span>{order.shipping_address.street}</span>
                        <span>
                          {order.shipping_address.state},{" "}
                          {order.shipping_address.country}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:w-1/2 w-full">
                      <span className="font-semibold text-sm">
                        Payment Details
                      </span>
                      <div>
                        {order.payment_method === "offline_payment" ? (
                          <div className="flex flex-col">
                            <span>
                              <b className="text-black">Payment Method : </b>
                              Offline Payment
                            </span>
                            <span>
                              <b className="text-black">Payment Type: </b>
                              {order.payment_details.payment_type}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className="capitalize">
                              <b className="text-black">Payment Method: </b>
                              {order.payment_method}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Overview */}
                <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                  {index === 0 && (
                    <div className="flex flex-col">
                      <h5 className="font-semibold text-[#344054] sm:text-xl ">
                        Order Id: {store.store_order_id}
                      </h5>
                      {/* dates started */}
                      <OrderDateLabel store={store} order={order} />
                    </div>
                  )}

                  <Separator />

                  {firstItem.showVerifiedLabel && (
                    <VerifiedLabel {...store.store_info} version="v2" />
                  )}

                  {/* Grouped Variations */}
                  {group.map((variationItem, vi) => (
                    <DetailedProductOverview
                      key={vi}
                      index={vi}
                      totalQty={totalQty}
                      orders={variationItem}
                    />
                  ))}
                </div>
                {}

                {/* 3. order summary */}
                <OrderSummary
                  index={index}
                  orders={firstItem}
                  totalQty={totalQty}
                />
              </div>
            );
          })}
        </div>

        <div className="lg:w-[30%] w-full">
          <div className="sticky top-4 bg-white p-3 rounded-lg shadow-sm">
            <OrderStatusStepper orderDetails={orders} refetch={refetch} />
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
}
