import MyCloseIcon from "@/components/icons/My_CloseIcon";
import { dispatch } from "@/providers/redux/hook";
import { getCartRedux } from "@/providers/redux/userSide/product_Slice";
import { remove_Coupon_Api } from "@/services/user_side_api/checkout/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { memo, useCallback } from "react";

type Props = {
  couponCode?: string;
};

const CouponTicket = ({ couponCode }: Props) => {
  const handleDeleteCoupon = useCallback(async () => {
    try {
      const { data, status } = await remove_Coupon_Api();
      if (status === 200 || status === 201) {
        makeToast(data.message || "success");
        dispatch(getCartRedux());
      }
    } catch (error: any) {
      if (error) {
        makeToastError(error.response.data.message);
      }
    }
  }, []);
  return (
    <div className="flex items-center justify-center bg-white ">
      <div className="relative flex  rounded-l-xl rounded-r-[0.5rem] overflow-hidden w-[520px] shadow-2xl h-[110px]">
        {/* Left section */}
        <div className="flex-1 flex flex-col justify-center  px-6 text-white bg-gradient-to-r from-pink-500 to-purple-600">
          {/* <h2 className="text-xl font-bold tracking-widest">COUPON</h2> */}
          <p className="text-xl font-semibold mt-1">PROMO CODE</p>
          <div className="mt-1 border border-black border-dotted  text-center bg-white text-black  py-1 px-3 rounded-md text-sm tracking-wider">
            {couponCode}
          </div>
          {/* <div className="relative bg-white text-black text-center py-2 px-4 rounded-md text-sm tracking-wider">
            <span className="absolute inset-0 rounded-md pointer-events-none border-[3px] border-transparent before:content-[''] before:absolute before:inset-0 before:rounded-md before:border-[3px] before:border-black before:border-dotted before:border-spacing-[10px]"></span>
            {couponCode}
          </div> */}
        </div>

        {/* Right stub */}
        {/* <div className="w-24 bg-white text-black flex flex-col justify-center items-center rounded-r-[0.5rem] border-l border-dashed border-gray-400">
          <div className="-rotate-90 flex justify-center items-center flex-col">
            <h2 className="text-xs font-bold">COUPON</h2>
            <p className="text-xs font-semibold ">PROMO CODE</p>
            <p className="text-[10px] font-mono tracking-wider  mt-2 whitespace-nowrap">
              {couponCode}
            </p>
          </div>
        </div> */}

        {/* Dotted Cut Line */}
        {/* <div className="absolute top-0 bottom-0 right-[96px] w-[2px] bg-dotted-line"></div> */}
        <div className="absolute -top-0  -right-0  bg-dotted-line z-50">
          <MyCloseIcon onClick={handleDeleteCoupon} color="white" />
        </div>

        {/* Half circles */}
        {/* <div className="absolute right-[96px] -top-2 w-4 h-4 bg-white shadow-inner rounded-full z-10"></div>
        <div className="absolute right-[96px] -bottom-2 w-4 h-4 bg-white shadow-inner rounded-full z-10"></div> */}
      </div>
    </div>
  );
};

export default memo(CouponTicket);

/* Add this CSS to your Tailwind config or a global stylesheet */
/* In tailwind.config.js, under extend: { backgroundImage: ... } */
/* Or define a plugin style for `bg-dotted-line` */
