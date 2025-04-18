import { ICart } from "@/types/cartTypes";
import { useTheme } from "@mui/material/styles";
import { Checkbox, Collapse, IconButton, Stack } from "@mui/material";
import { useWindowWidth } from "@react-hook/window-size";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useState } from "react";
import { dispatch, useAppSelector } from "@/redux/hook";
import Image from "../global/image";
import { deleteCartRedux } from "@/redux/userSide/product_Slice";
import { useAddNewCart } from "@/hooks/use-Cart";
import { Product } from "@/types/final-product-types";

type Props = {
  details?: ICart[];
  title: string | number;
  isCollapsible?: boolean;
  isAllSelect?: boolean;
};

export default function CartDetails({
  title,
  isCollapsible = false,
  isAllSelect = false,
}: Props) {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth <= 768;
  const { onAddNewCart } = useAddNewCart();
  const [quantity, setQuantity] = useState(1);

  const theme = useTheme();
  const { cart } = useAppSelector((state) => state.products);

  // console.log(cart, "cart");

  // const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
  //   new Array(cart?.items.length || 0).fill(false)
  // );

  // const toggleCollapse = () => {
  //   setIsCollapsed((prev) => prev.map((collapsed) => !collapsed));
  // };
  const [isCollapsed, setIsCollapsed] = useState<Record<string, boolean>>({});
  const toggleCollapse = (key: string) => {
    setIsCollapsed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAddClick = ({
    product,
    productId,
    storeId,
    size,

    variantId,
  }: {
    product: Product;
    productId: string;
    storeId: string;
    variantId: string;
    size: string;
  }) => {
    const userInput = prompt("Enter the quantity to add:");
    if (userInput !== null) {
      setQuantity(parseInt(userInput));
      onAddNewCart({
        items: [
          {
            product: productId,
            store: storeId,
            stock_variant: variantId,
            purchaseType: product.selectWise === "bundle" ? "bundle" : "normal",
            preferred_size: [
              {
                size: size,
                quantity: quantity,
              },
            ],
          },
        ],
      });
    }
  };

  return (
    <div>
      {cart && cart?.items.length > 0 ? (
        cart?.items.map((item, index) =>
          item.products?.map((product, pIndex) => {
            const collapseKey = `${index}-${pIndex}`;

            return (
              <div key={index} className="mb-4">
                {/* Header Section */}
                <div className="flex items-start md:justify-between space-x-4 mb-2">
                  <div className="flex items-center gap-3">
                    {isAllSelect && (
                      <Checkbox
                        color="default"
                        sx={{
                          "&.Mui-checked": { color: "#5F08B1" },
                        }}
                      />
                    )}
                    <Image
                      src={product.thumbnails[0]}
                      alt="Product"
                      className="w-20 h-20 object-cover"
                    />
                    <div>
                      <p className="text-gray-800 xl:max-w-[450px] md:max-w-[300px] sm:max-w-[100px] max-w-[90px] truncate">
                        {product.product_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Min. order: {product.price_per_pieces[0].minPiece}{" "}
                        pieces
                      </p>
                    </div>
                  </div>
                  <IconButton
                    onClick={() => {
                      dispatch(deleteCartRedux(product._id));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>

                {/* Collapse Toggle */}
                {/* {isCollapsible && (
              <div className="flex items-center justify-end mb-2">
                <span className="text-sm text-gray-400">{title}</span>
                <IconButton onClick={toggleCollapse}>
                  {isCollapsed.every((c) => c) ? (
                    <KeyboardArrowDownOutlinedIcon />
                  ) : (
                    <KeyboardArrowUpOutlinedIcon />
                  )}
                </IconButton>
              </div>
            )} */}
                {isCollapsible && (
                  <div className="flex items-center justify-end mb-2">
                    <span className="text-sm text-gray-400">{title}</span>
                    <IconButton onClick={() => toggleCollapse(collapseKey)}>
                      {isCollapsed[collapseKey] ? (
                        <KeyboardArrowDownOutlinedIcon />
                      ) : (
                        <KeyboardArrowUpOutlinedIcon />
                      )}
                    </IconButton>
                  </div>
                )}

                {/* Variants Section */}

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
                            window.location.pathname !== "/cart/checkout" &&
                            "md:ml-7"
                          }`}
                        >
                          <div className="flex items-center md:space-x-4">
                            <img
                              src={product.thumbnails[0]}
                              alt="Variant"
                              className="sm:w-12 sm:h-12 w-9 h-9 object-cover"
                            />
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
                                onAddNewCart({
                                  items: [
                                    {
                                      product: product._id,
                                      store: item.store._id,
                                      stock_variant: variant._id,
                                      purchaseType:
                                        product.selectWise === "bundle"
                                          ? "bundle"
                                          : "normal",
                                      preferred_size: [
                                        {
                                          size: details.size,
                                          quantity: -1,
                                        },
                                      ],
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
                                const bundleQuantity =
                                  product.selectWise === "bundle"
                                    ? details.bundleQuantity +
                                      details.bundleQuantity
                                    : 1;
                                onAddNewCart({
                                  items: [
                                    {
                                      product: product._id,
                                      store: item.store._id,
                                      stock_variant: variant._id,
                                      purchaseType:
                                        product.selectWise === "bundle"
                                          ? "bundle"
                                          : "normal",
                                      preferred_size: [
                                        {
                                          size: details.size,
                                          quantity: bundleQuantity,
                                        },
                                      ],
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

                          {/* Price and Delete */}
                          <p className="text-gray-800 font-semibold">$4.69</p>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </Collapse>
                    </div>
                  ))
                )}
              </div>
            );
          })
        )
      ) : (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">No items in the cart</p>
        </div>
      )}

      <pre>{JSON.stringify(cart, null, 4)}</pre>
    </div>
  );
}
