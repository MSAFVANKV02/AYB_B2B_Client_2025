import { Box } from "@mui/material";
import ProdCard from "@/components/landings/maniHome/Cards/ProdCard";
// import { ProductsDetail } from "@/utils/CardDetails";
import { useQuery } from "@/utils/QueryParams";
import { ProductState } from "@/utils/Validator/product-validator";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "@/assets/css/products.css";
import { ProductData } from "@/action/product/productData";
import FilterSidebar from "@/components/landings/Product_Sec/FilterSidebar";
import { IGetAllFilterKey } from "@/services/user_side_api/products/route";
import { debounce } from "lodash";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { setProducts } from "@/providers/redux/userSide/product_Slice";
import { Skeleton } from "@/components/ui/skeleton";
import ProductPagination from "@/components/paginations/product-pagination";
import SortFilterWidget from "@/components/landings/Product_Sec/Sort_Filter_Widget";

function AllKindProducts() {
  const { page, slug } = useParams();
  const [showFilterTab, setShowFilterTab] = useState(false);
  const { wishlist } = useAppSelector((state) => state.products);
  // const { products, isFetching } = ProductData([
  //   {
  //     key: (page as IGetAllFilterKey) ?? "",
  //     value: slug ?? "",
  //   },
  // ]);

  // console.log(page, slug ,'page, slug ');
  // console.log(wishlist,'wishlist');
  

  const query = useQuery();
  const navigate = useNavigate();

  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 10000;

  const getInitialFilterState = (): ProductState => {
    const colors = query.get("colors")?.split(",") || [];
    const size = query.get("size")?.split(",") || [];
    const sort = (query.get("sort") as ProductState["sort"]) || "none";
    const brands = query.get("brands")?.split(",") || [];
    const fTab = (query.get("fTab") as ProductState["fTab"]) || "";

    // const minimumQuantity = query.get("minimumQuantity") || "";
    const minimumQuantity = parseInt(query.get("min-qty") || "0");

    const priceRangeParam = query.get("price");
    const [minPrice, maxPrice] = priceRangeParam
      ? priceRangeParam.split("+").map(Number)
      : [DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE];

    return {
      colors,
      fTab,
      brands,
      size,
      sort,
      minimumQuantity,
      priceRange: {
        min: isNaN(minPrice) ? DEFAULT_MIN_PRICE : minPrice,
        max: isNaN(maxPrice) ? DEFAULT_MAX_PRICE : maxPrice,
      },
    };
  };

  const mapToBackendFilter = (filter: ProductState) => ({
    size: filter.size.length > 0 ? filter.size : null,
    colors: filter.colors.length > 0 ? filter.colors : null,
    priceRange: [filter.priceRange.min, filter.priceRange.max],
    brands: filter.brands, // backend expects array (even if empty)
    minimumQuantity: Number(filter.minimumQuantity) || 0,
  });

  const [filter, setFilter] = useState<ProductState>(getInitialFilterState);
  console.log(mapToBackendFilter(filter),'mapToBackendFilter');
  const debouncedUrlUpdate = useMemo(
    () =>
      debounce((updatedFilter: ProductState) => {
        const params = new URLSearchParams();
        if (updatedFilter.colors.length > 0)
          params.set("colors", updatedFilter.colors.join(","));
        // if (updatedFilter.size.length > 0)
        //   params.set("size", updatedFilter.size.join(","));
        if (updatedFilter.sort !== "none")
          params.set("sort", updatedFilter.sort);

        if (
          updatedFilter.priceRange.min !== DEFAULT_MIN_PRICE ||
          updatedFilter.priceRange.max !== DEFAULT_MAX_PRICE
        ) {
          params.set(
            "price",
            `${updatedFilter.priceRange.min}+${updatedFilter.priceRange.max}`
          );
        } else {
          params.delete("price");
        }

        if (
          updatedFilter.minimumQuantity &&
          updatedFilter.minimumQuantity > 0
        ) {
          params.set("min-qty", String(updatedFilter.minimumQuantity));
        } else {
          params.delete("min-qty");
        }

        if (updatedFilter.size.length > 0) {
          params.set("s.size", updatedFilter.size.join(","));
        } else {
          params.delete("s.size");
        }

        if (updatedFilter.brands.length > 0) {
          params.set("brands", updatedFilter.brands.join(","));
        } else {
          params.delete("brands");
        }

        navigate(`?${params}`);
      }, 500),
    [navigate]
  );

  useEffect(() => {
    debouncedUrlUpdate(filter);
  }, [filter, debouncedUrlUpdate]);

  const { products, isFetching } = ProductData(
    [
      {
        key: page as IGetAllFilterKey,
        value: slug ?? "",
      },
      {
        key: "sort" as IGetAllFilterKey,
        value: query.get("sort") ?? "",
      },
      {
        key: "page" as IGetAllFilterKey,
        value: query.get("page") || "1",
      },
      {
        key: "limit" as IGetAllFilterKey,
        value: query.get("limit") || "20",
      },
    ],
    mapToBackendFilter(filter)
    // {
    //   size: filter.size.length > 0 ? filter.size : null,
    //   colors: filter.colors.length > 0 ? filter.colors : null,
    //   priceRange: [filter.priceRange.min, filter.priceRange.max],
    //   brands: filter.brands, // backend expects array (even if empty)
    //   minimumQuantity: Number(filter.minimumQuantity) || 0,
    // }
  );
  console.log(products);

  useEffect(() => {
    // alert( query.get("sort"))
    if (products) {
      dispatch(setProducts(products)); // ✅ dispatch the array properly
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className=" sm:my-5 my-1">
        <SortFilterWidget
          setFilter={setFilter}
          filter={filter}
          setShowFilterTab={setShowFilterTab}
          showFilterTab={showFilterTab}
        />
      </div>

      <div className="min-h-screen flex gap-5">
        {/* Navigation */}
        {/* <CategoryProductNavbar setFilter={setFilter} filter={filter} /> */}
        <div
          className={`xl:w-[20%] lg:w-[25%] md:w-[30%] w-full lg:h-screen h-[70dvh] ${showFilterTab ? " block" : "md:block hidden"} sticky top-0 border border-[#B6B6B6] bg-[#F6F6F6] md:rounded-md overflow-auto`}
        >
          <FilterSidebar setFilter={setFilter} filter={filter} />
        </div>

        {/* Product Grid Layout */}
        {!showFilterTab && (
          <div className="flex flex-col w-full flex-1">
            {isFetching ? (
              <Box sx={{ flex: "1 1 0" }}>
                <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div className="flex flex-col space-y-3" key={item}>
                      <Skeleton className=" h-[280px] rounded-sm" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-10 " />
                      </div>
                    </div>
                  ))}
                </div>
              </Box>
            ) : (
              <Box sx={{ flex: "1 1 0" }}>
                {products && products.length > 0 ? (
                  <div className="product-container gap-1">
                    {products.map((product, index) => {
                      const isFavorite =  wishlist &&wishlist.some(
                        (item) => item._id === product._id
                      );
                      // console.log(products,'products');

                      // console.log(isFavorite,'isFavorite');
                      

                      return (
                        <div key={index}>
                          <ProdCard
                            basePrice={product.product.basePrice}
                            featured={product.product.is_featured_product}
                            imageContainer="sm:h-[300px]"
                            imgClass=""
                            products={product.product}
                            stockData={product}
                            key={product._id}
                            link={`/product/${product.product.slug}`}
                            title={product.product.product_name}
                            minQty={product.product.minimum_quantity}
                            image={product.product.thumbnails}
                            isFavorite={isFavorite}
                            PricePerPiece={product.product.price_per_pieces}
                            loading={isFetching}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full mx-auto flex flex-col gap-9 items-center justify-center min-h-[400px] ">
                    <div className="relative  w-[20%] rounded-full h-28 flex items-center justify-center backdrop-blur-sm filter">
                      <span className="text-2xl text-black font-semibold">
                        Product Not Found!!
                      </span>
                    </div>
                    <div className="w-full h-[4px] bg-gray-50 shadow-[1px_23px_31px_-3px_rgba(0,_0,_0,_0.7)]" />
                  </div>
                )}
              </Box>
            )}

            {products.length > 0 && (
              <div className="mx-auto">
                <ProductPagination />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AllKindProducts;
