// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   FormControl,
//   Select,
//   MenuItem,
//   SelectChangeEvent,
// } from "@mui/material";

// // import FilterListIcon from "@mui/icons-material/FilterList";
// import {ProductFilter} from "./ProductFilter";
// import { ProductState } from "@/utils/Validator/product-validator";

// interface CategoryFilterProps {
//   setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
//   filter: ProductState;
//   availableColors?: string[];
//   availableSizes?: string[];
// }

// const SORT_OPTIONS = [
//   { name: "None", value: "none" },
//   { name: "Price:Low to High", value: "price_asc" },
//   { name: "Price:High to Low", value: "price_desc" },
//   { name: "Best Selling", value: "best_selling" },
// ];

// const CategoryProductNavbar: React.FC<CategoryFilterProps> = ({
//   setFilter,
//   filter,
//   // availableColors,
//   // availableSizes,

// }) => {
//   const location = useLocation();
//   const pathSegments = location.pathname.split("/").filter(Boolean); // Splitting and removing empty strings
//   const [selectedValue, setSelectedValue] = useState("");

//   const handleChange = (event: SelectChangeEvent<string>) => {
//     const value = event.target.value;
//     setSelectedValue(value);
//     setFilter((prev) => ({
//       ...prev,
//       sort: value as "price_asc" | "price_desc" | "best_selling",
//     }));
//     // Alert the new selected value
//     // alert(value);
//   };

//   return (
//     <Box className="space-y-3 my-5 mx-2 ">
//       <Typography variant="body2" component="div" sx={{ color: "#999" }}>
//         <a href="/" style={{ textDecoration: "none", color: "#999" }}>
//           Home
//         </a>
//         {pathSegments.map((segment, index) => (
//           <span key={index} style={{ color: "#999" }}>
//             {" / "}
//             {segment.charAt(0) + segment.slice(1)}
//           </span>
//         ))}
//       </Typography>
//       {/* Path Navigation */}
//       <Box className="flex flex-row justify-between items-center sm:gap-3">
//         <FormControl sx={{ minWidth: 150 }} size="small">
//           <Select
//             value={selectedValue}
//             onChange={handleChange}
//             displayEmpty
//             inputProps={{ "aria-label": "Without label" }}
//           >
//             <MenuItem value="" disabled className="">
//               <em className="text-gray-400">Sort</em>
//             </MenuItem>
//             {SORT_OPTIONS.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Filter Section Starts  ==== */}

//         <Box className="">
//           <ProductFilter
//           setFilter={setFilter}
//           filter={filter}
//           />
//         </Box>
//       </Box>

//       {/* Filter Option */}
//     </Box>
//   );
// };

// export default CategoryProductNavbar;
