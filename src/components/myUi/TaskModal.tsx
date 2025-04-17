import React from "react";

import Modal from "react-modal";
// import MyBackBtn from "../myUi/myBackBtn";
import { cn } from "@/lib/utils";
import { useContextPage } from "@/providers/context/context";
Modal.setAppElement("#root");

type ModalComponent = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function TaskModal({ children,className, onClick }: ModalComponent) {
  const { isOpenModal, closeModal } = useContextPage();


  const handleCloseModal = () =>{
    if(!onClick){
      closeModal();
    } else if(isOpenModal){
      onClick();
    }
   
  }
  // if (!selectedTask) return null; // If there's no selected task, don't render the modal

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed inset-0 bg-black/20 backdrop-filter  flex items-center justify-center z-[10000] "
      className={cn(`bg-white  md:rounded-lg rounded-none  min-w-xl md:w-[30vw] w-full p-4 h-[80vh]  outline-none  overflow-y-auto relative z-[10001]`,className)}
    >
      <div className="md:hidden block">
        {/* <MyBackBtn
          clickEvent={closeModal}
          iconSize={25}
          className=" absolute top-0 right-0 z-50 "
          tooltipTitle="close"
          placeTooltip="left"
          icon="ei:close"
        /> */}
      </div>
      {children}
    </Modal>
  );
}


type TaskModalHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalHeader({ children, className }: TaskModalHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      {children}
    </div>
  );
}

type TaskModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalContent({ children, className }: TaskModalContentProps) {
  return <div className={cn("flex-grow", className)}>{children}</div>;
}

type TaskModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalFooter({ children, className }: TaskModalFooterProps) {
  return (
    <div className={cn("flex justify-end items-center gap-4 pt-4", className)}>
      {children}
    </div>
  );
}