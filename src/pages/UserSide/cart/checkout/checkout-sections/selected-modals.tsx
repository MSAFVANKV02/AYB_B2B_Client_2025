
import ShippingModal from "../../../../../components/checkout/shipping-methods/ShippingModal";

import AddressList from "../../../../../components/checkout/AddressList";
import { IconButton } from "@mui/material";
import Modal from "react-modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CreateAddressForm from "@/pages/UserSide/my-account/user-address/create_Address_Form";
import { useModal } from "@/providers/context/modal-context";
import OfflinePay from "@/components/paymentCell/OfflinePay";

Modal.setAppElement("#root");

const SelectedModals = () => {

//   const { formData } = useAppSelector((state) => state.checkout);

  const { dispatchModal, modalState } = useModal();

  // const [modalState, dispatchModal] = useReducer(modalReducer, {
  //     isOpen: false,
  //     type: "none",
  //   });

  const handleCloseModal = () => {
    if(modalState.type === "NewAddress"){
    dispatchModal({ type: "OPEN_MODAL",modalType:"address" });

    }else{
        dispatchModal({ type: "CLOSE_MODAL" });
    }
    
    // setIsOpenModal(false); // if you use this in context
  };

  return (
    <div>
      {/* ===== modal address starts */}
      <Modal
        isOpen={modalState.isOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
        className={`bg-white rounded-lg  ${modalState.type === "offlinePay" ? "max-w-lg md:h-auto h-full min-h-[80vh]" : "max-w-3xl p-4 md:max-h-[80vh] h-full"}  w-full overflow-y-auto relative z-[10001]`}
      >
        <IconButton
          sx={{ color: "black", position: "absolute", right: 5, top: 10 }}
          onClick={handleCloseModal}
        >
          <CloseOutlinedIcon />
        </IconButton>
        {modalState.type === "NewAddress" ? (
          <div className="h-full">
            {/* <span className=" text-xl">Add Address</span> */}

            <div className="h-full bg-">
              {/* <AddressForm addAddress={addAddress} /> */}
              <CreateAddressForm  />
            </div>
          </div>
        ) : modalState.type === "shipping" ? (
          <ShippingModal
          />
        ) : modalState.type === "offlinePay" ? (
          <>
            <OfflinePay
              />
          </>
        ) :modalState.type === "address" ? (
          <AddressList
          />
        ):null}
      </Modal>
      {/* ===== modal address Ends */}
    </div>
  );
};

export default SelectedModals;
