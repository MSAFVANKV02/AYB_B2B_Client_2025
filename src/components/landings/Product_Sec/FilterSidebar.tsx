// import { ProductState } from "@/utils/Validator/product-validator";

// import React from "react";
// import PriceRangeFilter from "./filter_options/Price_Range_Filter";
// import { Label } from "@/components/ui/label";
// import MinimumOrderFilter from "./filter_options/Minimum_Order_Filter";
// import BrandFilter from "./filter_options/Brand_Filter";
// import { Separator } from "@/components/ui/separator";
// import ColorFilter from "./filter_options/Color_Filter";
// import { useAppSelector } from "@/redux/hook";
// import SizeFilter from "./filter_options/Size_Filter";
// import RespFilterTabs from "./Resp_Filter_Tabs";
// import { useWindowWidth } from "@react-hook/window-size";

// type Props = {
//   setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
//   filter: ProductState;
// };

// const DEFAULT_MIN_PRICE = 0;
// const DEFAULT_MAX_PRICE = 10000;

// const defaultFilter: ProductState = {
//   size: [],
//   colors: [],
//   priceRange: { min: DEFAULT_MIN_PRICE, max: DEFAULT_MAX_PRICE },
//   brands: [],
//   minimumQuantity: 0,
//   sort: "none",
// };

// const FilterSidebar = ({ filter, setFilter }: Props) => {

//   const onlyWidth = useWindowWidth()
//   const params = new URLSearchParams();

//   const fTab = params.get("fTab");
//   const isMobile = onlyWidth < 768;

//   const { availableBrands, availableColors, availableSizes } = useAppSelector(
//     (state) => state.products
//   );

//   const fTabsList = [
//     {
//       id: 1,
//       name: "Price",
//       value: "price",
//     },
//     {
//       id: 2,
//       name: "Min.Orders",
//       value: "minOrder",
//     },
//     {
//       id: 3,
//       name: "Brand",
//       value: "brand",
//     },
//     {
//       id: 4,
//       name: "Color",
//       value: "color",
//     },

//     {
//       id: 5,
//       name: "Size",
//       value: "size",
//     },
//   ];

//   const handleClearAll = () => {
//     setFilter(defaultFilter);
//   };
//   const hasActiveFilters = (filter: ProductState) => {
//     return (
//       filter.size.length > 0 ||
//       filter.colors.length > 0 ||
//       filter.brands.length > 0 ||
//       (filter.minimumQuantity ?? 0) > 0 ||
//       (filter.priceRange.min ?? DEFAULT_MIN_PRICE) > DEFAULT_MIN_PRICE ||
//       (filter.priceRange.max ?? DEFAULT_MAX_PRICE) < DEFAULT_MAX_PRICE
//     );
//   };

//   return (
//     <>
//       {hasActiveFilters(filter) && (
//         <div className="lg:p-5 md:p-3 p-2 flex justify-end">
//           <button className="text-textMain text-xs" onClick={handleClearAll}>
//             Clear All
//           </button>
//         </div>
//       )}
//       <div className="space-y-3 flex md:flex-col flex-row">
//         {/* 1. filter = Price */}
//         <div className="h-[80dvh]">
//       <RespFilterTabs
//       fTabsList={fTabsList}
//       />
//         </div>

//         <div className="lg:p-5 md:p-3 p-2">
//           <Label className=" border-l-4 border-l-textMain pl-3">
//             Filter by price
//           </Label>
//           <PriceRangeFilter filter={filter} setFilter={setFilter} />
//         </div>

//         <Separator className="w-full bg-[#B6B6B6]  " decorative />

//         {/* 2. filter = min qty */}
//         <div className="lg:p-5 md:p-3 p-2">
//           <Label className=" border-l-4 border-l-textMain pl-3">
//             Min. Order
//           </Label>
//           <MinimumOrderFilter filter={filter} setFilter={setFilter} />
//         </div>

//         <Separator className="w-full bg-[#B6B6B6]  " decorative />

//         {/* 3. filter = brand */}
//         {availableBrands && availableBrands.length > 0 && (
//           <>
//             <div className="lg:p-5 md:p-3 p-2">
//               <Label className=" border-l-4 border-l-textMain pl-3 h-fit">
//                 Brand
//               </Label>
//               <BrandFilter filter={filter} setFilter={setFilter} />
//             </div>
//             <Separator className="w-full bg-[#B6B6B6]  " decorative />
//           </>
//         )}

//         {/* 4. filter = colors */}
//         {availableColors && availableColors.length > 0 && (
//           <>
//             <div className="lg:p-5 md:p-3 p-2">
//               <Label className=" border-l-4 border-l-textMain pl-3 h-fit">
//                 Colors
//               </Label>
//               <ColorFilter filter={filter} setFilter={setFilter} />
//             </div>
//             <Separator className="w-full bg-[#B6B6B6]  " decorative />
//           </>
//         )}

//         {/* 5. filter = sizes */}
//         {availableSizes && availableSizes.length > 0 && (
//           <>
//             <div className="lg:p-5 md:p-3 p-2">
//               <Label className=" border-l-4 border-l-textMain pl-3 h-fit">
//                 Sizes
//               </Label>
//               <SizeFilter filter={filter} setFilter={setFilter} />
//             </div>
//             <Separator className="w-full bg-[#B6B6B6]  " decorative />
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default FilterSidebar;
import { ProductState } from "@/utils/Validator/product-validator";

import React from "react";
import PriceRangeFilter from "./filter_options/Price_Range_Filter";
import { Label } from "@/components/ui/label";
import MinimumOrderFilter from "./filter_options/Minimum_Order_Filter";
import BrandFilter from "./filter_options/Brand_Filter";
import { Separator } from "@/components/ui/separator";
import ColorFilter from "./filter_options/Color_Filter";
import { useAppSelector } from "@/redux/hook";
import SizeFilter from "./filter_options/Size_Filter";
import RespFilterTabs from "./Resp_Filter_Tabs";
import { useWindowWidth } from "@react-hook/window-size";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
  filter: ProductState;
};

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

const defaultFilter: ProductState = {
  fTab: "",
  size: [],
  colors: [],
  priceRange: { min: DEFAULT_MIN_PRICE, max: DEFAULT_MAX_PRICE },
  brands: [],
  minimumQuantity: 0,
  sort: "none",
};

const FilterSidebar = ({ filter, setFilter }: Props) => {
  const onlyWidth = useWindowWidth();
  const isMobile = onlyWidth < 768; // Tailwind md breakpoint

  // const searchParams = new URLSearchParams(window.location.search);
  // const fTab = searchParams.get("fTab");

  const { availableBrands, availableColors, availableSizes } = useAppSelector(
    (state) => state.products
  );

  const fTabsList = [
    { id: 1, name: "Price", value: "price" },
    { id: 2, name: "Min.Orders", value: "minOrder" },
    { id: 3, name: "Brand", value: "brand" },
    { id: 4, name: "Color", value: "color" },
    { id: 5, name: "Size", value: "size" },
  ];

  const handleClearAll = () => setFilter(defaultFilter);

  const hasActiveFilters = (filter: ProductState) => {
    return (
      filter.size.length > 0 ||
      filter.colors.length > 0 ||
      filter.brands.length > 0 ||
      (filter.minimumQuantity ?? 0) > 0 ||
      (filter.priceRange.min ?? DEFAULT_MIN_PRICE) > DEFAULT_MIN_PRICE ||
      (filter.priceRange.max ?? DEFAULT_MAX_PRICE) < DEFAULT_MAX_PRICE
    );
  };

  // Conditionally render each filter
  const renderFilter = () => {
    if (isMobile) {
      switch (filter.fTab) {
        case "price":
          return (
            <div className="p-3">
              <Label className="border-l-4 border-l-textMain pl-3">
                Filter by price
              </Label>
              <PriceRangeFilter filter={filter} setFilter={setFilter} />
            </div>
          );
        case "minOrder":
          return (
            <div className="p-3">
              <Label className="border-l-4 border-l-textMain pl-3">
                Min. Order
              </Label>
              <MinimumOrderFilter filter={filter} setFilter={setFilter} />
            </div>
          );
        case "brand":
          return (
            availableBrands?.length > 0 && (
              <div className="p-3">
                <Label className="border-l-4 border-l-textMain pl-3">
                  Brand
                </Label>
                <BrandFilter filter={filter} setFilter={setFilter} />
              </div>
            )
          );
        case "color":
          return (
            availableColors?.length > 0 && (
              <div className="p-3">
                <Label className="border-l-4 border-l-textMain pl-3">
                  Colors
                </Label>
                <ColorFilter filter={filter} setFilter={setFilter} />
              </div>
            )
          );
        case "size":
          return (
            availableSizes?.length > 0 && (
              <div className="p-3">
                <Label className="border-l-4 border-l-textMain pl-3">
                  Sizes
                </Label>
                <SizeFilter filter={filter} setFilter={setFilter} />
              </div>
            )
          );
        default:
          return (
            <div className="p-3 text-sm text-gray-400">Select a filter tab</div>
          );
      }
    }

    // If desktop, show all filters
    return (
      <>
        <div className="lg:p-5 md:p-3 p-2">
          <Label className="border-l-4 border-l-textMain pl-3">
            Filter by price
          </Label>
          <PriceRangeFilter filter={filter} setFilter={setFilter} />
        </div>
        <Separator className="w-full bg-[#B6B6B6]" />
        <div className="lg:p-5 md:p-3 p-2">
          <Label className="border-l-4 border-l-textMain pl-3">
            Min. Order
          </Label>
          <MinimumOrderFilter filter={filter} setFilter={setFilter} />
        </div>
        <Separator className="w-full bg-[#B6B6B6]" />
        {availableBrands?.length > 0 && (
          <>
            <div className="lg:p-5 md:p-3 p-2">
              <Label className="border-l-4 border-l-textMain pl-3">Brand</Label>
              <BrandFilter filter={filter} setFilter={setFilter} />
            </div>
            <Separator className="w-full bg-[#B6B6B6]" />
          </>
        )}
        {availableColors?.length > 0 && (
          <>
            <div className="lg:p-5 md:p-3 p-2">
              <Label className="border-l-4 border-l-textMain pl-3">
                Colors
              </Label>
              <ColorFilter filter={filter} setFilter={setFilter} />
            </div>
            <Separator className="w-full bg-[#B6B6B6]" />
          </>
        )}
        {availableSizes?.length > 0 && (
          <>
            <div className="lg:p-5 md:p-3 p-2">
              <Label className="border-l-4 border-l-textMain pl-3">Sizes</Label>
              <SizeFilter filter={filter} setFilter={setFilter} />
            </div>
            <Separator className="w-full bg-[#B6B6B6]" />
          </>
        )}
      </>
    );
  };

  return (
    <>
      {hasActiveFilters(filter) && (
        <div className="lg:p-5 md:p-3 p-2 flex justify-end">
          <button className="text-textMain text-xs" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      )}

      <div className="space-y-3 flex md:flex-col flex-row">
        <div className="h-[70dvh] md:hidden block">
          <RespFilterTabs
            fTabsList={fTabsList}
            setFilter={setFilter}
            filter={filter}
          />
        </div>

        <div className="flex-1">{renderFilter()}</div>
      </div>
    </>
  );
};
export default FilterSidebar;
