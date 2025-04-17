// import React, { useState } from "react";
// import Drawer from "@mui/joy/Drawer";
// import Button from "@mui/joy/Button";
// import DialogTitle from "@mui/joy/DialogTitle";
// import DialogContent from "@mui/joy/DialogContent";
// import ModalClose from "@mui/joy/ModalClose";
// import Divider from "@mui/joy/Divider";
// import Stack from "@mui/joy/Stack";
// import Sheet from "@mui/joy/Sheet";
// import TuneIcon from "@mui/icons-material/TuneRounded";
// import {
//   // Accordion,
//   // AccordionSummary,
//   // AccordionDetails,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Typography,
// } from "@mui/material";
// import AccordionGroup from "@mui/joy/AccordionGroup";
// import Accordion from "@mui/joy/Accordion";
// import AccordionDetails from "@mui/joy/AccordionDetails";
// import AccordionSummary from "@mui/joy/AccordionSummary";

// import Slider from "@mui/joy/Slider";
// import { ProductState } from "@/utils/Validator/product-validator";
// // import { cn } from "@/lib/utils";
// // import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // import { AccordionGroup } from "@mui/joy";

// interface CategoryFilterSheetProps {
//   setFilter: React.Dispatch<React.SetStateAction<ProductState>>;
//   filter: ProductState;

//   // debouncedSubmit: () => void;
// }

// const DEFAULT_CUSTOM_PRICE = [0, 10000] as [number, number];

// export const ProductFilter: React.FC<CategoryFilterSheetProps> = ({
//   setFilter,
//   filter,
// }) => {
//   const [open, setOpen] = useState(false);

//   const range = filter.price.range || DEFAULT_CUSTOM_PRICE;
//   const minPrice = Math.min(range[0], range[1]);
//   const maxPrice = Math.max(range[0], range[1]);

//   const [selectedColors, setSelectedColors] = useState<string[]>([]);
//   const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
//   // const [selectedPrice, setSelectedPrice] = useState<string[]>([]);

//   const [index, setIndex] = useState<number | null>(0);
  

//   // const handlePriceChange = (event: Event, newValue: number | number[]) => {
//   //   setPriceRange(newValue as number[]);
//   // };

//   const handlePriceChange = (_: Event, newValue: number | number[]) => {
//     // Ensure newValue is an array
//     if (Array.isArray(newValue)) {
//       setFilter((prev) => ({
//         ...prev,
//         price: { ...prev.price, range: newValue as [number, number] },
//       }));
//     }
//   };

//   const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const color = event.target.name;
//     console.log(color);
    
//     setSelectedColors((prev) =>
//       prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
//     );
//   };

//   const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const size = event.target.name;
//     setSelectedSizes((prev) =>
//       prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
//     );
//   };

//   // const handlePriceChange2 = (price: number) =>{
//   //   setSelectedPrice((prev) =>
//   //     prev.includes(price.toString())? prev.filter((p) => p!== price.toString()) : [...prev, price.toString()]
//   //   );
//   // }

//   const handleApplyFilter = () => {
//     setFilter((prev) => ({
//      ...prev,
//       color: selectedColors,
//       size: selectedSizes,
//     }));
//     setOpen(false);
//   }

//   const handleClearFilter = () => {
//     setFilter({
//       color: [],
//       size: [],
//       sort: "none",
//       price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
//     });

//     // setFilter((prev) => ({
//     //   ...prev,
//     //    color: [],
//     //    size: [],
//     //  }));
//     setSelectedColors([]);
//     setSelectedSizes([]);
//     setOpen(false);
//   }

//   return (
//     <React.Fragment>
//       <Button
//         variant="outlined"
//         color="neutral"
//         startDecorator={<TuneIcon />}
//         onClick={() => setOpen(true)}
//       >
//         Filter
//       </Button>
//       <Drawer
//         size="md"
//         variant="plain"
//         open={open}
//         anchor="right"
//         onClose={() => setOpen(false)}
//         slotProps={{
//           content: {
//             sx: {
//               bgcolor: "transparent",
//               p: { md: 3, sm: 0 },
//               boxShadow: "none",
//             },
//           },
//         }}
//       >
//         <Sheet
//           sx={{
//             borderRadius: { md: "md", sm: 0 },
//             p: 2,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             height: "100%",
//             overflow: "auto",
//             bgcolor: "white",
//           }}
//         >
//           <DialogTitle>Filters</DialogTitle>
//           <ModalClose />
//           <Divider sx={{ mt: "auto" }} />
//           {/* contents starts here */}
//           <DialogContent sx={{ gap: 3 }}>
//             <Stack spacing={2} sx={{ flex: 1 }}>
//               <AccordionGroup size="lg">
//                 <Accordion
//                   expanded={index === 0}
//                   onChange={(_, expanded) => {
//                     setIndex(expanded ? 0 : null);
//                   }}
//                 >
//                   <AccordionSummary>
//                     <Typography>Price</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     {/* <Typography gutterBottom>Price range</Typography> */}
//                     <div className="mt-4"></div>
//                     <ul className="space-y-4">
//                       {[
//                         { value: [], label: "Any Price" },
//                         { value: [0, 500], label: "Under 500Rs" },
//                         { value: [0, 2500], label: "Under 2500Rs" },
//                         { value: [10000, 100000000], label: "Above 10000Rs" },
//                       ].map((option, optionIdx) => (
//                         <li key={optionIdx}>
//                           <input
//                             type="radio"
//                             id={`price-${optionIdx}`}
//                             onChange={() => {
//                               setFilter((prev) => ({
//                                 ...prev,
//                                 price: {
//                                   isCustom: option.value.length > 0, // Set isCustom based on the option
//                                   range:
//                                     option.value.length > 0
//                                       ? ([...option.value] as [number, number])
//                                       : DEFAULT_CUSTOM_PRICE,
//                                 },
//                               }));
//                             }}
//                             checked={
//                               (!filter.price.isCustom &&
//                                 option.value.length === 0) || // for "Any Price"
//                               (filter.price.isCustom &&
//                                 filter.price.range[0] === option.value[0] &&
//                                 filter.price.range[1] === option.value[1])
//                             }
//                             className="form-checkbox"
//                           />
//                           <label
//                             htmlFor={`price-${optionIdx}`}
//                             className="ml-2 text-sm text-gray-600"
//                           >
//                             {option.label}
//                           </label>
//                         </li>
//                       ))}
//                       <li className="flex justify-center flex-col gap-2">
//                         <div>
//                           <input
//                             type="radio"
//                             id={`price-custom`}
//                             onChange={() => {
//                               setFilter((prev) => ({
//                                 ...prev,
//                                 price: {
//                                   isCustom: true,
//                                   range: [0, 10000] as [number, number],
//                                 },
//                               }));
//                             }}
//                             checked={filter.price.isCustom}
//                             className="form-checkbox"
//                           />
//                           <label
//                             htmlFor={`price-custom`}
//                             className="ml-2 text-sm text-gray-600"
//                           >
//                             Custom
//                           </label>
//                         </div>

//                         {/* <div>
//                           {filter.price.isCustom
//                             ? minPrice.toFixed(0)
//                             : filter.price.range &&
//                               filter.price.range[0] &&
//                               filter.price.range[0].toFixed(0)}{" "}
//                           -{" "}
//                           {filter.price.isCustom
//                             ? maxPrice.toFixed(0)
//                             : filter.price.range &&
//                               filter.price.range[1] &&
//                               filter.price.range[1].toFixed(0)}
//                         </div> */}
//                         <div>
//                           {filter.price.isCustom
//                             ? minPrice.toFixed(0)
//                             : (filter.price.range && filter.price.range[0]) !==
//                                 undefined
//                               ? filter.price.range[0].toFixed(0)
//                               : "0"}{" "}
//                           -{" "}
//                           {filter.price.isCustom
//                             ? maxPrice.toFixed(0)
//                             : (filter.price.range && filter.price.range[1]) !==
//                                 undefined
//                               ? filter.price.range[1].toFixed(0)
//                               : "10000"}
//                         </div>

//                         <Slider
//                           value={
//                             filter.price.isCustom
//                               ? filter.price.range
//                               : DEFAULT_CUSTOM_PRICE
//                           }
//                           onChange={handlePriceChange}
//                           valueLabelDisplay="auto"
//                           sx={{
//                             width: "95%",
//                             m: "auto",
//                             color: "#5F08B1",
//                             "& .MuiSlider-thumb": {
//                               backgroundColor: "#ffffff",
//                               border: "2px solid #5F08B1",
//                               outline: "none",
//                               "&:focus, &:hover, &.Mui-active": {
//                                 boxShadow: "none",
//                               },
//                             },
//                             "& .MuiSlider-track": {
//                               backgroundColor: "#5F08B1",
//                             },
//                             "& .MuiSlider-rail": {
//                               backgroundColor: "rgba(0, 0, 0, 0.2)",
//                             },
//                           }}
//                           disabled={!filter.price.isCustom}
//                           max={10000}
//                           step={100}
//                         />
//                       </li>
//                     </ul>
//                     {/* <Slider
//                        value={
//                         filter.price.isCustom
//                           ? filter.price.range
//                           : DEFAULT_CUSTOM_PRICE
//                       }
//                       onChange={handlePriceChange}
//                       valueLabelDisplay="auto"
//                       min={0}
//                       defaultValue={[0, 10000]}
//                       max={100}
//                       sx={{
//                         width: "95%",
//                         m: "auto",
//                         color: "#5F08B1", // Change the track color
//                         "& .MuiSlider-thumb": {
//                           backgroundColor: "#ffffff", // Change the thumb color to white
//                           border: "2px solid #5F08B1", // Set the border color of the thumb
//                           outline: "none", // Remove the default outline
//                           "&:focus, &:hover, &.Mui-active": {
//                             boxShadow: "none", // Remove the default blue shadow
//                           },
//                         },
//                         "& .MuiSlider-track": {
//                           backgroundColor: "#5F08B1", // Change the track color (active)
//                         },
//                         "& .MuiSlider-rail": {
//                           backgroundColor: "rgba(0, 0, 0, 0.2)", // Change the track color (inactive)
//                         },
//                       }}
//                     /> */}
//                     {/* <Typography>
//                       ${priceRange[0]} - ${priceRange[1]}
//                     </Typography> */}
//                   </AccordionDetails>
//                 </Accordion>

//                 {/* Color Filter */}
//                 <Accordion
//                   expanded={index === 1}
//                   onChange={(_, expanded) => {
//                     setIndex(expanded ? 1 : null);
//                   }}
//                 >
//                   <AccordionSummary>
//                     <Typography>Color</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <FormGroup>
//                       {["Red", "Blue", "Green", "Black"].map((color) => (
//                         <FormControlLabel
//                           key={color}
//                           control={
//                             <Checkbox
//                               checked={selectedColors.includes(color)}
//                               onChange={handleColorChange}
//                               name={color}
//                             />
//                           }
//                           label={color}
//                         />
//                       ))}
//                     </FormGroup>
//                   </AccordionDetails>
//                 </Accordion>

//                 {/* Size Filter */}
//                 <Accordion
//                   expanded={index === 2}
//                   onChange={(_, expanded) => {
//                     setIndex(expanded ? 2 : null);
//                   }}
//                 >
//                   <AccordionSummary>
//                     <Typography>Size</Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <FormGroup>
//                       {["Small", "Medium", "Large", "X-Large"].map((size) => (
//                         <FormControlLabel
//                           key={size}
//                           control={
//                             <Checkbox
//                               checked={selectedSizes.includes(size)}
//                               onChange={handleSizeChange}
//                               name={size}
//                             />
//                           }
//                           label={size}
//                         />
//                       ))}
//                     </FormGroup>
//                   </AccordionDetails>
//                 </Accordion>
//               </AccordionGroup>
//             </Stack>
//           </DialogContent>

//           <Divider sx={{ mt: "auto" }} />
//           <Stack
//             direction="row"
//             useFlexGap
//             spacing={1}
//             sx={{ justifyContent: "space-between" }}
//           >
//             <Button variant="outlined" color="neutral" type="button"
//              onClick={() =>  handleClearFilter()}
//             >
//               Clear
//             </Button>
//             <Button onClick={() =>  handleApplyFilter()}>Apply</Button>
//           </Stack>
//         </Sheet>
//       </Drawer>
//     </React.Fragment>
//   );
// };
