import { useModal } from "@/providers/context/modal-context";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { setShippingInfo } from "@/providers/redux/userSide/checkout-slice";
import { Icon } from "@iconify/react/dist/iconify.js";

// type Props = {
//   formData: FormDataType;
//   handleFormDataChange: (
//     field: keyof FormDataType,
//     value: FormDataValue
//   ) => void;
//   setOpenShipModal: Dispatch<boolean>;
// };

export type IShipMethod = {
  id: number;
  label: string;
  value: string;
  icon: string;
};

type Props = {
  storeId: string;
};

function ShippingMethod({ storeId }: Props) {
  const { dispatchModal } = useModal();

  const { formData } = useAppSelector((state) => state.checkout);

  const shippingMethods = [
    // {
    //   id: 1,
    //   label: "Pickup from Parcel office",
    //   value: "",
    //   icon: "material-symbols:storefront-outline-sharp",
    // },
    {
      id: 2,
      label: "Door delivery",
      value: "store_pickup",
      icon: "icon-park-outline:delivery",
    },
    {
      id: 3,
      label: "Store pickup",
      value: "parcel_pickup",
      icon: "carbon:delivery",
    },
  ];

  const handleSelectShippingMethod = (ship: IShipMethod) => {
    // handleFormDataChange(".shipping_info", ship.label);
    dispatch(
      setShippingInfo({
        storeId,
        shipping_method: ship.value,
      })
    );

    if (ship.label === "Store pickup") {
      // handleFormDataChange("parcelOptions", null);

      dispatchModal({ type: "CLOSE_MODAL" });
    } else {
      // Open shipping modal for other options
      // setOpenShipModal(true);
      // dispatchModal({ modalType: "shipping", type: "OPEN_MODAL" });
    }
  };

  return (
    <div className="md:ml-6">
      <div className="flex  sm:gap-4 select-none">
        {shippingMethods.map((ship, index) => (
          <div className="flex flex-col gap-1 sm:w-auto w-full" key={index}>
            <div
              className={`flex gap-1 items-center sm:w-[150px] w-full px-2 py-2 text-sm ${
                ship.value ===
                (formData.shipping_info?.[storeId]?.shipping_method ?? "")
                  ? "text-textMain border border-[#5F08B1] bg-bgSoft"
                  : "text-black border border-black"
              } sm:rounded-md cursor-pointer`}
              onClick={() => handleSelectShippingMethod(ship)}
            >
              <Icon
                icon={ship.icon}
                className={` ${
                  ship.value ===
                  (formData.shipping_info?.[storeId]?.shipping_method ?? "")
                    ? "text-textMain"
                    : ""
                } `}
              />
              <span className="mx-auto">{ship.label}</span>
            </div>
            {/* selected parcel option */}

            {/* {ship.label === formData.shipping_info &&
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
                  =========
                  <div className="">
                    <span className="text-xs text-gray-400">
                      Parcel Price: Rs{" "}
                      {formData.parcelOptions.orderDetails.parcelPrice.toFixed(
                        1
                      )}
                    </span>
                  </div>
                </div>
              )} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShippingMethod;
