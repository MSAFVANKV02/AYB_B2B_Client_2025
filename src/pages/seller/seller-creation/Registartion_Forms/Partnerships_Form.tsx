
import FileInputAdvanced from "@/components/myUi/FileInput_Advanced";
import { StoreTypes } from "@/types/storeTypes";
import { useState } from "react";

type FileInputFields = {
  localBodyLicense: File | string;
  // roomRentAgreement: File | string;
  gstCertificate: File | string;
  partnershipAgreement: File | string;
  companyPanCard: File | string;
};

type Props = {
  values: StoreTypes;
  setFieldValue: (field: string, value: any) => void;
};

export default function PartnershipForm({ values, setFieldValue }: Props) {
  const [fileNames, setFileNames] = useState<
    Record<keyof FileInputFields, string | null>
  >({
    localBodyLicense: null,
    // roomRentAgreement: null,
    gstCertificate: null,
    partnershipAgreement: null,
    companyPanCard: null,
  });
  const fileFields: {
    id: keyof FileInputFields;
    label: string;
    fileType: string;
  }[] = [
    {
      id: "partnershipAgreement",
      fileType: "file",
      label: "Partnership Agreement",
    },
    { id: "companyPanCard", fileType: "file", label: "Company PAN Card" },
   
    { id: "gstCertificate", fileType: "file", label: "GST Certificate" },
    // { id: "roomRentAgreement", fileType: "file", label: "Room Rent Agreement" },
    { id: "localBodyLicense", fileType: "file", label: "Local Body License" },
  ];
  // console.log(values.aadhaarCard?.name ?? "");

  return (
    <div>
      {fileFields.map((field) => (
        <div
          key={field.id}
          className="flex items-center justify-between lg:flex-row flex-col mb-4"
        >
          <FileInputAdvanced
            title={field.label}
            value={values[field.id]}
            accept=".pdf"
            id={field.id}
            selectedData={fileNames[field.id] || "Choose File"}
            name={field.id}
            type={field.fileType}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setFileNames((prev) => ({
                  ...prev,
                  [field.id]: file.name,
                }));
                setFieldValue(field.id, file);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
