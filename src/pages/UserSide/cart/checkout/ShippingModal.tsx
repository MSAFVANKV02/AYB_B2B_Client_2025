import { Button } from "@/components/ui/button";
import { FormDataType, FormDataValue, ParcelOptionsType } from "./page";
import { makeToast, makeToastError } from "@/utils/toaster";
import { useState } from "react";

type Props = {
  handleFormDataChange: (
    field: keyof FormDataType,
    value: FormDataValue
  ) => void;
  formData: FormDataType;
  setOpenShipModal: (val: boolean) => void;
};

const parcelOptions = [
  {
    id: 1,
    logo: "/paymentImg/vrlsrvc.png",
    serviceName: "FlipCart",
    pricePerKg: 25,
    orderDetails: {
      weight: 10,
      parcelPrice: 250,
      boxQty: 100,
    },
  },
  {
    id: 2,
    logo: "/paymentImg/vrlsrvc.png",
    serviceName: "Doha Travel",
    pricePerKg: 25,
    orderDetails: {
      weight: 10,
      parcelPrice: 250,
      boxQty: 100,
    },
  },
  {
    id: 3,
    logo: "/paymentImg/vrlsrvc.png",
    serviceName: "Doha Travel",
    pricePerKg: 25,
    orderDetails: {
      weight: 10,
      parcelPrice: 250,
      boxQty: 100,
    },
  },
  {
    id: 4,
    logo: "/paymentImg/vrlsrvc.png",
    serviceName: "Doha Travel",
    pricePerKg: 25,
    orderDetails: {
      weight: 10,
      parcelPrice: 250,
      boxQty: 100,
    },
  },
];

export default function ShippingModal({
  handleFormDataChange,
  formData,
  setOpenShipModal,
}: Props) {
  const [selectedOptions, setSelectedOptions] =
    useState<ParcelOptionsType | null>(null);

  // console.log(selectedOptions);

  const handleSelectParcelOption = (option: ParcelOptionsType | null) => {
    if (formData.parcelMethod === "") {
      makeToastError("Please select a parcel payment Method first.");
      return;
    }
    if (selectedOptions === null) {
      makeToastError("Please select a parcel Option.");
      return;
    }
    handleFormDataChange("parcelOptions", selectedOptions);
    makeToast(`Selected ${option?.serviceName}'s Service`);
    setOpenShipModal(false);
  };

  const handleCancelSelectedParcelOption = () => {
    setSelectedOptions(null);
    // setOpenShipModal(false);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="">
        <span className="font-bold ">Choose a parcel option</span>
        {/* ==== */}
        <div className="w-full flex mt-2">
          <Button
            className={`w-full border-n border-b ${formData.parcelMethod === "toPay" ? "border-b-textMain bg-bgSoft text-textMain" : "bg-white text-black"}  rounded-none hover:bg-bgSoft`}
            onClick={() => handleFormDataChange("parcelMethod", "toPay")}
          >
            ToPay
          </Button>
          <Button
            className={`w-full border-n border-b ${formData.parcelMethod === "pay" ? "border-b-textMain bg-bgSoft text-textMain" : "bg-white text-black"}  rounded-none hover:bg-bgSoft`}
            onClick={() => handleFormDataChange("parcelMethod", "pay")}
          >
            Pay
          </Button>
        </div>
      </div>
      {/* ===== */}
      <div className="">
        <ol>
          {formData.parcelMethod === "pay" ? (
            <li className="sm:text-sm text-xs sm:my-1 my-3">
              We will collect the shipping charge. The shipping charge will be
              included with the bill, so there's no need to pay when you receive
              the goods.
            </li>
          ) : (
            <li className="sm:text-sm text-xs sm:my-1 my-3">
              The shipping charge will be paid to the shipping partner when you
              receive your parcel. Shipping charge does not include with bill
            </li>
          )}
        </ol>
      </div>
      <div className="overflow-y-auto md:max-h-[700px] max-h-[800px]">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {/* select a shipping service option ==== here ----- */}
          {parcelOptions.map((option) => (
            <div
              key={option.id}
              className={`${selectedOptions?.id === option.id ? "bg-transparent border-textMain" : formData?.parcelOptions?.id === option.id ? "bg-bgHardSoft border-textMain" : ""} border min-h-[250px] rounded-lg overflow-hidden p-3 flex flex-col justify-between cursor-pointer`}
              onClick={() => setSelectedOptions(option)}
            >
              <img
                src={option.logo}
                alt={option.serviceName}
                className="w-3/4 mx-auto h-20 object-cover rounded-lg"
              />
              <span className="text-center capitalize">
                {option.serviceName}
              </span>
              <small className="text-gray-400 text-center">
                Price: {option.pricePerKg}/kg
              </small>
              <table className="table-style">
                <tr>
                  <th>Weight</th>
                  <th>{option.orderDetails.weight} kg</th>
                </tr>
                <tr>
                  <th>Parcel Price</th>
                  <th>Rs {option.orderDetails.parcelPrice}</th>
                </tr>
                <tr>
                  <th>Box Quantity</th>
                  <th>{option.orderDetails.boxQty}</th>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex gap-3 justify-end ">
        <Button
          size="b2b"
          variant="outline"
          className=""
          onClick={handleCancelSelectedParcelOption}
        >
          Cancel
        </Button>
        <Button
          variant={"b2bStyle"}
          size={"b2b2"}
          className=""
          onClick={() => handleSelectParcelOption(selectedOptions)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
