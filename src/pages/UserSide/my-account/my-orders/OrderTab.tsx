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
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Image from "@/components/global/image";

type Props = {
  orders: IOrdersType;
  filteredOrder: IOrders[];
};

export default function OrderTab({ orders, filteredOrder }: Props) {
  const [showRawJson, setShowRawJson] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Showing {filteredOrder.length} of {orders.orders.length} orders
        </h3>
        <button
          onClick={() => setShowRawJson(!showRawJson)}
          className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
        >
          <Icon icon={showRawJson ? "lucide:chevron-up" : "lucide:chevron-down"} className="inline mr-1" />
          {showRawJson ? "Hide" : "Show"} Raw Orders
        </button>
      </div>

      {showRawJson && (
        <div className="bg-gray-50 p-4 rounded border text-xs overflow-auto max-h-96 whitespace-pre-wrap">
          <pre>{JSON.stringify(orders.orders, null, 2)}</pre>
        </div>
      )}

      {filteredOrder.map((order) => (
        <Link
          to={`/my-account/my-orders/${order._id}`}
          key={order._id}
          className="border sm:p-4 p-2 rounded-lg shadow-sm flex  flex-col justify-between"
        >
          <div>
            <p className="text-sm font-medium">Order ID: {order.order_id}</p>
            <p className="text-xs text-gray-500">
              Status: {order.payment_status} | Created: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
         <div className="pt-3 space-y-4">
         {
            order.store_orders.map((store)=>{
              return(
                <div className="h-fit w-full border flex flex-col justify-between gap-3">
                  <div className="flex gap-2">
                    <Image
                    src={store.store_info.avatar}
                    className="h-7 w-7 bg-gray-200"
                    classNameImg="w-full h-full object-contain"
                    />
                    <span>
                      {store.store_info?.name}
                    </span>
                  </div>
                  <div className="flex gap-3 p-3">
                    {store.items.map((items)=>{
                      return(
                        <Image
                        src={items.product.variations[0].image}
                        link={`/my-account/my-orders/${items._id}`}
                        className="h-16 w-16 bg-gray-200"
                        classNameImg="w-full h-full object-contain"
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })
          }
         </div>
        </Link>
      ))}
    </div>
  );
}
