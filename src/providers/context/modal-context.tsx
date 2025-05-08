/* eslint-disable react-refresh/only-export-components */
// src/providers/context/modal-context.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";

type ModalType = "none" | "address" | "NewAddress" | "shipping" | "offlinePay";

type ModalState = {
  isOpen: boolean;
  type: ModalType;
};

type ModalAction =
  | { type: "OPEN_MODAL"; modalType: ModalType }
  | { type: "CLOSE_MODAL" };

const initialState: ModalState = { isOpen: false, type: "none" };

const ModalContext = createContext<{
  modalState: ModalState;
  dispatchModal: React.Dispatch<ModalAction>;
}>({
  modalState: initialState,
  dispatchModal: () => {},
});

export const modalReducer = (
  state: ModalState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { isOpen: true, type: action.modalType };
    case "CLOSE_MODAL":
      return { isOpen: false, type: "none" };
    default:
      return state;
  }
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, dispatchModal] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ modalState, dispatchModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
