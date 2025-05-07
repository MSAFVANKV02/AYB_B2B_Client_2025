import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import useNavigateClicks from "@/hooks/useClicks";
import { cn } from "@/lib/utils";
import {
  IFinalProductTypes,
  PricePerPiece,
  Product,
} from "@/types/final-product-types";
import { Skeleton } from "@/components/ui/skeleton";
import { dispatch } from "@/providers/redux/hook";
import {
  AddRecentViewRedux,
  AddWishlistRedux,
} from "@/providers/redux/userSide/product_Slice";

interface ProdCardProps {
  title: string;
  minQty: string | number;
  image: string[];
  isFavorite: boolean;
  sold?: number;
  index?: number;
  link: string;
  className?: string;
  imgClass?: string;
  PricePerPiece?: PricePerPiece[];
  basePrice: number;
  products: Product;
  stockData?: IFinalProductTypes;
  loading: boolean;
  imageContainer?: string;
  featured?: boolean;
  show?: boolean;
}

export default function ProductNav({
  title,
  minQty,
  image,
  isFavorite,
  sold,
  link,
  className,
  imgClass,
  // PricePerPiece,
  basePrice,
  products,
  loading,
  imageContainer,
  featured,
  stockData,
  show = true,
}: ProdCardProps) {
  // const [favorite, setFavorite] = React.useState(isFavorite);

  const { handleClick } = useNavigateClicks();

  const matchedStore = products.non_featured_stores?.find(
    (task) => task.store === stockData?.store._id
  );

  const checking = matchedStore ? false : featured ? true : false;

  return (
    <>
      {loading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className=" h-[280px] rounded-sm" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 " />
          </div>
        </div>
      ) : (
        <>
          {show && (
            <div
              className={cn(
                ` max-w-md  flex-shrink-0   border border-borderColor bg-white  shadow-sm sm:rounded-sm
     overflow-hidden cursor-pointer`,
                className
              )}
              onClick={() => {
                dispatch(AddRecentViewRedux(stockData?._id ?? ""));

                handleClick(link,true);
              }}
            >
              {/* <Link to={link}> */}
              <div
                className={cn(
                  "relative w-full  md:h-[350px] h-[280px] cursor-pointer flex items-center justify-center overflow-hidden",
                  imageContainer
                )}
              >
                {/* Image */}
                {image.length > 1 ? (
                  <div className="relative w-full h-full group overflow-hidden">
                    <img
                      src={image[0] || "/"}
                      alt="Product Image"
                      className={cn(
                        `object-cover aspect-square absolute w-full h-full group-hover:opacity-0 transition-opacity duration-500`,
                        imgClass
                      )}
                    />
                    <img
                      src={image[1] || "/"}
                      alt="Product Hover Image"
                      className={cn(
                        `object-cover absolute w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`,
                        imgClass
                      )}
                    />
                  </div>
                ) : (
                  <img
                    // className={cn(
                    //   `md:h-[380px] sm:h-[350px] h-52 w-full transition-transform duration-300 lg:hover:scale-[1.01]  object-cover`,
                    //   imgClass
                    // )}
                    className={cn(
                      `object-cover w-full h-full hover:scale-105 duration-500 transition-all`,
                      imgClass
                    )}
                    src={image[0]}
                    alt={title}
                  />
                )}

                {/* featured badge */}
                {checking && (
                  <div className="absolute bottom-2 h-fit left-2  px-2 bg-bgSoft flex items-center gap-1">
                    {/* <AyabooSvgIcon /> */}
                    <img
                      src="/img/cards/feayured_logo.svg"
                      className="object-cover "
                    />
                    <span className="text-xs p-0 text-black">Featured</span>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-green-500 text-white rounded px-2 py-1 text-xs flex items-center">
                  <StarIcon className="text-xs mr-1" fontSize="small" />5
                </div>

                {/* Favorite Icon */}
                {/* <button
          className="absolute top-2 right-2"
          onClick={() => setFavorite(!favorite)}
        >
          {favorite ? (
            <FavoriteIcon className="text-red-500" />
          ) : (
            <FavoriteBorderIcon className="text-white" />
          )}
        </button> */}
                <IconButton
                  sx={{ position: "absolute", top: 10, right: 10 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // setFavorite(!favorite)
                    dispatch(AddWishlistRedux(stockData?._id ?? ""));
                  }}
                >
                  {isFavorite ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h2 className="text-sm capitalize truncate">{title}</h2>
                <div className="flex items-center ">
                  <p className="text-lg font-bold text-gray-700">
                    ₹{basePrice}
                  </p>
                  {/* <p className="text-sm text-gray-700">{PricePerPiece?.[0].maxPiece}</p> */}
                </div>

                <p className="text-sm text-gray-500 ">
                  Min. order: {minQty} pieces
                  <br />
                  Color: {products.variations.length}, Size:{" "}
                  {
                    products.variations.flatMap(
                      (variation) => variation.details
                    ).length
                  }
                  , {sold?.toLocaleString()} sold
                </p>

                {/* Action Button */}
                <div className="mt-1">
                  <Button
                    variant={`b2bStyle`}
                    size="b2b"
                    className="w-full rounded-md text-sm  h-10"
                    onClick={() => handleClick(link)}
                  >
                    Make order
                  </Button>
                </div>
              </div>

              {/* </Link> */}
            </div>
          )}
        </>
      )}
    </>
  );
}
