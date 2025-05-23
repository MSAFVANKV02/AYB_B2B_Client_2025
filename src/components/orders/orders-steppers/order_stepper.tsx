import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/assets/css/Order.css";
// import { IoBagCheckOutline } from "react-icons/io5";
import { addDays } from "date-fns";
import { useWindowWidth } from "@react-hook/window-size";
import {
  formatOrderDate,
  safeFormatDate,
  safeParseDate,
} from "../../global/elementses/FormateTime";
import { IFlatOrderItem } from "@/types/orderTypes";

// order_status and IOrder types

interface OrderStatusProps {
  orderDetails: IFlatOrderItem[];
  refetch: any;
}

const DottedConnector = styled("div")<{
  active?: boolean;
  completed?: boolean;
  index: number;
  onlyWidth: number;
}>(({ active, completed, onlyWidth }) => ({
  content: '""',
  zIndex: 99,

  position: "absolute",
  width: "1px",
  height: "calc(100%)",
  margin: "",
  bottom: -20,
  // top:0,
  left: "10px",
  marginLeft: `${onlyWidth < 645 ? "-2px" : "-1px"}`,
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
  onlyWidth: number;
}>(({ active, completed, onlyWidth }) => ({
  // main theme
  width: onlyWidth < 645 ? 16 : 20,
  height: onlyWidth < 645 ? 16 : 20,
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
    display: active || completed ? "block" : "none",
    width: onlyWidth < 645 ? 8 : 10,
    height: onlyWidth < 645 ? 8 : 10,
    backgroundColor: "#fff",
    borderRadius: "50%",
    zIndex: 1001,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: onlyWidth < 645 ? 16 : 20,
    height: onlyWidth < 645 ? 16 : 20,
    display: active ? "block" : "none",
    // backgroundColor: "#afa9a9",
    border: "1px solid #B2E195",
    borderRadius: "50%",

    zIndex: 100,
    animation: active ? "wave 1.5s infinite ease-in-out" : "none",
  },
}));

const MAX_RETURN_DAYS = 10;

export const OrderStatusStepper: React.FC<OrderStatusProps> = ({
  orderDetails,
}) => {
  // Determine the active step based on the order_status
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [isReturned, setIsReturned] = useState<boolean>(false);
  const onlyWidth = useWindowWidth();

  //   const activeStep = steps.findIndex(
  //     (step) => step.label === orderDetails[0].store.order_status
  //   );

  useEffect(() => {
    if (orderDetails) {
      // Check the order status and update the state accordingly
      const { order_status, is_returned } = orderDetails[0].store; // Assuming the first product is of interest
      setIsCancelled(order_status === "cancelled");
      setIsReturned(is_returned);
      setCurrentStep(
        order_status === "out_for_delivery"
          ? 4
          : order_status === "delivered"
            ? 5
            : order_status === "pending"
              ? 1
              : 2
      ); // Example logic
    }
  }, [orderDetails]);

  useEffect(() => {
    // refetch()
    const statusIndex = steps.findIndex(
      (status) => status.label === orderDetails[0].store.order_status
    );

    if (orderDetails[0].store.order_status === "cancelled") {
      setIsCancelled(true);
    } else if (
      orderDetails[0].store.is_returned 
    ) {
      setIsReturned(true);
      setCurrentStep(statusIndex + 1);
    } else if (statusIndex !== -1) {
      setCurrentStep(statusIndex + 1);
      // console.log("Current step", statusIndex)
    }
  }, [orderDetails]);

  const orderProcessingLabel = (status: number) => {
    if (status === 1 || status < 1) {
      return "Order Processing...";
    }
    if (status !== 1 || status > 1) {
      return "Order Processed";
    }
  };

  const orderProcessingLabelShip = (status: number) => {
    if (status === 2) {
      return "Shipping Processing...";
    } else if (status < 2) {
      return "waiting for the package";
    } else {
      return "Order Shipped";
    }
  };

  const steps = [
    {
      id: 1,
      label: "pending",
      title: `Your Order Confirmed`,
      icon: "bi:bag-check",

      description: ` 
      ${formatOrderDate(orderDetails[0].order.createdAt)}`,
    },
    {
      id: 2,
      label: "confirmed",
      title: `${orderProcessingLabel(currentStep)}`,
      icon: "mdi:credit-card-check-outline",
    },
    {
      id: 3,
      label: "shipped",
      title: `${orderProcessingLabelShip(currentStep)}`,
      icon: "mdi:truck-fast-outline",
      description: ` 
      ${formatOrderDate(orderDetails[0].store.shipped_date)}`,
    },
    ...(orderDetails[0].store.order_status === "out_for_delivery"
      ? [
          {
            id: 4,
            label: "out_for_delivery",
            title: `Order is out for delivery`,
            icon: "mdi:truck-fast-outline",
          },
        ]
      : []),
    ...(orderDetails[0].store.order_status !== "delivered"
      ? [
          {
            id: 5,
            label: "deliveryTime",
            title: `Delivery Expected By ${
              orderDetails[0].order.createdAt
                ? formatOrderDate(
                    addDays(
                      new Date(orderDetails[0].order.createdAt),
                      MAX_RETURN_DAYS
                    )
                  )
                : "Unknown Date"
            }`,
            icon: "hugeicons:package-delivered",
          },
        ]
      : []),
    // Show delivered status if the order is delivered
    // ...(orderDetails[0].store.order_status === "delivered"
    //   ? [
    //       {
    //         id: 5,
    //         label: "delivered",
    //         title: `Delivered ${
    //           orderDetails[0].store.delivery_date
    //             ? formatOrderDate(
    //                 orderDetails[0].store.delivery_date ?? ""
    //               )
    //             : "Unknown Date"
    //         }`,
    //         icon: "hugeicons:package-delivered",
    //       },
    //     ]
    //   : []),
    ...(orderDetails[0].store.order_status === "delivered"
      ? [
          {
            id: 6,
            label: "delivered",
            title: (() => {
              // Safely parse the dates
              const changedAt = safeParseDate(
                orderDetails[0].store.delivery_date
              );
              const limitDate = safeParseDate(orderDetails[0].order.createdAt);

              if (changedAt && limitDate) {
                const maxReturnDate = addDays(limitDate, MAX_RETURN_DAYS);
                return changedAt < maxReturnDate
                  ? `Delivered early ${safeFormatDate(changedAt)}`
                  : `Delivered ${safeFormatDate(changedAt)}`;
              }

              return "Delivered";
            })(),
            icon: "hugeicons:package-delivered",
          },
        ]
      : []),
  ];

  const statusesCancelled = [
    {
      id: 6,
      label: "confirmed",
      title: `Your Order Confirmed `,
      icon: "mdi:credit-card-check-outline",
      description: ` 
      ${formatOrderDate(orderDetails[0].store.createdAt)}`,
    },
    {
      id: 7,

      label: "cancelled",
      title: `Your Order cancelled ${safeFormatDate(
        orderDetails[0].store.cancelled_date
      )}`,
      icon: "ix:cancelled",
      description: ` 
      ${safeFormatDate(orderDetails[0].store.cancelled_date)}`,
    },
  ];

  const statusesReturned = [
    {
      id: 8,
      label: "confirmed",
      title: `Your Order Confirmed `,
      icon: "mdi:credit-card-check-outline",
      description: ` 
      ${formatOrderDate(orderDetails[0].store.createdAt)}`,
    },
    {
      id: 9,
      label: "returned",
      title: `Your Order Returned `,
      icon: "icon-park-outline:return",
      description: ` 
      ${safeFormatDate(orderDetails[0].store.return_action_date ?? "")}`,
    },
  ];

  const stepperChanges = isCancelled
    ? statusesCancelled
    : isReturned
      ? statusesReturned
      : steps;

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={currentStep} orientation="vertical" className="">
        {stepperChanges.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              "& .MuiStepConnector-root": {
                borderLeft: "none", // Remove the unwanted border
              },
            }}
            className="relative space-x- h-[70px]"
          >
            {/* {currentStep} */}
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  onlyWidth={onlyWidth}
                  active={index === currentStep}
                  completed={index < currentStep}
                  index={index}
                  //   className={`${index === activeStep && "animate-wave"} `}
                />
              )}
            >
              <Box display="flex" gap="15px">
                <Icon
                  icon={step.icon}
                  style={{
                    fontSize: "24px",
                    color: index <= currentStep ? "#6DC558" : "#BBBBBB",
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: index === currentStep ? "bold" : "normal",
                      color: index <= currentStep ? "#000" : "#BBBBBB",
                      fontSize: `${onlyWidth < 645 ? "12px" : "15px"}`,
                      //   color:
                      //     index === currentStep || index < currentStep
                      //       ? "#6DC558"
                      //       : " ",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: index <= currentStep ? "#636363" : "#BBBBBB",
                      fontSize: `${onlyWidth < 645 ? "10px" : "12px"}`,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </StepLabel>

            {index !== stepperChanges.length - 1 && (
              <DottedConnector
                onlyWidth={onlyWidth}
                active={index === currentStep}
                completed={index < currentStep}
                index={index}
              />
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
