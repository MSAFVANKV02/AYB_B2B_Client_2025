type ModalType = "none" | "address" | "shipping" | "offlinePay";

type ModalState = {
  isOpen: boolean;
  type: ModalType;
};

type ModalAction =
  | { type: "OPEN_MODAL"; modalType: ModalType }
  | { type: "CLOSE_MODAL" };

export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { isOpen: true, type: action.modalType };
    case "CLOSE_MODAL":
      return { isOpen: false, type: "none" };
    default:
      return state;
  }
};
