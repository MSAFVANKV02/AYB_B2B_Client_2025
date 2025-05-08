import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductDrawer from "./ProductDrawer";
import { useMemo, useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareSocial from "@/components/ui/share-social";
import { Divider } from "@mui/joy";
import useNavigateClicks from "@/hooks/useClicks";
import { IFinalProductTypes, Product } from "@/types/final-product-types";
import { AddWishlistRedux } from "@/providers/redux/userSide/product_Slice";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import VerifiedLabel from "@/components/global/verivied-label";

type Props = {
  stockData?: IFinalProductTypes[];
  product: Product;
};

function ProductDetail({ product, stockData }: Props) {
  // console.log(product);

  const { details } = product.variations[0];
  const { handleClick } = useNavigateClicks();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [favorite, setFavorite] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { wishlist } = useAppSelector((state) => state.products);

  // const {  size } = details[0];

  // const sizeVariants = product.variants.flatMap((variant) =>
  //   variant.details.map((sizeVar) => ({
  //     variantId: variant._id,
  //     sizeId: sizeVar._id,
  //     size: sizeVar.size,
  //     prices: sizeVar.price_per_Pieces,
  //   }))
  // );

  // console.log(stockData,'stockData');

  const isFavorite = useMemo(() => {
    return (
      wishlist && wishlist.some((item) => item._id === stockData?.[0]?._id)
    );
  }, [wishlist, stockData]);

  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
  };

  const colors = [
    ...new Set(product.variations.flatMap((variant) => variant.colorName)),
  ];
  // console.log(product.price_per_pieces, "product.price_per_pieces");

  return (
    <div className="sm:px-4  h-full flex flex-col">
      <div className=" space-y-5">
        <div className="relative">
          <div className=" md:w-3/4 w-[80%] flex flex-col">
            <div className=" bg-pink-50 w-full">
              {stockData?.map((store) => (
                <VerifiedLabel key={store.store._id} {...store.store} />
              ))}
            </div>
            <span className="md:text-[20px] font-bold">
              {product.product_name}
            </span>
          </div>

          {/* bundle tag === */}
          <div className="">
            {product.selectWise === "bundle" && (
              <span className="text-xs bg-bg text-white px-2 py-1 rounded-md">
                Bundle{" "}
                {product.bundle_details
                  .map((item) => `${item.size}-${item.quantity}`)
                  .join(", ")}
              </span>
            )}
          </div>

          <div className="flex flex-col absolute top-0 right-0">
            <IconButton
              onClick={() =>
                dispatch(AddWishlistRedux(stockData?.[0]._id ?? ""))
              }
            >
              {isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <div className="">
              {!showShareOptions ? (
                <IconButton onClick={toggleShareOptions}>
                  <ShareOutlinedIcon />
                </IconButton>
              ) : (
                <div className="absolute top-12 right-0">
                  <ShareSocial
                    setShowShareOptions={setShowShareOptions}
                    showShareOptions={showShareOptions}
                    toggleShareOptions={toggleShareOptions}
                    data={product.slug}
                  />
                </div>
              )}
            </div>
          </div>
          {/* <Icon */}
        </div>

        {/* Price Variants */}
        <div className="grid grid-cols-2 sm:w-1/2 w-full gap-3 pb-3">
          {product.price_per_pieces.map((variant) => (
            <div key={variant._id}>
              {/* <pre>
                  {
                    JSON.stringify(
                      variant,
                      null,
                      2
                    )
                  }
                </pre> */}
              <p className="text-textGray text-sm">
                {variant.maxPiece === undefined ||
                variant.maxPiece === Infinity ? (
                  <>
                    {">="} {variant.minPiece}
                  </>
                ) : (
                  <>
                    {variant.minPiece} - {variant.maxPiece}
                  </>
                )}
                &nbsp; pieces
              </p>

              <span className="text-xl text-black font-semibold">
                ₹{variant?.purchase_Amount?.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <Divider sx={{}} />

        {/* Variations */}
        <h2 className="text-lg ">Variations</h2>

        <div className="flex gap-2 ">
          <span className="text-[16px]">Colors: {colors.length}</span>
          {/* <span className="text-[16px]">Colors: {product.variations.length}</span> */}

          {/* <span className="text-[16px]">Colors: {colors.join(", ")}</span> */}
          <span className="text-[16px]">Size: {details.length}</span>
        </div>

        {/* Color Variations */}
        {/* <div className="mt-2">
          <p>1. Colors: ({colors.length}): Red</p>
        </div> */}

        {/* Color images */}
        <div className="flex gap-3 flex-wrap">
          <ProductDrawer
            stockData={stockData}
            open={drawerOpen}
            setBuyOpen={setDrawerOpen}
            product={product}
            buyNow={false}
          />
        </div>

        {/* Size section ========= */}

        {/* <div className="">
          <p>2. Size: ({details.length})</p>
        </div> */}
        {/* <div className="flex gap-3 flex-wrap">
          {product?.variations.flatMap((variant) =>
            variant.details.map((detail) => (
              <div
                key={`${variant.colorName}-${detail.size}`}
                className="border border-gray-200 text-sm min-w-10 h-10 rounded cursor-pointer w-fit flex justify-center items-center"
              >
                {detail.size}
              </div>
            ))
          )}
        </div> */}

        <div className="flex justify-between items-center">
          <div className="flex gap-3  flex-wrap">
            {[
              ...new Set(
                product?.variations.flatMap((v) => v.details.map((d) => d.size))
              ),
            ].map((size) => (
              <div
                key={size}
                className="border border-gray-200 text-sm min-w-10 h-10 rounded cursor-pointer w-fit flex justify-center items-center"
              >
                {size}
              </div>
            ))}
          </div>

          {/* size chart */}
          <div className="">
            <button className="underline text-sm">SizeChart</button>
          </div>
        </div>
      </div>

      {/* Buy and Chat Buttons */}
      {/* lg:mt-auto */}
      <div className="flex sm:gap-4 gap-1  w-full lg:mt-auto mt-7">
        <Button
          className="border px-4 py-2 w-full rounded-xl h-11 border-black"
          variant={"outline"}
          onClick={() => handleClick("/my-account/chat?enquiry=proId")}
        >
          <Icon icon={"mage:message-dots"} fontSize={20} className="mr-3" />
          Chat with Us
        </Button>

        <ProductDrawer
          stockData={stockData}
          buyNow={true}
          setBuyOpen={setDrawerOpen}
          open={drawerOpen}
          product={product}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
