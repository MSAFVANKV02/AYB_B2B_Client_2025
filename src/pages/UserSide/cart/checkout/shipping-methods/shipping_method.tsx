import React, { Dispatch } from 'react'
import { FormDataType, FormDataValue } from '../page';
import { Icon } from '@iconify/react/dist/iconify.js';

type Props = {
    formData:FormDataType
    handleFormDataChange: (
        field: keyof FormDataType,
        value: FormDataValue
      ) => void;
      setOpenShipModal: Dispatch<boolean>;
}

export type IShipMethod = {
    id: number;
    label: string;
    value: string;
    icon: string;
  };
  

function ShippingMethod({formData,handleFormDataChange, setOpenShipModal}: Props) {
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


      const handleSelectShippingMethod = (ship: IShipMethod) => {
        handleFormDataChange("shippingMethod", ship.label);
    
        if (ship.label === "Store pickup") {
          handleFormDataChange("parcelOptions", null);
          // handleFormDataChange("parcelMethod", "");
          setOpenShipModal(false); 
        } else {
          // Open shipping modal for other options
          setOpenShipModal(true);
        }
      };

  return (
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
  )
}

export default ShippingMethod