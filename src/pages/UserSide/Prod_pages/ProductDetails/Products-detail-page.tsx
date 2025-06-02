import ProductDetail from "./ProductDetail";
import ProductImages from "./ProductImages";
// import { dummyProduct } from "@/data/dummyData/productsData";
import CustomizeSamplePurchase from "./Customize_SamplePurchase";
import ProductTabs from "./ProductTabs";

import "@/assets/css/products.css";
import ProductReviews from "../../Review/ProductReviews";
import { useEffect } from "react";
import "@/assets/css/remover.css";
import { useParams } from "react-router-dom";
import { ProductData } from "@/action/product/productData";
import { IGetAllFilterKey } from "@/services/user_side_api/products/route";
import { useAppSelector } from "@/providers/redux/hook";
import ProductDetailSkelton from "./product_detail_skelton";

// import NavbarCheck from "@/components/checkings/page";

export default function ProductsPage() {
  const { slug } = useParams();

  const { products } = useAppSelector((state) => state.products);

  const { isFetching } = ProductData([
    {
      key: "product" as IGetAllFilterKey,
      value: slug ?? "",
    },
  ]);

  const product = products[0].product;

  useEffect(() => {
    // console.log(slug);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!product) return null;

  return (
    <>
      {isFetching ? (
        <div className="my-10">
          <ProductDetailSkelton />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col section_container_dash space-y-10 my-10">
          {/* <NavbarCheck/> */}
          <div className="flex flex-col lg:flex-row gap-6 w-full   h-full">
            {/* Product Image Section */}
            <div className="lg:w-[50%] lg:sticky lg:top-0 rounded-lg border min-h-[50vh] lg:h-[80vh] bg-white/10 filter backdrop-blur-lg">
              <ProductImages
                item={product}
                stockData={products}
                images={product.gallery_image}
              />
            </div>

            {/* Product Details Section */}
            <div className="lg:w-[50%] min-h-[50vh] lg:min-h-[75vh]">
              <ProductDetail product={product} stockData={products} />
            </div>
          </div>
          {/* ====== details Ends ======= */}

          {/* customization and Sample purchase */}
          <div className="">
            <CustomizeSamplePurchase />
          </div>

          {/* Product Features tabs */}
          <div className="">
            <ProductTabs
            // productFeatures={product?.productFeatures ?? ""}
            // specialFeatures={product?.specialFeatures ?? ""}
            // careGuide={product?.careGuide ?? ""}
            />
          </div>

          {/* <div className="">
        <h5>Similar Products</h5>
        <div className="flex lg:flex-wrap overflow-x-auto gap-4 scrollbar-none w-full mt-3">
          {similarProduct.map((similarProduct) => (
            <ProdCard
              key={product._id}
              link="/products/new-jean"
              title={product.product_name}
              priceRange={similarProduct.max_purchase_qty}
              image={product.product_images[0]}
              isFavorite={false}
              sold={34454}
              className="bg- w-[300px]  my-2"
              imgClass="md:h-[200px] object-contain"
            />
          ))}
        </div>
      </div> */}
          {/* Recent Viewed Products */}
          <div className="">
            <h5>Recent viewed</h5>
            <div className="flex lg:flex-wrap overflow-x-auto gap-4 scrollbar-none w-full mt-3">
              {/* {similarProduct.map((similarProduct) => (
            <ProdCard
              key={product._id}
              link="/products/new-jean"
              title={product.product_name}
              priceRange={similarProduct.max_purchase_qty}
              image={product.product_images[0]}
              isFavorite={false}
              sold={34454}
              className="bg- w-[300px] shadow-md my-2"
              imgClass="md:h-[200px] object-contain"
            />
          ))} */}
            </div>
          </div>
          {/* ========= */}

          {/* Reviews and Rating starts ========== */}
          <div className="">
            <ProductReviews />
          </div>
        </div>
      )}
    </>
  );
}
