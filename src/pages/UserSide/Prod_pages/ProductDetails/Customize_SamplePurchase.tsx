import { Button } from "@/components/ui/button";
import { useState } from "react";

const CustomizeSamplePurchase = () => {
  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedSize, setSelectedSize] = useState("S");

  const colors = ["Red", "Pink", "Peach", "Gray"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 lg:space-y-0 space-y-6 rounded-lg min-h-[350px]">
      {/* Customization Section */}
      <div className="  flex flex-col gap-3 col-span-2 h-full">
        {/* ======= •*/}
        <div className="bg-bgGraySoft rounded-lg h-full flex md:flex-row flex-col gap-3 justify-between p-6">
          <div className="flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-2">Customization</h3>
            <ul className="list-none text-sm text-gray-600 space-y-1 flex flex-col li-custom">
              <li className="">Customized logo</li>
              <li className="">Customized size chart</li>
              <li className="">Graphic customization</li>
              <li className="">Customized package</li>
            </ul>
          </div>
          <div className="lg:w-[15%] md:text-right">
            <p className="text-sm ">Minimum quantity</p>
            <p className="text-sm f">5000 pieces</p>

            <Button
              variant={"outline"}
              className="mt-4 border border-black w-full"
            >
              Get enquiry
            </Button>
          </div>
        </div>
        {/* ======= */}
        <div className="bg-bgGraySoft rounded-lg h-full p-6">
          <h3 className="text-lg font-semibold mb-2">Shipping details</h3>
        </div>
      </div>

      {/* Sample Purchase Section */}
      <div className="p-4 bg-bgGraySoft rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Sample purchase</h3>
        <p className="text-sm text-gray-500">Sample price</p>
        <p className="text-2xl font-bold mb-4">$4.69</p>

        <div className="mb-4">
          <p className="text-sm font-semibold">Select color</p>
          <div className="flex gap-3 mt-2 justify-start flex-wrap">
            {colors.map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                  selectedColor === color
                    ? "border-gray-800"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold">Select size</p>
          <div className="flex gap-3 mt-2 justify-start flex-wrap">
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-1 border rounded-lg ${
                  selectedSize === size
                    ? "bg-gray-800 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <Button variant={"outline"} className="w-full border border-black">
          Get sample
        </Button>
      </div>
    </div>
  );
};

export default CustomizeSamplePurchase;
