/* eslint-disable @typescript-eslint/no-unused-vars */
import CreateAddressForm from "@/pages/UserSide/my-account/user-address/create_Address_Form";

import { useModal } from "@/providers/context/modal-context";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { setCheckoutFormDataField } from "@/providers/redux/userSide/checkout-slice";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
// Add this line to avoid screen-reader issues with modal

const SelectedAddress = () => {
  const { formData } = useAppSelector((state) => state.checkout);
//   const { cart } = useAppSelector((state) => state.products);
  const { address } = useAppSelector((state) => state.auth);

  // const { addAddress } = UseContextPage();

    const {dispatchModal} = useModal()

  useEffect(() => {
    if (!formData?.address && address?.length) {
      const defaultAddress = address.find((add) => add.isDefault);
      const finalAddress = defaultAddress || address[0];
  
      dispatch(setCheckoutFormDataField({ field:"address", value:finalAddress }));
    }
  }, [ address ]);
  

  return (
    <div>
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
        {formData && formData.address ? (
          <div className="flex  flex-col gap-1 ">
            <span className="flex gap-1 items-center">
              <p>{formData.address.name}</p>
            </span>
            {/* ======== */}
            <span className="flex gap-1 items-center break-words flex-wrap">
              {formData.address.street}
            </span>
            {/* ======= */}
            <span className="flex gap-1 items-center">
              <p>{formData.address.city}</p>,<p>{formData.address.zip}</p>,
              <p>{formData.address.mobile}</p>
            </span>
            <div className="flex gap-2 items-center">
              {formData.address.isDefault && (
                <span className="bg-bgSoft text-sm p-1 text-textMain rounded-md">
                  Default shipping address
                </span>
              )}

              <IconButton
                sx={{
                  color: "#93c5fd",
                  fontSize: "1rem",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                  borderRadius: "12px",
                }}
                onClick={() => {
                  dispatchModal({ type: "OPEN_MODAL", modalType: "address" });
                }}
              >
                Change
              </IconButton>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">
            <CreateAddressForm  />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedAddress;
