// import { Box } from "@mui/material";
// import ProdCard from "@/components/landings/maniHome/Cards/ProdCard";
// // import { ProductsDetail } from "@/utils/CardDetails";
// import { useQuery } from "@/utils/QueryParams";
// import { ProductState } from "@/utils/Validator/product-validator";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "@/assets/css/products.css";
// import { ProductData } from "@/action/product/productData";
// import FilterSidebar from "@/components/landings/Product_Sec/FilterSidebar";

// const DEFAULT_CUSTOM_PRICE = [0, 10000] as [number, number];

// function CategoryProductsPage() {
//   const { slug } = useParams();

//   const { products, isFetching } = ProductData([
//     {
//       key: "category",
//       value: slug ?? "",
//     },
//   ]);

//   const query = useQuery();
//   const navigate = useNavigate();

//   const getInitialFilterState = (): ProductState => {
//     const color = query.get("color")?.split(",") || [];
//     const size = query.get("size")?.split(",") || [];
//     const sort =
//       (query.get("sort") as
//         | "none"
//         | "price_asc"
//         | "price_desc"
//         | "best_selling") || "none";
//     // const priceRange =
//     //   (query.get("price")?.split(",").map(Number) as [number, number]) ||
//     //   DEFAULT_CUSTOM_PRICE;
//     const priceRangeParam = query.get("price");
//     const priceRange = priceRangeParam
//       ? (priceRangeParam.split("+").map(Number) as [number, number])
//       : DEFAULT_CUSTOM_PRICE;

//     const isCustom = query.get("isCustom") === "true";

//     return {
//       color,
//       size,
//       sort,
//       price: { isCustom, range: priceRange },
//     };
//   };
//   const [filter] = useState<ProductState>(getInitialFilterState);

//   // };
//   const updateUrl = () => {
//     const params = new URLSearchParams();
//     if (filter.color.length > 0) params.set("color", filter.color.join(","));
//     if (filter.size.length > 0) params.set("size", filter.size.join(","));
//     if (filter.sort !== "none") params.set("sort", filter.sort);

//     if (filter.price.isCustom || filter.price.range !== DEFAULT_CUSTOM_PRICE) {
//       const [minPrice, maxPrice] = filter.price.range;

//       // Safeguard against undefined values
//       const safeMinPrice = isNaN(minPrice) ? 0 : minPrice;
//       const safeMaxPrice = isNaN(maxPrice) ? 10000 : maxPrice;

//       params.set("price", `${safeMinPrice}+${safeMaxPrice}`);
//       params.set("isCustom", filter.price.isCustom.toString());
//     } else {
//       params.delete("price");
//       params.delete("isCustom");
//     }
//     navigate(`?${params}`);
//   };

//   useEffect(() => {
//     updateUrl();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filter]);

//   return (
//     <div className="min-h-screen flex my-10 gap-5">
//       {/* Navigation */}
//       {/* <CategoryProductNavbar setFilter={setFilter} filter={filter} /> */}
//       <div className="w-[20%] h-screen sticky top-0 border border-[#B6B6B6] bg-[#F6F6F6] overflow-auto">
//         {/* <FilterSidebar /> */}
//       </div>

//       {/* Product Grid Layout */}
//       <Box sx={{ flex: "1 1 0" }}>
//         {products.length > 0 ? (
//           <div className="product-container gap-1">
//             {products.map((product, index) => (
//               <div key={index}>
//                 <ProdCard
//                   basePrice={product.product.basePrice}
//                   featured={product.product.is_featured_product}
//                   imageContainer="sm:h-[300px]   "
//                   imgClass=""
//                   products={product.product}
//                   stockData={product}
//                   key={product._id}
//                   link="/products/new-jean"
//                   title={product.product.product_name}
//                   minQty={product.product.minimum_quantity}
//                   image={product.product.thumbnails}
//                   isFavorite={true}
//                   PricePerPiece={product.product.price_per_pieces}
//                   loading={isFetching}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="w-full mx-auto flex flex-col gap-9 items-center justify-center min-h-[400px] ">
           
//             <div className="relative  w-[20%] rounded-full h-28 flex items-center justify-center backdrop-blur-sm filter">
//                {/* <div className="absolute -bottom-3 left-6 bg-green-600 w-10 h-10 rounded-full"/>
//                <div className="absolute top-2 left-3 bg-red-600 w-7 h-7 rounded-full"/>
//                <div className="absolute top-3 left-5 bg-blue-600 w-7 h-7 rounded-full"/>
//                <div className="absolute -top-0 right-3 bg-bg w-7 h-7 rounded-full"/>
//                <div className="absolute bottom-3 right-1 bg-black  w-7 h-7 rounded-full"/> */}



//               <span className="text-2xl text-black font-semibold">Product Not Found!!</span>
//             </div>
//             <div className="w-full h-[4px] bg-gray-50 shadow-[1px_23px_31px_-3px_rgba(0,_0,_0,_0.7)]" />

//           </div>
//         )}
//       </Box>
//     </div>
//   );
// }

// export default CategoryProductsPage;
