import OrderSummary from "@/components/checkout/OrderSummary";
import AddressForm from "./AddAddress";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useEffect, useState } from "react";

import { IconButton } from "@mui/material";

import AddressList from "./AddressList";
import { Icon } from "@iconify/react/dist/iconify.js";
import CheckoutItems from "./CheckoutItems";
import CartLayout from "../layout";
import { makeToast, makeToastError } from "@/utils/toaster";
import ShippingModal from "./ShippingModal";
import { RazorPay } from "@/components/paymentCell/RazorPay";
import OfflinePay from "@/components/paymentCell/OfflinePay";
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";
import { useContextPage } from "@/providers/context/context";
Modal.setAppElement("#root"); // Add this line to avoid screen-reader issues with modal

type IShipMethod = {
  id: number;
  label: string;
  value: string;
  icon: string;
};

export type AddressType = {
  id?: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type ParcelOptionsType = {
  id: number;
  logo: string;
  serviceName: string;
  pricePerKg: number;
  orderDetails: {
    weight: number;
    parcelPrice: number;
    boxQty: number;
  };
};

export type TransactionDetails = {
  remark: string;
  referral_docs: File | null;
  upi_id: string;
  is_policy_verified: boolean;
};

export type FormDataType = {
  address: AddressType | null;
  shippingMethod: string;
  parcelOptions: ParcelOptionsType | null;
  parcelMethod: string;
  paymentMethod: string;
  transactionType: "upi" | "bank";
  transactionDetails: TransactionDetails | null;
};

type RazorPayResult = {
  success: boolean;
  message?: string;
};

// Use more specific types instead of 'any'
export type FormDataValue =
  | string
  | AddressType
  | ParcelOptionsType
  | TransactionDetails
  | null;

export default function CheckoutPage() {
  // const { handleClick } = useNavigateClicks();
  const { addAddress,setAddAddress } = useContextPage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openShipModal, setOpenShipModal] = useState(false);
  const [openOfflinePayModal, setOpenOfflinePayModal] = useState(false);
  // const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate()


  const [formData, setFormData] = useState<FormDataType>({
    address: null,
    shippingMethod: "",
    parcelOptions: null,
    parcelMethod: "toPay",
    paymentMethod: "razorpay",
    transactionType: "upi",
    transactionDetails: null,
  });

  // console.log(formData);

  // Track a single selected address ID

  const shippingMethods = [
    {
      id: 1,
      label: "Pickup from Parcel office",
      value: "",
      icon: "material-symbols:storefront-outline-sharp",
    },
    {
      id: 2,
      label: "Door delivery",
      value: "",
      icon: "icon-park-outline:delivery",
    },
    { id: 3, label: "Store pickup", value: "", icon: "carbon:delivery" },
  ];
  const paymentMethods = [
    {
      id: 1,
      label: "RazorPay",
      value: "razorpay",
      icon: "/paymentImg/image 125.png",
    },
    {
      id: 2,
      label: "Offline Payment",
      value: "offline",
      icon: "/paymentImg/Group 1163.png",
    },
    {
      id: 3,
      label: "Cash On Delivery",
      value: "cod",
      icon: "/paymentImg/Group 1164.png",
    },
  ];

  const orderExist = true;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

    // ////// FormData Changing //////////

  const handleFormDataChange = (field: string, value: FormDataValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  // ////// Offline Payment Submission //////////

  const handleOfflinePaymentSubmit = (
    upiId: string,
    referralDoc: File | null,
    comment: string,
    isPolicy: boolean
  ) => {
    
    // console.log("Offline Payment Submitted", { upiId, referralDoc, comment });
    handleFormDataChange("transactionDetails", {
      remark: comment,
      referral_docs: referralDoc, 
      upi_id: upiId,
      is_policy_verified: isPolicy,
    });
  };

    // ////// Shipping Method Selection //////////

  const handleSelectShippingMethod = (ship: IShipMethod) => {
    handleFormDataChange("shippingMethod", ship.label);

    if (ship.label === "Store pickup") {
      handleFormDataChange("parcelOptions", null);
      // handleFormDataChange("parcelMethod", "");
      setOpenShipModal(false); // Ensure modal stays closed for Store pickup
    } else {
      // Open shipping modal for other options
      setOpenShipModal(true);
    }
  };

  // /////////   Close Modal Function ///////////////////

  const handleCloseModal = () => {
    if (openShipModal) {
      setOpenShipModal(false);
    } else if (addAddress) {
      setAddAddress(false);
    } else if (openOfflinePayModal) {
      setOpenOfflinePayModal(false);
    } else {
      setIsModalOpen(false);
    }
  };

  const createOrder = async () => {
    if (!formData.shippingMethod) {
      makeToastError("Please select a shipping method");
      return;
    }

    if (!formData.address) {
      makeToastError("Please select a shipping Address");
      return;
    }

    if (formData.paymentMethod === "razorpay") {
      makeToast(`${formData.paymentMethod}`);
      const result: RazorPayResult = await RazorPay({
        totalAmount: 200,
        orderIdRazorPay: 2,
        cartId: 1,
        address: formData.address,
      });
      if (result.success) {
        alert(result.message);
       
      } else {
        makeToastError(result.message || "Payment was unsuccessful.");
      }
    }
    if (formData.paymentMethod === "offline") {
      setOpenOfflinePayModal(true);
    }
    if (formData.paymentMethod === "cod") {
    
      navigate("/cart/checkout/order-confirmation");
    }
  };

  useEffect(() => {
    if (
      !openShipModal &&
      !formData.parcelMethod &&
      formData?.parcelOptions?.id === 0
    ) {
      handleFormDataChange("shippingMethod", "");
    }
    
  }, [openShipModal]);

  return (
    <CartLayout>
      <div className="lg:w-3/4 w-full space-y-4">
        <div className="space-y-1 mb-2">
          <p className="font-bold ">
            {" "}
            <LocationOnOutlinedIcon
              sx={{
                fontSize: "1.2rem",
              }}
              fontSize="small"
              className="text-textMain"
            />{" "}
            Shipping Address
          </p>
        </div>

        {/*================= ----------------------   ================ */}
        {/*================= starting Address   ================ */}
        {/*================= ----------------------   ================ */}
        <div className="lg:ml-6">
          {orderExist ? (
            <div className="flex  flex-col gap-1 ">
              <span className="flex gap-1 items-center">
                <p>Name</p>
              </span>
              {/* ======== */}
              <span className="flex gap-1 items-center">
                <p>Address</p>,<p>City</p>,<p>State</p>,<p>Pincode</p>,
                <p>Country</p>
              </span>
              {/* ======= */}
              <span className="flex gap-1 items-center">
                <p>Kerala</p>,<p>67890</p>,<p>9067439020</p>
              </span>
              <div className="flex gap-2 items-center">
                <span className="bg-bgSoft text-sm p-1 text-textMain rounded-md">
                  {" "}
                  Default shipping address{" "}
                </span>{" "}
                <IconButton
                  sx={{
                    color: "#93c5fd",
                    fontSize: "1rem",
                    textDecorationLine: "underline",
                    cursor: "pointer",
                    borderRadius: "12px",
                  }}
                  onClick={handleOpenModal}
                >
                  Change
                </IconButton>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl">
              <AddressForm addAddress={addAddress} />
            </div>
          )}

          {/* ===== modal address starts */}
          <Modal
            isOpen={isModalOpen || openShipModal || openOfflinePayModal}
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick={true}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
            className={`bg-white rounded-lg  ${openOfflinePayModal ? "max-w-lg md:h-auto h-full min-h-[80vh]" : "max-w-3xl p-4 md:max-h-[80vh] h-full"}  w-full overflow-y-auto relative z-[10001]`}
          >
            <IconButton
              sx={{ color: "black", position: "absolute", right: 5, top: 10 }}
              onClick={handleCloseModal}
            >
              <CloseOutlinedIcon />
            </IconButton>
            {addAddress ? (
              <div className="h-full">
                {/* <span className=" text-xl">Add Address</span> */}

                <div className="h-full bg-">
                  <AddressForm addAddress={addAddress} />
                </div>
              </div>
            ) : openShipModal ? (
              <ShippingModal
                handleFormDataChange={handleFormDataChange}
                formData={formData}
                setOpenShipModal={setOpenShipModal}
              />
            ) : openOfflinePayModal ? (
              <OfflinePay
                totalAmount={1} // Replace with actual total amount value
                upiId="9539662196@superyes" // Replace with actual UPI ID
                handlePaymentSubmit={handleOfflinePaymentSubmit}
                handleFormDataChange={handleFormDataChange}
                formData={formData}
              />
            ) : (
              <AddressList
              formData={formData}
                setIsModalOpen={setIsModalOpen}
                setAddAddress={setAddAddress}
                handleFormDataChange={handleFormDataChange}
              />
            )}
          </Modal>
          {/* ===== modal address Ends */}
        </div>
        {/* --------     Ends Address --------- */}

        {/*================= ----------------------   ================ */}
        {/*================= Product Details Starts   ================ */}
        {/*================= ----------------------   ================ */}
        <p className="font-bold flex items-center gap-1">
          {" "}
          <Icon
            icon="material-symbols-light:box-outline"
            className="text-lg text-textMain"
          />
          Items
        </p>
        <div className="md:ml-6">
          <CheckoutItems />
        </div>

        {/*================= Product Details Ends   ================ */}

        {/* ======= shipping methods ========== */}
        <p className="font-bold flex items-center gap-1">
          {" "}
          <Icon
            icon="carbon:delivery-truck"
            className="text-lg text-textMain"
          />
          Choose shipping method
        </p>
        <div className="md:ml-6">
          <div className="flex flex-wrap gap-4 select-none">
            {shippingMethods.map((ship, index) => (
              <div className="flex flex-col gap-1" key={index}>
                <div
                  className={`flex gap-1 items-center px-2 py-2 text-sm ${
                    ship.label === formData.shippingMethod
                      ? "text-textMain border border-[#5F08B1] bg-bgSoft"
                      : "text-black border border-black"
                  } rounded-md cursor-pointer`}
                  onClick={() => handleSelectShippingMethod(ship)}
                >
                  <Icon
                    icon={ship.icon}
                    className={` ${ship.label === formData.shippingMethod ? "text-textMain" : ""} `}
                  />
                  <span>{ship.label}</span>
                </div>
                {/* selected parcel option */}

                {ship.label === formData.shippingMethod &&
                  formData.parcelOptions && (
                    <div className="text-textMain font-semibold bg-bgHardSoft h-auto w-full p-2 rounded flex items-start flex-col">
                      <div className="flex items-center gap-3">
                        <img
                          src={formData.parcelOptions.logo}
                          alt=""
                          className="h-5 object-cover"
                        />
                        <span className="text-black text-xs">
                          {formData.parcelOptions.serviceName}
                        </span>
                      </div>
                      {/* ========= */}
                      <div className="">
                        <span className="text-xs text-gray-400">
                          Parcel Price: Rs{" "}
                          {formData.parcelOptions.orderDetails.parcelPrice.toFixed(
                            1
                          )}
                        </span>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* ======= Payment methods ========== */}
        <p className="font-bold flex items-center gap-1">
          {" "}
          <Icon
            icon="fluent:payment-20-regular"
            className="text-lg text-textMain"
          />
          Payment method
        </p>
        <div className="md:ml-6">
          <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 select-none">
            {paymentMethods.map((pay, index) => (
              <div
                key={index}
                className={`flex gap-1 sm:flex-col items-center px-2 sm:py-2 py-1 sm:w-auto text-sm ${
                  pay.value === formData.paymentMethod
                    ? "text-textMain border border-[#5F08B1] bg-bgSoft"
                    : "text-black border border-black"
                } rounded-md cursor-pointer`}
                onClick={() => handleFormDataChange("paymentMethod", pay.value)}
              >
                <img
                  src={pay.icon}
                  className={` sm:w-full sm:h-auto h-11 w-28 object-cover ${pay.label === formData?.paymentMethod ? "text-textMain" : ""} `}
                />
                <span className="sm:py-3 py-2">{pay.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <OrderSummary
        gst={18}
        discount={20}
        btnLabel="Pay & Submit Order"
        cess={2}
        itemSubTotal={500}
        shippingCharge={20}
        subTotal={550}
        totalPrice={600}
        totalItems={3}
        isCoupon
        handleClick={createOrder}
      />
    </CartLayout>
  );
}
