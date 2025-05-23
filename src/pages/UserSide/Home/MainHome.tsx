import { getAllAddedCoverImages } from "@/action/banners/bannersAction";
import { ProductData } from "@/action/product/productData";
import Image from "@/components/global/image";
import Banner from "@/components/landings/maniHome/Banners/Banner";
import BannerWrapper from "@/components/landings/maniHome/Banners/BannerWrapper";
import ColorGrid from "@/components/landings/maniHome/Cards/ColorCard";
import ProdCard from "@/components/landings/maniHome/Cards/ProdCard";
import CategoryCard from "@/components/landings/maniHome/Shop_By_Cat/CategoryCard";
import { useQueryData } from "@/hooks/useQueryData";
// import { getDeviceToken, messaging } from "@/lib/firebase";
import { dispatch, useAppSelector } from "@/providers/redux/hook";
import { getRecentViewRedux } from "@/providers/redux/userSide/product_Slice";
import { IBannerImageTypes } from "@/types/ads.bannerTypes";
// import { ProductsDetail } from "@/utils/CardDetails";
import { useWindowSize, useWindowWidth } from "@react-hook/window-size";
import "@/assets/css/slick-slider.css"

import { useEffect, useState } from "react";


function MainHome() {
  const [width] = useWindowSize();
  const onlyWidth = useWindowWidth();
  const LapScreen = onlyWidth > 768

  const { products, isFetching } = ProductData(
    [
      {
        key: "is_todays_deal",
        value: "true",
      },
    ],
    undefined
  );

  const {
    data: fetchedBannerImages,
    isFetching: fetchingBanner,
    // refetch:refetchBanner,
  } = useQueryData(
    ["banner-images"],
    () => getAllAddedCoverImages("") // Wrap in an arrow function
  );

  // console.log(fetchedBannerImages);

  const { data: banners = [] } = (fetchedBannerImages ?? {}) as {
    status?: number;
    data?: IBannerImageTypes[];
  };

  const [bannerData, setBannerData] = useState({
    FLASH_BANNERS: [] as IBannerImageTypes[],
    HOME_SLIDER_1: [] as IBannerImageTypes[],
    HOME_SLIDER_2: [] as IBannerImageTypes[],
    HOME_SLIDER_3: [] as IBannerImageTypes[],
    ADS: [] as IBannerImageTypes[],
    KYC_SLIDER: [] as IBannerImageTypes[],
    LOGIN_PAGE: [] as IBannerImageTypes[],
  });

  // console.log(bannerData,'bannerData');

  useEffect(() => {
    if (banners && banners.length > 0) {
      const grouped: Record<string, IBannerImageTypes[]> = {};

      banners.forEach((banner) => {
        const key = banner.banner_type?.toUpperCase();
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(banner);
      });

      setBannerData((prev) => ({
        ...prev,
        ...grouped,
      }));
    }
  }, [banners]);

  const { wishlist, recentView } = useAppSelector((state) => state.products);
  // console.log(recentView,'recentView');

  //   const userAgent = window.navigator.userAgent;
  // const platform = window.navigator.languages;
  // const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);

  // const deviceID = `${userAgent}-${platform}-${randomString}`;
  // console.log(deviceID)
  // console.log(platform)

  useEffect(() => {
   
    dispatch(getRecentViewRedux());
  }, []);

  // console.log(products, "products");

  const todaysDeals =
    width > 1280 ? products.slice(0, 5) : products.slice(0, 4);

  const recentViewProducts =
    width > 1280 ? recentView.slice(0, 5) : recentView.slice(0, 4);

  // console.log(todaysDeals, "todaysDeals");

  return (
    <div className="min-h-screen sm:space-y-8 space-y-2 py-3">
      {/* ======= Section 01 Banner and Advertise ======= staring */}

      <div
        className="flex m-auto justify-between relative 2xl:px-4 xl:px-24 md:px-16 sm:px-5 px-2 md:gap-5 gap-2 sm:py-5 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url(/img/banners/bgimage1.png)",
        }}
      >
        <BannerWrapper
          infinite={bannerData.HOME_SLIDER_1.length > 1}
          isActive={bannerData.HOME_SLIDER_1.length > 1 && LapScreen}
          className="sm:w-[80%] md:h-[360px] sm:h-[200px] h-[100px] rounded-lg overflow-hidden w-[70%] !mb-0 !pb-0"
          nextBtnClass="shadow-md active:scale-90 duration-300 transition-all sm:px-2 sm:py-2 px-1 py-[2px]"
          prevBtnClass="shadow-md active:scale-90 duration-300 transition-all  sm:px-2 sm:py-2 px-1 py-[2px] text-xs"
          btnClass="justify-end  gap-3  right-0 sm:bottom-10 bottom-4"
        >
          {bannerData.HOME_SLIDER_1.map((banner) => (
            <Banner
              isLink
              imgClass="h-full"
              loading={fetchingBanner}
              className="w-full md:h-[360px] sm:h-[200px] h-[100px]  " // Consistent height
              _id={banner._id}
              name={banner.banner_type}
              link={banner.redirectUrl}
              image={banner.banner}
              key={banner._id}
            />
          ))}
        </BannerWrapper>

        {/* Ensure same height for AdvertiseBanner */}
        <div className="flex-grow rounded-md md:h-[360px] sm:h-[200px] h-[100px] overflow-hidden w-[100px]">
          {/* <AdvertiseBanner /> */}
          {bannerData.ADS.filter(
            (ad) => ad.context === window.location.href
          ).map((ads, index) => (
            <Image
              link={ads.redirectUrl}
              loading={fetchingBanner}
              key={index}
              src={ads.banner || "/img/advertise/adv1.png"}
              alt="ads banner"
              classNameImg="h-full object-cover rounded-xl"
              className="h-full w-full"
            />
          ))}
        </div>
      </div>

      {/* ======= Section 01 Banner and Advertise ======= end */}

      {/* ==----------------------- Section 02 : Shop By Categories -----------------------== starting */}
      <div className="">
        <CategoryCard />
      </div>
      {/* =======-------------- Section 02 : Shop By Categories =======--------------== ending */}

      {/*  */}
      {/* ======= Section 03 : Banner2 ========= starting */}
      {/* <BannerWrapper
         isActive={bannerData.HOME_SLIDER_2.length > 1}
        className="w-full section_spacing"
        nextBtnClass="shadow-md active:scale-90 duration-300 transition-all"
        prevBtnClass="shadow-md active:scale-90 duration-300 transition-all"
        btnClass="sm:left-28 sm:right-28 top-1/2 -translate-y-1/2 left-0  right-0"
      >
        {BannerDetails.map((banner) => (
          <Banner
            className="w-full md:h-auto md:min-h-[370px] md:max-h-[450px] sm:h-[200px] h-[110px] rounded-md overflow-hidden" // Consistent height
            _id={banner.id}
            name={banner.name}
            link={banner.link}
            image={banner.image}
            key={banner.id}
          />
        ))}
      </BannerWrapper> */}
      {/* --------------------- Section 03 : Banner2 ---------------------== ending */}
      {/* <h1 className="font-yahei text-xl">Hello with Microsoft YaHei UI</h1>

      <h1 className="f text-xl">中文 中文中文</h1> */}
      {/* <h1 className="font-yahei  text-xl">中文 中文中文</h1> */}



      {/* ======= Section 04 :  Products ========= starting */}
      {todaysDeals.length > 0 && (
        <div className="section_container_cards space-y-2">
          <h4>Today's Deals</h4>

          <div className="grid sm:gap-2 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-2 w-full ">
            {todaysDeals
              .filter((p) => p.product.is_todays_deal)
              .map((product, index) => {
                const isFavorite =
                  wishlist && wishlist.some((item) => item._id === product._id);
                // console.log(products,'products');

                // console.log(isFavorite,'isFavorite');

                return (
                  <div key={index}>
                    <ProdCard
                      show={product.product.is_todays_deal}
                      basePrice={product.product.basePrice}
                      featured={product.product.is_featured_product}
                      imageContainer="md:h-[310px] h-[260px]"
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
        </div>
      )}

      {/* ======= Section 05 : Color Variants ========= starting */}

      <div className="section_container_dash space-y-1 ">
        <h4>Shop By Colors</h4>
        <ColorGrid />
      </div>

      {/* ======= Section 05 : Color Variants ========= ENDS */}

      {/* ======= Section 06 : Testimonials ========= starting */}

      <BannerWrapper
        isActive={bannerData.HOME_SLIDER_2.length > 1&& LapScreen}
        infinite={bannerData.HOME_SLIDER_2.length > 1}
        className="w-full section_container_dash md:h-[370px] md:max-h-[450px] sm:h-[200px] h-[110px] rounded-lg overflow-hidden"
        nextBtnClass="shadow-md active:scale-90 duration-300 transition-all"
        prevBtnClass="shadow-md active:scale-90 duration-300 transition-all"
        btnClass="sm:left-28 sm:right-28 top-1/2 -translate-y-1/2 left-0  right-0"
      >
        {bannerData.HOME_SLIDER_2.map((banner) => (
          <Banner
          loading={fetchingBanner}
          isLink
          imgClass="h-full"
          className="w-full  md:h-[370px] md:max-h-[450px] sm:h-[200px] h-[110px] " // Consistent height
          _id={banner._id}
          name={banner.banner_type}
          link={banner.redirectUrl}
          image={banner.banner}
          key={banner._id}
        />
        ))}
      </BannerWrapper>

      {/* ======= Section 07 : Product Card 2 ========= starting */}

      {/* <pre>
        {
          JSON.stringify(recentViewProducts,null,4)
        }
      </pre> */}
      {recentViewProducts && recentViewProducts.length > 0 && (
        <div className="section_container_cards space-y-2">
          <h4>Recently Viewed</h4>
          <div className="grid sm:gap-2 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  grid-cols-2 w-full ">
            {recentViewProducts.map((product, index) => {
              if (
                !product.product ||
                product.product.basePrice === 0 ||
                !product.product.basePrice
              )
                return null;

              const isFavorite =
                wishlist && wishlist.some((item) => item._id === product._id);
              // console.log(products,'products');

              // console.log(isFavorite,'isFavorite');

              return (
                <div key={index}>
                  <ProdCard
                    basePrice={product.product?.basePrice}
                    featured={product.product.is_featured_product}
                    imageContainer="md:h-[310px] h-[260px]"
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
        </div>
      )}

      {/* ======= Section 07 : Product Card 2 ========= Ending */}

      {/* ======= Section 08 : Banner4 ========= starting */}
      <BannerWrapper
        isActive={bannerData.HOME_SLIDER_3.length > 1 && LapScreen}
        infinite={bannerData.HOME_SLIDER_3.length > 1}
          className="w-full section_container_dash md:h-[370px] md:max-h-[450px] sm:h-[200px] h-[110px] rounded-lg overflow-hidden"
        nextBtnClass="shadow-md active:scale-90 duration-300 transition-all"
        prevBtnClass="shadow-md active:scale-90 duration-300 transition-all"
        btnClass="sm:left-28 sm:right-28 top-1/2 -translate-y-1/2 left-0  right-0"
      >
        {bannerData.HOME_SLIDER_3.map((banner) => (
          <Banner
            loading={fetchingBanner}
            isLink
            imgClass="h-full"
            className="w-full  md:h-[370px] md:max-h-[450px] sm:h-[200px] h-[110px] " // Consistent height
            _id={banner._id}
            name={banner.banner_type}
            link={banner.redirectUrl}
            image={banner.banner}
            key={banner._id}
          />
        ))}
      </BannerWrapper>
      {/* --------------------- Section 08 : Banner4 ---------------------== ending */}
    </div>
  );
}
export default MainHome;
