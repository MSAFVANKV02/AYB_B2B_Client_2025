import PagesLayout, { PagesLayoutContent } from "@/layouts/Pages_Layout";
import { Form, Formik, useFormikContext } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCallback, useEffect, useRef, useState } from "react";
import LLPForm from "./Registartion_Forms/LLP_Form";
import PvtLtdForm from "./Registartion_Forms/Pvt_Ltd_Form";
import SoleProprietorshipForm from "./Registartion_Forms/Sole_Proprietorship_Form";
import PartnershipForm from "./Registartion_Forms/Partnerships_Form";

import { makeToast, makeToastError } from "@/utils/toaster";

import { Input } from "@/components/ui/input";
import AyButton from "@/components/myUi/AyButton";
import GoogleMap from "@/components/google/GoogleMap";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getValidationSchema } from "./Store_Validation_Schema";
import {
  bankDetailsFields,
  initialValues,
  registrationTypes,
  userDetailsFields,
} from "./store_input_filds";

import { useContextPage } from "@/providers/context/context";
import { FormField } from "@/components/myUi/FormField";
import { IRegistrationTypes, StoreTypes } from "@/types/storeTypes";
import { Create_Store_Api } from "@/services/user_side_api/store/route";
import MyBackBtn from "@/components/myUi/myBackBtn";
import useNavigateClicks from "@/hooks/useClicks";

export default function StoreCreationPage() {
  const { handleClick } = useNavigateClicks();
  // const dispatch = useAppDispatch();
  const topRef = useRef<HTMLDivElement | null>(null); 

  const [selectedRegistration, setSelectedRegistration] =
    useState<IRegistrationTypes>("Sole Proprietorship");

  const [googleAddress, setGoogleAddress] = useState<string>("");
  // const location = useLocation();

  const { setIsOpenModal } = useContextPage();

  const handleSetGoogleLocation = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);

  // field inputs =================================================
  const inputFields: {
    id: keyof StoreTypes;
    label: string;
    fileType: string;
  }[] = [
    { id: "name", label: "Store Name", fileType: "text" },
    // Add conditionally visible fields:
    ...(selectedRegistration === "LLP"
      ? ([{ id: "llpNumber", label: "LLP Number", fileType: "text" }] as const)
      : []),
    ...(selectedRegistration === "PVT LTD"
      ? ([{ id: "cinNumber", label: "CIN Number", fileType: "text" }] as const)
      : []),
    { id: "gstNumber", label: "GST Number", fileType: "text" },
    { id: "Address", label: "Store Address", fileType: "text" },
    {
      id: "storeCapacity",
      label: "Store Capacity in Cubic",
      fileType: "number",
    },
    { id: "state", label: "State", fileType: "text" },
    { id: "country", label: "Country", fileType: "text" },
    { id: "pinCode", label: "PinCode", fileType: "text" },
  ];

  const renderForms = useCallback(
    (values: StoreTypes, setFieldValue: any) => {
      switch (selectedRegistration) {
        case "Sole Proprietorship":
          return (
            <SoleProprietorshipForm
              values={values}
              setFieldValue={setFieldValue}
            />
          );
        case "Partnerships":
          return (
            <PartnershipForm values={values} setFieldValue={setFieldValue} />
          );
        case "LLP":
          return <LLPForm values={values} setFieldValue={setFieldValue} />;
        case "PVT LTD":
          return <PvtLtdForm values={values} setFieldValue={setFieldValue} />;
        default:
          return (
            <SoleProprietorshipForm
              values={values}
              setFieldValue={setFieldValue}
            />
          );
      }
    },
    [selectedRegistration]
  );

  // const getErrors = (error:any) => {
  //   console.log(error);

  // }
  const FormValuesHandler = () => {
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
      const storedRegNum = localStorage.getItem("store_reg_num");
      if (storedRegNum) {
        setFieldValue("phoneNumber", storedRegNum);
      }
    }, [setFieldValue]);

    return null; // This component doesn't render anything
  };

  return (
    <PagesLayout
      className="h-screen overflow-y-auto"
      style={{
        backgroundImage: `url('/auth/store3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: "0 auto",
        flexWrap: "wrap",
        // filter: "blur(8px)",
      }}
    >
      <div className="" ref={topRef}/>
    
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(selectedRegistration)}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);

          const formData = new FormData();

          // const role = "store";

          // Safely append all fields to FormData
          formData.append("name", values.name || "");
          // formData.append("role", role || "");

          formData.append("registrationType", values.registrationType || "");
          formData.append("gstNumber", values.gstNumber || "");
          formData.append("Address", values.Address || "");
          formData.append(
            "storeCapacity",
            values.storeCapacity?.toString() || ""
          );
          formData.append("state", values.state || "");
          formData.append("country", values.country || "");
          formData.append("pinCode", values.pinCode || "");

          // Append Google Location if available
          // Append Google Location if available
          // Append Google Location if available
          if (
            values.googleLocation?.latitude &&
            values.googleLocation?.longitude
          ) {
            formData.append(
              "googleLocation[latitude]",
              values.googleLocation.latitude.toString()
            );
            formData.append(
              "googleLocation[longitude]",
              values.googleLocation.longitude.toString()
            );
          }

          // if (values.googleLocation?.latitude && values.googleLocation?.longitude) {
          //   formData.append(
          //     "googleLocation",
          //     JSON.stringify(values.googleLocation)
          //   );
          // }

          // Append manager and user details
          formData.append("manager", values.manager || "");
          formData.append("emailId", values.emailId || "");
          formData.append("phoneNumber", values.phoneNumber || "");
          formData.append("userName", values.userName || "");
          formData.append("password", values.password || "");
          formData.append(
            "inHouseProduct",
            values.inHouseProduct ? "true" : "false"
          );

          // Append bank details
          Object.entries(values.bankDetails).forEach(([key, value]) => {
            formData.append(`bankDetails[${key}]`, value || "");
          });

          // Append file fields
          const fileFields: (keyof StoreTypes)[] = [
            "aadhaarCard",
            "panCard",
            "localBodyLicense",
            "roomRentAgreement",
            "gstCertificate",
            "partnershipAgreement",
            "companyPanCard",
            "companyIncorporationCertificate",
          ];

          fileFields.forEach((field) => {
            if (values[field as keyof StoreTypes]) {
              formData.append(
                field,
                values[field as keyof StoreTypes] as string
              );
            }
          });

          // Append registration-specific fields
          if (values.llpNumber) {
            formData.append("llpNumber", values.llpNumber);
          }
          if (values.cinNumber) {
            formData.append("cinNumber", values.cinNumber);
          }

          try {
            const response = await Create_Store_Api(formData);
            console.log(response);

            if (response.status === 201) {
              localStorage.removeItem("store_reg_num");
              makeToast("Store created successfully!");
              resetForm();
            }
          } catch (error: any) {
            console.error(error);
            if (error.response?.data) {
              makeToastError(error.response.data.message);
            }
          } finally {
            window.location.reload();
            // dispatch(fetchSellerOrStoreDetails("store"));
          }
        }}
      >
        {({ values, setFieldValue, resetForm, isSubmitting }) => (
          <Form>
            <FormValuesHandler />

            {/* ======================== */}
            <PagesLayoutContent className="space-y-5  pb-5 max-w-screen-md mx-auto md:p-5 p-2 md:border shadow-2xl md:my-14 mt-16">
              {/* store creation type ======== */}
              {/* store registration type */}

              <MyBackBtn 
              tooltipTitle="Store"
              clickEvent={()=>{
                handleClick("/become/store/register")
              }}
      />
              <div className="flex justify-between items-center lg:flex-row flex-col">
                <Label
                  htmlFor="registrationType"
                  className="text-sm text-textGray"
                >
                  Registration Types
                </Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedRegistration(value as IRegistrationTypes);
                    setFieldValue("registrationType", value);
                    // console.log(value);
                  }}
                  value={values.registrationType}
                  name="registrationType"
                >
                  <SelectTrigger className="lg:w-3/4">
                    <SelectValue placeholder="Select Registration Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {registrationTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        disabled={values.registrationType === type.value}
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ===========  mapping of main details ======== */}
              {inputFields.map((field) => (
                <FormField
                  key={field.id}
                  id={field.id}
                  name={field.id}
                  title={field.label}
                  classnamewrapper=""
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  type={field.fileType}
                  value={`${values[field.id]}` || ""}
                  fieldAs={Input}
                />
              ))}

              {/* 8. Google Location */}
              <div className="flex gap-3 items-center justify-between">
                <Label>
                  <Icon icon="openmoji:location-indicator-red" fontSize={25} />
                </Label>
                <div className="lg:w-3/4 space-x-3">
                  <AyButton
                    title="Set google location"
                    iconSize={23}
                    onClick={() => {
                      handleSetGoogleLocation();
                    }}
                    icon="fluent:my-location-16-regular"
                    sx={{
                      width: "fit-content",
                      px: "15px",
                      bgcolor: "#F8E5FF",
                      border: "1px solid #C9C9C9",
                      borderRadius: "10px",
                      color: "black",
                      cursor: "pointer",
                      "&:hover": {
                        bg: "blue.600",
                      },
                    }}
                  />
                  {/* {values.googleLocation} */}
                  {values.googleLocation && values.googleLocation.longitude ? (
                    <span className="text-xs">
                      {`Lat: ${values.googleLocation.latitude}, Lng: ${values.googleLocation.longitude}`}
                    </span>
                  ) : (
                    <span className="text-xs">No location set</span>
                  )}
                </div>
              </div>
              <GoogleMap
                setGoogleAddress={setGoogleAddress}
                googleAddress={googleAddress}
                setFieldValue={setFieldValue}
              />
              {/* Upload documents ========= */}
              <div className="">
                <span className="text-sm font-bold">Upload Documents :</span>
              </div>
              {renderForms(values, setFieldValue)}

              {/* User & Store Manager Details =================== */}
              <div className="">
                <span className="text-sm font-bold">User Details :</span>
              </div>
              <div className="grid md:grid-cols-3 gap-2 w-full">
                {userDetailsFields.slice(0, 3).map((field) => (
                  <FormField
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    type={field.fileType || "text"}
                    classnamewrapper="w-full lg:w-full"
                    placeholder={field.placeholder}
                    value={`${values[field.name]}` || ""}
                    fieldAs={Input}
                  />
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-2 w-full">
                {userDetailsFields.slice(3).map((field) => (
                  <FormField
                    key={field.id}
                    id={field.id}
                    name={field.name}
                    type={field.fileType || "text"}
                    classnamewrapper="w-full lg:w-full"
                    placeholder={field.placeholder}
                    value={`${values[field.name]}` || ""}
                    fieldAs={Input}
                  />
                ))}
              </div>

              {/* Bank Details starts here
               -----------------------------*/}
              <div>
                <div className="">
                  <span className="text-sm font-bold">Bank Details :</span>
                </div>
                <div className="grid md:grid-cols-1 gap-2 w-full">
                  {bankDetailsFields.map((field) => (
                    <FormField
                      key={field.id}
                      title={`${field.name}`}
                      id={`bankDetails.${field.id}`}
                      name={`bankDetails.${field.name}`}
                      type={field.fileType || "text"}
                      classnamewrapper=""
                      placeholder={field.placeholder}
                      value={values.bankDetails[field.name] || ""}
                      fieldAs={Input}
                    />
                  ))}
                </div>
              </div>
              {/* <FormField
                id="bankDetails.upiId"
                name="bankDetails.upiId"
                classnamewrapper=""
                title="UPI ID"
                placeholder="Enter UPI ID"
                value={values.bankDetails.upiId || ""}
                fieldAs={Input}
              /> */}
              {/* Submit Buttons */}
              <div className="flex justify-end space-x-2">
                <AyButton
                  title="Cancel"
                  variant="cancel"
                  sx={{
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    resetForm();
                    topRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
                <AyButton
                  title={`${isSubmitting ? "Loading..." : "Save"}`}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  type="submit"
                  sx={{
                    borderRadius: "8px",
                  }}
                />
              </div>
            </PagesLayoutContent>
          </Form>
        )}
      </Formik>
    </PagesLayout>
  );
}
