import OrderSummary from "@/components/checkout/OrderSummary";
import useNavigateClicks from "@/hooks/useClicks";
import CartDetails from "@/components/cart/CartDetails";
// import { cartDetailsData } from "@/data/dummyData/carData";
import CartLayout from "./layout";
import { useAppSelector } from "@/redux/hook";
import SaveLaterDetails from "@/components/cart/save_later_widgets/save-later-details";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getSaveLaterAction } from "@/action/cart/cartAction";
import { ICartTypes } from "@/types/cartTypes";

const ShoppingCart = () => {
  // const onlyWidth = useWindowWidth();
  const { handleClick } = useNavigateClicks();
  const { cart } = useAppSelector((state) => state.products);

  const { data: saveLaterData,  } = useQueryData(
    ["save-later"],
    getSaveLaterAction
  );

  const { data: saveLater } = (saveLaterData ?? {}) as {
    status?: number;
    data?: ICartTypes | null;
  };

  // useEffect(()=>{
  //   if(status === 200 && saveLater) {
  //     dispatch(setSaveLaterCartRedux(saveLater));
  //   }
  // })

  // const getPurchaseDetails = () => {
  //   let totalGST = 0;
  //   let totalCess = 0;
  //   let totalPrice = 0;
  //   let totalItems = 0;
  //   let totalDiscountAmount = 0;
  //   let subTotal = 0;

  //   cart?.items?.forEach((item) => {
  //     item.products.forEach((product) => {
  //       const { price_per_pieces, tax_details, discount, discount_type } =
  //         product;
  //       const variation = product.variations?.[0];
  //       const sizes = variation?.details ?? [];

  //       sizes.forEach((variantDetail) => {
  //         const qty = variantDetail.quantity || 0;

  //         const priceTier = price_per_pieces.find(
  //           (tier) =>
  //             qty >= tier.minPiece &&
  //             (tier.maxPiece === 0 || qty <= tier.maxPiece)
  //         );

  //         const basePrice = priceTier?.purchase_Amount ?? 0;
  //         let discountedPrice = basePrice;

  //         if (discount_type === "percentage") {
  //           discountedPrice = basePrice - (basePrice * discount) / 100;
  //         } else if (discount_type === "flat") {
  //           discountedPrice = basePrice - discount;
  //         }

  //         const productTotal = qty * discountedPrice;
  //         const originalTotal = qty * basePrice;

  //         // === GST Calculation ===
  //         const gstRate =
  //           typeof tax_details?.igst === "number"
  //             ? tax_details.igst
  //             : (tax_details?.state_tax ?? 0) + (tax_details?.central_tax ?? 0);

  //         const gstAmount = (productTotal * gstRate) / 100;

  //         // === Cess Calculation ===
  //         let cessRate = 0;

  //         if (Array.isArray(tax_details?.on_items_rate_details)) {
  //           const cessTier = tax_details.on_items_rate_details.find(
  //             (tier) =>
  //               originalTotal >= tier.greaterThan && originalTotal <= tier.upto
  //           );
  //           cessRate = cessTier?.cess ?? 0;
  //         }

  //         const cessAmount = (productTotal * cessRate) / 100;

  //         totalPrice += productTotal + gstAmount + cessAmount;
  //         subTotal += productTotal;
  //         totalDiscountAmount += originalTotal - productTotal;
  //         totalGST += gstAmount;
  //         totalCess += cessAmount;
  //         totalItems += qty;
  //       });
  //     });
  //   });

  //   return {
  //     totalPrice,
  //     totalGST,
  //     totalCess,
  //     totalItems,
  //     totalDiscountAmount,
  //     subTotal,
  //   };
  // };

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
          <div className="bg-gray-50 p-2 rounded-md shadow-md max-h-[80dvh] overflow-y-auto">
            <CartDetails
              // details={cartDetailsData}
              cart={cart}
              title={"items"}
              isCollapsible
              isAllSelect
            />
          </div>

          <Separator />

          {/* save later sections */}
          {
            saveLater && saveLater?.items.length > 0 && (
              <div className="bg-gray-50 p-2 rounded-md shadow-md max-h-[80dvh] overflow-y-auto">
            <SaveLaterDetails 
            saveLater={saveLater}
            />
          </div>
            )
          }
          
        </div>
      </div>

      {/* Order Summary Section ======== = == = ====== ======= = ===*/}
      <OrderSummary
        gst={cart?.gst.cgst ?? 0}
        discount={cart?.discountValue}
        cess={cart?.gst.cgst}
        itemSubTotal={cart?.cartValue}
        shippingCharge={cart?.shippingCharge}
        subTotal={cart?.subTotalExclTax}
        totalPrice={cart?.cartTotal}
        totalItems={cart?.totalItems}
        btnLabel="Checkout"
        handleClick={() => handleClick("/cart/checkout")}
      />
    </CartLayout>
  );
};

export default ShoppingCart;
