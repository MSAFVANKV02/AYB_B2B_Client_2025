import InvoicePdf from "@/components/global/invoice";
import AyButton from "@/components/myUi/AyButton";
import { useModal } from "@/providers/context/modal-context";
import { IOrders, IStoreOrder } from "@/types/orderTypes";

type Props = {
  orders: IOrders;
  storeOrders: IStoreOrder;
};

const TrackInvoiceBtn = ({ orders, storeOrders }: Props) => {
  const { dispatchModal } = useModal();
  return (
    <div className="flex flex-col sm:flex-row sm:w-auto w-full gap-2 sm:gap-4">
      
      <div className="w-full sm:w-auto">
        <InvoicePdf orders={orders} storeOrders={storeOrders} />
      </div>
      {storeOrders.order_status !== "cancelled" && (
        <div className="w-full sm:w-auto md:block hidden">
          <AyButton
            iconSize={15}
            onClick={() => {
              dispatchModal({
                type: "OPEN_MODAL",
                modalType: "order-tracker-one",
                payload: { ...orders, ...storeOrders },
              });
            }}
            className="flex-row-reverse flex gap-2"
            sx={{
              fontSize: "12px",
              height: "41px",
              borderRadius: "6px",
              width: "100%", // AyButton should fully stretch inside its container
            }}
            icon="proicons:location"
          >
            Track Order
          </AyButton>
        </div>
      )}
    </div>
  );
};

export default TrackInvoiceBtn;
