// import React from "react";
// import { Formik, Form, Field, FieldArray } from "formik";
// import { IFlatOrderItem } from "@/types/orderTypes";
// import Modal from "@/components/global/modal";
// import AyButton from "@/components/myUi/AyButton";
// import { Textarea } from "@/components/ui/textarea";

// interface Props {
//   orders: IFlatOrderItem[];
// }

// const ReturnActionTable: React.FC<Props> = ({ orders }) => {
//   const initialValues = {
//     returns: orders.flatMap((orderItem) =>
//       orderItem.product.variations.flatMap((variation) =>
//         variation.details.map((detail) => ({
//           productId: orderItem.product._id,
//           productName: orderItem.product.product_name,
//           color: variation.colorName,
//           size: detail.size,
//           orderedQty: detail.quantity,
//           returnQty: 0,
//           reason: "",
//           returnType: "",
//           file: null as File | null,
//         }))
//       )
//     ),
//   };

//   const handleSubmit = (values: typeof initialValues) => {
//     console.log("Submitted Values", values);
//   };

//   return (
//     <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//       {({ values, setFieldValue }) => (
//         <Form>
//           <table className="text-xs table-fixed w-full rounded-lg overflow-x-auto">
//             <thead className="bg-gray-100 font-semibold">
//               <tr>
//                 <th className="px-4 py-2 font-semibold  whitespace-nowrap w-[100px]">
//                   Name
//                 </th>
//                 <th className="px-4 py-2 font-semibold border-b w-[100px]">
//                   Color
//                 </th>
//                 <th className="px-4 py-2 font-semibold border-b w-[100px]">
//                   Size
//                 </th>
//                 <th className="px-4 py-2 font-semibold border-b whitespace-nowrap w-[100px] ">
//                   Qty Ordered
//                 </th>
//                 <th className="px-4 py-2 font-semibold border-b whitespace-nowrap w-[100px]">
//                   Qty to Return
//                 </th>
//                 <th className="px-4 py-2 font-semibold border-b">Reason</th>
//                 {/* <th className="px-4 py-2 font-semibold border-b">
//                   Return Type
//                 </th> */}
//                 <th className="px-4 py-2 font-semibold border-b">
//                   Upload File
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <FieldArray name="returns">
//                 {() =>
//                   values.returns.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="border-b-2 border-b-white hover:bg-gray-50 text-center "
//                     >
//                       <td
//                         className="px-4 py-2  w-[100px] truncate overflow-hidden whitespace-nowrap"
//                         title={item.productName} // optional: shows full name on hover
//                       >
//                         {item.productName}
//                       </td>
//                       <td className="px-4 py-2 ">{item.color}</td>
//                       <td className="px-4 py-2 ">{item.size}</td>
//                       <td className="px-4 py-2 ">{item.orderedQty}</td>
//                       <td className="px-4 py-2 ">
//                         <Field
//                           name={`returns[${index}].returnQty`}
//                           type="number"
//                           className="border rounded px-2 py-1 w-16"
//                         />
//                       </td>
//                       <td className="px-4 py-2 ">
//                         <ReasonBox index={index} />
//                       </td>
//                       {/* <td className="px-4 py-2  gap-2">
//                         <div className="flex gap-1 items-center ">
//                           <label className="mr-2 flex items-center gap-1">
//                             <Field
//                               type="radio"
//                               name={`returns[${index}].returnType`}
//                               value="Return"
//                               className="appearance-none w-4 h-4 rounded-full bg-[#D9D9D9] border checked:border-2 border-black checked:border-[#D9D9D9] checked:bg-black  transition-all"
//                             />
//                             Return
//                           </label>
//                           <label className="flex items-center gap-1">
//                             <Field
//                               type="radio"
//                               name={`returns[${index}].returnType`}
//                               value="Replacement"
//                               className="appearance-none w-4 h-4 rounded-full bg-[#D9D9D9] border checked:border-2 border-black checked:border-[#D9D9D9] checked:bg-black  transition-all"
//                             />
//                             Replacement
//                           </label>
//                         </div>
//                       </td> */}
//                       <td className="px-4 py-2 ">
//                         <input
//                           type="file"
//                           onChange={(e) => {
//                             if (e.currentTarget.files) {
//                               setFieldValue(
//                                 `returns[${index}].file`,
//                                 e.currentTarget.files[0]
//                               );
//                             }
//                           }}
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 }
//               </FieldArray>
//             </tbody>
//           </table>

//           <AyButton
//           type="submit"
//           >
//             Submit
//           </AyButton>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ReturnActionTable;

// // ==============

// const ReasonBox = ({ index }: { index: number }) => {
//   return (
//     <Modal
//       title=""
//       trigger={
//         <AyButton
//           type="button"
//           sx={{
//             width: "fit-content",
//             bgcolor: "#F7F0FF",
//             color: "black",
//             "&:hover": {
//               bgcolor: "#FDF7FF",
//             },
//           }}
//           className="gap-2 "
//         >
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 16 16"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M13.8067 4.69305C13.58 4.91971 13.36 5.13971 13.3533 5.35971C13.3333 5.57305 13.56 5.79305 13.7733 5.99971C14.0933 6.33305 14.4067 6.63305 14.3933 6.95971C14.38 7.28638 14.04 7.62638 13.7 7.95971L10.9467 10.7197L10 9.77305L12.8333 6.94638L12.1933 6.30638L11.2467 7.24638L8.74667 4.74638L11.3067 2.19305C11.5667 1.93305 12 1.93305 12.2467 2.19305L13.8067 3.75305C14.0667 3.99971 14.0667 4.43305 13.8067 4.69305ZM2 11.4997L8.37333 5.11971L10.8733 7.61971L4.5 13.9997H2V11.4997Z"
//               fill="black"
//             />
//           </svg>
//          <p className="text-xs">
//          Note
//          </p>
//         </AyButton>
//       }
//     >
//       <Field
//         name={`returns[${index}].reason`}
//         placeholder="Reason"
//         as={Textarea}
//         className="border text-xs rounded px-2 py-1"
//       />
//     </Modal>
//   );
// };
import React from "react";
import { Field, FieldArray } from "formik";
import { IFlatOrderItem } from "@/types/orderTypes";
import Modal from "@/components/global/modal";
import AyButton from "@/components/myUi/AyButton";
import { Textarea } from "@/components/ui/textarea";
import { ReturnItemType } from "./return-action-form";

interface Props {
  orders?: IFlatOrderItem[];
  values: { returns: ReturnItemType[] };
  setFieldValue: any;
  selectedProduct?: ReturnItemType[];
}

const ReturnActionTable: React.FC<Props> = ({ setFieldValue, values }) => {
  return (
    <FieldArray name="returns">
      {() => (
        <table className="text-xs table-fixed w-full rounded-lg overflow-x-auto">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2 font-semibold w-[100px]">Name</th>
              <th className="px-4 py-2 font-semibold border-b w-[100px]">
                Color
              </th>
              <th className="px-4 py-2 font-semibold border-b w-[100px]">
                Size
              </th>
              <th className="px-4 py-2 font-semibold border-b w-[100px]">
                Qty Ordered
              </th>
              <th className="px-4 py-2 font-semibold border-b w-[100px]">
                Qty to Return
              </th>
              <th className="px-4 py-2 font-semibold border-b">Reason</th>
              <th className="px-4 py-2 font-semibold border-b">Upload File</th>
            </tr>
          </thead>
          <tbody>
            {values.returns.map((item, index) => (
              <tr
                key={index}
                className="border-b-2 border-b-white hover:bg-gray-50 text-center"
              >
                <td
                  className="px-4 py-2 truncate w-[100px]"
                  title={item.productName}
                >
                  {item.productName}
                </td>
                <td className="px-4 py-2">{item.color}</td>
                <td className="px-4 py-2">{item.size}</td>
                <td className="px-4 py-2">{item.orderedQty}</td>
                <td className="px-4 py-2">
                  <Field
                    name={`returns[${index}].returnQty`}
                    type="number"
                    value={item.returnQty}
                    className="border rounded px-2 py-1 w-16"
                  />
                </td>
                <td className="px-4 py-2">
                  <ReasonBox item={item} index={index} />
                </td>
                <td className="px-4 py-2">
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
            ))}
          </tbody>
        </table>
      )}
    </FieldArray>
  );
};

export default ReturnActionTable;

// ==============

const ReasonBox = ({
  index,
  item,
}: {
  index: number;
  item: ReturnItemType;
}) => {
  return (
    <Modal
      title=""
      trigger={
        <AyButton
          type="button"
          sx={{
            width: "fit-content",
            bgcolor: "#F7F0FF",
            color: "black",
            "&:hover": {
              bgcolor: "#FDF7FF",
            },
          }}
          className="gap-2 "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8067 4.69305C13.58 4.91971 13.36 5.13971 13.3533 5.35971C13.3333 5.57305 13.56 5.79305 13.7733 5.99971C14.0933 6.33305 14.4067 6.63305 14.3933 6.95971C14.38 7.28638 14.04 7.62638 13.7 7.95971L10.9467 10.7197L10 9.77305L12.8333 6.94638L12.1933 6.30638L11.2467 7.24638L8.74667 4.74638L11.3067 2.19305C11.5667 1.93305 12 1.93305 12.2467 2.19305L13.8067 3.75305C14.0667 3.99971 14.0667 4.43305 13.8067 4.69305ZM2 11.4997L8.37333 5.11971L10.8733 7.61971L4.5 13.9997H2V11.4997Z"
              fill="black"
            />
          </svg>
          <p className="text-xs">Note</p>
        </AyButton>
      }
    >
      <Field
        name={`returns[${index}].reason`}
        value={item.reason}
        placeholder="Reason"
        as={Textarea}
        className="border text-xs rounded px-2 py-1"
      />
    </Modal>
  );
};
