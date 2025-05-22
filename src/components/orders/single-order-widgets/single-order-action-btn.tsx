import AyButton from '@/components/myUi/AyButton'
import { IFlatOrderItem } from '@/types/orderTypes'


type Props = {
    orders: IFlatOrderItem
}

const SingleOrderActionBtn = ({orders}: Props) => {
  return (
    <div className="flex gap-3">
    <AyButton
      variant="outlined"
      outLineColor="#D0D5DD"
      sx={{
        fontSize: "12px",
        height: "41px",
        borderRadius: "6px",
        color:"#000000"
      }}
    >
      Return / Replacement
    </AyButton>
    <AyButton
      variant="outlined"
      outLineColor="#DC2626"
      sx={{
        fontSize: "12px",
        height: "41px",
        borderRadius: "6px",
        color:"#DC2626"
      }}
    >
      Cancel Order
    </AyButton>
  </div>
  )
}

export default SingleOrderActionBtn