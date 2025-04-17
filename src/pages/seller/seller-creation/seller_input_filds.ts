

import { IRegistrationTypes, StoreTypes } from "@/types/storeTypes";

export  const registrationTypes: { value: IRegistrationTypes; name: string }[] = [
    { value: "Sole Proprietorship", name: "Sole Proprietorship Registration" },
    { value: "Partnerships", name: "Partnerships Firm Registration" },
    {
      value: "LLP",
      name: "Limited Liability Partnership (LLP) Company Registration",
    },
    { value: "PVT LTD", name: "Private Limited Company Registration" },
  ];

  //   ======== initialValues =================================
 
  export const initialValues: StoreTypes = {
    registrationType: "Sole Proprietorship",
    aadhaarCard: null,
    panCard: null,
    localBodyLicense: null,
    roomRentAgreement: null,
    gstCertificate: null,
    partnershipAgreement: null,
    companyPanCard: null,
    companyIncorporationCertificate: null,
    llpNumber: "",
    cinNumber: "",
    name: "",
    gstNumber: "",
    Address: "",
    storeCapacity: null,
    state: "",
    country: "",
    pinCode: "",
    googleLocation: { latitude: null, longitude: null },
    manager: "",
    emailId: "",
    phoneNumber: "",
    userName: "",
    password: "",
    // inHouseProduct: false,
    bankDetails: {
      accountName: "",
      accountNumber: "",
      ifscCode: "",
      shiftCode: "",
      upiId: "",
    },
    capacity: null,
  };


// 1. main details
// ================================================================



// 2. user details =================================================================
// ===============================================================
export   const userDetailsFields: {
    id: keyof StoreTypes;
    name: keyof StoreTypes;
    label?: string;
    fileType?: string;
    placeholder: string;
  }[] = [
    {
      id: "manager",
      name: "manager",
      fileType: "text",
      placeholder: "Enter Seller manager",
    },
    {
      id: "emailId",
      name: "emailId",
      fileType: "email",
      placeholder: "Enter email",
    },
    {
      id: "phoneNumber",
      name: "phoneNumber",
      fileType: "number",
      placeholder: "Enter phone number",
    },
    {
      id: "userName",
      name: "userName",
      placeholder: "Enter user name",
    },
    {
      id: "password",
      name: "password",
      fileType: "password",
      placeholder: "Enter password",
    },
  ];




// 3. bank details =================================================================
// =============================================================
export const bankDetailsFields: {
    id: keyof StoreTypes['bankDetails'];
    name: keyof StoreTypes['bankDetails'];
    placeholder: string;
    fileType?: string;
  }[] = [
    {
      id: "accountName",
      name: "accountName",
      placeholder: "Enter account name",
      fileType: "text",
    },
    {
      id: "accountNumber",
      name: "accountNumber",
      placeholder: "Enter account number",
      fileType: "number",
    },
    {
      id: "ifscCode",
      name: "ifscCode",
      placeholder: "Enter IFSC code",
      fileType: "text",
    },
    {
      id: "shiftCode",
      name: "shiftCode",
      placeholder: "Enter shift code",
      fileType: "text",
    },
    {
      id: "upiId",
      name: "upiId",
      placeholder: "Enter UPI ID",
      fileType: "text",
    },
  ];
  