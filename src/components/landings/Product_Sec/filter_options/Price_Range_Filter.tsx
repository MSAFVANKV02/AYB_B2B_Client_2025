import { ProductState } from "@/utils/Validator/product-validator";

import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { Slider } from "@mui/joy";
type Props = {
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  filter: ProductState;
};

const PriceRangeFilter = ({ filter, setFilter }: Props) => {
  const [tempPrice, setTempPrice] = useState<[number, number]>([
    filter.priceRange.min,
    filter.priceRange.max,
  ]);

  //   const handlePriceChange = (_: Event, newValue: number | number[]) => {
  //     if (Array.isArray(newValue)) {
  //       const [min, max] = newValue;
  //       setFilter((prev) => ({
  //         ...prev,
  //         priceRange: {
  //           min,
  //           max,
  //         },
  //       }));
  //     }
  //   };

  // Debounced version of setFilter
  const debouncedSetFilter = useCallback(
    debounce((newPrice: [number, number]) => {
      setFilter((prev) => ({
        ...prev,
        priceRange: {
          min: newPrice[0],
          max: newPrice[1],
        },
      }));
    }, 300),
    []
  );

  // const handlePriceChange = (_: Event, newValue: number | number[]) => {
  //   if (Array.isArray(newValue)) {
  //     setTempPrice([newValue[0], newValue[1]]);
  //   }
  // };
  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const min = Math.max(newValue[0], 50); // enforce min >= 50
      const max = newValue[1];
      setTempPrice([min, max]);
    }
  };
  

  const handleChangeCommitted = (
    _: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      debouncedSetFilter([newValue[0], newValue[1]]);
    }
  };

  // Optional: Sync internal state with filter prop on mount/update
  useEffect(() => {
    setTempPrice([filter.priceRange.min, filter.priceRange.max]);
  }, [filter.priceRange]);

  return (
    <div className="px-4">
      <Slider
        value={tempPrice}
        onChange={handlePriceChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        sx={{
          width: "95%",
          m: "auto",
          padding: "10px 0px 19px 0px",
          color: "#5F08B1",
          "& .MuiSlider-thumb": {
            backgroundColor: "#ffffff",
            border: "2px solid #5F08B1",
            "&:focus, &:hover, &.Mui-active": {
              boxShadow: "none",
            },
          },
          "& .MuiSlider-track": {
            backgroundColor: "#5F08B1",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        max={10000}
        step={100}
        min={50}
      />
      <div className="flex justify-between">
        <span className="text-xs">Filter</span>
        <span className="text-xs">
          {tempPrice[0]} - {tempPrice[1]}
        </span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
