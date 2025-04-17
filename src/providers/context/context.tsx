// src/providers/context/Context.tsx

import React, { createContext, useContext, useState } from "react";

interface ToggleContextType {
  handleOpenModal: () => void;
  isOpenModal: boolean;
  setIsOpenModal: (val: boolean) => void;
  addAddress: boolean;
  setAddAddress: (val: boolean) => void;
  handleCloseModal: () => void;
  closeModal: () => void;

}

const Context = createContext<ToggleContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addAddress, setAddAddress] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpenModal(false);
   
  };

  const handleCloseModal = () => {
    if (addAddress) {
      setAddAddress(false);
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
        closeModal
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to use the Scroll Context
export const useContextPage = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useToggleContext must be used within a ScrollProvider");
  }
  return context;
};
