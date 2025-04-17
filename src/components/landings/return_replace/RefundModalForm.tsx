import AyButton from "@/components/myUi/AyButton";
import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the shape of the form data
interface FormData {
  shippingPartnerName: string;
  lrNo: string;
  lrPhoto: File | null;
  returnBillPdf: File | null;
  date: string;
}

const RefundModalForm: React.FC = () => {
  // Initialize form data with the correct types
  const [formData, setFormData] = useState<FormData>({
    shippingPartnerName: "",
    lrNo: "",
    lrPhoto: null,
    returnBillPdf: null,
    date: "",
  });

  // Handle text field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ): void => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevState) => ({
      ...prevState,
      [field]: file,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData); // Process the form data (e.g., send to API)
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Shipping Partner Name */}
        <div className="flex items-center">
          <label className="text-black w-1/3 text-sm">
            Shipping Partner Name
          </label>
          <input
            type="text"
            name="shippingPartnerName"
            value={formData.shippingPartnerName}
            onChange={handleChange}
            placeholder="Name"
            className="w-full bg-gray-100 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* LR Number */}
        <div className="flex items-center">
          <label className="text-black w-1/3 text-sm">LR No.</label>
          <input
            type="text"
            name="lrNo"
            value={formData.lrNo}
            onChange={handleChange}
            placeholder="Number"
            className="w-full bg-gray-100 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* LR Photo */}
        <div className="flex items-center">
          <label className="text-black w-1/3 text-sm">LR Photo</label>
          <div className="flex items-center gap-2 w-full">
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "lrPhoto")}
              className="hidden"
              id="lrPhoto"
              accept="image/*"
            />
            <label
              htmlFor="lrPhoto"
              className=" w-full  bg-gray-100 overflow-hidden py-3 rounded-xl text-sm cursor-pointer"
            >
              <span className="bg-black px-4 py-3 text-white"> Browse</span>
            </label>
            {formData.lrPhoto && (
              <span className="text-gray-500 text-sm">
                {formData.lrPhoto.name}
              </span>
            )}
          </div>
        </div>

        {/* Return Bill PDF */}
        <div className="flex items-center">
          <label className="text-black w-1/3 text-sm">Return bill pdf</label>
          <div className="flex items-center gap-2 w-full">
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "returnBillPdf")}
              className="hidden"
              accept=".pdf"
              id="returnBillPdf"
            />
            <label
              htmlFor="returnBillPdf"
              className=" w-full  bg-gray-100 overflow-hidden py-3 rounded-xl text-sm cursor-pointer"
            >
              <span className="bg-black px-4 py-3 text-white"> Browse</span>
            </label>
            {formData.returnBillPdf && (
              <span className="text-gray-500 text-sm">
                {formData.returnBillPdf.name}
              </span>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center">
          <label className="text-black w-1/3 text-sm">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-gray-100 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <AyButton title="Save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default RefundModalForm;
