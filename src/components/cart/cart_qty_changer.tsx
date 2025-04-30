import React from "react";
import { IconButton, Stack, useTheme } from "@mui/material";
import {
  IFinalVariation,
  ISizeDetailType,
  Product,
} from "@/types/final-product-types";
import { CartItemsType } from "@/types/cartTypes";
import { useAddNewCart } from "@/hooks/use-cart";

// icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeToastError } from "@/utils/toaster";

type Props = {
  product: Product;
  item: CartItemsType;
  variant: IFinalVariation;
  details: ISizeDetailType;
};

function CartQtyChanger({ item, product, variant, details }: Props) {
  const theme = useTheme();

  const { onAddNewCart } = useAddNewCart();

  const handleAddClick = ({
    product,
    variant,
    productId,
    storeId,
    variantId,
    size,
  }: {
    product: Product;
    variant: IFinalVariation;
    productId: string;
    storeId: string;
    variantId: string;
    size: string;
  }) => {
    const userInput = prompt("Enter the quantity to add:");
    if (userInput !== null) {
      const inputQuantity = parseInt(userInput);
      if (isNaN(inputQuantity) || inputQuantity <= 0) {
        makeToastError("Please enter a valid positive number");
        return;
      }

      const preferredSize =
        product.selectWise === "bundle"
          ? variant.details.map((d) => {
              const bundleDetail = product.bundle_details.find(
                (bd) => bd.size === d.size
              );
              return {
                size: d.size,
                quantity: (bundleDetail?.quantity ?? 1) * inputQuantity,
              };
            })
          : [
              {
                size,
                quantity: inputQuantity,
              },
            ];

      onAddNewCart({
        items: [
          {
            product: productId,
            store: storeId,
            stock_variant: variantId,
            purchaseType: product.selectWise === "bundle" ? "bundle" : "normal",
            preferred_size: preferredSize,
          },
        ],
      });
    }
  };

  return (
    <React.Fragment>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          border: "1px solid #d0c7c7",
          borderRadius: "5px",
          width: "auto",
          padding: "3px",
          display: "flex",
          flexWrap: "nowrap",
          [theme.breakpoints.down("sm")]: {
            width: "auto",
            padding: "1px",
          },
        }}
      >
        <IconButton
          size="small"
          style={{
            border: "1px solid #F0F0F0",
            borderRadius: "5px",
            padding: 5,
          }}
          onClick={() => {
            const preferredSize =
              product.selectWise === "bundle"
                ? variant.details.map((d) => {
                    const bundleDetail = product.bundle_details.find(
                      (bd) => bd.size === d.size
                    );
                    return {
                      size: d.size,
                      quantity: -(bundleDetail?.quantity ?? 1),
                    };
                  })
                : [
                    {
                      size: details.size,
                      quantity: -1,
                    },
                  ];

            onAddNewCart({
              items: [
                {
                  product: product._id,
                  store: item.store._id,
                  stock_variant: variant._id,
                  purchaseType:
                    product.selectWise === "bundle" ? "bundle" : "normal",
                  preferred_size: preferredSize,
                },
              ],
            });
          }}
        >
          <RemoveIcon
            sx={{
              fontSize: "small",
              color: "#5F08B1",
            }}
          />
        </IconButton>
        <span
          onClick={() => {
            handleAddClick({
              product,
              variant,
              productId: product._id,
              storeId: item.store._id,
              variantId: variant._id,
              size: details.size,
            });
          }}
          className="sm:text-sm text-xs cursor-pointer"
        >
          {details.quantity}
        </span>
        <IconButton
          size="small"
          style={{
            border: "1px solid #F0F0F0",
            borderRadius: "5px",
            padding: 5,
          }}
          onClick={() => {
            const preferredSize =
              product.selectWise === "bundle"
                ? variant.details.map((d) => {
                    const bundleDetail = product.bundle_details.find(
                      (bd) => bd.size === d.size
                    );
                    return {
                      size: d.size,
                      quantity: bundleDetail?.quantity ?? 1,
                    };
                  })
                : [
                    {
                      size: details.size,
                      quantity: 1,
                    },
                  ];

            onAddNewCart({
              items: [
                {
                  product: product._id,
                  store: item.store._id,
                  stock_variant: variant._id,
                  purchaseType:
                    product.selectWise === "bundle" ? "bundle" : "normal",
                  preferred_size: preferredSize,
                },
              ],
            });
          }}
        >
          <AddIcon
            sx={{
              fontSize: "small",
              color: "#5F08B1",
            }}
          />
        </IconButton>
      </Stack>
    </React.Fragment>
  );
}

export default CartQtyChanger;
