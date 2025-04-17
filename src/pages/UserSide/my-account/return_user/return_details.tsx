import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import MyBackBtn from "@/components/myUi/myBackBtn";
import GstDropDown from "@/components/myUi/GstDropDown";
import AyButton from "@/components/myUi/AyButton";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

export default function ReturnDetails() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex lg:flex-row flex-col gap-3 justify-between">
        {/* First Row ===== */}
        <div className="space-y-3 lg:w-1/2 w-full">
          {/* Back Button ====== */}
          <div className="mb-3">
            <MyBackBtn />
          </div>
          {/* order-ID starts ======= */}
          <span className="sm:text-sm text-xs">OD564756-4674676</span>

          {/* Store Details ===== */}
          <div className="flex flex-col sm:gap-3 gap-2">
            <p className=" text-black">Store Details</p>
            <div className="flex flex-col">
              <span className="sm:text-sm text-xs text-black">Name</span>
              <span className="sm:text-sm text-xs">Address</span>
              <span className="sm:text-sm text-xs">Email: </span>
              <p className="">Phone Number: +91-12253464</p>
              <p>GST Number</p>
            </div>
          </div>

          <Separator />

          {/* Product Details starts ====== */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="w-20 h-20 overflow-hidden rounded-sm ">
                <img
                  src="/img/products/image 79.png"
                  className="object-cover w-full h-full"
                  alt=""
                />
              </div>
              <div className="">
                <p>Oversized 100% Cotton 190GSM 240GSM Plain White T Shirt</p>
                <span>Subtotal:</span> <span className="text-black">$2003</span>
              </div>
            </div>
            {/* ==== product variants starts ===== */}
            <div className="">
              <table className="table-auto md:w-3/4 w-full ">
                <thead className=" text-left">
                  <tr>
                    <th className="px-4 py-2 text-textGray text-sm ">
                      Variant
                    </th>
                    <th className="px-4 py-2 text-textGray text-sm ">Price</th>
                    <th className="px-4 py-2 text-textGray text-sm ">
                      Return Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-textGray text-sm ">
                      <img
                        src="/img/products/image 78.png"
                        className="w-10 h-12"
                        alt="return products"
                      />
                    </td>
                    <td className="px-4 py-2 text-textGray text-sm ">$500</td>
                    <td className="px-4 py-2 text-textGray text-sm ">
                      <Input
                        type="number"
                        className="border border-black  w-14 h-8"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-textGray text-sm ">
                      <img
                        src="/img/products/image 78.png"
                        className="w-10 h-12"
                        alt="return products"
                      />
                    </td>
                    <td className="px-4 py-2 text-textGray text-sm ">$500</td>
                    <td className="px-4 py-2 text-textGray text-sm ">
                      <Input
                        type="number"
                        className="border border-black  w-14 h-8"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="px-4 py-2 text-black text-lg ">
                      Total:
                      {/* gst Dropdown ============ */}
                      <GstDropDown />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="space-y-3 lg:w-1/2 w-full bg-slate-50">
          <Textarea
            className="h-full resize-none"
            placeholder="Reason For Refund ..."
          />
        </div>
      </div>

      {/* submit sutton */}
      <div className="w-full py-10 flex justify-end">
        <AyButton type="submit" title="Submit" />
      </div>
    </form>
  );
}
