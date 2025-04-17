import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the KYC details
interface KycDetails {
  businessName: string;
  emailId: string;
  buildingName: string;
  street: string;
  // post: string;
  pinCode: string;
  state: string;
  country: string;
  proofType?: string; // Optional
  proof?: File | string; // Store only the file metadata
  gstNumber: string; //
}

// Define the initial state of the KYC details with default values
const initialState: KycDetails = {
  businessName: '',
  emailId: '',
  buildingName: '',
  street: '',
  // post: '',
  gstNumber:'',
  pinCode: '',
  state: '',
  country: '',
  proofType: '', 
  proof: undefined,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    // saveKycDetails(_, action: PayloadAction<KycDetails>) {
    //   return action.payload;
    // },
    saveKycDetails(state, action: PayloadAction<KycDetails>) {
      Object.assign(state, action.payload); // Update state with new values
    },
    clearKycDetails() {
      return initialState;
    },
    setProofType(state, action: PayloadAction<string>) {
      state.proofType = action.payload;
    },
    // uploadFile(state, action: PayloadAction<{ name: string; size: number }>) {
    //   state.proof = action.payload; // Save file metadata, not the file itself
    // },
    uploadFile(state, action: PayloadAction<File>) {
      state.proof = action.payload; // Store the entire file object
    },
    restProofType(state) {
      state.proofType = '';
    }
  },
});

// Export the actions
export const { saveKycDetails, clearKycDetails, setProofType, uploadFile, restProofType } = kycSlice.actions;

// Export the reducer
export default kycSlice.reducer;
