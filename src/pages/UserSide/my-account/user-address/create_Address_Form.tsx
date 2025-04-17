import { ErrorMessage, Field, Form, Formik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AyButton from "@/components/myUi/AyButton";
import Loader from "@/components/global/loader";
import * as Yup from "yup";
import { makeToast, makeToastError } from "@/utils/toaster";
import {
  create_Address_Api,
  update_Address_Api,
} from "@/services/user_side_api/address/route";
import { dispatch } from "@/redux/hook";
import { setAddressReducers } from "@/redux/userSide/UserAuthSlice";
import { UseContextPage } from "@/providers/context/context";
import { Checkbox } from "@mui/material";
import { Label } from "@/components/ui/label";

export interface AddressForm {
  address: Address;
}

export interface Address {
  name: string;
  mobile: number;
  email: string;
  street: string;
  city: string;
  building: string;
  landmark: string;
  state: string;
  country: string;
  zip: string;
  isDefault: boolean;
}

const validationSchema = Yup.object({
  address: Yup.object({
    name: Yup.string()
      .required("Address Name is required")
      .min(3, "Address Name must be at least 3 characters"),
    // mobile: Yup.number()
    //   .typeError("Mobile Number must be a number")
    //   .required("Mobile Number is required")
    //   .test(
    //     "len",
    //     "Mobile Number must be 10 digits",
    //     (val) => val?.toString().length === 10
    //   ),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    street: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City is required"),
    building: Yup.string(),
    landmark: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    zip: Yup.string()
      .matches(/^\d{6}$/, "Zip Code must be exactly 5 digits")
      .required("Zip Code is required"),
    isDefault: Yup.boolean(),
  }),
});

type Props = {
  addAddress: boolean;
};

function CreateAddressForm({ addAddress }: Props) {
  const { selectedAddress } = UseContextPage();
  const initialValues: AddressForm = {
    address: {
      name: (selectedAddress && selectedAddress.name) || "",
      mobile: (selectedAddress && selectedAddress.mobile) || 0,
      email: (selectedAddress && selectedAddress.email) || "",
      street: (selectedAddress && selectedAddress.street) || "",
      city: (selectedAddress && selectedAddress.city) || "",
      building: (selectedAddress && selectedAddress.building) || "",
      landmark: (selectedAddress && selectedAddress.landmark) || "",
      state: (selectedAddress && selectedAddress.state) || "",
      country: (selectedAddress && selectedAddress.country) || "",
      zip: (selectedAddress && selectedAddress.zip) || "",
      isDefault: (selectedAddress && selectedAddress.isDefault) || false,
    },
  };

  const inputFields: {
    id: number;
    label: string;
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
    min?: number;
    max?: number;
  }[] = [
    {
      id: 1,
      label: "Address Name",
      name: "address.name",
      type: "text",
      placeholder: "Enter your Address Name",
      required: true,
    },
    {
      id: 2,
      label: "Mobile Number",
      name: "address.mobile",
      type: "number",
      placeholder: "Enter your Mobile Number",
      required: true,
      min: 0,
      max: 11,
    },
    {
      id: 3,
      label: "Email",
      name: "address.email",
      type: "email",
      placeholder: "Enter your Email",
      required: true,
    },
    {
      id: 4,
      label: "Street Address",
      name: "address.street",
      type: "text",
      placeholder: "Enter your Street Address",
      required: true,
    },
    {
      id: 5,
      label: "City",
      name: "address.city",
      type: "text",
      placeholder: "Enter your City",
      required: true,
    },
    {
      id: 6,
      label: "Building Name/Number",
      name: "address.building",
      type: "text",
      placeholder: "Enter your Building Name/Number",
      required: false,
    },
    {
      id: 7,
      label: "Landmark",
      name: "address.landmark",
      type: "text",
      placeholder: "Enter your Landmark (optional)",
      required: false,
    },
    {
      id: 8,
      label: "State",
      name: "address.state",
      type: "text",
      placeholder: "Enter your State (optional)",
      required: false,
    },
    {
      id: 9,
      label: "Country",
      name: "address.country",
      type: "text",
      placeholder: "Enter your Country (optional)",
      required: false,
    },
    {
      id: 10,
      label: "Zip Code/Postal Code",
      name: "address.zip",
      type: "text",
      placeholder: "Enter your Zip Code/Postal Code (optional)",
      required: false,
    },
  ];

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { resetForm }) => {
        // console.log(values);
        try {
          const route = selectedAddress
            ? update_Address_Api(values, selectedAddress._id)
            : create_Address_Api(values);
          const response = await route;
          // console.log(response,'response address create');

          if (response.status === 201) {
            makeToast(response.data.message || "success");
            dispatch(setAddressReducers(response.data.user.addresses));
            resetForm();
            // setSelectedAddress(null);
          }
          if (response.status === 200) {
            makeToast(response.data.message || "success");
            // console.log(response.data.data.addresses,'response.data.user.addresses');

            dispatch(setAddressReducers(response.data.user.addresses));
          }
        } catch (error: any) {
          // console.log(error);
          if (error.response) {
            makeToastError(error.response.data.message || "error");
          }
        }
      }}
    >
      {({ values, isSubmitting, resetForm, setFieldValue }) => (
        <Form className="flex flex-col justify-between h-full">
          <div className="sm:space-y-5 space-y-3">
            {addAddress && <span className="text-xl">Add Address</span>}
            <p className="text-gray-500">
              <LockOutlinedIcon
                sx={{
                  fontSize: "1rem",
                }}
                fontSize="small"
              />{" "}
              Your personal information is encrypted and will only be used for
              delivery purposes.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {inputFields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                  </label>
                  <div className="flex flex-col gap-1">
                    <Field
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      // min={field.min}
                      // max={field.max}
                      placeholder={field.placeholder}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-50"
                    />
                    <ErrorMessage
                      name={field.name}
                      component={"span"}
                      className="text-xs text-red-500 capitalize"
                    />
                  </div>
                </div>
              ))}
              <div className="">
                <Label htmlFor="isDefault">Set As Default</Label>
                <Checkbox
                  checked={values.address.isDefault}
                  id="isDefault"
                  onChange={() => {
                    setFieldValue(
                      "address.isDefault",
                      !values.address.isDefault
                    );
                  }}
                  sx={{
                    color: "purple",
                    "&.Mui-checked": { color: "purple" },
                    marginRight: "8px",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <AyButton
              title="Cancel"
              type="button"
              variant="cancel"
              onClick={resetForm}
            />
            <AyButton type="submit">
              <Loader state={isSubmitting}>
                {selectedAddress ? "Update Address" : "Save"}
              </Loader>
            </AyButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateAddressForm;
