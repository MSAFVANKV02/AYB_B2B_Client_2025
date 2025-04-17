import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import MyPdf from "./MyPdf";
import { ErrorMessage } from "formik";

type Props = {
  name: string;
  type: string;
  accept: string;
  selectedData?: any;
  className?: string;
  multiple?: boolean;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  img?: string;
  title?: string;
  value?: File | string | null;
  isPdfShown?: boolean;
};

export default function FileInputAdvanced({
  name,
  type = "file",
  accept,
  selectedData,
  onChange,
  className,
  id,
  multiple,
  img,
  title,
  value,
  isPdfShown = false,
}: Props) {
  const isFile = value instanceof File;
  const isUrl = typeof value === "string" && value.startsWith("http");
  const isPdf =
    (isFile && value.type === "application/pdf") || // File is a PDF
    (isUrl && value.endsWith(".pdf"));
  return (
    <div className={cn(`flex lg:flex-row flex-col lg:items-center gap-1 justify-between w-full`, className)}>
      {title && (
        <Label htmlFor={name} className="text-sm  text-textGray">
          {title}
        </Label>
      )}

      <div className={`flex flex-col gap-2 ${title ? "lg:w-3/4" : "w-full"} `}>
        <Label
          htmlFor={name}
          className={cn(
            `w-full border h-12 rounded-md flex items-center cursor-pointer overflow-hidden w-f`
          )}
        >
          <div className="px-5 border-r h-full text-center flex items-center bg-gray-100">
            {img ? <Icon icon={img} fontSize={25} color="#7A7A7A" /> : "Browse"}
          </div>
          <div className="flex-1 h-full flex items-center text-xs px-3 overflow-hidden">
            {/* Ensure the container has restricted width */}
            <span className="truncate w-full ">
              {selectedData ? selectedData : "Choose File"}
            </span>
          </div>

          <Input
            id={id}
            type={type}
            multiple={multiple}
            name={name}
            className="hidden"
            onChange={onChange}
            accept={accept}
          />
        </Label>

        <div className="flex flex-wrap gap-3">
          {/* Render Image Preview */}
          {isFile && !isPdf && (
            <div className="w-16 h-16 rounded-md shadow-md border overflow-hidden select-none relative">
              <img
                src={URL.createObjectURL(value as File)}
                alt={name}
                className="object-cover h-full w-full"
                draggable={false}
                onLoad={(e) =>
                  URL.revokeObjectURL((e.target as HTMLImageElement).src)
                } // Clean up
              />
              <Icon icon="mdi:delete" fontSize={17} className="absolute top-0" />
            </div>
          )}

          {/* Render PDF Preview */}
          {isPdf &&  (
            <div className={`${isPdfShown ? "w-16 h-16 rounded-md shadow-md border " :""} overflow-hidden select-none`}>
              {isFile ? (
                <MyPdf value={URL.createObjectURL(value as File)} isPdfShown={isPdfShown} selectedData={selectedData} />
              ) : (
                <MyPdf value={value} isPdfShown={isPdfShown} selectedData={selectedData} /> // Pass the URL directly
              )}
            </div>
          )}
        </div>
        <ErrorMessage  name={name} component={'span'} className="text-red-500 text-xs"/>
      </div>
    </div>
  );
}
