
import { ICartTypes } from "@/types/cartTypes";
import CartDetails from "../CartDetails";


type Props = {
    saveLater?: ICartTypes | null;
}

function SaveLaterDetails({saveLater}:Props) {


//   console.log(saveLater, "save later data in get page");
  if (saveLater?.items.length === 0) {
    return null;
  }

  return (
    <div>
      <h5 className="text-2xl font-semibold mb-4">Save Later</h5>

      <CartDetails
        // details={cartDetailsData}
        errorMessage="No items in save later"
        cart={saveLater}
        title={"items"}
        isCollapsible
        isAllSelect
      />
    </div>
  );
}

export default SaveLaterDetails;
