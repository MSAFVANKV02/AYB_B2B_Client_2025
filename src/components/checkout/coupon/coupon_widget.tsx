import { Input } from "@/components/ui/input";
import { dispatch } from "@/providers/redux/hook";
import { getCartRedux } from "@/providers/redux/userSide/product_Slice";
import { apply_Coupon_Api } from "@/services/user_side_api/checkout/route";
import { makeToast, makeToastError } from "@/utils/toaster";
import { Button } from "@mui/material";
import React, { useState } from "react";

type Props = {
    couponCode?: string;
};

const CouponWidget = ({couponCode}: Props) => {
  const [error, setError] = useState<string>("");
  const [coupon, setCoupon] = useState<string>("");

  const handleSubmitCoupon = async () => {
    if (!coupon || coupon.trim() === "") {
      return setError("Please Apply your coupon");
    }
    try {
      const { data, status } = await apply_Coupon_Api(coupon);
      if (status === 200) {
        dispatch(getCartRedux());
        makeToast(data.message);
        setError("")
        setCoupon("")
      }
    } catch (error: any) {
        console.log(error);
        
      if (error) {
        setError(error.response.data.message);
        makeToastError(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">

        {
            couponCode ? (
                <div className="w-full bg-gray-200 p-3 text-sm">
                    <span className="">
                       {couponCode} 
                    </span>
                </div>
            ):(
                <div className="w-full   h-11 flex gap-2 i">
                <Input
                value={coupon}
                  type="text"
                  className="flex-1 border h-full bg-gray-50 rounded-lg uppercase"
                  placeholder="Coupon Code"
                  onChange={(e) => {
                    setCoupon(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "#6d6c6d" },
                    borderRadius: "8px",
                    padding: "10px",
                    textTransform: "capitalize",
                    width: "90px",
                    color: "white",
                  }}
                  onClick={handleSubmitCoupon}
                >
                  Apply
                </Button>
              </div>
            )
        }

     
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default CouponWidget;
