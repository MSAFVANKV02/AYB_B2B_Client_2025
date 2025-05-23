import Image from "@/components/global/image";
import MyClock from "@/components/myUi/MyClock";
import { IFlatOrderItem } from "@/types/orderTypes";

type Props = {
  orders: IFlatOrderItem;
  totalQty: number;
  index: number;
};

const DetailedProductOverview = ({ orders, totalQty, index }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Header Section */}
      {index === 0 && (
        <div className="flex gap-4 ">
          <Image
            src={orders.product.gallery_image[0]}
            link={`/product/${orders.product.slug}`}
            className="w-[69px] h-[69px] rounded-md shrink-0 border"
            classNameImg="w-full h-full object-contain"
          />

          <div className="flex flex-col max-w-[calc(100%-85px)]">
            <span className="text-sm font-semibold text-black break-words whitespace-normal leading-snug">
              {orders.product.product_name}
            </span>

            <span className="text-sm text-gray-700 mt-1">
              Total Quantity : {totalQty}
            </span>

            {orders.store.order_status === "delivered" && (
              <span className="text-xs text-black">
                Return window closed on :{" "}
                <MyClock
                  className="text-xs"
                  addDays={10}
                  date={orders.store.delivery_date}
                  showSeconds={false}
                  showTime={false}
                  use12Hour
                />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Variations Grid */}
      <div className="grid md:grid-cols-2 gap-4 w-full sm:ml-5">
        {orders.product.variations.map((variation, vIndex) => (
          <div key={vIndex} className="flex gap-5 w-full">
            {/* Color Image Box */}
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-md overflow-hidden">
              {variation.image && (
                <Image
                  link={`/product/${orders.product.slug}`}
                  src={variation.image}
                  className="w-full h-full"
                  classNameImg="object-cover"
                />
              )}
            </div>

            {/* Details */}
            <div className="flex gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500">Color</span>
                <span className="font-medium capitalize">
                  {variation.colorName}
                </span>
              </div>

              <div className="flex flex-col">
                <span className=" text-gray-500">Sizes</span>
                <div className="flex flex-wrap gap-x-4 text-sm text-black">
                  {variation.details.map((detail, dIndex) => (
                    <div key={dIndex} className="">
                      {detail.size} : {detail.quantity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedProductOverview;
