import { Link } from "react-router-dom";
import { orders } from "../my-orders/My-Orders-Page";


export default function ReturnLists() {

    

  return (
    <div className="space-y-4">
    {/* Orders List */}
    {orders.map((order) => (
      <Link
      to={`/my-account/return?tab=refund&slug=${order.slug}`}
        key={order.id}
        className="border sm:p-4 p-1 rounded-lg shadow-sm flex md:flex-row flex-col justify-between"
      >
        {/* Product Details */}
        <div className="flex gap-4">
          <img
            src="/img/products/image 78.png"
            alt="Product Image"
            className="w-24 h-24 rounded-lg object-cover"
          />
          {/* ====== */}
          <div className="flex flex-col justify-between">
            <div className="sm:w-10/12 w-fit">
            <h3 className="font-bold sm:text-lg  text-sm">{order.productName}</h3>
            <p className="text-gray-500 sm:text-sm text-xs">Subtotal: ${order.subtotal}</p>
            </div>
          {/* ============= */}
            <div className="flex sm:gap-10 gap-1 flex-wrap mt-2 ">
              {order.itemQuantity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-500 "
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full  "
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="ml-1 sm:text-sm text-xs">
                    {item.size} x {item.count} times
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* ===== */}
        </div>

        {/* Order Info */}
      
      </Link>
    ))}
  </div>
  )
}