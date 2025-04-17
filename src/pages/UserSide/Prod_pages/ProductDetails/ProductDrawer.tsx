import * as React from "react";
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
import { Product } from "@/types/final-product-types";
import { useSetSearchParams } from "@/hooks/use-set-searchParams";

type IDrawerTypes = {
  product?: Product;
  setBuyOpen: (open: boolean) => void;
  open: boolean;
  buyNow: boolean;
};

export default function ProductDrawer({
  product,
  buyNow,
  //   open,
  setBuyOpen,
}: IDrawerTypes) {
  const [open, setOpen] = React.useState(false);
  // console.log(product);
  const onlyWidth = useWindowWidth();
  const setQueryParams = useSetSearchParams();
  //   const desktopsWidth = onlyWidth >= 1024;
  //   const tabletsWidth = onlyWidth < 900;
  //   const xlScreen = onlyWidth < 1440;
  const mobileWidth = onlyWidth < 768;
  const [clicked, setClicked] = React.useState(false);
  const [quantities, setQuantities] = React.useState<{ [key: string]: number }>(
    { S: 1, M: 1, L: 1, XL: 1, XXL: 1 }
  );
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // makeToastWarning(`${currentImageIndex}`)

  const handleClick = () => {
    // Add the clicked state to trigger animations
    setClicked(true);

    // Reset the state after 3 seconds (3000 ms)
    setTimeout(() => {
      setClicked(false);
    }, 3000);
  };

  const handleIncrease = (size: string) => {
    setQuantities((prev) => ({
      ...prev,
      [size]: prev[size] + 1,
    }));
  };

  const handleDecrease = (size: string) => {
    setQuantities((prev) => ({
      ...prev,
      [size]: Math.max(prev[size] - 1, 1),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    size: string
  ) => {
    const value = Math.max(parseInt(e.target.value, 10) || 1, 1);
    setQuantities((prev) => ({
      ...prev,
      [size]: value,
    }));
  };

  // const sliderSettings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: true,
  // };

  return (
    <React.Fragment>
      {!buyNow ? (
        <>
          {product?.variations.map((variant, index) => (
            <div className={`${currentImageIndex === index ? "border-2 border-blue-400" : "border-gray-200"} w-14 h-14 rounded-sm  overflow-hidden`} key={index}>
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

              {/* <Slider
                {...sliderSettings}
                className=" border-none active:outline-none"
              >
                {product?.galleryImages.map((image, idx) => (
                  <Box
                    key={idx}
                    height={!mobileWidth ? 600 : 300}
                    sx={{ width: "90%" }}
                    onClick={(e) => e.preventDefault()}
                    bgcolor={"white"}
                    borderRadius={!mobileWidth ? "12px" : ""}
                  >
                    <div className="h-full m-auto  flex items-center justify-center">
                      <img
                        key={idx}
                        src={image}
                        alt={product?.product_name}
                        className="object-cover cursor-pointer  lg:w-[70%] lg:h-[70%] w-[50%] h-[80%]"
                      />
                    </div>
                  </Box>
                ))}
              </Slider> */}
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
                  {product?.gallery_image.map((img, index) => (
                    <Banner
                      className="md:h-[600px] h-[250px]  flex items-center justify-center "
                      isLink={false}
                      image={img}
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

              <Box width={mobileWidth ? "100%" : "60%"}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ my: 1 }}
                >
                  <Box>
                    <Typography level="body-sm">10 - 99 pieces</Typography>
                    <Typography level="h4" fontWeight="00">
                      ₹476.86
                    </Typography>
                  </Box>
                  <Box>
                    <Typography level="body-sm">100 - 499 pieces</Typography>
                    <Typography level="h4" fontWeight="00">
                      ₹459.23
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ my: 1 }}
                >
                  <Box>
                    <Typography level="body-sm">500 - 1999 pieces</Typography>
                    <Typography level="h4" fontWeight="00">
                      ₹411.37
                    </Typography>
                  </Box>
                  <Box>
                    <Typography level="body-sm">{"≥ 2000 pieces"}</Typography>
                    <Typography level="h4" fontWeight="00">
                      ₹393.74
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* #Color Options */}
            <Typography level="body-sm" fontWeight="bold">
              1. Color (4): Red
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {product?.gallery_image.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    src={image}
                    alt={"drawer images"}
                    onClick={() => setOpen(true)}
                    className="w-14 h-14 object-cover cursor-pointer rounded-sm border border-red-400"
                  />
                  <span className="h-6 w-fit bg-bg absolute rounded-full flex justify-center items-center text-white p-1 -top-2 -right-2 text-sm z-50">
                    X1
                  </span>
                </div>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Size Options */}
            <Typography level="body-sm" fontWeight="bold">
              2. Size (5)
            </Typography>
            <List sx={{ mt: 1 }}>
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <ListItem
                  key={size}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2, // Adds space between columns
                  }}
                >
                  <Typography sx={{ flex: "1 1 0" }}>{size}</Typography>
                  <Typography sx={{ flex: "1 1 0", textAlign: "left" }}>
                    ₹287.12
                  </Typography>

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
                      onClick={() => handleDecrease(size)}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      className="custom-input   text-center text-black border-b"
                      value={quantities[size]}
                      onChange={(e) => handleInputChange(e, size)}
                    />
                    <Button
                      variant="outline"
                      className="border-gray-200 text-textMain rounded-sm"
                      onClick={() => handleIncrease(size)}
                    >
                      +
                    </Button>
                  </Stack>
                </ListItem>
              ))}
            </List>

            {/* <Divider sx={{ my: 2 }} /> */}

            {/* Subtotal and Actions */}
            <Box
              sx={{
                mt: "auto",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "16px",
              }}
              className=""
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography level="body-sm">Item subtotal (0 items)</Typography>
                <Typography level="body-sm">₹0.00</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ my: 1 }}
              >
                <Typography level="body-sm">Shipping total</Typography>
                <Typography level="body-sm">₹0.00</Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                fontWeight="bold"
              >
                <Typography>Subtotal</Typography>
                <Typography>₹0.00</Typography>
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
                <Button variant="b2bStyle" className="w-full">
                  Continue to order
                </Button>
              </Stack>
            </Box>
          </Sheet>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
}
