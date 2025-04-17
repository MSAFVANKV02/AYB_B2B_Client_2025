// import React, { useState, useRef, useEffect } from 'react';

// const categories = [
//   {
//     name: 'Television',
//     subItems: ['Mi', 'Vu', 'Thomson', 'Samsung', 'iFFALCON by TCL', 'Nokia', 'LG', 'Realme', 'Motorola'],
//   },
//   {
//     name: 'New Launches',
//     subItems: ['Coocaa Smart TVs', 'Nokia (55) 4K Android TV', 'Mi (32) 4A Pro Android TV', 'MarQ (43) FHD Smart TV'],
//   },
//   {
//     name: 'Smart & Ultra HD',
//     subItems: ['LG UHD TV', 'Sony Bravia', 'Samsung UHD', 'OnePlus 4K'],
//   },
//   {
//     name: 'Kitchen Appliances',
//     subItems: ['Microwave Ovens', 'Oven Toaster Grills', 'Juicer/Mixer/Grinder', 'Electric Kettle', 'Induction Cooktops'],
//   },
//   {
//     name: 'Small Home Appliances',
//     subItems: ['Irons', 'Water Purifiers', 'Fans', 'Air Coolers', 'Vacuum Cleaners', 'Voltage Stabilizers'],
//   },
// ];

// const Navbar = () => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [dropdownHover, setDropdownHover] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const handleMouseEnter = (categoryName: string) => {
//     setActiveCategory(categoryName);
//   };

//   const handleMouseLeave = () => {
//     if (!dropdownHover) {
//       setActiveCategory(null);
//     }
//   };

//   const handleDropdownEnter = () => {
//     setDropdownHover(true);
//   };

//   const handleDropdownLeave = () => {
//     setDropdownHover(false);
//     setActiveCategory(null);
//   };

//   const getColumnData = () => {
//     const columns: { name: string; subItems: string[] }[][] = [[]];
//     let currentHeight = 0;

//     categories.forEach((category) => {
//       const sectionHeight = 30 + category.subItems.length * 30;

//       if (currentHeight + sectionHeight > 600 && columns.length < 5) {
//         columns.push([category]);
//         currentHeight = sectionHeight;
//       } else {
//         columns[columns.length - 1].push(category);
//         currentHeight += sectionHeight;
//       }
//     });

//     return columns;
//   };

//   return (
//     <nav className="relative z-50 bg-white shadow-md">
//       <div className="flex gap-8 p-4 bg-gray-200 text-black">
//         {categories.map((category, idx) => (
//           <div
//             key={idx}
//             onMouseEnter={() => handleMouseEnter(category.name)}
//             onMouseLeave={handleMouseLeave}
//             className="relative cursor-pointer hover:underline"
//           >
//             {category.name}
//             {activeCategory === category.name && (
//               <div
//                 ref={containerRef}
//                 onMouseEnter={handleDropdownEnter}
//                 onMouseLeave={handleDropdownLeave}
//                 className="absolute left-0 top-full  w-[80vw] p-4 bg-white shadow-lg overflow-x-auto whitespace-nowrap max-h-[400px]"
//               >
//                 <div className="flex gap-4">
//                   {getColumnData().map((column, colIdx) => (
//                     <div
//                       key={colIdx}
//                       className={`flex flex-col p-4 min-h-[600px] ${
//                         colIdx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
//                       }`}
//                       style={{
//                         minWidth: '200px',
//                         maxHeight: '600px',
//                       }}
//                     >
//                       {column.map((subCategory, subIdx) => (
//                         <div key={subIdx}>
//                           <h3 className="font-bold">{subCategory.name}</h3>
//                           <ul className="mt-2 space-y-1">
//                             {subCategory.subItems.map((item, itemIdx) => (
//                               <li
//                                 key={itemIdx}
//                                 className="text-sm text-gray-600 cursor-pointer hover:text-gray-800"
//                                 onClick={() => alert(`Selected: ${item}`)}
//                               >
//                                 {item}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import { useState, useRef } from "react";

// const categories = [
//   {
//     name: "Television",
//     subItems: [
//       "Mi",
//       "Vu",
//       "Thomson",
//       "Samsung",
//       "iFFALCON by TCL",
//       "Nokia",
//       "LG",
//       "Realme",
//       "Motorola",
//     ],
//   },
//   {
//     name: "New Launches",
//     subItems: [
//       "Coocaa Smart TVs",
//       "Nokia (55) 4K Android TV",
//       "Mi (32) 4A Pro Android TV",
//       "MarQ (43) FHD Smart TV",
//     ],
//   },
//   {
//     name: "Smart & Ultra HD",
//     subItems: ["LG UHD TV", "Sony Bravia", "Samsung UHD", "OnePlus 4K"],
//   },
//   {
//     name: "Kitchen Appliances",
//     subItems: [
//       "Microwave Ovens",
//       "Oven Toaster Grills",
//       "Juicer/Mixer/Grinder",
//       "Electric Kettle",
//       "Induction Cooktops",
//     ],
//   },
//   {
//     name: "Small Home Appliances",
//     subItems: [
//       "Irons",
//       "Water Purifiers",
//       "Fans",
//       "Air Coolers",
//       "Vacuum Cleaners",
//       "Voltage Stabilizers",
//     ],
//   },
  
// ];

// const Navbar = () => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [dropdownHover, setDropdownHover] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Ensure active category is reset to first category by default when mouse leaves
//   const handleMouseEnter = (categoryName: string) => {
//     setActiveCategory(categoryName);
//   };

//   const handleMouseLeave = () => {
//     if (!dropdownHover) {
//       setActiveCategory(null);
//     }
//   };

//   const handleDropdownEnter = () => {
//     setDropdownHover(true);
//   };

//   const handleDropdownLeave = () => {
//     setDropdownHover(false);
//     setActiveCategory(null);
//   };

//   // Ensure dropdown always starts from the first category in the list
//   const getColumnData = () => {
//     const columns: { name: string; subItems: string[] }[][] = [[]];
//     let currentHeight = 0;

//     categories.forEach((category) => {
//       const sectionHeight = 30 + category.subItems.length * 30;

//       if (currentHeight + sectionHeight > 600 && columns.length < 5) {
//         columns.push([category]);
//         currentHeight = sectionHeight;
//       } else {
//         columns[columns.length - 1].push(category);
//         currentHeight += sectionHeight;
//       }
//     });

//     return columns;
//   };

//   return (
//     <nav className="relative z-50  ">
//       <div className="flex gap-8 p-4 bg-gray-200 text-black">
//         {categories.map((category, idx) => (
//           <div
//             key={idx}
//             onMouseEnter={() => handleMouseEnter(category.name)}
//             onMouseLeave={handleMouseLeave}
//             className=" cursor-pointer hover:underline"
//           >
//             {category.name}
//             {activeCategory === category.name && (
//               <div
//                 ref={containerRef}
//                 onMouseEnter={handleDropdownEnter}
//                 onMouseLeave={handleDropdownLeave}
//                 className="absolute left-0 top-10 w-[80vw] p-4 z-40 overflow-x-auto whitespace-nowrap max-h-[700px]"
//               >
//                 <div className="flex gap-4 bg-white p-5 shadow-md">
//                   {getColumnData().map((column, colIdx) => (
//                     <div
//                       key={colIdx}
//                       className={`flex flex-col p-4 min-h-[600px] ${
//                         colIdx % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
//                       }`}
//                       style={{
//                         minWidth: "200px",
//                         maxHeight: "600px",
//                       }}
//                     >
//                       {column.map((subCategory, subIdx) => (
//                         <div key={subIdx}>
//                           <h6 className="font-bold">{subCategory.name}</h6>
//                           <ul className="mt-2 space-y-1">
//                             {subCategory.subItems.map((item, itemIdx) => (
//                               <li
//                                 key={itemIdx}
//                                 className="text-sm text-gray-600 cursor-pointer hover:text-gray-800"
//                                 onClick={() => alert(`Selected: ${item}`)}
//                               >
//                                 {item}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
