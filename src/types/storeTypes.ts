export type StoreTypes = {
  registrationType: IRegistrationTypes;
  role?:"Seller"|"Store"
  name?: string | null;
  gstNumber?: string | null;
  Address?: string | null;
  storeCapacity?: number | null;
  state?: string | null;
  country?: string | null;
  pinCode?: string | null;
  googleLocation?: { latitude: number | null; longitude: number | null };
  manager: string | null;
  emailId: string | null;
  phoneNumber: string | null;
  userName: string | null;
  password: string | null;
  inHouseProduct?: boolean;
  bankDetails: {
    accountName: string | null;
    accountNumber: string | null;
    ifscCode: string | null;
    shiftCode: string | null;
    upiId: string | null;
  };
  amount?: number | null;
  capacity: number | null;
  status?: "pending" | "paid";
  created_at?: string | number | Date;
  // =====  Sole Proprietorship Registration  ================
  aadhaarCard?:File | string | null;
  panCard?:File | string | null;
  localBodyLicense?:File | string | null;
  roomRentAgreement?:File | string | null;
  gstCertificate?:File | string | null;
 

  // =====  Partnerships Firm Registration  ================
  partnershipAgreement?:File | string | null;
   companyPanCard?:File | string | null;

  //  pv ltd license================================
  companyIncorporationCertificate?:File | string | null;
  cinNumber?: string | null;

  // ----- llp ltd license================================
  llpNumber?: string | null;


};


export type IRegistrationTypes = "Sole Proprietorship"|"Partnerships"|"LLP"|"PVT LTD"
