/* eslint-disable react-hooks/exhaustive-deps */
// import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Divider } from "@mui/joy";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useWindowWidth } from "@react-hook/window-size";
import CouponWidget from "./coupon/coupon_widget";
import AyButton from "../myUi/AyButton";
import { useAppSelector } from "@/providers/redux/hook";
import Loader from "../global/loader";
import { useMemo } from "react";

type Props = {
  handleClick?: () => void;
  showSummary?: boolean;
  totalPrice?: number;
  gstValue: number;
  itemSubTotal?: number;
  totalItems?: number;
  cess?: number;
  shippingCharge?: number;
  isCoupon?: boolean;
  discount?: number;
  subTotal?: number;
  btnLabel: string;
  couponCode?: string;
  progress?:number
  page:"cart"|"checkout"
};

export default function OrderSummary({
  handleClick,
  //   showSummary = true,
  totalPrice = 0,
  gstValue ,
  itemSubTotal = 0,
  totalItems = 0,
  cess = 0,
  shippingCharge = 0,
  isCoupon = false,
  discount = 0,
  subTotal = 0,
  btnLabel,
  couponCode,
  progress,
  page

}: Props) {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth <= 768;

  const { formData } = useAppSelector((state) => state.checkout);
  const { cart } = useAppSelector((state) => state.products);

console.log(gstValue,'gst==');

  // const isButtonDisabled = formData.checkoutStatus === "loading" || (page === "checkout" && progress !== 100);


  // Inside your component:
  const isButtonDisabled = useMemo(() => {
    if (page === "cart") {
      return cart?.items?.length === 0;
    }
    // Default logic for "checkout"
    return formData.checkoutStatus === "loading" || progress !== 100;
  }, [page, cart?.items?.length, formData.checkoutStatus, progress]);
  

  return (
    <div
      className="lg:w-1/4 w-full bg-white lg:p-6 p-1 rounded-lg sticky lg:top-7 bottom-0 h-fit"
      style={{
        boxShadow: "4px 2px 15px rgba(0, 0, 0, 0.13)", // Custom shadow effect
      }}
    >
      
      {/* Item subtotal .1*/}
      <div>
        <Accordion
          className="space-y-2"
          disableGutters // Remove padding and margins
          elevation={0} // Remove shadow
          square // Remove border-radius
          sx={{
            "&:before": { display: "none" },
            padding: 0, // Remove top border
          }}
          defaultExpanded={mobileWidth ? false : true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              "&:before": { display: "none" },
              padding: 0, // Remove top border
            }}
          >
            <h2 className="text-lg font-semibold ">
              Order summary ({totalItems} item{totalItems > 1 ? "s" : ""} )
            </h2>
          </AccordionSummary>
          <AccordionDetails
            className="space-y-2"
            sx={{
              "&:before": { display: "none" },
              padding: 0, // Remove top border
            }}
          >
            {itemSubTotal >= 0 && (
              <div className="flex justify-between text-gray-600 sm:text-sm text-xs">
                <span>Item subtotal</span>
                <span>₹ {itemSubTotal.toFixed(2)}</span>
              </div>
            )}

            {/* Shipping charge .2*/}
            {shippingCharge >= 0 && (
              <div className="flex justify-between text-gray-600 sm:text-sm text-xs">
                <span>Shipping charge</span>
                <span>₹ {shippingCharge.toFixed(2)}</span>
              </div>
            )}

            {/* Discount .3*/}
            {discount >= 0 && (
              <div className="flex justify-between text-gray-600 sm:text-sm text-xs">
                <span>Discount</span>
                <span>₹ {discount.toFixed(2)}</span>
              </div>
            )}
            {/* SubTotal === .4*/}
            {subTotal >= 0 && (
              <div className="flex justify-between text-gray-600 sm:text-sm text-xs">
                <span>Subtotal excl. tax</span>
                <span>₹ {subTotal.toFixed(2)}</span>
              </div>
            )}

            {/* GST charge .5*/}
            {gstValue >= 0 && (
              <div className="flex justify-between text-gray-600 sm:text-sm text-xs">
                <span>GST(IGST/SGST/CGST)</span>
                <span>₹ {gstValue.toFixed(2)}</span>
              </div>
            )}

            {
              /* Cess.6*/
              cess >= 0 && (
                <div className="flex justify-between text-gray-600 sm:text-sm text-xs">
                  <span>Cess</span>
                  <span>₹ {cess.toFixed(2)}</span>
                </div>
              )
            }

            <Divider
              sx={{
                my: 2,
              }}
            />

            <div className="flex justify-between text-gray-600 mt-2 mb-4">
              <span className="text-lg font-bold">Total Amount </span>
              <span className="text-lg font-bold">
                ₹ {totalPrice.toFixed(2)}
              </span>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* =========================== */}

      <div className="lg:mt-16 space-y-5">
        {/* coupon Code Section starts ==== */}
        {isCoupon && <CouponWidget couponCode={couponCode} />}

        <AyButton
          icon={formData.checkoutStatus === "loading"?"":"carbon:security"}
          iconSize={18}
          sx={{
            // backgroundColor: "#8817EC",
            // "&:hover": { backgroundColor: "#5f08b1" },
            borderRadius: "8px",
            padding: "10px",
            textTransform: "capitalize",
            width: "100%",
          }}
          disabled={isButtonDisabled}
          onClick={handleClick}
        >
          <Loader state={formData.checkoutStatus === "loading"}>
            {btnLabel}
          </Loader>
        </AyButton>
        {/* <div className="w-full h-full flex ">
          <Button
            variant="contained"
            fullWidth
            className="bg-pv"
            sx={{
              backgroundColor: "#8817EC",
              "&:hover": { backgroundColor: "#5f08b1" },
              borderRadius: "8px",
              padding: "10px",
              textTransform: "capitalize",
              width: mobileWidth ? "100%" : "100%",
            }}
            startIcon={<VerifiedUserOutlinedIcon />}
            onClick={handleClick}
          >
            {btnLabel}
          </Button>
          
        </div> */}
      </div>
    </div>
  );
}
