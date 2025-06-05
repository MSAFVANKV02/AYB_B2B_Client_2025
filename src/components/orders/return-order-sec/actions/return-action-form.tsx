import React, { useState } from "react";
import { Formik, Form } from "formik";
import { IFlatOrderItem } from "@/types/orderTypes";
import ReturnActionTable from "./return-action-table";
import ReturnProductList from "./return-product-list";
import { Collapse } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

export type ReturnItemType = {
  productId: string;
  productName: string;
  color: string;
  size: string;
  orderedQty: number;
  returnQty: number;
  reason: string;
  file?: File[] ;
};

interface Props {
  orders: IFlatOrderItem[][]; // Grouped orders
}

const ReturnActionForm: React.FC<Props> = ({ orders }) => {
  // const [selectedProductId, setSelectedProductId] = useState<ReturnItemType[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedValues, setSelectedValues] = useState<ReturnItemType[] | null>(
    null
  );

  console.log(selectedValues, "selectedValues");

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
            setSelectedProductId(items[0].productId);
          }

          // You can enable this line if you want to add to Formik immediately
          setFieldValue("returns", [...current, ...newItems]);
        };

        // const pushReturnItems = values.returns.filter((item) => item.returnQty > 0);
        // setSelectedValues(pushReturnItems);

        const groupedReturns: Record<
          string,
          { item: ReturnItemType; globalIndex: number }[]
        > = {};
        values.returns.forEach((item, i) => {
          if (!groupedReturns[item.productId]) {
            groupedReturns[item.productId] = [];
          }
          groupedReturns[item.productId].push({ item, globalIndex: i });
        });

        return (
          <Form className="flex flex-col gap-3">
            {orders.map((group) => {
              console.log("values:", values);
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
                    <div className="bg-[#FCFCFCFC] p-4 border rounded-md relative">
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
                                    file: [],
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

                      <Icon
                        icon="basil:caret-down-outline"
                        fontSize={20}
                        className={`absolute top-1/2 right-4 ${selectedProductId === first.product_id ? "" : "rotate-180"} duration-300 transition-all -translate-y-1/2 `}
                      />
                    </div>
                  </div>

                  {/* <pre className="text-xs">
                    {JSON.stringify(selectedValues,null,4)}
                  </pre> */}

                  {/* Show return table below if selected product matches */}
                  <Collapse in={selectedProductId === first.product_id}>
                    <div className="mt-3">
                      <ReturnActionTable
                        setSelectedValues={setSelectedValues}
                        rows={groupedReturns[first.product_id] || []}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </Collapse>

                  {/* {selectedProductId &&
                    selectedProductId === first.product_id && (
                      <div className="mt-3">
                        <ReturnActionTable
                          setSelectedValues={setSelectedValues}
                          // productId={first.product_id}
                          rows={groupedReturns[first.product_id] || []}
                          // values={{
                          //   returns: groupedReturns[first.product_id] || [],
                          // }}
                          // selectedProductId={selectedProductId}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    )} */}
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
