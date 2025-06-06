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

export type ReturnItemType = {
  productId: string;
  productName: string;
  color: string;
  size: string;
  orderedQty: number;
  returnQty: number;
  reason: string;
  file?: File[];
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
      onSubmit={(values) => {
        console.log("Submitted:", values);
        const pushReturnItems = values.returns.filter(
          (item) => item.returnQty > 0
        );
        try {
          const fromData = new FormData();

          pushReturnItems.forEach((data) => {
            fromData.append("color", data.color);
          });

          mutate(fromData, {
            onSuccess: () => {
              dispatchModal({ type: "CLOSE_MODAL" });
            },
          });
        } catch (error) {
          console.log(error);
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
                    <div className="bg-[#FCFCFCFC] p-4 border rounded-md relative w-full">
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

                      onClick={()=>{
                        resetForm()
                        setSelectedProductId("")
                      }}
                    >
                      Cancel
                    </AyButton>
                  </div>
                  <div className="xl:flex-1">
                    <Loader state={isPending}>
                      <AyButton disabled={isPending} type="submit">
                        Submit Request
                      </AyButton>
                    </Loader>
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
