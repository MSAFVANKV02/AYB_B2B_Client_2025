import React, { useMemo, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useAppSelector } from "@/redux/hook";
import { ProductState } from "@/utils/Validator/product-validator";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  filter: ProductState;
};

const BrandFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const { availableBrands } = useAppSelector((state) => state.products);
  const [showMore, setShowMore] = useState(false);
  // const visibleBrands = showMore ? availableBrands : availableBrands.slice(0,5);
  const visibleBrands = useMemo(() => {
    if (!availableBrands || !Array.isArray(availableBrands)) return [];
    return showMore ? availableBrands : availableBrands.slice(0, 5);
  }, [showMore, availableBrands]);
  

  const handleBrandChange = (brand: string) => {
    setFilter((prev) => {
      const updatedBrands = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: updatedBrands };
    });
  };

  if (!availableBrands || availableBrands.length === 0) return null;

  return (
    <div className="">
      <ul className="flex flex-col mt-[14px]">
        {visibleBrands.map((brand, index) => (
          <li key={index} className="flex items-center ">
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
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
                  {brand}
                </span>
              }
              sx={{ marginLeft: "5px" }}
            />
          </li>
        ))}
      </ul>
      {availableBrands.length > 5 && (
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

export default BrandFilter;
