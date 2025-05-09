/* eslint-disable react-hooks/exhaustive-deps */
import OrderSummary from "@/components/checkout/OrderSummary";
import useNavigateClicks from "@/hooks/useClicks";
import CartDetails from "@/components/cart/CartDetails";
// import { cartDetailsData } from "@/data/dummyData/carData";
import CartLayout from "./layout";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import SaveLaterDetails from "@/components/cart/save_later_widgets/save-later-details";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getSaveLaterAction } from "@/action/cart/cartAction";
import { ICartTypes } from "@/types/cartTypes";
import { useEffect } from "react";
import {
  getCartRedux,
  setSaveLaterCartRedux,
} from "@/providers/redux/userSide/product_Slice";

const ShoppingCart = () => {
  // const onlyWidth = useWindowWidth();
  const { handleClick } = useNavigateClicks();
  const { cart } = useAppSelector((state) => state.products);

  console.log(cart, "cart");

  const { data: saveLaterData } = useQueryData(
    ["save-later"],
    getSaveLaterAction
  );

  const { data: saveLater, status } = (saveLaterData ?? {}) as {
    status?: number;
    data?: ICartTypes | null;
  };

  useEffect(() => {
    if (status === 200 && saveLater) {
      dispatch(setSaveLaterCartRedux(saveLater));
    }
  }, [saveLater]);

  useEffect(() => {
    dispatch(getCartRedux());
  }, []);

  return (
    <CartLayout>
      {/* Shopping Cart Section */}
      <div className="md:w-3/4 w-full">
        <h1 className="text-2xl font-semibold mb-4">Shopping cart</h1>
        {/* <div className="flex items-center mb-4">
          <Checkbox
            color="default"
            sx={{
              "&.Mui-checked": {
                color: "#5F08B1", // Custom color when checked
              },
            }}
          />
          <span className="text-gray-600">Select all items</span>
        </div> */}

        {/* Product Section */}
        <div className="flex flex-col gap-3">
          <div className=" p-2 max-h-[80dvh] overflow-y-auto">
            <CartDetails
              state="cart"
              // details={cartDetailsData}

              cart={cart}
              title={"store"}
              isCollapsible
              isAllSelect
            />
          </div>

          <Separator />

          {/* save later sections */}
          {saveLater && saveLater?.items && saveLater?.items.length > 0 && (
            <div className="bg-gray-50 p-2 rounded-md shadow-md max-h-[80dvh] overflow-y-auto">
              <SaveLaterDetails saveLater={saveLater} />
            </div>
          )}
        </div>
      </div>

      {/* Order Summary Section ======== = == = ====== ======= = ===*/}
      <OrderSummary
        page="cart"
        gstValue={cart?.gst??0}
        discount={cart?.discountValue}
        cess={cart?.cess}
        itemSubTotal={cart?.cartValue}
        shippingCharge={cart?.shippingCharge}
        subTotal={cart?.subTotalExclTax}
        totalPrice={cart?.cartTotal}
        totalItems={cart?.totalItems}
        btnLabel="Checkout"
        handleClick={() => {
          dispatch(getCartRedux());
          handleClick("/cart/checkout");
        }}
      />
    </CartLayout>
  );
};

export default ShoppingCart;
