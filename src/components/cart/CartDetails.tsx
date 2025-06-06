// import { ICartTypes } from "@/types/cartTypes";
// // import { useTheme } from "@mui/material/styles";
// import { IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// // import AddIcon from "@mui/icons-material/Add";
// // import RemoveIcon from "@mui/icons-material/Remove";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
// import { useState } from "react";
// import { dispatch } from "@/providers/redux/hook";
// import Image from "../global/image";
// import { deleteCartRedux, getCartRedux } from "@/providers/redux/userSide/product_Slice";
// // import { useAddNewCart } from "@/hooks/use-cart";
// // import { IFinalVariation, Product } from "@/types/final-product-types";
// // import { makeToastError } from "@/utils/toaster";
// import { Link } from "react-router-dom";
// import CartSizeVariants from "./cart_size_variants";
// import { useQueryClient } from "@tanstack/react-query";

// type Props = {
//   cart?: ICartTypes | null;
//   title: string | number;
//   isCollapsible?: boolean;
//   isAllSelect?: boolean;
//   errorMessage?: string;
//   state:"cart"|"saveLater"
// };

// export default function CartDetails({
//   title,
//   isCollapsible = false,
//   cart,
//   errorMessage,
//   state
//   // isAllSelect = false,
// }: Props) {
//   const client = useQueryClient();

//   // const onlyWidth = useWindowWidth();
//   // const mobileWidth = onlyWidth <= 768;
//   // const { onAddNewCart } = useAddNewCart();
//   // const [quantity, setQuantity] = useState(1);

//   // const theme = useTheme();
//   // const { cart } = useAppSelector((state) => state.products);

//   // console.log(cart, "cart");

//   // const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
//   //   new Array(cart?.items.length || 0).fill(false)
//   // );

//   // const toggleCollapse = () => {
//   //   setIsCollapsed((prev) => prev.map((collapsed) => !collapsed));
//   // };
//   const [isCollapsed, setIsCollapsed] = useState<Record<string, boolean>>({});
//   const toggleCollapse = (key: string) => {
//     setIsCollapsed((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   // const handleAddClick = ({
//   //   product,
//   //   variant,
//   //   productId,
//   //   storeId,
//   //   variantId,
//   //   size,
//   // }: {
//   //   product: Product;
//   //   variant: IFinalVariation;
//   //   productId: string;
//   //   storeId: string;
//   //   variantId: string;
//   //   size: string;
//   // }) => {
//   //   const userInput = prompt("Enter the quantity to add:");
//   //   if (userInput !== null) {
//   //     const inputQuantity = parseInt(userInput);
//   //     if (isNaN(inputQuantity) || inputQuantity <= 0) {
//   //       makeToastError("Please enter a valid positive number");
//   //       return;
//   //     }

//   //     const preferredSize =
//   //       product.selectWise === "bundle"
//   //         ? variant.details.map((d) => {
//   //             const bundleDetail = product.bundle_details.find(
//   //               (bd) => bd.size === d.size
//   //             );
//   //             return {
//   //               size: d.size,
//   //               quantity: (bundleDetail?.quantity ?? 1) * inputQuantity,
//   //             };
//   //           })
//   //         : [
//   //             {
//   //               size,
//   //               quantity: inputQuantity,
//   //             },
//   //           ];

//   //     onAddNewCart({
//   //       items: [
//   //         {
//   //           product: productId,
//   //           store: storeId,
//   //           stock_variant: variantId,
//   //           purchaseType: product.selectWise === "bundle" ? "bundle" : "normal",
//   //           preferred_size: preferredSize,
//   //         },
//   //       ],
//   //     });
//   //   }
//   // };

//   return (
//     <div>
//       {cart && cart?.items && cart?.items.length > 0 ? (
//         cart?.items.map((item, index) =>
//           item.products?.map((product, pIndex) => {
//             const collapseKey = `${index}-${pIndex}`;

//             return (
//               <div key={index} className="mb-4">
//                 {/* Header Section */}
//                 <div className="flex items-start md:justify-between space-x-4 mb-2">
//                   <div className="flex  gap-3">
//                     {/* {isAllSelect && (
//                       <Checkbox
//                         color="default"
//                         sx={{
//                           "&.Mui-checked": { color: "#5F08B1" },
//                         }}
//                       />
//                     )} */}
//                     <Image
//                       src={product.thumbnails[0]}
//                       link={`/product/${product.slug}`}
//                       classNameImg="w-full h-full object-contain"
//                       alt="Product"
//                       className="w-20 h-20 object-cover"
//                     />
//                     <div className="flex flex-col">
//                       <span className="text-textMain">
//                         Store: {item.store.name}
//                       </span>
//                       <Link
//                         to={`/product/${product.slug}`}
//                         className="text-gray-800 xl:max-w-[450px] md:max-w-[300px] sm:max-w-[100px] max-w-[90px] truncate"
//                       >
//                         {product.product_name}
//                       </Link>
//                       <p className="text-sm text-gray-500">
//                         Min. order: {product.price_per_pieces[0].minPiece}{" "}
//                         pieces
//                       </p>
//                     </div>
//                   </div>
//                   <IconButton
//                     onClick={async () => {
//                       const res = await dispatch(
//                         deleteCartRedux({
//                           productId: product._id,
//                           type: "variant",
//                           state:state
//                         })
//                       );
//                       if (res.meta.requestStatus === "fulfilled") {
//                         dispatch(getCartRedux());
//                         if(state === "saveLater"){
//                           client.invalidateQueries({ queryKey: ["save-later"] });
//                         }
//                       }

//                       //  console.log(res);
//                     }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </div>

//                 {/* Collapse Toggle */}
//                 {/* {isCollapsible && (
//               <div className="flex items-center justify-end mb-2">
//                 <span className="text-sm text-gray-400">{title}</span>
//                 <IconButton onClick={toggleCollapse}>
//                   {isCollapsed.every((c) => c) ? (
//                     <KeyboardArrowDownOutlinedIcon />
//                   ) : (
//                     <KeyboardArrowUpOutlinedIcon />
//                   )}
//                 </IconButton>
//               </div>
//             )} */}
//                 {isCollapsible && (
//                   <div className="flex items-center justify-end mb-2">
//                     <span className="text-sm text-gray-400">{title}</span>
//                     <IconButton onClick={() => toggleCollapse(collapseKey)}>
//                       {isCollapsed[collapseKey] ? (
//                         <KeyboardArrowDownOutlinedIcon />
//                       ) : (
//                         <KeyboardArrowUpOutlinedIcon />
//                       )}
//                     </IconButton>
//                   </div>
//                 )}

//                 {/* Variants Section */}

//                 <CartSizeVariants
//                 state={state}
//                   product={product}
//                   item={item}
//                   pIndex={pIndex}
//                   isCollapsed={isCollapsed}
//                   collapseKey={collapseKey}
//                 />
//               </div>
//             );
//           })
//         )
//       ) : (
//         <div className="flex items-center justify-center h-48">
//           <p className="text-gray-500">
//             {errorMessage ? errorMessage : "No items in the cart"}
//           </p>
//         </div>
//       )}

//       {/* <pre>{JSON.stringify(cart, null, 4)}</pre> */}
//     </div>
//   );
// }
import { ICartTypes } from "@/types/cartTypes";
import { Collapse, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useEffect, useState } from "react";
import { dispatch } from "@/providers/redux/hook";
import Image from "../global/image";
import {
  deleteCartRedux,
  getCartRedux,
} from "@/providers/redux/userSide/product_Slice";
import { Link } from "react-router-dom";
import CartSizeVariants from "./cart_size_variants";
import { useQueryClient } from "@tanstack/react-query";
import groupBy from "lodash/groupBy";
import VerifiedLabel from "../global/verivied-label";
import ShippingMethod from "../checkout/shipping-methods/shipping_method";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  cart?: ICartTypes | null;
  title: string | number;
  isCollapsible?: boolean;
  isAllSelect?: boolean;
  errorMessage?: string;
  state: "cart" | "saveLater";
  isCollapseDefault?: boolean;
  showShippingMethod?: boolean;
};

export default function CartDetails({
  title,
  isCollapsible = false,
  cart,
  errorMessage,
  state,
  isCollapseDefault = true,
  showShippingMethod,
}: Props) {
  const client = useQueryClient();

  const [isCollapsed, setIsCollapsed] = useState<Record<string, boolean>>({});
  const toggleCollapse = (key: string) => {
    setIsCollapsed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (!isCollapsible || !cart?.items) return;

    const grouped = groupBy(cart.items, (item) => item.store._id);
    const initialCollapsedState: Record<string, boolean> = {};

    Object.keys(grouped).forEach((storeId) => {
      const key = `store-${storeId}`;
      initialCollapsedState[key] = !isCollapseDefault; // true = collapsed if isCollapseDefault is false
    });

    setIsCollapsed(initialCollapsedState);
  }, [cart, isCollapsible, isCollapseDefault]);

  const groupedByStore = groupBy(cart?.items || [], (item) => item.store._id);

  return (
    <div>
      {cart && cart?.items && cart?.items.length > 0 ? (
        Object.entries(groupedByStore).map(([storeId, items]) => {
          const storeCollapseKey = `store-${storeId}`;

          return (
            <div key={storeId} className="mb-4">
              {/* Store Header */}
              {items.map((store) => (
                <div className="flex flex-col">
                  <div className="flex sm:items-center justify-between mb-2">
                    <VerifiedLabel
                      key={store.store._id}
                      {...store.store}
                      version="v2"
                    />

                    {isCollapsible && (
                      <div className="flex items-center">
                        <span className="sm:text-sm text-xs text-gray-400">
                          {title}
                        </span>
                        <IconButton
                          onClick={() => toggleCollapse(storeCollapseKey)}
                        >
                          {isCollapsed[storeCollapseKey] ? (
                            <KeyboardArrowDownOutlinedIcon />
                          ) : (
                            <KeyboardArrowUpOutlinedIcon />
                          )}
                        </IconButton>
                      </div>
                    )}
                  </div>

                  {showShippingMethod && (
                    <div className="mb-">
                      <p className="font-bold flex items-center gap-1 pb-3">
                        {" "}
                        <Icon
                          icon="carbon:delivery-truck"
                          className="text-lg text-textMain"
                        />
                        Choose shipping method
                      </p>
                      <ShippingMethod storeId={store.store._id ?? ""} />
                    </div>
                  )}
                </div>
              ))}

              <Collapse
                in={!isCollapsible || !isCollapsed[storeCollapseKey]}
                sx={{
                  border: "1px solid #c9c3c3",
                  mt: 2,
                }}
              >
                {items.map((item, index) =>
                  item.products?.map((product, pIndex) => {
                    const productKey = `${storeId}-${index}-${pIndex}`;

                    return (
                      <div
                        key={productKey}
                        className={`mb-4   ${pIndex !== 0 && "border-t"}  p-2 `}
                      >
                        <div className="flex items-start md:justify-between space-x-4 mb-2">
                          <div className="flex gap-3">
                            <Image
                              src={product.thumbnails[0]}
                              link={`/product/${product.slug}`}
                              classNameImg="w-full h-full object-contain"
                              alt="Product"
                              className="w-20 h-20 object-cover"
                            />
                            <div className="flex flex-col">
                              <Link
                                to={`/product/${product.slug}`}
                                className="text-gray-800 xl:max-w-[450px] md:max-w-[300px] sm:max-w-[100px] max-w-[90px] truncate"
                              >
                                {product.product_name}
                              </Link>
                              <p className="text-sm text-gray-500">
                                Min. order:{" "}
                                {product.price_per_pieces[0].minPiece} pieces
                              </p>
                            </div>
                          </div>

                          <IconButton
                            onClick={async () => {
                              const res = await dispatch(
                                deleteCartRedux({
                                  productId: product._id,
                                  type: "variant",
                                  state: state,
                                })
                              );
                              if (res.meta.requestStatus === "fulfilled") {
                                dispatch(getCartRedux());
                                if (state === "saveLater") {
                                  client.invalidateQueries({
                                    queryKey: ["save-later"],
                                  });
                                }
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>

                        {/* 🔽 Second Collapse Button for Size Variants */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            Variants
                          </span>
                          <IconButton
                            onClick={() => toggleCollapse(productKey)}
                          >
                            {isCollapsed[productKey] ? (
                              <KeyboardArrowDownOutlinedIcon />
                            ) : (
                              <KeyboardArrowUpOutlinedIcon />
                            )}
                          </IconButton>
                        </div>

                        {/* <Collapse in={!isCollapsed[productKey]}> */}
                        <CartSizeVariants
                          state={state}
                          product={product}
                          item={item}
                          pIndex={pIndex}
                          isCollapsed={isCollapsed}
                          collapseKey={productKey}
                        />
                        {/* </Collapse> */}
                      </div>
                    );
                  })
                )}
              </Collapse>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">
            {errorMessage ? errorMessage : "No items in the cart"}
          </p>
        </div>
      )}
    </div>
  );
}
