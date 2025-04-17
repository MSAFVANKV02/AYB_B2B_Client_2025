import { Button, IconButton, Checkbox } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Divider } from "@mui/joy";
import { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddressType, FormDataType, FormDataValue } from "./page";

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
  setAddAddress?: (isAdd: boolean) => void;
  formData?: FormDataType;
  handleFormDataChange?: (
    field: keyof FormDataType,
    value: FormDataValue
  ) => void;
  isRemoveThings?: boolean;
};

export default function AddressList({
  setIsModalOpen,
  setAddAddress,
  handleFormDataChange,
  // formData,
  isRemoveThings
}: Props) {
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null
  ); // Track a single selected address ID

  const addresses: AddressType[] = [
    {
      id: 1,
      street: "Mavoor, Phed, Calicut",
      city: "Kolkata",
      country: "India",
      postalCode: "700001",
      isDefault: true,
      state: "Kerala",
    },
    {
      id: 2,
      street: "Edavannapara, Malappuram",
      city: "Kolkata",
      country: "India",
      postalCode: "700001",
      isDefault: true,
      state: "Kerala",
    },
    {
      id: 3,
      street: "Edavannapara, Malappuram",
      city: "Kolkata",
      country: "India",
      postalCode: "700001",
      isDefault: true,
      state: "Kerala",
    },
  ];

  // const handleAddressSelect = (id: number) => {
  //     setSelectedAddresses((prevSelected) =>
  //         prevSelected.includes(id)
  //             ? prevSelected.filter((addressId) => addressId !== id)
  //             : [...prevSelected, id]
  //     );
  // };

  const handleAddressSelect = (address: AddressType| null) => {
    console.log(address);

    if (handleFormDataChange) {
      handleFormDataChange("address", address); // Only allow one selected address
    } // Only allow one selected address
    setIsModalOpen(false); //
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
              if (setAddAddress) {
                setAddAddress(true);
              }
            }}
          >
            <AddOutlinedIcon /> Add An Address
          </Button>
        </div>
        <Divider sx={{ my: 2 }} />
        {/* ==================  starting listing address =============== */}

        <div className="md:w-3/4 w-full sm:p-3 space-y-3 overflow-y-auto h-full  max-h-[550px]">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`flex items-start sm:p-3 border rounded-lg ${
                selectedAddress?.id === address.id
                  ? "border-purple-600"
                  : "border-gray-300"
              }`}
            >
              <Checkbox
                checked={selectedAddress?.id === address.id}
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
                  <span>{address.postalCode}</span>
                 
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
                >
                  <CreateIcon
                    sx={{
                      fontSize: "1rem",
                    }}
                  />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* button staring ======= */}
      {
        !isRemoveThings && (
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
        )
      }
    
    </div>
  );
}
