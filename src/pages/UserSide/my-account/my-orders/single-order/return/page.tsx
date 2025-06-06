import AyButton from "@/components/myUi/AyButton";
import ReturnActionForm from "@/components/orders/return-order-sec/actions/return-action-form";
import { useModal } from "@/providers/context/modal-context";
import { IFlatOrderItem } from "@/types/orderTypes";

interface Props {
  // orders: IFlatOrderItem[];
  orders: IFlatOrderItem[][];
}

const ReturnOrderActionPage = ({ orders }: Props) => {
  const { dispatchModal, modalState } = useModal();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="text-xl">Return / Replacement</h1>
        <AyButton
          type="button"
          variant="outlined"
          outLineColor="#D0D5DD"
          onClick={() => {
            if (modalState.type === "return-order") {
              dispatchModal({ type: "CLOSE_MODAL" });
            } else {
              dispatchModal({ type: "OPEN_MODAL", modalType: "return-order" });
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
            ? "Close Return Action"
            : "Return / Replacement"}
        </AyButton>
      </div>

      <div className="">
        {/* <ReturnActionTable orders={orders} /> */}
        <ReturnActionForm orders={orders} />
      </div>
    </div>
  );
};

export default ReturnOrderActionPage;
