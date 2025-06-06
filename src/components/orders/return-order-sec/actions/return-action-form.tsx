import React, { useState } from "react";
import { Formik, Form } from "formik";
import { IFlatOrderItem } from "@/types/orderTypes";
import ReturnActionTable from "./return-action-table";
import ReturnProductList from "./return-product-list";
import { Collapse } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import AyButton from "@/components/myUi/AyButton";
import { useModal } from "@/providers/context/modal-context";
import { useMutationData } from "@/hooks/useMutationData";
import { returnOrdersAction } from "@/action/orders/odrerAction";
import Loader from "@/components/global/loader";
import { makeToastError } from "@/utils/toaster";

export type ReturnItemType = {
  productId: string;
  productName: string;
  color: string;
  size: string;
  orderedQty: number;
  returned_quantity: number;
  reason: string;
  file?: File[];
  product_order_id: string;
  store_order_id: string;
};

interface Props {
  orders: IFlatOrderItem[][]; // Grouped orders
}

const ReturnActionForm: React.FC<Props> = ({ orders }) => {
  // const [selectedProductId, setSelectedProductId] = useState<ReturnItemType[]>([]);
  const { dispatchModal } = useModal();
  const queryKey = ["order-details"];

  const { mutate, isPending } = useMutationData(
    ["return-order"],
    (data) => returnOrdersAction(data),
    queryKey
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  // const [selectedValues, setSelectedValues] = useState<ReturnItemType[] | null>(
  //   null
  // );

  const Nots = [
    "If the product is damaged or wrong, please upload clear photos of the issue.",
    "Only return requests with valid reasons will be accepted.",
    "Admin may contact you for clarification before approving the return.",
    "If the reason is invalid or unclear, your return may be rejected.",
    "only the return quantity grater than '0' is taken for return  ",
  ];

  // console.log(selectedValues, "selectedValues");

  return (
    <Formik
      enableReinitialize
      initialValues={{ returns: [] as ReturnItemType[] }}
      // onSubmit={(values) => {
      //   console.log("Submitted:", values);
      //   const pushReturnItems = values.returns.filter(
      //     (item) => item.returned_quantity > 0
      //   );

      //   try {
      //     const formData = new FormData();

      //     if (pushReturnItems.length === 0) return;

      //     // Get store_order_id from any item (assuming all have the same)
      //     const store_order_id = pushReturnItems[0].store_order_id;
      //     formData.append("store_order_id", store_order_id);

      //     const returnedItemsMap: Record<
      //       string,
      //       {
      //         product_order_id: string;
      //         returned_sizes: {
      //           size: string;
      //           returned_quantity: number;
      //           reason: string;
      //         }[];
      //       }
      //     > = {};

      //     // Group returned items by product_order_id
      //     pushReturnItems.forEach((item) => {
      //       const fileKey = `${item.product_order_id}_${item.size}`;
      //       if (item.file && item.file.length > 0) {
      //         item.file.forEach((f) => {
      //           formData.append(fileKey, f);
      //         });
      //       }

      //       if (!returnedItemsMap[item.product_order_id]) {
      //         returnedItemsMap[item.product_order_id] = {
      //           product_order_id: item.product_order_id,
      //           returned_sizes: [],
      //         };
      //       }

      //       returnedItemsMap[item.product_order_id].returned_sizes.push({
      //         size: item.size,
      //         returned_quantity: item.returned_quantity,
      //         reason: item.reason,
      //       });
      //     });

      //     const returned_items = Object.values(returnedItemsMap);

      //     formData.append("returned_items", JSON.stringify(returned_items));

      //     //

      //     // // Manually append each returned item with bracketed keys
      //     // returned_items.forEach((item, i) => {
      //     //   formData.append(
      //     //     `returned_items[${i}][product_order_id]`,
      //     //     item.product_order_id
      //     //   );

      //     //   item.returned_sizes.forEach((sizeItem, j) => {
      //     //     formData.append(
      //     //       `returned_items[${i}][returned_sizes][${j}][size]`,
      //     //       sizeItem.size
      //     //     );
      //     //     formData.append(
      //     //       `returned_items[${i}][returned_sizes][${j}][returned_quantity]`,
      //     //       sizeItem.returned_quantity.toString()
      //     //     );
      //     //     formData.append(
      //     //       `returned_items[${i}][returned_sizes][${j}][reason]`,
      //     //       sizeItem.reason
      //     //     );
      //     //   });
      //     // });

      //     console.log("FormData contents:");
      //     for (const [key, value] of formData.entries()) {
      //       console.log(`${key}:`, value);
      //     }

      //     mutate(formData, {
      //       onSuccess: () => {
      //         dispatchModal({ type: "CLOSE_MODAL" });
      //       },
      //     });
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }}
      onSubmit={(values) => {
        const pushReturnItems = values.returns.filter(
          (item) => item.returned_quantity > 0
        );

        if (pushReturnItems.length === 0) return makeToastError("Please Submit A return Item") ;

        try {
          const formData = new FormData();

          const store_order_id = pushReturnItems[0].store_order_id;
          formData.append("store_order_id", store_order_id);

          const returnedItemsMap: Record<
            string,
            {
              product_order_id: string;
              returned_sizes: {
                size: string;
                returned_quantity: number;
                reason: string;
              }[];
            }
          > = {};

          for (const item of pushReturnItems) {
            const fileKey = `${item.product_order_id}_${item.size}`;

            // Append files
            if (item.file && item.file.length > 0) {
              for (const file of item.file) {
                formData.append(fileKey, file);
              }
            }

            // Group by product_order_id
            if (!returnedItemsMap[item.product_order_id]) {
              returnedItemsMap[item.product_order_id] = {
                product_order_id: item.product_order_id,
                returned_sizes: [],
              };
            }

            returnedItemsMap[item.product_order_id].returned_sizes.push({
              size: item.size,
              returned_quantity: item.returned_quantity,
              reason: item.reason,
            });
          }

          const returned_items = Object.values(returnedItemsMap);

          // Check if returned_items was successfully built
          if (!returned_items || returned_items.length === 0) {
            console.error("No valid return items found.");
            return;
          }

          formData.append("returned_items", JSON.stringify(returned_items));

          // Debug
          console.log("FormData preview:");
          for (const [key, val] of formData.entries()) {
            console.log(key, val);
          }

          mutate(formData, {
            onSuccess: () => {
              dispatchModal({ type: "CLOSE_MODAL" });
            },
          });
        } catch (err) {
          console.error("Submission Error:", err);
        }
      }}
    >
      {({ values, setFieldValue, resetForm }) => {
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

        // const pushReturnItems = values.returns.filter((item) => item.returned_quantity > 0);
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
                    <div className="bg-[#FCFCFCFC] p-4 border rounded-md relative w-full">
                      <ReturnProductList
                        orders={group[0]} // use the first item as display reference
                        onSelect={() => {
                          const allVariations: ReturnItemType[] = group.flatMap(
                            (orderItem) =>
                              orderItem.product.variations.flatMap(
                                (variation) =>
                                  variation.details.map((detail) => ({
                                    store_order_id:
                                      orderItem.store.store_order_id,
                                    productId: orderItem.product._id,
                                    productName: orderItem.product.product_name,
                                    color: variation.colorName,
                                    size: detail.size,
                                    orderedQty: detail.quantity,
                                    returned_quantity: 0,
                                    reason: "",
                                    file: [],
                                    product_order_id:
                                      orderItem.product_order_id, //PRD6DNQGC2ZN39
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
                    {JSON.stringify(orders,null,4)}
                  </pre> */}

                  {/* Show return table below if selected product matches */}
                  <Collapse in={selectedProductId === first.product_id}>
                    <div className="mt-3 overflow-x-auto">
                      <ReturnActionTable
                        // setSelectedValues={setSelectedValues}
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

            <div className="flex lg:flex-row bg-white rounded-lg rounded-br-none overflow-hidden flex-col gap-3 mt-10 sticky bottom-0">
              {/* notes started here ======== */}
              <div className="bg-[#FAFAFA] p-5 rounded-lg  select-none lg:w-[70%] ">
                <ul className="flex flex-col gap-2 px-6">
                  {Nots.map((note, idx) => (
                    <li className="text-sm capitalize list-disc " key={idx}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              {/* submit buttons started here */}
              <div className=" lg:w-[30%] w-full ">
                <div className="flex xl:flex-row flex-col lg:w-full sm:w-[50%] ml-auto gap-3  h-full xl:items-end">
                  <div className="xl:flex-1">
                    <AyButton
                      disabled={isPending}
                      sx={{
                        bgcolor: "#B3B3B3",
                        "&:hover": {
                          bgcolor: "#b9b5b5",
                        },
                      }}
                      type="button"
                      onClick={() => {
                        resetForm();
                        setSelectedProductId("");
                      }}
                    >
                      Cancel
                    </AyButton>
                  </div>
                  <div className="xl:flex-1">
                   
                      <AyButton disabled={isPending}  type="submit">
                      <Loader classNameLoader="w-5 h-5" state={isPending}  >
                        Submit Request
                        </Loader>   
                      </AyButton>
                   
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReturnActionForm;
