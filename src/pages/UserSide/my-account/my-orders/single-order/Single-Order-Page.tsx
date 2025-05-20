import SettingsLayout from "../../layout";

import { Separator } from "@/components/ui/separator";
import { IFlatOrderItem,  IOrders } from "@/types/orderTypes";
import "@/assets/css/remover.css";

import { useWindowWidth } from "@react-hook/window-size";
import useNavigateClicks from "@/hooks/useClicks";
import MyBackBtn from "@/components/myUi/myBackBtn";
import AyButton from "@/components/myUi/AyButton";
// import GstDropDown from "@/components/myUi/GstDropDown";
import { useParams } from "react-router-dom";
import { decodeId } from "@/utils/encorder";
import { useQueryData } from "@/hooks/useQueryData";
import { getAllOrdersAction } from "@/action/checkout/checkoutAction";
import VerifiedLabel from "@/components/global/verivied-label";
import Image from "@/components/global/image";
import Loader from "@/components/global/loader";
import { OrderStatusStepper } from "@/components/orders/order_stepper";


export default function SingleOrderPage() {
  const { orderId, storeOrderId } = useParams();
  const decodedOrderId = decodeId(orderId ?? "");
  const decodedStoreOrderId = decodeId(storeOrderId ?? "");

  const onlyWidth = useWindowWidth();
  const { handleClick } = useNavigateClicks();

  const { data: fetchedOrders, isFetching, refetch } = useQueryData(
    ["order-details",orderId, storeOrderId],
    async () => {
      const res = await getAllOrdersAction([
        { key: "order_id", value: decodedOrderId },
      ]);

      // console.log(res,'res res');
      
  
      if (res?.status === 200 && res.data) {
        // Perform your flatMap logic here directly after validating response
        const filteredItems: IFlatOrderItem[] = res.data.orders.flatMap((order: IOrders) =>
          order.store_orders.flatMap((store) =>
            store.items
              .filter((item) => item.product_order_id === decodedStoreOrderId)
              .map((item, index) => ({
                ...item,
                store,
                order,
                showVerifiedLabel: index === 0,
              }))
          )
        );
  
        // Return in the proper structure
        return {
          status: res.status,
          data: filteredItems,
        };
      }
  
      return { status: 500, data: [] };
    },
    { disableRefetch: true }
  );
  
  // Properly type the returned data
  const orders: IFlatOrderItem[] = fetchedOrders?.data ?? [];
  // const order: IOrder = {
  //   id: 1,
  //   slug: "order-12345",
  //   productName: "Smartphone",
  //   subtotal: 550,
  //   orderDate: "2024-11-01",
  //   deliveryDate: "2024-11-05",
  //   OrderStatus: "Confirmed",
  //   deliveryStatus: "Pending",
  //   paymentStatus: "Confirmed",
  //   itemQuantity: [
  //     { size: "M", count: 1, color: "Black" },
  //     { size: "M", count: 1, color: "red" },
  //   ],
  // };

  // const { data: orders } = (fetchedOrders ?? {}) as {
  //   status?: number;
  //   data?: IOrdersType;
  // };

  // console.log(fetchedOrders, "fetchedOrdersData");
  if (isFetching) {
    return (
      <SettingsLayout>
        <div className="h-[80dvh] flex justify-center items-center">
          <Loader state={isFetching} color="gray" />
        </div>
      </SettingsLayout>
    );
  }

  return (
    <SettingsLayout>
      <div className="flex h-fit lg:flex-row min-h-[80dvh] gap-5 flex-col justify-between">
        <div className="flex flex-col gap-4 lg:w-[70%] w-full bg-white">
          {/* <div className="bg-gray-50 p-4 rounded border text-xs overflow-auto max-h-96 whitespace-pre-wrap">
            <pre>{JSON.stringify(orders[0].store.delivery_date, null, 2)}</pre>
          </div> */}

          <MyBackBtn icon={"bx:arrow-back"} />

          {orders?.map((item, index) => (
            <div className="flex flex-col gap-4" key={index}>
              {item.showVerifiedLabel && (
                <VerifiedLabel {...item.store.store_info} />
              )}

              <Separator />

              <div className="flex md:flex-row flex-col gap-3">
                <Image
                  src={item.product.variations[0].image}
                  className="h-20 w-20 bg-gray-200"
                  classNameImg="w-full h-full object-contain"
                />
                <div className="flex flex-col">
                  <h6>{item.product.product_name}</h6>
                  <div className="flex gap-2 items-center">
                    <b className="text-sm">Sub Total:</b>
                    <span>{item.store.order_total.sub_total}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <b className="text-sm">Sub Total:</b>
                    <span>{item.product_order_id}</span>
                  </div>
                </div>
              </div>

              <Separator />
              <div className="text-sm">No Refund Available</div>
              <div className="text-sm">No Return Policy, Know More</div>
            </div>
          ))}
        </div>

        <div className="lg:w-[30%] w-full ">
          <div className="sticky top-4">
            {/* <OrderStatusStepper order={orders} /> */}
       
            <OrderStatusStepper orderDetails={orders} refetch={refetch}/>
          </div>
        </div>
      </div>

      <div className="mt-20 sticky bottom-0 bg-white pb-5">
        <Separator />
        <div className="flex justify-between my-5 gap-2 flex-wrap">
          <button type="button" className="text-sm text-gray-500 hover:underline">
            Cancel Order
          </button>
          <div className="flex sm:items-center sm:gap-4 gap-2 flex-wrap">
            <button className="underline underline-offset-4 text-sm">
              Chat with us
            </button>

            <AyButton
              title="Rate & review this product"
              onClick={() => handleClick(`${window.location.pathname}/review/4353453453453`)}
              variant="outlined"
              outLineColor="#CACACA"
              sx={{
                width: "fit-content",
                px: "20px",
                color: "#5B5B5B",
                ml: onlyWidth > 768 ? "2rem" : "",
              }}
            />

            <AyButton
              title="Invoice"
              variant="outlined"
              outLineColor="gray"
              icon="material-symbols-light:download"
              iconSize={20}
              sx={{
                width: "fit-content",
                px: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
}

