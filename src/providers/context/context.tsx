// src/providers/context/Context.tsx

import { IAddressType } from "@/types/address-types";
import React, { createContext, useContext, useState } from "react";

interface ToggleContextType {
  isOpenModal: boolean;
  selectedAddress: IAddressType | null;
  addAddress: boolean;

  setIsOpenModal: (val: boolean) => void;
  setAddAddress: (val: boolean) => void;
  setSelectedAddress: (address: IAddressType | null) => void;

  handleOpenModal: () => void;
  handleCloseModal: () => void;
  closeModal: () => void;
}

const Context = createContext<ToggleContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddressType | null>(
    null
  );

  const handleOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedAddress(null);
  };

  const handleCloseModal = () => {
    if (addAddress) {
      setAddAddress(false);
      setSelectedAddress(null);
    } else {
      setIsOpenModal(false);
    }
  };

  return (
    <Context.Provider
      value={{
        handleOpenModal,
        isOpenModal,
        setIsOpenModal,
        addAddress,
        setAddAddress,
        handleCloseModal,
        closeModal,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to use the Scroll Context
export const UseContextPage = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useToggleContext must be used within a ContextProvider");
  }
  return context;
};
