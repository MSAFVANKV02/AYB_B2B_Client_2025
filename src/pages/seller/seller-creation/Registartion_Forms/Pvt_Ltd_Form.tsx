
import FileInputAdvanced from "@/components/myUi/FileInput_Advanced";
import { StoreTypes } from "@/types/storeTypes";
import { useState } from "react";

type FileInputFields = {
  aadhaarCard: File | string;
  panCard: File | string;
  localBodyLicense: File | string;
  // roomRentAgreement: File | string;
  gstCertificate: File | string;
  companyIncorporationCertificate: File | string;
};

type Props = {
  values: StoreTypes;
  setFieldValue: (field: string, value: any) => void;
};

export default function PvtLtdForm({ values, setFieldValue }: Props) {
  const [fileNames, setFileNames] = useState<
    Record<keyof FileInputFields, string | null>
  >({
    aadhaarCard: null,
    panCard: null,
    localBodyLicense: null,
    // roomRentAgreement: null,
    gstCertificate: null,
    companyIncorporationCertificate: null,
  });
  const fileFields: {
    id: keyof FileInputFields;
    label: string;
    fileType: string;
  }[] = [
    {
      id: "companyIncorporationCertificate",
      fileType: "file",
      label: "Certificate of Incorporation",
    },
    { id: "panCard", fileType: "file", label: "PAN Card" },
    { id: "gstCertificate", fileType: "file", label: "GST Certificate" },
    { id: "localBodyLicense", fileType: "file", label: "Local Body License" },
    // { id: "roomRentAgreement", fileType: "file", label: "Room Rent Agreement" },
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
