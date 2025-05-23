import Invoice from "@/components/global/invoice";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/providers/redux/hook";
import { IFlatOrderItem } from "@/types/orderTypes";

type Props = {
  orders: IFlatOrderItem;
  totalQty: number;
  index: number;
};

const OrderDetailsSummary = ({ orders }: Props) => {
  // console.log(orders, "orders");
  const { userKyc } = useAppSelector((state) => state.auth);

  // console.log(user);
  

  return (
    <div className="bg-white p-3 rounded-lg space-y-3">
      <div className="flex justify-between">
        <h5 className="text-xl font-semibold">Order Summery</h5>
        <Invoice orders={orders.order} storeOrders={orders.store} />
      </div>
      {/* details 1.*/}
      <div className="grid grid-cols-3">
        <span className="">Item(s) Subtotal</span>
        <span className="text-center">
          {orders.order.order_total.total_products} items{" "}
        </span>
        <span className="text-end">₹{orders.order.order_total.sub_total} </span>
      </div>
      {/* details 2.*/}
      {orders.order.coupon && (
        <div className="grid grid-cols-3">
          <span className="">Coupon Discount</span>
          <span className="text-center">{orders.order.coupon}</span>
          <span className="text-end">
            ₹{orders.order.order_total.coupon_discount}{" "}
          </span>
        </div>
      )}

      {/* details 3.*/}
      <div className="grid grid-cols-3">
        <span className="">Discount</span>
        <span className="text-center">Product</span>
        <span className="text-end">
          ₹ {orders.order.order_total.cart_discount}{" "}
        </span>
      </div>

      {/* details 3.*/}
      {orders.product.tax_details.non_gst_goods === "no" && (
        <div className="grid grid-cols-3">
          <span className="">GST</span>
          <span className="text-center">
            {orders.store.store_info.gstNumber.slice(0, 2) ===
            userKyc?.gstNumber?.slice(0, 2)
              ? "SGST + CGST"
              : "IGST"}
          </span>
          <span className="text-end">₹ {orders.order.order_total.gst}</span>
        </div>
      )}

      {/* details 3.*/}
      <div className="grid grid-cols-3">
        <span className="">Taxable Amount</span>
        <span className="text-center"></span>
        <span className="text-end">
          ₹ {orders.order.order_total.taxable_amount}{" "}
        </span>
      </div>
      <Separator />

      {/* details 4.*/}
      {
        orders.order.order_total.cart_discount > 0 || orders.order.order_total.coupon_discount > 0 && (
           <div className="grid grid-cols-3">
        <span className="text-green-500 capitalize font-semibold text-lg">
          you Saved
        </span>

        <span className="text-end col-span-2 text-green-500 font-semibold text-lg">
          ₹{" "}
          {(orders.order.order_total.cart_discount ?? 0) +
            (orders.order.order_total.coupon_discount ?? 0)}{" "}
        </span>
      </div>
        )
      }
     
      {/* details 5.*/}
      <div className="grid grid-cols-3">
        <span className="text-black font-semibold text-lg">Total</span>

        <span className="text-end col-span-2 font-semibold text-lg">
          ₹ {orders.order.order_total.total_amount}{" "}
        </span>
      </div>
    </div>
  );
};

export default OrderDetailsSummary;
