import AyButton from "@/components/myUi/AyButton";
import { IFlatOrderItem } from "@/types/orderTypes";

type Props = {
  orders: IFlatOrderItem;
};

const SingleOrderActionBtn = ({ orders }: Props) => {
  console.log(orders);
  
  return (
    <div className="flex sm:gap-3">
      <div className="w-full sm:w-auto">
        <AyButton
          variant="outlined"
          outLineColor="#D0D5DD"
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
          Return / Replacement
        </AyButton>
      </div>
      <div className="w-full sm:w-auto">
        <AyButton
          variant="outlined"
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
      </div>
    </div>
  );
};

export default SingleOrderActionBtn;
