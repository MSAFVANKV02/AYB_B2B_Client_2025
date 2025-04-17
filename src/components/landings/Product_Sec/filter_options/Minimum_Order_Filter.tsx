import { ProductState } from "@/utils/Validator/product-validator";
import React from "react";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  filter: ProductState;
};

const MinimumOrderFilter = ({ filter, setFilter }: Props) => {
  return (
    <div className="">
      <input
        type="number"
        className="w-full mt-[14px] p-3 rounded-md text-gray-800 border border-[#A9A9A9] bg-transparent text-xs focus:outline-none focus:border-gray-600"
        value={filter.minimumQuantity}
        // onChange={(e) =>
        //     setFilter((prev) => ({
        //       ...prev,
        //       minimumQuantity: Number(e.target.value) || undefined,
        //     }))
        //   }
        onChange={(e) => {
          const value = e.target.value;
          setFilter((prev) => ({
            ...prev,
            minimumQuantity: value === "" ? undefined : Number(value),
          }));
        }}
      />
    </div>
  );
};

export default MinimumOrderFilter;
