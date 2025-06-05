// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import { IFlatOrderItem } from "@/types/orderTypes";
// import ReturnActionTable from "./return-action-table";
// import ReturnProductList from "./return-product-list";

// export type ReturnItemType = {
//   productId: string;
//   productName: string;
//   color: string;
//   size: string;
//   orderedQty: number;
//   returnQty: number;
//   reason: string;
//   file: File | null;
// };

// interface Props {
//   orders: IFlatOrderItem[];
// }

// const ReturnActionForm: React.FC<Props> = ({ orders }) => {
//   const [selectedProductId, setSelectedProductId] = useState<ReturnItemType[]>([]);

//   console.log(orders,'orders');

//   return (
//     <Formik
//       initialValues={{ returns: [] as ReturnItemType[] }}
//       onSubmit={(values) => {
//         console.log("Submitted:", values);
//       }}
//     >
//       {({ values, setFieldValue }) => {
//         const handleAddItems = (items: ReturnItemType[]) => {
//           const current = values.returns;
//           const newItems = items.filter(
//             (item) =>
//               !current.find(
//                 (i) =>
//                   i.productId === item.productId &&
//                   i.color === item.color &&
//                   i.size === item.size
//               )
//           );
//           setSelectedProductId(newItems);
//           // setFieldValue("returns", [...current, ...newItems]);
//         };

//         // Group returns by productId
//         const groupedReturns: Record<string, ReturnItemType[]> = {};
//         values.returns.forEach((item) => {
//           if (!groupedReturns[item.productId]) {
//             groupedReturns[item.productId] = [];
//           }
//           groupedReturns[item.productId].push(item);
//         });
//         console.log("values:", values);
//         console.log("selectedProductId:", selectedProductId);

//         return (
//           <Form>
//             {orders.map((order) => (
//               <div key={order.product_id} className="mb-6">
//                 {/* Show product */}
//                 <ReturnProductList orders={[order]} onSelect={handleAddItems} />

//                 {/* Show return table below this product if it has returns */}
//                 {selectedProductId &&
//                   selectedProductId[0]?.productId === order.product_id && (
//                     <div className="mt-3">
//                       <ReturnActionTable
//                         values={{
//                           returns: groupedReturns[order.product_id],
//                         }}
//                         selectedProductId={selectedProductId}
//                         setFieldValue={setFieldValue}
//                       />
//                     </div>
//                   )}
//               </div>
//             ))}
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// };

// export default ReturnActionForm;