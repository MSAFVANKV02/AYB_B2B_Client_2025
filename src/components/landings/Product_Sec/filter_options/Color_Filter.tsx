import React, { useMemo, useState } from "react";
import { useAppSelector } from "@/providers/redux/hook";
import { ProductState } from "@/utils/Validator/product-validator";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  filter: ProductState;
};

const ColorFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const { availableColors } = useAppSelector((state) => state.products);
  const [showMore, setShowMore] = useState(false);
  //   const visibleColors = showMore ? availableColors : availableColors.slice(0, 5);

  const visibleColors = useMemo(() => {
    if (!availableColors || !Array.isArray(availableColors)) return [];
    return showMore ? availableColors : availableColors.slice(0, 5);
  }, [showMore, availableColors]);

  const handleColorChange = (colorName: string) => {
    setFilter((prev) => {
      const updatedColors = prev.colors.includes(colorName)
        ? prev.colors.filter((c) => c !== colorName)
        : [...prev.colors, colorName];
      return { ...prev, colors: updatedColors };
    });
  };

  if (!availableColors || availableColors.length === 0) return null;

  return (
    <div>
      <ul className="flex gap-2 flex-wrap mt-[14px]">
        {visibleColors.map((color, index) => {
          const isSelected = filter.colors.includes(color.colorName);
          return (
            <li
              key={index}
              className={`h-[35px] w-[35px] rounded-md cursor-pointer transition-all duration-150`}
              onClick={() => handleColorChange(color.colorName)}
              style={{
                backgroundColor: color.colorCode,
                border: isSelected
                  ? "2px solid #5F08B1"
                  : "2px solid transparent",
                boxShadow: isSelected ? "0 0 0 2px white inset" : "none",
              }}
              title={color.colorName}
            />
          );
        })}
      </ul>
      {availableColors.length > 5 && (
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

export default ColorFilter;
