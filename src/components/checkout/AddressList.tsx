import { Button, IconButton, Checkbox } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Divider } from "@mui/joy";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { IAddressType } from "@/types/address-types";
import { deleteAddressRedux, fetchAyabooUserDetails } from "@/providers/redux/userSide/UserAuthSlice";
import { UseContextPage } from "@/providers/context/context";
import { setCheckoutFormDataField } from "@/providers/redux/userSide/checkout-slice";
import { useModal } from "@/providers/context/modal-context";

type Props = {
  // setIsModalOpen: (isOpen: boolean) => void;
  // setAddAddress?: (isAdd: boolean) => void;
  // formData?: FormDataType;
  // handleFormDataChange?: (
  //   field: keyof FormDataType,
  //   value: FormDataValue
  // ) => void;
  isRemoveThings?: boolean;
};

export default function AddressList({
  // setIsModalOpen,
  // setAddAddress,
  // handleFormDataChange,
  // formData,
  isRemoveThings,
}: Props) {
  // const [selectedAddress, setSelectedAddress] = useState<IAddressType | null>(
  //   null
  // ); // Track a single selected address ID
  const { address } = useAppSelector((state) => state.auth);
  const { formData } = useAppSelector((state) => state.checkout);

  const { dispatchModal } = useModal();

  const { setSelectedAddress, selectedAddress } = UseContextPage();

  // console.log(selectedAddress,'selectedAddress');

  const handleAddressSelect = (address: IAddressType | null) => {
    // console.log(address);

    dispatch(setCheckoutFormDataField({ field: "address", value: address }));
    dispatchModal({type:"CLOSE_MODAL"})

    // if (handleFormDataChange) {
    //   handleFormDataChange("address", address); // Only allow one selected address
    // } // Only allow one selected address
    // setIsModalOpen(false); //
  };

  return (
    <div className="h-full flex flex-col justify-between ">
      <div className="">
        {/* <div className="w-full h">
          <IconButton
            className="float-right"
            sx={{ color: "black" }}
            onClick={() => setIsModalOpen(false)}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </div> */}
        <div className="md:w-3/4 w-full sm:p-3 space-y-3">
          <h4>Select shipping address</h4>
          <Button
            variant="outlined"
            className="w-full flex gap-2 items-center"
            sx={{
              fontSize: "1.2rem",
              bgcolor: "var(--hardSoftColor)",
              color: "var(--mainText)",
              border: "1px dashed #5F08B1",
              textTransform: "capitalize",
            }}
            onClick={() => {
              // if (setAddAddress) {
              //   setAddAddress(true);
              //   setSelectedAddress(null)
              // }
              dispatchModal({ modalType: "NewAddress", type: "OPEN_MODAL" });
              setSelectedAddress(null);
            }}
          >
            <AddOutlinedIcon /> Add An Address
          </Button>
        </div>
        <Divider sx={{ my: 2 }} />
        {/* ==================  starting listing address =============== */}

        <div className="md:w-3/4 w-full sm:p-3 space-y-3 overflow-y-auto h-full  max-h-[550px]">
          {address &&
            address.map((address) => (
              <div
                key={address._id}
                className={`flex items-start sm:p-3 border rounded-lg ${
                  selectedAddress?._id === address._id
                    ? "border-purple-600"
                    : "border-gray-300"
                }`}
              >
                <Checkbox
                  checked={selectedAddress?._id === address._id}
                  onChange={() => setSelectedAddress(address)}
                  sx={{
                    color: "purple",
                    "&.Mui-checked": { color: "purple" },
                    marginRight: "8px",
                  }}
                />
                <div className="flex-1 text-sm">
                  <div className="flex flex-col">
                    <span>{address.street}</span>
                    <span>{address.zip}</span>

                    <div className="flex gap-1">
                      <span>{address.city},</span>
                      <span>{address.state},</span>
                      <span>{address.country}</span>
                    </div>
                  </div>

                  {address.isDefault ? (
                    <span className="text-purple-600 text-sm">
                      Default shipping address
                    </span>
                  ) : (
                    <button
                      className="text-gray-500 text-sm underline hover:text-gray-700"
                      onClick={() => {
                        // if (setAddAddress) {
                        //   setAddAddress(true);
                        // }
                        // setIsModalOpen(true);
                        dispatchModal({
                          modalType: "NewAddress",
                          type: "OPEN_MODAL",
                        });
                        setSelectedAddress(address);
                      }}
                    >
                      Set as default shipping address
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2 my-auto">
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: "#878787",
                      borderRadius: "5px",
                      padding: "2px",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#5b5757",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      // if (setAddAddress) {
                      //   setAddAddress(true);
                      // }
                      // setIsModalOpen(true);
                      dispatchModal({
                        modalType: "NewAddress",
                        type: "OPEN_MODAL",
                      });

                      setSelectedAddress(address);
                    }}
                  >
                    <CreateIcon
                      sx={{
                        fontSize: "1rem",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={async() => {
                     await dispatch(deleteAddressRedux(address._id));
                     dispatch(fetchAyabooUserDetails());
                     if(address._id === formData.address?._id){
                      dispatch(setCheckoutFormDataField({field:"address",value:null}))
                     }
                    }}
                  >
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* button staring ======= */}
      {!isRemoveThings && (
        <div className="flex justify-end border-t pt-5 w-full">
          <div className="flex w-3/4 gap-4  justify-end">
            {/* <Button
            variant="outlined"
            className="w-1/2 "
            sx={{
              fontSize: "0.8rem",
              color: "black",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            cancel
          </Button> */}
            <Button
              variant="contained"
              className="w- mt-4 h-11"
              sx={{
                fontSize: "0.8rem",
                backgroundColor: "var(--primaryVariant)",
                color: "white",
                border: "none",
                textTransform: "capitalize",
                borderRadius: "10px",
              }}
              onClick={() => handleAddressSelect(selectedAddress)}
            >
              Ship to this address
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
