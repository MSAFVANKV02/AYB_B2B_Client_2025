import React from "react";
import { Field, FieldArray } from "formik";
import { IFlatOrderItem } from "@/types/orderTypes";
import Modal from "@/components/global/modal";
import AyButton from "@/components/myUi/AyButton";
import { Textarea } from "@/components/ui/textarea";
import { ReturnItemType } from "./return-action-form";
import DragAndDropFilesWidget from "@/components/global/drag-drop-files";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  orders?: IFlatOrderItem[];
  rows: { item: ReturnItemType; globalIndex: number }[];
  values?: { returns: ReturnItemType[] };
  setFieldValue: any;
  selectedProduct?: ReturnItemType[];
  setSelectedValues?: (items: ReturnItemType[]) => void;
}

const ReturnActionTable: React.FC<Props> = ({ setFieldValue, rows }) => {
  // useEffect(() => {
  //   const validReturns = values.returns.filter((item) => item.returnQty > 0);
  //   setSelectedValues(validReturns);
  // }, []);

  return (
    <FieldArray name="returns">
      {() => (
        <table className="text-xs table-fixed w-full rounded-lg overflow-x-auto">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2 font-semibold ">Name</th>
              <th className="px-4 py-2 font-semibold border-b ">Color</th>
              <th className="px-4 py-2 font-semibold border-b ">Size</th>
              <th className="px-4 py-2 font-semibold border-b ">Qty Ordered</th>
              <th className="px-4 py-2 font-semibold border-b hidden lg:table-cell  ">
                Qty to Return
              </th>
              <th className="px-4 py-2 font-semibold border-b hidden lg:table-cell ">
                Reason
              </th>
              <th className="px-4 py-2 font-semibold border-b hidden lg:table-cell ">
                Upload File
              </th>
              <th className="px-4 py-2 font-semibold border-b  lg:hidden table-cell ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {values.returns.map((item, index) => ( */}
            {rows.map(({ item, globalIndex }) => (
              <tr
                key={globalIndex}
                className="border-b-2 border-b-gray-50 hover:bg-gray-50 text-center"
              >
                <td className="px-4 py-2 truncate " title={item.productName}>
                  {item.productName}
                </td>
                <td className="px-4 py-2">{item.color}</td>
                <td className="px-4 py-2">{item.size}</td>
                <td className="px-4 py-2">{item.orderedQty}</td>
                <td className="px-4 py-2 hidden lg:table-cell">
                  <Field
                    name={`returns[${globalIndex}].returnQty`}
                    type="number"
                    min={0}
                    max={item.orderedQty}
                    onChange={(e: any) => {
                      const value = parseInt(e.target.value || "0");
                      const safeValue =
                        value < 0
                          ? 0
                          : value > item.orderedQty
                            ? item.orderedQty
                            : value;

                      setFieldValue(
                        `returns[${globalIndex}].returnQty`,
                        safeValue
                      );
                    }}
                    className="border rounded px-2 py-1 w-16"
                  />
                </td>
                <td className="px-4 py-2 hidden lg:table-cell">
                  <ReasonBox item={item} index={globalIndex} />
                </td>
                <td className="px-4 py-2 hidden lg:table-cell">
                  <FileUploadBox
                    setFieldValue={setFieldValue}
                    values={item}
                    index={globalIndex}
                  />
                </td>
                <td className="px-4 py-2  lg:hidden table-cell">
                  <ResponsiveActionBox
                    setFieldValue={setFieldValue}
                    values={item}
                    index={globalIndex}
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

const ResponsiveActionBox = ({
  index,
  values,
  setFieldValue,
}: {
  index: number;
  values: ReturnItemType;
  setFieldValue: (field: string, value: any) => void;
}) => {
  return (
    <Modal
      title="Upload"
      classnameTitle="text-center"
      description=""
      classname="sm:min-w-[600px]   "
      footer={
        <div className="flex flex-col p-0 text-end  ">
          <span className="text-[10px]">Files are auto save</span>
          <span className="text-[10px] lowercase ">
            Close Modal once you done
          </span>
        </div>
      }
      trigger={
        <AyButton
          type="button"
          sx={{
            width: "fit-content",
            bgcolor: "#DBEAFE",
            color: "black",
            fontSize: 11,
            "&:hover": {
              bgcolor: "#d8e7fb",
            },
          }}
          className="gap-2 "
        >
          Return
        </AyButton>
      }
    >
      <div className="">
        <DragAndDropFilesWidget
          index={index}
          addFileTypes={{
            "application/pdf": [".pdf"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
            "video/mp4": [".mp4"],
          }}
          //  setFieldValue={(field, value) =>
          //   setFieldValue(`returns[${index}].file`, value)
          // }
          fileUploadLimit={3}
          values={values}
          setFieldValue={setFieldValue}
          files={values.file ?? []}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label className="text-xs">Give A Reason</Label>
          <Field
            name={`returns[${index}].reason`}
            placeholder="Reason"
            as={Textarea}
            className="border text-xs rounded px-2 py-1 min-h-[60px] max-h-[60px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-xs">Return Qty</Label>
          <Field
            name={`returns[${index}].returnQty`}
            type="number"
            min={0}
            max={values.orderedQty}
            onChange={(e: any) => {
              const value = parseInt(e.target.value || "0");
              const safeValue =
                value < 0
                  ? 0
                  : value > values.orderedQty
                    ? values.orderedQty
                    : value;

              setFieldValue(`returns[${index}].returnQty`, safeValue);
            }}
            as={Input}
            className="border rounded px-2 py-1 w-full  "
          />
        </div>
      </div>
    </Modal>
  );
};

const ReasonBox = ({ index }: { index: number; item?: ReturnItemType }) => {
  return (
    <Modal
      title=""
      description="Explain the issue or add any comments for the admin"
      footer={
        <div className="flex flex-col p-0 text-end  ">
          <span className="text-[10px]">Files are auto save</span>
          <span className="text-[10px] lowercase ">
            Close Modal once you done
          </span>
        </div>
      }
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
        placeholder="Reason"
        as={Textarea}
        className="border text-xs rounded px-2 py-1 min-h-[300px] max-h-[400px]"
      />
    </Modal>
  );
};

const FileUploadBox = ({
  index,
  values,
  setFieldValue,
}: {
  index: number;
  values: ReturnItemType;
  setFieldValue: (field: string, value: any) => void;
}) => {
  return (
    <Modal
      title="Upload"
      classnameTitle="text-center"
      description=""
      footer={
        <div className="flex flex-col p-0 text-end  ">
          <span className="text-[10px]">Files are auto save</span>
          <span className="text-[10px] lowercase ">
            Close Modal once you done
          </span>
        </div>
      }
      classname="sm:min-w-[600px]   flex flex-col justify-normal sm:rounded-sm"
      trigger={
        <AyButton
          type="button"
          sx={{
            width: "fit-content",
            bgcolor: "#DBEAFE",
            color: "black",
            fontSize: 11,
            "&:hover": {
              bgcolor: "#d8e7fb",
            },
          }}
          className="gap-2 "
        >
          Upload File
        </AyButton>
      }
    >
      <div className="">
        <DragAndDropFilesWidget
          index={index}
          addFileTypes={{
            "application/pdf": [".pdf"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
            "video/mp4": [".mp4"],
          }}
          //  setFieldValue={(field, value) =>
          //   setFieldValue(`returns[${index}].file`, value)
          // }
          fileUploadLimit={3}
          values={values}
          setFieldValue={setFieldValue}
          files={values.file ?? []}
        />
      </div>
    </Modal>
  );
};
