import {
  safeFormatDate,
  safeParseDate,
} from "@/components/global/elementses/FormateTime";
import MyClock from "@/components/myUi/MyClock";
import { useModal } from "@/providers/context/modal-context";
import { IOrders, IStoreOrder } from "@/types/orderTypes";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
const Tracker = () => {
  // selected modal data
  const { modalState } = useModal();

  const { selectedModalData }: { selectedModalData: IOrders & IStoreOrder } =
    modalState;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [isReturned, setIsReturned] = useState<boolean>(false);

  useEffect(() => {
    if (selectedModalData) {
      // Check the order status and update the state accordingly
      const { order_status, is_returned } = selectedModalData; // Assuming the first product is of interest
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
  }, [selectedModalData]);

  useEffect(() => {
    // refetch()
    const statusIndex = steps.findIndex(
      (status) => status.status === selectedModalData.order_status
    );

    if (selectedModalData.order_status === "cancelled") {
      setIsCancelled(true);
    } else if (selectedModalData.is_returned) {
      setIsReturned(true);
      setCurrentStep(statusIndex + 1);
    } else if (statusIndex !== -1) {
      setCurrentStep(statusIndex + 1);
      // console.log("Current step", statusIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModalData]);

  const steps = [
    {
      id: 1,
      title: "Order Confirmed",
      description: ` 
      ${safeFormatDate(selectedModalData.createdAt ?? "")}`,
      status: "pending",
    },
    {
      id: 2,
      title: "Processing",
      description: ` 
      ${safeFormatDate(selectedModalData.createdAt ?? "")}`,
      status: "processing",
    },
    {
      id: 3,
      title: "Ready To Pickup",
      description: ` 
      ${safeFormatDate(selectedModalData.ready_to_pick_date ?? "")}`,
      status: "ready_to_pickup",
    },
    {
      id: 4,
      title: "Parcel Shipped",
      description: ` 
      ${safeFormatDate(selectedModalData.shipped_date ?? "")}`,
      status: "shipped",
    },
    {
      id: 5,
      title: "Out For Delivery",
      description: ` 
      ${safeFormatDate(selectedModalData.out_for_delivery_date ?? "")}`,
      status: "out_for_delivery",
    },
    // {
    //   id: 6,
    //   title: "Delivered",
    //    description: `
    //   ${safeFormatDate(selectedModalData.createdAt ?? "")}`,
    //   status: "delivered",
    // },

    ...(selectedModalData.order_status !== "delivered"
      ? [
          {
            id: 6,
            title: "Delivery",
            description: (
           <div className="flex flex-wrap">
            <span className="text-xs">
              Delivery expect 
            </span>
               <MyClock
                date={selectedModalData.createdAt}
                addDays={10}
                showSeconds={false}
                showTime={false}
                className="text-xs"
              />
           </div>
            ),

            status: "delivered",
          },
        ]
      : []),

    ...(selectedModalData.order_status === "delivered"
      ? [
          {
            id: 6,
            status: "delivered",
            title: (() => {
              // Safely parse the dates
              const changedAt = safeParseDate(selectedModalData.delivery_date);
              const limitDate = safeParseDate(selectedModalData.createdAt);

              if (changedAt && limitDate) {
                const maxReturnDate = addDays(limitDate, 10);
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

  return (
    <div className="flex justify-between items-center w-full lg:px-4 py-6 bg-white ">
      {/* ${index === currentStep || index < currentStep
                ? "after:bg-[#12B76A] before:bg-[#12B76A]"
                : "after:bg-[#D0D5DD] before:bg-[#D0D5DD]"} */}
      {steps.map((step, index) => (
        <div
          key={step.id}
          // className={`
          //   relative flex flex-col gap-3 items-center text-center w-full
          //   before:content-[''] before:absolute before:top-1/2 before:left-0 before:h-1 before:w-1/2
          // ${index === currentStep ||index < currentStep ?"after:bg-[#12B76A] before:bg-[#12B76A]":"after:bg-[#D0D5DD] before:bg-[#D0D5DD]"}
          //   after:content-[''] after:absolute after:top-1/2 after:right-0 after:h-1 after:w-1/2
          //   first:before:hidden last:after:hidden
          // `}
          // after trnsition
          className={`
              relative flex justify-between flex-col gap-5 items-center text-center w-full
              before:content-[''] before:absolute before:top-1/2 before:left-0 before:h-1 before:w-1/2
              ${
                isCancelled
                  ? "before:bg-[#991B1B] after:bg-[#991B1B]"
                  : isReturned
                    ? "before:bg-[#92400E] after:bg-[#92400E]"
                    : index <= currentStep
                      ? "before:bg-[#12B76A] after:bg-[#12B76A]"
                      : "before:bg-[#D0D5DD] after:bg-[#D0D5DD]"
              }

              before:transition-all before:duration-500 before:ease-in-out
              after:content-[''] after:absolute after:top-1/2 after:right-0 after:h-1 after:w-1/2
              after:transition-all after:duration-500 after:ease-in-out
              first:before:hidden last:after:hidden
            `}
          //   className="relative flex flex-col gap-3 items-center text-center w-full"
        >
          {/* {index !== 0 && (
            <motion.div
              initial={false}
              animate={{
                backgroundColor: index < currentStep ? "#12B76A" : "#D0D5DD",
              }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-0 h-1 w-1/2 -translate-y-1/2 rounded"
            />
          )}

          Animated after line
          {index !== steps.length - 1 && (
            <motion.div
              initial={false}
              animate={{
                backgroundColor:
                  index < currentStep - 1 ? "#12B76A" : "#D0D5DD",
              }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 right-0 h-1 w-1/2 -translate-y-1/2 rounded"
            />
          )} */}

          {/* Title */}
          <span
            className={`text-sm font-medium ${
              step.status === "completed" || step.status === "current"
                ? "text-black"
                : "text-gray-400"
            }`}
          >
            {step.title}
          </span>

          {/* Dot */}
          <div
            className={`z-10 w-4 h-4 rounded-full ${
              isCancelled
                ? "bg-[#991B1B]"
                : isReturned
                  ? "bg-[#92400E]"
                  : index <= currentStep
                    ? "bg-[#12B76A]"
                    : "bg-[#D0D5DD]"
            }`}
          />

          {/* Date */}
          <span className="text-xs text-gray-500 ">{step.description}</span>
        </div>
      ))}
    </div>
  );
};

export default Tracker;
