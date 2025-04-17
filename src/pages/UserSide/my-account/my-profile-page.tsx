import { Separator } from "@/components/ui/separator";
import SettingsLayout from "./layout";
import PersonalInformationForm from "./Profile-form";
import ProfileKycDetails from "./Profile-Kyc-Details";
import { useContextPage } from "@/providers/context/context";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import AddressList from "../cart/checkout/AddressList";
import AddressForm from "../cart/checkout/AddAddress";
import {  IconButton } from "@mui/material";
import AyButton from "@/components/myUi/AyButton";

import Modal from "react-modal";
Modal.setAppElement("#root");

export default function SettingsProfilePage() {
  const {
    isOpenModal,
    handleOpenModal,
    setIsOpenModal,
    addAddress,
    setAddAddress,
    handleCloseModal,
  } = useContextPage();
  return (
    <SettingsLayout>
        <div>
          <p className="text-sm text-muted-foreground">Personal Information.</p>
        </div>
      <div className="space-y-5 flex flex-col justify-between   h-full lg:p-0 max-w-screen-xl">
      
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
            isOpen={isOpenModal}
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
            {addAddress ? (
              <AddressForm addAddress={addAddress} />
            ) : (
              <AddressList
                setIsModalOpen={setIsOpenModal}
                setAddAddress={setAddAddress}
                isRemoveThings
              />
            )}
          </Modal>

          <div className="flex justify-between items-center ">
            <div className="flex flex-col jc">
              <h6>Default Shipping Address</h6>
              <span className="text-sm text-gray-600">Name</span>
              <span className="text-sm text-gray-600">
                Malayamma, NIT Campus, +919846012078, support@ayaboo.in
              </span>
              <span className="text-sm text-gray-600">Phone Number: 0000 000 00</span>
            </div>
         
            <AyButton
            onClick={handleOpenModal}
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
