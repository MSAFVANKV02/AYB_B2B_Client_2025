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
//   const [selectedProduct, setSelectedProduct] = useState<ReturnItemType[]>([]);

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
//           setSelectedProduct(newItems);
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
//         console.log("selectedProduct:", selectedProduct);

//         return (
//           <Form>
//             {orders.map((order) => (
//               <div key={order.product_id} className="mb-6">
//                 {/* Show product */}
//                 <ReturnProductList orders={[order]} onSelect={handleAddItems} />

//                 {/* Show return table below this product if it has returns */}
//                 {selectedProduct &&
//                   selectedProduct[0]?.productId === order.product_id && (
//                     <div className="mt-3">
//                       <ReturnActionTable
//                         values={{
//                           returns: groupedReturns[order.product_id],
//                         }}
//                         selectedProduct={selectedProduct}
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
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { IFlatOrderItem } from "@/types/orderTypes";
import ReturnActionTable from "./return-action-table";
import ReturnProductList from "./return-product-list";

export type ReturnItemType = {
  productId: string;
  productName: string;
  color: string;
  size: string;
  orderedQty: number;
  returnQty: number;
  reason: string;
  file: File | null;
};

interface Props {
  orders: IFlatOrderItem[][]; // Grouped orders
}

const ReturnActionForm: React.FC<Props> = ({ orders }) => {
  // const [selectedProduct, setSelectedProduct] = useState<ReturnItemType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);


  console.log(selectedProduct, "selectedProduct");

  return (
    <Formik
    enableReinitialize
      initialValues={{ returns: [] as ReturnItemType[] }}
      onSubmit={(values) => {
        // console.log("Submitted:", values);
      }}
    >
      {({ values, setFieldValue }) => {
        const handleAddItems = (items: ReturnItemType[]) => {
          const current = values.returns;
          const newItems = items.filter(
            (item) =>
              !current.find(
                (i) =>
                  i.productId === item.productId &&
                  i.color === item.color &&
                  i.size === item.size
              )
          );
          if (items.length > 0) {
            setSelectedProduct(items[0].productId);
          }
          
          // You can enable this line if you want to add to Formik immediately
          setFieldValue("returns", [...current, ...newItems]);
        };

        const groupedReturns: Record<string, ReturnItemType[]> = {};
        values.returns.forEach((item) => {
          if (!groupedReturns[item.productId]) {
            groupedReturns[item.productId] = [];
          }
          groupedReturns[item.productId].push(item);
        });

        return (
          <Form className="flex flex-col gap-3">
            {orders.map((group) => {
              // console.log("Submitted:", values);
              // console.log(group, "group");

              const first = group[0]; // all items in group have the same product_id

              return (
                <div key={first.product_id} className="">
                  {/* Show product list for the group */}
                  <div className="">
                    {/* {group.map((orderPr) => (
                      <ReturnProductList
                        orders={orderPr}
                        onSelect={handleAddItems}
                        totalQty={totalQty}
                      />
                    ))} */}
                    <div className="bg-[#FCFCFCFC] p-4 border rounded-md ">
                      <ReturnProductList
                        orders={group[0]} // use the first item as display reference
                        onSelect={() => {
                          const allVariations: ReturnItemType[] = group.flatMap(
                            (orderItem) =>
                              orderItem.product.variations.flatMap(
                                (variation) =>
                                  variation.details.map((detail) => ({
                                    productId: orderItem.product._id,
                                    productName: orderItem.product.product_name,
                                    color: variation.colorName,
                                    size: detail.size,
                                    orderedQty: detail.quantity,
                                    returnQty: 0,
                                    reason: "",
                                    file: null,
                                  }))
                              )
                          );
                          handleAddItems(allVariations);
                        }}
                        totalQty={group.reduce(
                          (sum, item) =>
                            sum +
                            item.product.variations.reduce(
                              (vSum, v) =>
                                vSum +
                                v.details.reduce(
                                  (dSum, d) => dSum + d.quantity,
                                  0
                                ),
                              0
                            ),
                          0
                        )}
                      />
                    </div>
                  </div>

                  {/* Show return table below if selected product matches */}
                  {selectedProduct &&
                    selectedProduct === first.product_id && (
                      <div className="mt-3">
                        <ReturnActionTable
                          // productId={first.product_id}
                          values={{
                            returns: groupedReturns[first.product_id] || [],
                          }}
                          // selectedProduct={selectedProduct}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    )}
                </div>
              );
            })}
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReturnActionForm;
