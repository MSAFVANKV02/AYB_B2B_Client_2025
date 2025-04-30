import { dispatch } from "@/redux/hook";
import { deleteCartRedux, getCartRedux } from "@/redux/userSide/product_Slice";
import { CartItemsType } from "@/types/cartTypes";
import { Product } from "@/types/final-product-types";
import React from "react";
import { Collapse, IconButton } from "@mui/material";
import Image from "../global/image";
import DeleteIcon from "@mui/icons-material/Delete";

import CartQtyChanger from "./cart_qty_changer";
import { useUpdateSaveLater } from "@/hooks/saveLater-hook/use-saveLater";

type Props = {
  product: Product;
  item: CartItemsType;
  pIndex: number;
  isCollapsed: Record<string, boolean>;
  collapseKey: string;
};

function CartSizeVariants({
  product,
  item,
  isCollapsed,
  pIndex,
  collapseKey,
}: Props) {
  const { onAddOrRemoveSaveLater } = useUpdateSaveLater();

  return (
    <React.Fragment>
      {product.variations.map((variant, vIndex) =>
        variant.details.map((details, dIndex) => (
          <div key={pIndex}>
            <Collapse
              key={`${collapseKey}-v${vIndex}-d${dIndex}`}
              // in={!isCollapsed[pIndex]}
              in={!isCollapsed[collapseKey]}
              timeout="auto"
              unmountOnExit
            >
              <div
                className={`flex items-center justify-between gap-4 md:p-4 p-2 md:border rounded-lg mb-3 ${
                  window.location.pathname !== "/cart/checkout" && "md:ml-7"
                }`}
              >
                <div className="flex items-center md:space-x-4">
                  <Image
                    src={variant.image}
                    alt="Variant"
                    classNameImg="w-full h-full object-contain"
                    className="sm:w-16 sm:h-16 w-9 h-9  border"
                  />
                  {/* <img
                              src={variant.image}
                              alt="Variant"
                              className="sm:w-12 sm:h-12 w-9 h-9 object-cover"
                            /> */}

                  <div className="ml-1">
                    <p className="sm:text-sm text-xs font-medium">
                      Size: {details.size}; Color: {variant.colorName}
                    </p>
                    <p className="sm:text-sm text-xs text-gray-600">
                      {details.quantity} / piece
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <CartQtyChanger
                  details={details}
                  variant={variant}
                  product={product}
                  item={item}
                />

                {/* Price and Delete */}
                <p className="text-gray-800 font-semibold">
                  ₹{details.selling_price}
                </p>

                <div className="flex gap-3">
                  <button
                    className="text-xs text-textGray capitalize"
                    onClick={async() => {
                      {
                       await onAddOrRemoveSaveLater({
                          product: product._id,
                          preferred_size: details.size,
                          stock_variant: variant._id,
                          store: item.store._id,
                        });
                      }
                    }}
                  >
                    save later
                  </button>

                  {/* delete */}
                  <IconButton>
                    <DeleteIcon
                      onClick={async () => {
                        const res = await dispatch(
                          deleteCartRedux({
                            productId: product._id,
                            type: "size",
                            store: item.store._id,
                            stock_variant: variant._id,
                            size: details.size,
                            purchaseType:
                              product.selectWise === "bundle"
                                ? "bundle"
                                : "normal",
                          })
                        );
                        if (res.meta.requestStatus === "fulfilled") {
                          dispatch(getCartRedux());
                        }

                        //  console.log(res);
                      }}
                    />
                  </IconButton>
                </div>
              </div>
            </Collapse>
          </div>
        ))
      )}
    </React.Fragment>
  );
}

export default CartSizeVariants;
