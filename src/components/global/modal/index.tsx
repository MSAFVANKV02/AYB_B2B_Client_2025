import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import React from "react";
  
  type Props = {
    trigger?: React.ReactNode;
    children?: React.ReactNode;
    title: string;
    description?: string;
    classname?: string;
    classnameTitle?: string;
    classnameDescription?: string;
  
    footer?: React.ReactNode;
    open?: boolean;
    setOpen?(value: boolean): void;
  };
  
  const Modal = ({
    children,
    trigger,
    title,
    classname,
    description,
    footer,
    open,
    setOpen,
    classnameDescription,
    classnameTitle,
  }: Props) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
  
        <DialogContent className={classname}>
          <DialogHeader>
            <DialogTitle className={classnameTitle}>{title}</DialogTitle>
            <DialogDescription className={classnameDescription}>
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
  
          <DialogFooter>{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default Modal;
  