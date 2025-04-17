import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Divider } from "@mui/joy";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { Input } from "../ui/input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useWindowWidth } from "@react-hook/window-size";

type Props = {
  handleClick?: () => void;
  showSummary?: boolean;
  totalPrice?: number;
  gst: number;
  itemSubTotal?: number;
  totalItems?: number;
  cess?: number;
  shippingCharge?: number;
  isCoupon?: boolean;
  discount?: number;
  subTotal?: number;
  btnLabel:string;
};

export default function OrderSummary({
  handleClick,
  //   showSummary = true,
  totalPrice = 0,
  gst = 0,
  itemSubTotal = 200,
  totalItems = 3,
  cess = 1,
  shippingCharge = 0,
  isCoupon = false,
  discount = 0,
  subTotal = 0,
  btnLabel
}: Props) {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth <= 768;

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
            padding:0// Remove top border
          }}
          defaultExpanded={mobileWidth ? false : true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              "&:before": { display: "none" }, 
              padding:0// Remove top border
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
            padding:0// Remove top border
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
            {gst >= 0 && (
              <div className="flex justify-between text-gray-600 sm:text-sm text-xs">
                <span>GST(IGST/SGST/CGST)</span>
                <span>₹ {gst.toFixed(2)}</span>
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
        {isCoupon && (
          <div className="w-full   h-11 flex gap-2 i">
            <Input
              type="text"
              className="flex-1 border h-full bg-gray-50 rounded-lg"
              placeholder="Coupon Code"
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#6d6c6d" },
                borderRadius: "8px",
                padding: "10px",
                textTransform: "capitalize",
                width: "90px",
                color: "white",
              }}
            >
              Apply
            </Button>
          </div>
        )}
  <div className="w-full h-full flex items-center justify-center">
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
           width: mobileWidth? "100%" : "100%",
          }}
          startIcon={<VerifiedUserOutlinedIcon />}
          onClick={handleClick}
        >
          {btnLabel}
        </Button>
  </div>
       
      </div>
    </div>
  );
}
