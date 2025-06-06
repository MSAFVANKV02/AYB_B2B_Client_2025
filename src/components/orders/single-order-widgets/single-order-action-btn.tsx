import { cancelOrdersAction } from "@/action/orders/odrerAction";
import Modal from "@/components/global/modal";
import AyButton from "@/components/myUi/AyButton";
import { DialogClose } from "@/components/ui/dialog";
import { useMutationData } from "@/hooks/useMutationData";
import { useModal } from "@/providers/context/modal-context";
import { IOrders, IStoreOrder } from "@/types/orderTypes";
import { decodeId } from "@/utils/encorder";
import { useParams } from "react-router-dom";
// import { IFlatOrderItem } from "@/types/orderTypes";
type Props = {
  order: IOrders;
  store: IStoreOrder;
};

const SingleOrderActionBtn = ({ store }: Props) => {
  const { orderId, storeOrderId } = useParams();
  const decodedStoreOrderId = decodeId(storeOrderId ?? "");
  const queryKey = ["order-details", orderId, storeOrderId];
  const { dispatchModal, modalState } = useModal();

  const { mutate, isPending } = useMutationData(
    ["cancel-order"],
    (data: { id: string }) => cancelOrdersAction(data.id ?? ""),
    queryKey
  );

  return (
    <div className="flex sm:gap-3">
      <div className="w-full sm:w-auto">
        {!store.is_returned && (
          <AyButton
            type="button"
            variant="outlined"
            outLineColor="#D0D5DD"
            onClick={() => {
              if (modalState.type === "return-order") {
                dispatchModal({ type: "CLOSE_MODAL" });
              } else {
                dispatchModal({
                  type: "OPEN_MODAL",
                  modalType: "return-order",
                });
              }
            }}
            sx={{
              fontSize: "12px",
              height: "41px",
              borderRadius: {
                xs: 0,
                sm: "6px",
              },
              color: "#000000",
              width: "100%",
            }}
          >
            {modalState.type === "return-order"
              ? "Cancel Return Action"
              : "Return / Replacement"}
          </AyButton>
        )}
      </div>
      {store.order_status !== "cancelled" &&
        store.order_status !== "delivered" &&
        store.order_status !== "shipped" && (
          <Modal
            title="Are you Sure ?"
            description="You are not able to undo the cancelled order!"
            trigger={
              <AyButton
                variant="outlined"
                type="button"
                outLineColor="#DC2626"
                sx={{
                  fontSize: "12px",
                  height: "41px",
                  borderRadius: {
                    xs: 0,
                    sm: "6px",
                  },
                  color: "#DC2626",
                }}
              >
                Cancel Order
              </AyButton>
            }
            footer={
              <div className="flex items-center gap-3">
                <DialogClose className="">
                  <AyButton
                    variant="outlined"
                    outLineColor="black"
                    type="button"
                    sx={{ fontSize: "12px" }}
                  >
                    Cancel
                  </AyButton>
                </DialogClose>
                <AyButton
                  type="button"
                  variant="delete"
                  onClick={() => mutate({ id: decodedStoreOrderId })}
                  disabled={isPending}
                  sx={{ fontSize: "12px" }}
                >
                  {isPending ? "Cancelling..." : "Confirm"}
                </AyButton>
              </div>
            }
          />
        )}
    </div>
  );
};

export default SingleOrderActionBtn;
