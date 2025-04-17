import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useWindowWidth } from "@react-hook/window-size";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CartDetails from "@/components/cart/CartDetails";
import { cartDetailsData } from "@/data/dummyData/carData";


export default function CheckoutItems() {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth <= 768;
  return (
    <>
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
        >
          <h2 className="text-lg font-semibold ">Store 1</h2>
        </AccordionSummary>
        <AccordionDetails className="space-y-2">
          <CartDetails details={cartDetailsData} title="store 1" />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
