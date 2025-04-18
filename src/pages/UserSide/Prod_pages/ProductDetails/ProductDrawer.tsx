/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  Sheet,
} from "@mui/joy";
// import { Close as CloseIcon } from "@mui/icons-material";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useWindowWidth } from "@react-hook/window-size";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import BannerWrapper from "@/components/landings/maniHome/Banners/BannerWrapper";
import Banner from "@/components/landings/maniHome/Banners/Banner";
import { Input } from "@/components/ui/input";
import {
  IFinalProductTypes,
  IFinalVariation,
  Product,
} from "@/types/final-product-types";
import { useSetSearchParams } from "@/hooks/use-set-searchParams";
import Image from "@/components/global/image";
import { useAppSelector } from "@/redux/hook";
import { useAddNewCart } from "@/hooks/use-Cart";

type IDrawerTypes = {
  product?: Product;
  setBuyOpen: (open: boolean) => void;
  open: boolean;
  buyNow: boolean;
  stockData?: IFinalProductTypes[];
};

export default function ProductDrawer({
  product,
  buyNow,
  //   open,
  setBuyOpen,
}: IDrawerTypes) {
  const { products: stockData } = useAppSelector((state) => state.products);
  const { onAddNewCart, data } = useAddNewCart();
  const [open, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] =
    useState<IFinalVariation | null>(product?.variations?.[0] ?? null);
  const [quantities, setQuantities] = useState<{
    [variantId: string]: { [size: string]: number };
  }>({});
  // console.log(product?.price_per_pieces);
  // console.log(product);

  // console.log(selectedVariant, "selectedVariant");
  // console.log(products, "stockData");
  // console.log(quantities, "quantities");

  const onlyWidth = useWindowWidth();
  const setQueryParams = useSetSearchParams();
  //   const desktopsWidth = onlyWidth >= 1024;
  //   const tabletsWidth = onlyWidth < 900;
  //   const xlScreen = onlyWidth < 1440;
  const mobileWidth = onlyWidth < 768;
  const [clicked, setClicked] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // console.log(cartItems, "cartItems");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // makeToastWarning(`${currentImageIndex}`)

  // const handleClick = useCallback(() => {
  //   const hasQuantities = Object.values(quantities).some((sizeMap) =>
  //     Object.values(sizeMap).some((qty) => qty > 0)
  //   );
  //   if (!hasQuantities) return;

  //   onAddNewCart(cartItems);

  //   setClicked(true);
  //   setTimeout(() => {
  //     setClicked(false);
  //   }, 3000);
  // }, [quantities]);
  const handleClick = useCallback(() => {
    const hasQuantities = Object.values(quantities).some((sizeMap) =>
      Object.values(sizeMap).some((qty) => qty > 0)
    );
    if (!hasQuantities) return;
    setClicked(true); // Moved here directly instead of inside setTimeout
    // console.log(data);

    // makeToast(data)
    if (data.status === 200 || data.status === 201) {
      setTimeout(() => {
        setClicked(false);
        setOpen(false);
        setBuyOpen(false);
        setQuantities({});
        setCartItems([]);
        setSelectedVariant(product?.variations?.[0] ?? null);
      }, 3000);
    }

    onAddNewCart({
      items: cartItems.map((item) => ({
        ...item,
        purchaseType: product?.selectWise === "bundle" ? "bundle" : "normal", // or "NORMAL" based on your backend expectation
      })),
    });
  }, [quantities, cartItems, onAddNewCart]);

  // 1. Increase Cart Qty =============
  const handleIncrease = useCallback(
    (variantId: string, size: string, bundleQuantity: number) => {
      setQuantities((prev) => {
        const currentQty = prev[variantId]?.[size] || 0;

        const sizeDetail = selectedVariant?.details.find(
          (detail) => detail.size === size
        );
        const stockAvailable = sizeDetail?.stock || 0;

        // Check if we are already at max stock
        if (currentQty >= stockAvailable) {
          return prev; // No changes
        }

        let updatedQuantities = { ...prev };

        if (product?.selectWise === "bundle") {
          const newQty = Math.min(
            (Math.floor(currentQty / bundleQuantity) + 1) * bundleQuantity,
            stockAvailable
          );

          const updatedSizes: { [size: string]: number } = {};
          selectedVariant?.details.forEach((detail) => {
            updatedSizes[detail.size] = newQty;
          });

          updatedQuantities = {
            ...prev,
            [variantId]: updatedSizes,
          };
        } else {
          const newQty = currentQty + 1;
          updatedQuantities = {
            ...prev,
            [variantId]: {
              ...prev[variantId],
              [size]: newQty,
            },
          };
        }

        updateCartItems(updatedQuantities);
        return updatedQuantities;
      });
    },
    [product?.selectWise, selectedVariant]
  );

  // 2. Decrease Cart Qty =============
  //
  const handleDecrease = useCallback(
    (variantId: string, size: string, bundleQuantity: number) => {
      setQuantities((prev) => {
        const currentQty = prev[variantId]?.[size] || 0;
        let updatedQuantities = { ...prev };

        if (product?.selectWise === "bundle") {
          const updatedQty = Math.max(currentQty - bundleQuantity, 0);
          const updatedSizes: { [size: string]: number } = {};

          selectedVariant?.details.forEach((detail) => {
            if (updatedQty > 0) {
              updatedSizes[detail.size] = updatedQty;
            }
          });

          updatedQuantities = {
            ...prev,
            [variantId]: updatedSizes,
          };
        } else {
          const newQty = Math.max(currentQty - 1, 0);
          updatedQuantities = {
            ...prev,
            [variantId]: {
              ...prev[variantId],
              [size]: newQty,
            },
          };
          if (newQty === 0) delete updatedQuantities[variantId][size];
          if (Object.keys(updatedQuantities[variantId]).length === 0)
            delete updatedQuantities[variantId];
        }

        updateCartItems(updatedQuantities);
        return updatedQuantities;
      });
    },
    [product?.selectWise, selectedVariant]
  );

  // 3. update qty using input ========
  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      variantId: string,
      size: string
    ) => {
      const rawValue = parseInt(e.target.value, 10) || 0;
      const value = Math.max(rawValue, 0);
      const variant = selectedVariant;
      const detail = variant?.details.find((d) => d.size === size);
      const stock = detail?.stock ?? Infinity;
      const bundleQuantity = detail?.bundleQuantity ?? 1;

      setQuantities((prev) => {
        let updatedQuantities = { ...prev };

        if (product?.selectWise === "bundle") {
          const newQty = Math.min(
            Math.floor(value / bundleQuantity) * bundleQuantity,
            stock
          );

          const updatedSizes: { [size: string]: number } = {};
          variant?.details.forEach((detail) => {
            updatedSizes[detail.size] = newQty;
          });

          updatedQuantities = {
            ...prev,
            [variantId]: updatedSizes,
          };
        } else {
          const newQty = Math.min(value, stock);
          updatedQuantities = {
            ...prev,
            [variantId]: {
              ...prev[variantId],
              [size]: newQty,
            },
          };
        }

        updateCartItems(updatedQuantities);
        return updatedQuantities;
      });
    },
    [product?.selectWise, selectedVariant]
  );

  // 4. Select Variant ================

  const handleSelectVariant = useCallback((variant: IFinalVariation) => {
    setSelectedVariant(variant);
    setQuantities((prev) => {
      if (!prev[variant._id]) {
        const defaultSizes: { [size: string]: number } = {};
        variant.details.forEach((d) => {
          defaultSizes[d.size] = 0;
        });
        return {
          ...prev,
          [variant._id]: defaultSizes,
        };
      }
      return prev;
    });
  }, []);

  const updateCartItems = useCallback(
    (quantitiesToUse: typeof quantities) => {
      if (!product) return;

      const items = Object.entries(quantitiesToUse).map(
        ([variantId, sizeMap]) => {
          const variant = product.variations.find((v) => v._id === variantId);
          if (!variant) return null;

          const preferred_size = Object.entries(sizeMap)
            .filter(([_, qty]) => qty > 0)
            .map(([size, qty]) => ({ size, quantity: qty }));

          // If preferred_size is empty, skip adding this item
          if (preferred_size.length === 0) return null;

          return {
            product: stockData[0]._id,
            store: stockData?.[0]?.store?._id ?? "",
            stock_variant: variant._id,
            purchaseType: "NORMAL",
            preferred_size,
          };
        }
      );

      // Filter out nulls and items with empty preferred_size
      setCartItems(
        items.filter((item) => item && item.preferred_size.length > 0)
      );
    },
    [product, stockData]
  );

  // const isVariantInCart = (variantId: string) => {
  //   const isInCart = cartItems.some((item) => item.stock_variant === variantId);
  //   return isInCart ? true : false;
  // };
  const isVariantInCart = useCallback(
    (variantId: string) => {
      return cartItems.some((item) => item.stock_variant === variantId);
    },
    [cartItems]
  );

  const variantQuantityMap = useMemo(() => {
    const map: { [variantId: string]: number } = {};
    cartItems.forEach((item) => {
      const totalQty = item.preferred_size.reduce(
        (sum: number, s: any) => sum + s.quantity,
        0
      );
      if (map[item.stock_variant]) {
        map[item.stock_variant] += totalQty;
      } else {
        map[item.stock_variant] = totalQty;
      }
    });
    return map;
  }, [cartItems]);

  // const variantQuantityMap: { [variantId: string]: number } = {};

  // cartItems.forEach((item) => {
  //   const totalQty = item.preferred_size.reduce(
  //     (sum: number, s: any) => sum + s.quantity,
  //     0
  //   );

  //   if (variantQuantityMap[item.stock_variant]) {
  //     variantQuantityMap[item.stock_variant] += totalQty;
  //   } else {
  //     variantQuantityMap[item.stock_variant] = totalQty;
  //   }
  // });

  // cart price

  const getPriceForSize = useCallback(() => {
    if (!product?.price_per_pieces?.length || !cartItems?.length) return null;

    // Step 1: Calculate total quantity in cart
    let totalQuantity = 0;

    for (const item of cartItems) {
      for (const pref of item.preferred_size) {
        totalQuantity += pref.quantity;
      }
    }

    const priceTiers = product.price_per_pieces;
    const lastTier = priceTiers[priceTiers.length - 1];

    // Step 2: If quantity is >= last tier's minPiece, always return last tier
    if (totalQuantity >= lastTier.minPiece) {
      return lastTier.purchase_Amount;
    }

    // Step 3: Otherwise, find the matching tier
    const matchedTier = priceTiers.find(
      (tier) => totalQuantity >= tier.minPiece && totalQuantity <= tier.maxPiece
    );

    // Step 4: Return matched price or fallback to first tier
    return (
      matchedTier?.purchase_Amount ?? priceTiers[0]?.purchase_Amount ?? null
    );
  }, [cartItems, product]);
  const getPriceForSizeAfterDiscount = useCallback(() => {
    if (!product?.price_per_pieces?.length || !cartItems?.length) return null;

    // Step 1: Calculate total quantity in cart
    let totalQuantity = 0;

    for (const item of cartItems) {
      for (const pref of item.preferred_size) {
        totalQuantity += pref.quantity;
      }
    }

    const priceTiers = product.price_per_pieces;
    const lastTier = priceTiers[priceTiers.length - 1];

    // Step 2: If quantity is >= last tier's minPiece, always return last tier
    let basePrice =
      totalQuantity >= lastTier.minPiece
        ? lastTier.purchase_Amount
        : (priceTiers.find(
            (tier) =>
              totalQuantity >= tier.minPiece && totalQuantity <= tier.maxPiece
          )?.purchase_Amount ?? priceTiers[0]?.purchase_Amount);

    // Step 3: Check for variant-specific discount on the selected variant
    if (selectedVariant && selectedVariant.details?.length) {
      // Apply the discount from the first detail that has it
      const detailWithDiscount = selectedVariant.details.find(
        (d) => d.discount && d.discount > 0
      );

      if (detailWithDiscount?.discount) {
        const discountValue = detailWithDiscount.discount;

        if (product?.discount_type === "percentage") {
          basePrice = basePrice - (basePrice * discountValue) / 100;
        } else if (product?.discount_type === "flat") {
          basePrice = basePrice - discountValue;
        }

        // Prevent negative price
        if (basePrice < 0) basePrice = 0;
      }
    }

    return basePrice;
  }, [cartItems, product, selectedVariant]);

  // Calculate the subtotals based on the price and quantities
  //  const getSubtotal = useMemo(() => {
  //   return cartItems.map((item) => {
  //     const totalQty = item.preferred_size.reduce((sum:any, s:any) => sum + s.quantity, 0);
  //     const price = getPriceForSizeAfterDiscount();
  //     const subtotalAfterDiscount = price ? price * totalQty : 0;

  //     const priceWithoutDiscount = getPriceForSize();
  //     const subtotalWithoutDiscount = priceWithoutDiscount ? priceWithoutDiscount * totalQty : 0;
  //     const discount = subtotalAfterDiscount - subtotalWithoutDiscount

  //     return { subtotalAfterDiscount, subtotalWithoutDiscount, totalQty, discount };
  //   });
  // }, [cartItems, getPriceForSize, getPriceForSizeAfterDiscount]);
  const getSubtotal = useMemo(() => {
    let totalQuantity = 0;
    let subtotalAfterDiscount = 0;
    let subtotalWithoutDiscount = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      const totalQty = item.preferred_size.reduce(
        (sum: any, s: any) => sum + s.quantity,
        0
      );
      const priceAfterDiscount = getPriceForSizeAfterDiscount();
      const priceWithoutDiscount = getPriceForSize();

      const subtotalAfter = priceAfterDiscount
        ? priceAfterDiscount * totalQty
        : 0;
      const subtotalBefore = priceWithoutDiscount
        ? priceWithoutDiscount * totalQty
        : 0;
      const discount = subtotalAfter - subtotalBefore;

      // Accumulate the totals for the entire cart
      totalQuantity += totalQty;
      subtotalAfterDiscount += subtotalAfter;
      subtotalWithoutDiscount += subtotalBefore;
      totalDiscount += discount;
    });

    return {
      totalQuantity,
      subtotalAfterDiscount,
      subtotalWithoutDiscount,
      totalDiscount,
    };
  }, [cartItems, getPriceForSize, getPriceForSizeAfterDiscount]);

  return (
    <React.Fragment>
      {!buyNow ? (
        <>
          {product?.variations.map((variant, index) => (
            <div
              className={`${currentImageIndex === index ? "border-2 border-blue-400" : "border-gray-200"} w-14 h-14 rounded-sm  overflow-hidden`}
              key={index}
            >
              <img
                src={variant.image}
                alt={"drawer images"}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setOpen(true);
                  setQueryParams({
                    color: variant.colorName,
                    // available: true,
                  });
                }}
                className={` object-cover w-full h-full cursor-pointer `}
              />
            </div>
          ))}
        </>
      ) : (
        <Button
          className="w-full rounded-xl h-11"
          variant="b2bStyle"
          onClick={() => setOpen(true)}
        >
          Buy Now
        </Button>
      )}

      <Drawer
        size="lg"
        variant="plain"
        open={open}
        anchor="right"
        onClose={() => {
          setBuyOpen(false);
          setOpen(false);
        }}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",

              boxShadow: "none",

              width: mobileWidth ? "100%" : "80%",
            },
          },
        }}
      >
        <Stack
          direction={!mobileWidth ? "row" : "column"}
          gap={!mobileWidth ? "40px" : ""}
          height="100%"
          sx={{}}
        >
          {/* Image Slider on the Left */}
          <Box
            width={!mobileWidth ? "40%" : "100%"}
            sx={{ bgcolor: "transparent" }}
            // onClick={() => setOpen(false)}
          >
            <div className="flex justify-center h-full flex-col relative ">
              <div
                className={`absolute z-[999] ${mobileWidth ? "right-2 top-2" : "-right-6 text-white top-10 "}  text-lg cursor-pointer`}
                onClick={() => setOpen(false)}
              >
                <Icon icon={"material-symbols-light:close"} fontSize={30} />
              </div>

              <Box
                height={!mobileWidth ? 600 : 300}
                sx={{ width: "100%" }}
                onClick={(e) => e.preventDefault()}
                bgcolor={"white"}
                borderRadius={!mobileWidth ? "12px" : ""}
              >
                <BannerWrapper
                  isAutoFlow={false}
                  isActive={true}
                  iconSize={29}
                  className="h-full "
                  nextBtnClass=" active:scale-90 duration-300 transition-all bg-transparent "
                  prevBtnClass=" active:scale-90 duration-300 transition-all bg-transparent "
                  btnClass="sm:left-0 sm:right-0 top-1/2 -translate-y-1/2 left-0  right-0"
                  initialSlide={currentImageIndex}
                  setCurrentImageIndex={setCurrentImageIndex}
                >
                  {product?.variations.map((img, index) => (
                    <Banner
                      className="md:h-[600px] h-[250px]  flex items-center justify-center "
                      isLink={false}
                      image={img.image}
                      key={index}
                      imgClass="object-cover cursor-pointer z-50 lg:w-[70%] md:w-[90%] lg:h-[70%] w-[50%] h-[100%]"
                    />
                  ))}
                </BannerWrapper>
              </Box>
            </div>
          </Box>

          {/* Drawer Content on the Right */}
          <Sheet
            sx={{
              py: 2,
              px: !mobileWidth ? 4 : 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "auto",
              width: "100%",
              borderTopLeftRadius: !mobileWidth ? "20px" : "",
              borderBottomLeftRadius: !mobileWidth ? "20px" : "",
              bgcolor: "white",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography level="h4">Select variations and quantity</Typography>
            </Box>

            {/* #Price Tiers =========== */}
            <Box>
              <Typography level="body-sm" fontWeight="bold" marginTop={"10px"}>
                Price before shipping
              </Typography>

              <Box width={mobileWidth ? "100%" : "70%"}>
                <div className="grid grid-cols-2  w-full ">
                  {product?.price_per_pieces.map((price, index) => (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ my: 1 }}
                      key={index}
                    >
                      <Box
                        sx={{
                          color:
                            getPriceForSize() === price.purchase_Amount
                              ? "#5f08b1"
                              : "",
                        }}
                      >
                        <Typography
                          level="body-sm"
                          sx={{
                            color:
                              getPriceForSize() === price.purchase_Amount
                                ? "#5f08b1"
                                : "",
                          }}
                        >
                          {price.minPiece}-{price.maxPiece} pieces
                        </Typography>
                        <Typography
                          level="h4"
                          fontWeight="00"
                          sx={{
                            color:
                              getPriceForSize() === price.purchase_Amount
                                ? "#5f08b1"
                                : "",
                          }}
                        >
                          ₹{price.purchase_Amount}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </div>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* #Color Options */}
            <Typography level="body-sm" fontWeight="bold">
              1. Color {product?.variations.length}: Red
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {product?.variations.map((variant, index) => (
                <div className="relative" key={index}>
                  <Image
                    src={variant.image}
                    alt={"drawer images"}
                    onClick={() => {
                      // setSelectedVariant(variant);
                      handleSelectVariant(variant);
                      setOpen(true);
                    }}
                    className={`w-14 h-14 object-cover cursor-pointer rounded-sm  border-2
                       ${selectedVariant?._id === variant._id ? "border-textMain " : ""} `}
                  />
                  {cartItems.length > 0 && isVariantInCart(variant._id) && (
                    <span className="h-6 min-w-6 w-fit bg-bg text-xs absolute rounded-full flex justify-center items-center text-white p-1 -top-2 -right-2  z-50">
                      {variantQuantityMap[variant._id]}
                    </span>
                  )}
                </div>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Size Options */}
            <Typography level="body-sm" fontWeight="bold">
              2. Size ({selectedVariant?.details.length})
            </Typography>
            <List sx={{ mt: 1 }}>
              {selectedVariant?.details.map((size, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2, // Adds space between columns
                  }}
                >
                  <Typography sx={{ flex: "1 1 0" }}>{size.size}</Typography>
                  {/* ====== purchase Price goes here */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "4px",
                      flex: "1 1 0",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ textAlign: "left" }}>
                      ₹
                      {getPriceForSizeAfterDiscount()?.toFixed(2) ??
                        product?.price_per_pieces[0].purchase_Amount}
                    </Typography>
                    {cartItems.length > 0 && size.discount > 0 && (
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "gray",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹
                        {getPriceForSize()?.toFixed(0) ??
                          product?.price_per_pieces[0].purchase_Amount}
                      </Typography>
                    )}
                  </Box>

                  {/* Qty buttons */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      border: "1px solid #d0c7c7",
                      padding: "3px",
                      borderRadius: "5px",
                    }}
                  >
                    <Button
                      variant="secondary"
                      className="rounded-sm"
                      onClick={() =>
                        handleDecrease(
                          selectedVariant._id,
                          size.size,
                          size.bundleQuantity
                        )
                      }
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      className="w-20   text-center text-black border-b"
                      value={quantities[selectedVariant._id]?.[size.size] || 0}
                      onChange={(e) =>
                        handleInputChange(e, selectedVariant._id, size.size)
                      }
                    />
                    <Button
                      variant="outline"
                      className="border-gray-200 text-textMain rounded-sm"
                      onClick={() =>
                        handleIncrease(
                          selectedVariant._id,
                          size.size,
                          size.bundleQuantity
                        )
                      }
                    >
                      +
                    </Button>
                  </Stack>
                </ListItem>
              ))}
            </List>

            {/* <Divider sx={{ my: 2 }} /> */}

            {/* Subtotal and Actions */}
            {/* total calculation section */}
            <Box
              sx={{
                mt: "auto",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              {/* Display Item Subtotal */}
              <Stack direction="row" justifyContent="space-between">
                <Typography level="body-sm">
                  Item subtotal ({getSubtotal.totalQuantity} items)
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{ textDecoration: "line-through" }}
                >
                  ₹{getSubtotal.subtotalWithoutDiscount.toFixed(2)}
                </Typography>
              </Stack>

              {/* Display Discount */}
              <Stack
                direction="row"
                justifyContent="space-between"
                fontWeight="bold"
              >
                <Typography level="body-sm">You saved</Typography>
                <Typography level="body-sm">
                  ₹{getSubtotal.totalDiscount.toFixed(2)}
                </Typography>
              </Stack>

              {/* Display Subtotal After Discount */}
              <Stack
                direction="row"
                justifyContent="space-between"
                fontWeight="bold"
              >
                <Typography>Subtotal</Typography>
                <Typography>
                  ₹{getSubtotal.subtotalAfterDiscount.toFixed(2)}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                {/* <Button variant="outline" color="neutral" className="w-full">
                  Add to cart
                </Button> */}
                <Button
                  variant="outline"
                  className={`cart-button ${clicked ? "clicked" : ""} w-full border border-black `}
                  onClick={handleClick}
                >
                  <span className="add-to-cart">Add to cart</span>
                  <span className="added">Added</span>
                  <i className="fas fa-shopping-cart"></i>
                  <i className="fas fa-box"></i>
                </Button>
                {/* <Button variant="b2bStyle" className="w-full">
                  Continue to order
                </Button> */}
              </Stack>
            </Box>
          </Sheet>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
}
