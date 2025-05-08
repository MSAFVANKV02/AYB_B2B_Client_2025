/* eslint-disable react-hooks/exhaustive-deps */
// import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CartDetails from "@/components/cart/CartDetails";
// import { cartDetailsData } from "@/data/dummyData/carData";
import { useEffect } from "react";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { getCartRedux } from "@/providers/redux/userSide/product_Slice";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CheckoutItems() {
  const { cart } = useAppSelector((state) => state.products);
  const navigate = useNavigate();

  // const onlyWidth = useWindowWidth();
  // const mobileWidth = onlyWidth <= 768;

  useEffect(() => {
    dispatch(getCartRedux());
    if (cart?.items.length === 0) {
      navigate("/cart");
    }
  }, []);

  return (
    <>
      {/* <Accordion
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
        >
          <h2 className="text-lg font-semibold ">Store 1</h2>
        </AccordionSummary>
        <AccordionDetails className="space-y-2">
          <CartDetails details={cartDetailsData} title="store 1" />
          <CartDetails
            state="cart"
              // details={cartDetailsData}
              cart={cart}
              title={"items"}
              isCollapsible
              isAllSelect
            />
        </AccordionDetails>
      </Accordion> */}

      <p className="font-bold flex items-center gap-1">
        {" "}
        <Icon
          icon="material-symbols-light:box-outline"
          className="text-lg text-textMain"
        />
        Items
      </p>
      <div className="md:ml-6">
         <CartDetails
        showShippingMethod
        state="cart"
        // details={cartDetailsData}
        isCollapseDefault={false}
        cart={cart}
        title={"Store"}
        isCollapsible
        isAllSelect
      />
      </div>
     
    </>
  );
}
