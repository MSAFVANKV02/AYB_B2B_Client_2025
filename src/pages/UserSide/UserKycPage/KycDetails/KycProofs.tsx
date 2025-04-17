import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setProofType } from "@/redux/userSide/KycSlice";
import KycUpload from "./KycUpload";

interface IProofType {
  id: number;
  proofType:
    | "Udyam Aadhaar"
    | "GST Certificate"
    | "Current Account Cheque"
    | "Shop & Establishment License"
    | "Trade Certificate/License"
    | "Other Shop Documents";
  proofTitle: string;
  proofSubText: string;
}

const proofSubmits: IProofType[] = [
  {
    id: 1,
    proofType: "Udyam Aadhaar",
    proofTitle: "Udyam Aadhaar",
    proofSubText: "KYC in 10 mins.",
  },
  {
    id: 2,
    proofType: "GST Certificate",
    proofTitle: "GST Certificate",
    proofSubText: "KYC in 10 mins.",
  },
  {
    id: 3,
    proofType: "Current Account Cheque",
    proofTitle: "Current Account Cheque",
    proofSubText: "KYC in 48 hours.",
  },
  {
    id: 4,
    proofType: "Shop & Establishment License",
    proofTitle: "Shop & Establishment License",
    proofSubText: "KYC in 48 hours.",
  },
  {
    id: 5,
    proofType: "Trade Certificate/License",
    proofTitle: "Trade Certificate / License",
    proofSubText: "KYC in 48 hours.",
  },
  {
    id: 6,
    proofType: "Other Shop Documents",
    proofTitle: "Other Shop Documents",
    proofSubText: "KYC in 48 hours.",
  },
];

export default function KycProofs() {
  const { proofType } = useAppSelector((state) => state.kyc);
  const {  userKyc } = useAppSelector(state=> state.auth)


  const dispatch = useAppDispatch();

  // Handle proof selection
  const handleProofClick = (proofType: string) => {
    dispatch(setProofType(proofType));
  };
  return (
    <div className="">
      {
        proofType ? (
          <>
          <KycUpload/>
          </>
        ): (
          <>
            <h2 className="text-xl font-semibold mb-4">Upload Any 1 document</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {proofSubmits.map((proof) => (
          <li
            key={proof.id}
            className={`border p-16  ${userKyc?.proofType === proof.proofType ? "bg-gray-200 shadow-lg border-black" :"bg-gray-100"}  cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300`}
            onClick={() => handleProofClick(proof.proofType)}
          >
            <div className="font-semibold  flex items-center justify-center gap-3">
              <p> {proof.proofTitle}</p>
              <p className="text-sm text-textMain">{proof.proofSubText}</p>
            </div>
          </li>
        ))}
      </ul>
          </>
        )
      }
    
    </div>
  );
}
