import React, { useMemo, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useAppSelector } from "@/providers/redux/hook";
import { ProductState } from "@/utils/Validator/product-validator";


type Props = {
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  filter: ProductState;
};

const SizeFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const { availableSizes } = useAppSelector((state) => state.products);
  const [showMore, setShowMore] = useState(false);
  // const visibleSizes = showMore ? availableSizes : availableSizes.slice(0,5);
  const visibleSizes = useMemo(() => {
    if (!availableSizes || !Array.isArray(availableSizes)) return [];
    return showMore ? availableSizes : availableSizes.slice(0, 5);
  }, [showMore, availableSizes]);
  

  const handleSizeChange = (size: string) => {
    setFilter((prev) => {
      const updatedBrands = prev.size.includes(size)
        ? prev.size.filter((b) => b !== size)
        : [...prev.size, size];
      return { ...prev, size: updatedBrands };
    });
  };

  if (!availableSizes || availableSizes.length === 0) return null;

  return (
    <div className="">
      <ul className="flex flex-col mt-[14px]">
        {visibleSizes.map((size, index) => (
          <li key={index} className="flex items-center ">
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.size.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  icon={
                    <span
                      style={{
                        display: "inline-block",
                        marginRight:"10px",
                        width: 19,
                        height: 19,
                        border: "1px solid #5F08B1",
                        borderRadius: "5px",
                      }}
                    />
                  }
                  checkedIcon={
                    <span
                      style={{
                        display: "flex",
                        marginRight:"10px",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 19,
                        height: 19,
                        border: "1px solid #5F08B1",
                        borderRadius: "5px",
                        boxSizing: "border-box",
                      }}
                    >
                      <span
                        style={{
                          width: 13,
                          height: 13,
                          backgroundColor: "#5F08B1",
                          borderRadius: "4px",
                        }}
                      />
                    </span>
                  }
                  sx={{
                    padding: 0,
                    margin: 0,
                  }}
                />
              }
              label={
                <span
                  style={{
                    // color: "#5F08B1",
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {size}
                </span>
              }
              sx={{ marginLeft: "5px" }}
            />
          </li>
        ))}
      </ul>
      {availableSizes.length > 5 && (
        <button
          className="text-purple-700 text-xs mt-2 cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default SizeFilter;
