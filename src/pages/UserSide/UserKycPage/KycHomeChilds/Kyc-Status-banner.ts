
import { MouseEventHandler } from "react";

// Define the type for KYC statuses
export type KycStatus =
  | "pending"
  | "approved"
  | "viewed"
  | "rejected"
  | "unknown";

// Define the structure of the content returned by the function
export interface KycStatusContent {
  title: string;
  titleColorOne: string;
  titleColorTwo: string;
  description: string;
  bgColor: string;
  btnColor: string;
  kycFeedback?: string;
  subHeading?: string;
  sideImg: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

// Create the reusable function
export const getKycStatusContent = (
  status: KycStatus,
  // userKycDetails: IKycProps,
  defaultClickHandler?: MouseEventHandler<HTMLButtonElement>
): KycStatusContent => {
  switch (status) {
    case "pending":
      return {
        title: "YOUR KYC IS-UNDER REVIEW  ",
        // titleColorOne: "#FF9500",
        titleColorOne: "black",

        titleColorTwo: "#5F08B1",
        description:
          "We are currently reviewing your submitted documents. This process may take up to [expected time, e.g., 24-48 hours].",
        // bgColor: "#FFF3E0",
        bgColor: "#F7F7F7",
        btnColor: "#FF9500",
        onClick: defaultClickHandler,
        kycFeedback:"For any queries, please contact [support email or hotline].",
        subHeading: "Thank you for your patience.",
        sideImg:"/kycPage/kycReview_01.svg"

      };
    case "approved":
      return {
        title: "YOUR KYC-IS APPROVED",
        titleColorOne: "#008000",
        titleColorTwo: "#006400",
        description:
          "Congratulations! Your KYC has been approved. You can now access all features.",
        subHeading: "Thank you for your patience.",
        bgColor: "#E8F5E9",
        btnColor: "#008000",
        onClick: defaultClickHandler,
        sideImg:"/kycPage/kycReview_01.svg"

      };
    case "rejected":
      return {
        title: "YOUR KYC-IS REJECTED",
        titleColorOne: "#FF0000",
        titleColorTwo: "#B71C1C",
        description:
          "Unfortunately, your KYC has been rejected. Please check the reasons and re-upload the required documents.",
        subHeading: "Thank you for your patience.",
        bgColor: "#FFEBEE",
        btnColor: "#FF0000",
        onClick: defaultClickHandler,
        sideImg:"/kycPage/kycReview_02.svg"

      };
    case "viewed":
      return {
        title: "YOUR KYC-HAS BEEN VIEWED",
        titleColorOne: "#1E88E5",
        titleColorTwo: "#1565C0",
        description:
          "We have viewed your documents and will get back to you shortly. Thank you for your patience.",
        subHeading: "Thank you for your patience.",
        bgColor: "#E3F2FD",
        btnColor: "#1E88E5",
        onClick: defaultClickHandler,
        sideImg:"/kycPage/kycReview_01.svg"

      };
    default:
      return {
        title: "COMPLETE YOUR KYC DETAILS",
        titleColorOne: "#757575",
        titleColorTwo: "#424242",
        description:
          "We are currently unable to determine your KYC status. Please contact support.",
        bgColor: "#F5F5F5",
        btnColor: "#757575",
        onClick: defaultClickHandler,
        sideImg:"/kycPage/kycReview_01.svg"

      };
  }
};
