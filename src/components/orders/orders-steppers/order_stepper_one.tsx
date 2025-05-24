import { useModal } from "@/providers/context/modal-context";
import { useEffect, useRef } from "react";
import Tracker from "./tracker";



const OrderStepperOne = () => {
  const { modalState, dispatchModal } = useModal();
  const currentRef = useRef<HTMLDivElement | null>(null);

  // console.log("modalState", modalState);

  useEffect(() => {
    if (modalState.type === "order-tracker-one") {
      // Disable scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      // Re-enable scroll on unmount
      document.body.style.overflow = "auto";
    };
  }, [modalState.type]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currentRef.current &&
        !currentRef.current.contains(event.target as Node)
      ) {
        dispatchModal({ type: "CLOSE_MODAL" }); // Call the callback to close the component
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatchModal]);

  if (modalState.type !== "order-tracker-one") return null;

  return (
    <div className="absolute top-0 bottom-0  left-0 w-full h-full bg-black/25 z-[10001] flex items-center justify-center">
      <div
        className="bg-white md:h-[300px] h-full 2xl:w-[60%] lg:w-[90%] w-full md:rotate-0  sm:rounded-lg lg:p-4 flex items-center justify-center"
        ref={currentRef}
      >
        <Tracker />
      </div>
    </div>
  );
};

export default OrderStepperOne;
