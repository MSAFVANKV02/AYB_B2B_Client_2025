import { dispatch, useAppSelector } from "@/providers/redux/hook";
import CartLayout from "../layout";
import OrderSummary from "@/components/checkout/OrderSummary";
import SelectedAddress from "./checkout-sections/selected-address";
import SelectedModals from "./checkout-sections/selected-modals";
import CheckoutItems from "../../../../components/checkout/CheckoutItems";
import {
  resetCheckoutState,
  setCheckoutFormDataField,
} from "@/providers/redux/userSide/checkout-slice";
import { motion } from "framer-motion";
import SelectedPayment from "./checkout-sections/selected-payment";
import { useEffect } from "react";
import { useSubmitOrder } from "@/hooks/checkout-hook/use-checkout";
import ConfirmOrder from "@/components/checkout/Confirm-Order";
function PurchasePage() {
  const { cart } = useAppSelector((state) => state.products);
  const { formData } = useAppSelector((state) => state.checkout);

  

  const { onSubmitOrder } = useSubmitOrder();

  //   const isFormEmpty =
  //     !formData.address &&
  //     Object.keys(formData.shipping_info).length === 0 &&
  //     !formData.parcelOptions &&
  //     !formData.parcelMethod &&
  //     !formData.paymentMethod &&
  //     !formData.transactionDetails;

  // const getFormProgress = () => {
  //   let filled = 0;
  //   const total = 5;

  //   if (formData.address) filled++;
  //   if (Object.keys(formData.shipping_info || {}).length > 0) filled++;
  //   if (formData.parcelOptions) filled++;
  //   // if (formData.parcelMethod) filled++;
  //   if (formData.payment_method) filled++;
  //   if (formData.payment_details) filled++;

  //   return Math.round((filled / total) * 100);
  // };
  const getFormProgress = () => {
    let filled = 0;
    const total = 4;

    if (formData.address) filled++;
    // if (Object.keys(formData.shipping_info).length > 0) filled++;
    if (cart && cart.items) {
      const allStoresHaveShippingInfo = cart.items.every((item) => {
        return (
          formData.shipping_info[item.store._id] &&
          Object.keys(formData.shipping_info[item.store._id]).length > 0
        );
      });

      if (allStoresHaveShippingInfo) filled++;
    }
    // if (formData.parcelOptions) filled++;
    if (formData.payment_method !== "") filled++;
    if (
      formData.payment_details &&
      formData.payment_details.payment_type // checking an actual field ensures it's filled
    )
      filled++;

    return Math.round((filled / total) * 100);
  };

  const progress = getFormProgress();
  const isFormEmpty = progress === 0;

  useEffect(() => {
    if (progress === 100) {
      dispatch(
        setCheckoutFormDataField({
          field: "checkoutStatus",
          value: "completed",
        })
      );
    }
  }, [progress]);

  return (
    <div>
      {formData.checkoutStatus === "checked-out" ? (
        <div className="w-full">
          <ConfirmOrder />
        </div>
      ) : (
        <CartLayout>
          <div className="lg:w-3/4 w-full space-y-4">
            {!isFormEmpty && (
              <div className="w-full h-10 bg-gray-50 flex items-center justify-between px-4 rounded-lg">
                {/* <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span> */}
                <div className="w-[40%] bg-gray-200 rounded-lg overflow-hidden h-2">
                  <motion.div
                    className={`${progress === 100 ? "bg-green-600" : "bg-violet-600"}  h-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
                <button
                  className="text-xs"
                  onClick={() => {
                    dispatch(resetCheckoutState());
                  }}
                >
                  End Process
                </button>
              </div>
            )}
            {/* 1. select shipping Address */}
            <SelectedAddress />

            {/* <pre className="text-xs">{JSON.stringify(formData, null, 4)}</pre> */}

            {/* 2. selected modals */}
            <SelectedModals />

            {/* 3. cart Items */}

            <CheckoutItems />

            {/* 1. payment method */}

            <SelectedPayment />
     
          </div>

          <OrderSummary
            handleClick={() => {
              onSubmitOrder(formData, cart);
            }}
            page="checkout"
            gstValue={cart?.gst??0}
            discount={cart?.discountValue}
            cess={cart?.cess}
            itemSubTotal={cart?.cartValue}
            shippingCharge={cart?.shippingCharge}
            subTotal={cart?.subTotalExclTax}
            totalPrice={cart?.cartTotal}
            totalItems={cart?.totalItems}
            couponCode={cart?.coupon}
            btnLabel="Pay & Submit Order"
            isCoupon
            progress={progress}
            // handleClick={createOrder}
          />
        </CartLayout>
      )}
    </div>
  );
}

export default PurchasePage;
