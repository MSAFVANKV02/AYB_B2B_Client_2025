import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { IFlatOrderItem } from "@/types/orderTypes";

interface Props {
  orders: IFlatOrderItem[];
}

const ReturnActionTable: React.FC<Props> = ({ orders }) => {
  const initialValues = {
    returns: orders.flatMap((orderItem) =>
      orderItem.product.variations.flatMap((variation) =>
        variation.details.map((detail) => ({
          productId: orderItem.product._id,
          productName: orderItem.product.product_name,
          color: variation.colorName,
          size: detail.size,
          orderedQty: detail.quantity,
          returnQty: 0,
          reason: "",
          returnType: "",
          file: null as File | null,
        }))
      )
    ),
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Submitted Values", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="text-xs ">
              <thead className="bg-gray-100 font-semibold">
                <tr>
                  <th className="px-4 py-2 font-semibold border-b">Name</th>
                  <th className="px-4 py-2 font-semibold border-b">Color</th>
                  <th className="px-4 py-2 font-semibold border-b">Size</th>
                  <th className="px-4 py-2 font-semibold border-b whitespace-nowrap min-w-[120px] ">
                    Qty Ordered
                  </th>
                  <th className="px-4 py-2 font-semibold border-b whitespace-nowrap min-w-[120px]">
                    Qty to Return
                  </th>
                  <th className="px-4 py-2 font-semibold border-b">Reason</th>
                  <th className="px-4 py-2 font-semibold border-b">
                    Return Type
                  </th>
                  <th className="px-4 py-2 font-semibold border-b">
                    Upload File
                  </th>
                </tr>
              </thead>
              <tbody>
                <FieldArray name="returns">
                  {() =>
                    values.returns.map((item, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50 text-center">
                        <td className="px-4 py-2 border-b truncate overflow-hidden">
                          {item.productName}
                        </td>
                        <td className="px-4 py-2 border-b">{item.color}</td>
                        <td className="px-4 py-2 border-b">{item.size}</td>
                        <td className="px-4 py-2 border-b">
                          {item.orderedQty}
                        </td>
                        <td className="px-4 py-2 border-b">
                          <Field
                            name={`returns[${index}].returnQty`}
                            type="number"
                            className="border rounded px-2 py-1 w-16"
                          />
                        </td>
                        <td className="px-4 py-2 border-b">
                          <Field
                            name={`returns[${index}].reason`}
                            placeholder="Reason"
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-2  gap-2">
                          <div className="flex gap-1 items-center ">
                            <label className="mr-2 flex items-center gap-1">
                              <Field
                                type="radio"
                                name={`returns[${index}].returnType`}
                                value="Return"
                                className="appearance-none w-4 h-4 rounded-full bg-[#D9D9D9] border checked:border-2 border-black checked:border-[#D9D9D9] checked:bg-black  transition-all"
                              />
                              Return
                            </label>
                            <label className="flex items-center gap-1">
                              <Field
                                type="radio"
                                name={`returns[${index}].returnType`}
                                value="Replacement"
                                className="appearance-none w-4 h-4 rounded-full bg-[#D9D9D9] border checked:border-2 border-black checked:border-[#D9D9D9] checked:bg-black  transition-all"
                              />
                              Replacement
                            </label>
                          </div>
                        </td>
                        <td className="px-4 py-2 border-b">
                          <input
                            type="file"
                            onChange={(e) => {
                              if (e.currentTarget.files) {
                                setFieldValue(
                                  `returns[${index}].file`,
                                  e.currentTarget.files[0]
                                );
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  }
                </FieldArray>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Return Request
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReturnActionTable;
