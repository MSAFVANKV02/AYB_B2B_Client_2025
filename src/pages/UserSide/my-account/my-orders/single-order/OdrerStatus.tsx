import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

// OrderStatus and IOrder types
export type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered";

export type IOrder = {
  id: number;
  slug: string;
  productName: string;
  subtotal: number;
  orderDate: string;
  deliveryDate: string;
  OrderStatus: OrderStatus;
  deliveryStatus: "Delivered" | "Pending" | "Cancelled";
  paymentStatus: "Pending" | "Confirmed";
  itemQuantity: {
    size: string;
    count: number;
    color: string;
  }[];
};

// Step configuration for the Stepper
const steps = [
  {
    label: "Pending",
    title:"Your Order Placed",
    description: "Your order is pending.",
    icon: "bi:bag-check",
  },
  {
    label: "Confirmed",
    title:"Payment Confirmed",
    description: "Your payment has been confirmed.",
    icon: "mdi:credit-card-check-outline",
  },
  {
    label: "Shipped",
    title:"Order Processing",
    description: "Your order has been shipped.",
    icon: "mdi:truck-fast-outline",
  },
  {
    label: "Delivered",
    title:"Ready to pickup",
    description: "Your order has been delivered.",
    icon: "mdi:check-circle-outline",
  },
];

interface OrderStatusStepperProps {
  order: IOrder;
}

const DottedConnector = styled("div")<{
  active?: boolean;
  completed?: boolean;
  index: number;
}>(({ active, completed }) => ({
  content: '""',
  zIndex: 99,

  position: "absolute",
  width: "1px",
  height: "calc(100%)",
  margin: "",
  bottom: -20,
  // top:0,
  left: "10px",
  marginLeft:"-1px",
  background:
    completed || active
      ? "repeating-linear-gradient(0deg, #6DC558, #6DC558 3px, transparent 3px, transparent 6px)"
      : "repeating-linear-gradient(0deg, #ccc, #ccc 3px, transparent 3px, transparent 6px)",
  //   display: index === 0 ? "none" : "block",
  
}));

const CustomStepIcon = styled("div")<{
  active?: boolean;
  completed?: boolean;
  index?: number;
}>(({ active, completed }) => ({
  // main theme
  width: 20,
  height: 20,
  borderRadius: "50%",
  marginRight: 10,
  marginTop: -15,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: completed || active ? "#6DC558" : "#B2E195",
  border: `2px solid ${completed || active ? "#6DC558" : "#B2E195"}`,
  zIndex: 100,
  

  position: "relative",

  "&::after": {
    content: '""',
    display: active || completed ? "block":"none",
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: "50%",
    zIndex: 1001,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 20,
    height: 20,
    display: active ? "block":"none",
    // backgroundColor: "#afa9a9",
    border:"1px solid #B2E195",
    borderRadius: "50%",
    
    zIndex: 100,
    animation: active ? "wave 1.5s infinite ease-in-out" : "none", 

  },
  // "&::before": {
  //   content: '""',
  //   zIndex:99,

  //   position: "absolute",
  //   width: "2px",
  //   height: "calc(100% - 20px)",
  //   margin: "",
  //   bottom: 52,
  // // top:0,
  //   left: "10px",
  //   background: completed || active
  //     ? "repeating-linear-gradient(0deg, #6DC558, #6DC558 3px, transparent 3px, transparent 6px)"
  //     : "repeating-linear-gradient(0deg, #ccc, #ccc 3px, transparent 3px, transparent 6px)",
  //     display: index === 0 ? "none" : "block",
  //     marginRight: "calc(-1px )", // Negative margin-right if space-x-reverse is 0
  //     marginLeft: "calc(-1px)",
  // },
}));

export const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({
  order,
}) => {
  // Determine the active step based on the OrderStatus
  const activeStep = steps.findIndex(
    (step) => step.label === order.OrderStatus
  );

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical" className="">
        {steps.map((step, index) => (
          <Step key={step.label} className="relative space-x- h-[70px]"
        //   sx={{
        //       height: "100px",  // Increase the height of each step here
        //       padding: "10px 0",  // Add more padding for vertical space
        //     }}
          >
            {/* <StepLabel
              icon={
                <Icon
                  icon={step.icon}
                  style={{
                    fontSize: "24px",
                    color: index <= activeStep ? "#6DC558" : "#BBBBBB",
                  }}
                />
              }
           
            > */}
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  active={index === activeStep}
                  completed={index < activeStep}
                  index={index}
                //   className={`${index === activeStep && "animate-wave"} `}
                />
              )}
            >
                <Box
                display="flex"
                gap="15px"
                >

               
               
                <Icon
                  icon={step.icon}
                  style={{
                    fontSize: "24px",
                    color: index <= activeStep ? "#6DC558" : "#BBBBBB",
                  }}
                />
             <Box>
             <Typography
                variant="body2"
                style={{
                  fontWeight: index === activeStep ? "bold" : "normal",
                  color: index <= activeStep ? "#000" : "#BBBBBB",
                //   color:
                //     index === activeStep || index < activeStep
                //       ? "#6DC558"
                //       : " ",
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: index <= activeStep ? "#636363" : "#BBBBBB",
                }}
              >
                {step.description}
              </Typography>
             </Box>
              </Box>
            </StepLabel>
            {index < steps.length - 1 && (
              <DottedConnector
                active={index === activeStep}
                completed={index < activeStep}
                index={index}
                
              />
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
