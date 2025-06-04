// import { IFlatOrderItem } from "@/types/orderTypes";
// import { ReturnItemType } from "./return-action-form";
// import Image from "@/components/global/image";

// type Props = {
//   orders: IFlatOrderItem[];
//   onSelect: (items: ReturnItemType[]) => void;
//   totalQty?:boolean
// };

// const ReturnProductList = ({ orders, onSelect }: Props) => {
//   return (
//     <div className="grid grid-cols-1  gap-4">
//       {orders.map((orderItem) => {
//         const totalQty = orderItem.product.variations.reduce(
//           (varSum, variation) => {
//             return (
//               varSum +
//               variation.details.reduce(
//                 (detSum, detail) => detSum + detail.quantity,
//                 0
//               )
//             );
//           },
//           0
//         );

//         return (
//           <div
//             key={orderItem.product._id}
//             className="border p-4 rounded cursor-pointer hover:bg-gray-50 flex gap-3 w-1/2"
//             onClick={() => {
//               const variations = orderItem.product.variations.flatMap(
//                 (variation) =>
//                   variation.details.map((detail) => ({
//                     productId: orderItem.product._id,
//                     productName: orderItem.product.product_name,
//                     color: variation.colorName,
//                     size: detail.size,
//                     orderedQty: detail.quantity,
//                     returnQty: 0,
//                     reason: "",
//                     file: null as File | null,
//                   }))
//               );
//               onSelect(variations);
//             }}
//           >
//             <Image
//               src={orderItem.product.gallery_image[0]}
//               link={`/product/${orderItem.product.slug}`}
//               className="w-[69px] h-[69px]  shrink-0 border"
//               classNameImg="w-full h-full object-contain"
//             />
//             <div className="flex flex-col gap-1 w-full">
//               <p className="font-semibold text-sm truncate overflow-hidden whitespace-nowrap w-1/2 ">
//                 {orderItem.product.product_name}
//               </p>
//               <p className="text-xs text-gray-500">
//                 Total Qty: {totalQty}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ReturnProductList;
import { IFlatOrderItem } from "@/types/orderTypes";
import { ReturnItemType } from "./return-action-form";
import Image from "@/components/global/image";

type Props = {
  orders: IFlatOrderItem;
//   gropedOrder:IFlatOrderItem[]
  onSelect: (items: ReturnItemType[]) => void;
  totalQty?: number;
};

const ReturnProductList = ({ orders, onSelect, totalQty }: Props) => {
  return (
    <div
      key={orders.product._id}
      className=" p-2 rounded cursor-pointer hover:bg-gray-50 bg-white flex gap-3 w-full"
      onClick={() => {
        const variations = orders.product.variations.flatMap((variation) =>
          variation.details.map((detail) => ({
            productId: orders.product._id,
            productName: orders.product.product_name,
            color: variation.colorName,
            size: detail.size,
            orderedQty: detail.quantity,
            returnQty: 0,
            reason: "",
            file: null as File | null,
          }))
        );
        onSelect(variations);
      }}
    >
      <Image
        src={orders.product.gallery_image[0]}
        link={`/product/${orders.product.slug}`}
        className="w-[69px] h-[69px]  shrink-0 bg-[#FCFCFCFC] "
        classNameImg="w-full h-full object-contain"
      />
      <div className="flex flex-col gap-1 w-full">
        <p className="font-semibold text-sm truncate overflow-hidden whitespace-nowrap w-1/2 ">
          {orders.product.product_name}
        </p>
        <p className="text-xs text-gray-500">Total Qty: {totalQty}</p>
      </div>
    </div>
  );
};

export default ReturnProductList;
