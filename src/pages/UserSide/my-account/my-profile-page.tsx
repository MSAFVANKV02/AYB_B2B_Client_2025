import { Separator } from "@/components/ui/separator";
import SettingsLayout from "./layout";
import PersonalInformationForm from "./Profile-form";
import ProfileKycDetails from "./Profile-Kyc-Details";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import AddressList from "../../../components/checkout/AddressList";
// import AddressForm from "../cart/checkout/AddAddress";
import { IconButton } from "@mui/material";
import AyButton from "@/components/myUi/AyButton";

import Modal from "react-modal";
import CreateAddressForm from "./user-address/create_Address_Form";
import { useAppSelector } from "@/providers/redux/hook";
import { useModal } from "@/providers/context/modal-context";
Modal.setAppElement("#root");

export default function SettingsProfilePage() {
  const { dispatchModal, modalState } = useModal();

  const { address } = useAppSelector((state) => state.auth);

  const handleCloseModal = () => {
    if (modalState.type === "NewAddress") {
      dispatchModal({ type: "OPEN_MODAL", modalType: "address" });
    } else {
      dispatchModal({ type: "CLOSE_MODAL" });
    }

    // setIsOpenModal(false); // if you use this in context
  };

  return (
    <SettingsLayout className="bg-[#F9F9F9] xl:p-10 sm:p-5 p-1" >
      <div>
        <p className="text-sm text-muted-foreground">Personal Information.</p>
      </div>
      <div className="space-y-5 flex flex-col justify-between   h-full lg:p-0 max-w-screen-xl ">
        {/* <Separator /> */}
        <div className="h- w-full flex  lg:flex-row flex-col-reverse justify-between gap-4 ">
          <div className="lg:w-1/2">
            <PersonalInformationForm />
          </div>
          <div className="lg:w-1/2 h-fit ">
            <ProfileKycDetails />
          </div>
        </div>
        {/* ===   Address Details Starts here === */}

        {/* =========== */}
        <div className="">
          <Separator className="my-5" />
          <Modal
            isOpen={modalState.isOpen}
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick={true}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
            className={`bg-white rounded-lg  max-w-3xl p-4 md:max-h-[80vh] h-full  w-full overflow-y-auto relative z-[10001]`}
          >
            <IconButton
              sx={{ color: "black", position: "absolute", right: 5, top: 0 }}
              onClick={handleCloseModal}
            >
              <CloseOutlinedIcon />
            </IconButton>
            {modalState.type === "NewAddress" ? (
              <>
                {/* <AddressForm addAddress={addAddress} /> d*/}
                <CreateAddressForm />
              </>
            ) : modalState.type === "address" ? (
              <AddressList />
            ) : null}
          </Modal>

          <div className="flex justify-between items-center ">
            {address
              ?.filter((filter) => filter.isDefault)
              .map((add, index) => (
                <div className="flex flex-col jc" key={index}>
                  <h6>Default Shipping Address</h6>
                  <span className="text-sm text-gray-600">{add.name}</span>
                  <span className="text-sm text-gray-600">{add.street}</span>
                  <span className="text-sm text-gray-600">
                    Phone Number: {add.mobile}
                  </span>
                </div>
              ))}

            <AyButton
              onClick={() => {
                dispatchModal({ type: "OPEN_MODAL", modalType: "address" });
              }}
              title="change"
              variant="outlined"
              outLineColor="black"
            />
          </div>
        </div>

        {/* ================================================ */}
      </div>
    </SettingsLayout>
  );
}
