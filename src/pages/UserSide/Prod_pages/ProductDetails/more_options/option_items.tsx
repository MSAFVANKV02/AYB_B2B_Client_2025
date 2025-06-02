import { useCallback, useMemo } from "react";
import truncate from "html-truncate";

import {
  WishlistFillSvg,
  WishlistOuterSvg,
} from "@/components/icons/glob-icon";
import ProductShareModal from "./ProductShareModal";
import { IconButton } from "@mui/material";
import { IFinalProductTypes, Product } from "@/types/final-product-types";
import { makeToast } from "@/utils/toaster";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { AddWishlistRedux } from "@/providers/redux/userSide/product_Slice";
// const ProductShareModal = dynamic(() => import("../ProductShareModal"), {
//   ssr: false,
// });
type Props = {
  item: Product | null;
  stockData?: IFinalProductTypes[];
};

const stripHtmlTags = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

function OptionItems({ item, stockData }: Props) {
  // const [searchParams] = useSearchParams();
  // const [_, setShowShareOptions] = useState(false);
  const { wishlist } = useAppSelector((state) => state.products);

  // const colorParam = searchParams.get("color");

  const isFavorite = useMemo(() => {
    return (
      wishlist && wishlist.some((item) => item._id === stockData?.[0]?._id)
    );
  }, [wishlist, stockData]);

  // const shareUrl = useMemo(() => {
  //   return `${process.env.DOMAIN_ENV}/products/${item?.slug}?color=${
  //     colorParam || item?.variations[0].colorName
  //   }`;
  // }, [item?.slug]);
  // const encodedColor = colorParam
  //   ? encodeURIComponent(colorParam)
  //   : encodeURIComponent(item?.variations[0].colorName || "defaultColor");
  // const encodedColor = colorParam
  //   ? encodeURIComponent(colorParam)
  //   : encodeURIComponent(
  //       Array.isArray(item?.variations) && item?.variations.length > 0
  //         ? item.variations[0].colorName
  //         : "defaultColor"
  //     );

  const shareUrl = useMemo(() => {
    const domain =
      import.meta.env.MODE === "development"
        ? "http://localhost:5173"
        : import.meta.env.DOMAIN_ENV;
    return `${domain}/product/${item?.slug}`;
  }, [item?.slug]);

  const handleCopyUrl = useCallback(() => {
    navigator.clipboard.writeText(shareUrl.toString()).then(
      () => {
        makeToast("URL copied to clipboard!");
        // setShowShareOptions(false);
      },
      (err) => console.error("Failed to copy URL: ", err)
    );
  }, [shareUrl]);

  const titleToShare = `Check out this amazing product: ${
    item?.product_name
  } \n ${truncate(stripHtmlTags(item?.description || ""), 100, {
    ellipsis: "...",
  })} \n`;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="bg-gray-50 border sm:h-[50px] h-[40px] sm:w-[50px] w-[40px] cursor-pointer flex items-center justify-center">
        <IconButton
          onClick={() => dispatch(AddWishlistRedux(stockData?.[0]._id ?? ""))}
        >
          {isFavorite ? <WishlistFillSvg /> : <WishlistOuterSvg />}
        </IconButton>
      </span>

      {/* share goes here */}
      <div className="bg-gray-50 border sm:h-[50px] h-[40px] sm:w-[50px] w-[40px] cursor-pointer flex items-center justify-center">
        {/* <IoShareSocialSharp size={22} className="" />
         */}
        <ProductShareModal
          handleCopyUrl={handleCopyUrl}
          shareUrl={shareUrl}
          product={item}
          titleToShare={titleToShare}
        />
      </div>
    </div>
  );
}

export default OptionItems;
