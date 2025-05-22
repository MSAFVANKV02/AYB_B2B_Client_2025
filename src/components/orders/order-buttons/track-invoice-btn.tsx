import InvoicePdf from "@/components/global/invoice";
import AyButton from "@/components/myUi/AyButton";
import { IOrders, IStoreOrder } from "@/types/orderTypes";

type Props = {
  orders: IOrders;
  storeOrders: IStoreOrder;
};

const TrackInvoiceBtn = ({ orders, storeOrders }: Props) => {
  return (
    <div className="flex gap-4">
      <InvoicePdf orders={orders} storeOrders={storeOrders} />
      <AyButton
        iconSize={15}
        className="flex-row-reverse flex gap-2"
        sx={{
          fontSize: "12px",
          height: "41px",
          borderRadius: "6px",
        }}
        icon="proicons:location"
      >
        Track Order
      </AyButton>
    </div>
  );
};

export default TrackInvoiceBtn;
