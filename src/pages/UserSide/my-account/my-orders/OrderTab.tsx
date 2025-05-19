// import { useState } from "react";
// import { IOrders, IOrdersType } from "@/types/orderTypes";
// import { Link } from "react-router-dom";
// import { Icon } from "@iconify/react";

// type Props = {
//   orders: IOrdersType;
//   filteredOrder: IOrders[];
// };

// export default function OrderTab({ orders, filteredOrder }: Props) {
//   const [openJsonIndexes, setOpenJsonIndexes] = useState<number[]>([]);

//   const toggleJsonView = (index: number) => {
//     setOpenJsonIndexes((prev) =>
//       prev.includes(index)
//         ? prev.filter((i) => i !== index)
//         : [...prev, index]
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div className="text-sm font-medium text-gray-700">
//         Total Orders: {orders.orders.length} | Filtered: {filteredOrder.length}
//       </div>

//       {orders.orders.map((order, index) => (
//         <div key={order._id} className="border rounded p-4 bg-white shadow-sm space-y-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-semibold">{order.order_id}</p>
//               <p className="text-xs text-gray-500">
//                 Customer: {order.customer_id?.name} | Created: {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//             <button
//               onClick={() => toggleJsonView(index)}
//               className="text-xs flex items-center gap-1 text-blue-600 hover:underline"
//             >
//               <Icon icon={openJsonIndexes.includes(index) ? "lucide:chevron-up" : "lucide:chevron-down"} />
//               {openJsonIndexes.includes(index) ? "Hide" : "Show"} JSON
//             </button>
//           </div>

//           {openJsonIndexes.includes(index) && (
//             <pre className="text-xs bg-gray-100 p-2 rounded max-h-80 overflow-auto">
//               {JSON.stringify(order, null, 2)}
//             </pre>
//           )}
//         </div>
//       ))}

//       <hr className="my-6" />

//       <div className="text-sm font-medium text-gray-700">Filtered Orders</div>

//       {filteredOrder.map((order) => (
//         <Link
//           to={`/my-account/my-orders/${order._id}`}
//           key={order._id}
//           className="block border p-3 rounded bg-gray-50 hover:bg-gray-100 transition"
//         >
//           <p className="text-sm font-semibold">Order ID: {order.order_id}</p>
//           <p className="text-xs text-gray-500">
//             Payment: {order.payment_status} | Delivery: {order.deliveryStatus ?? "N/A"}
//           </p>
//         </Link>
//       ))}
//     </div>
//   );
// }

import { useState } from "react";
import { IOrders, IOrdersType } from "@/types/orderTypes";
import { Icon } from "@iconify/react";
import Image from "@/components/global/image";
import { encodeId } from "@/utils/encorder";
import { API } from "@/services/user_side_api/auth/route_url";
import VerifiedLabel from "@/components/global/verivied-label";

type Props = {
  orders: IOrdersType;
  filteredOrder: IOrders[];
};

export default function OrderTab({ orders, filteredOrder }: Props) {
  const [showRawJson, setShowRawJson] = useState(false);

  const handleDelete = () => {
    const id = window.prompt("Enter the Order ID to delete:");
    if (id) {
      if (id === "all") {
        return API.delete(`/api/order/orders`, {
          withCredentials: true,
        });
      }
      API.delete(`/api/order/orders`, {
        params: { id },
        withCredentials: true,
      })
        .then(() => alert("Order deleted successfully."))
        .catch(() => alert("Failed to delete the order."));
    }
  };

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
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
      </div>

      <button
        className=""
        onClick={() => {
          handleDelete();
        }}
      >
        delete
      </button>

      {showRawJson && (
        <div className="bg-gray-50 p-4 rounded border text-xs overflow-auto max-h-96 whitespace-pre-wrap">
          <pre>{JSON.stringify(orders, null, 2)}</pre>
        </div>
      )}

      {filteredOrder.map((order) => (
        <div
          // to={`/my-account/my-orders/${order._id}`}
          key={order._id}
          className="  shadow-sm flex  flex-col justify-between"
        >
          {/* <div>
            <p className="text-sm ">Order ID: {order.order_id}</p>
            <p className="text-sm font-medium">ID: {order._id}</p>

            <p className="text-xs text-gray-500">
              Status: {order.payment_status} | Created: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div> */}
          <div className="pt-3 space-y-4">
            {order.store_orders.map((store) => {
              return (
                <div className="h-fit w-full p-2 border flex flex-col justify-between gap-3">
                  <VerifiedLabel {...store.store_info} />

                  <div>
                    <p className="text-sm ">Order ID: {store.store_order_id}</p>

                    <p className="text-xs text-gray-500">
                      Status: {order.payment_status} | Created:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {store.items.map((items) => {
                      return (
                        <div className="">
                          {/* 2. */}

                          <Image
                            src={items.product.variations[0].image}
                            link={`/my-account/my-orders/${encodeId(order.order_id)}/${encodeId(items.product_order_id)}`}
                            className="h-16 w-16 bg-gray-200"
                            classNameImg="w-full h-full object-contain"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
