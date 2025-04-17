import React from "react";
import clsx from "clsx"; // optional: for cleaner class management
import { IUserProps } from "@/types/userTypes";

interface Props {
  user: IUserProps | null;
}

const UserStatusBadges: React.FC<Props> = ({ user }) => {
  const renderBooleanBadge = (label: string, value: boolean) => {
    let colorClass = "";

    switch (value) {
      case true:
        colorClass = "bg-green-100 text-green-700 border-green-300";
        break;
      case false:
        colorClass = "bg-red-100 text-red-700 border-red-300";
        break;
      default:
        colorClass = "bg-gray-100 text-gray-700 border-gray-300";
    }

    return (
      <span
        key={label}
        className={clsx(
          "px-3 py-1 rounded-full text-xs font-medium border",
          colorClass
        )}
      >
        {label}: {value ? "Yes" : "No"}
      </span>
    );
  };

  if (!user) return;

  return (
    <div className="flex flex-wrap gap-2">
      {renderBooleanBadge("Verified", user.isVerified)}
      {renderBooleanBadge("Deleted", user.isDeleted)}
      {renderBooleanBadge("Registered", user.isRegistered)}
      {renderBooleanBadge("Blocked", user.isBlocked)}
      {renderBooleanBadge("Policy Verified", user.policyVerified)}
      {renderBooleanBadge("KYC Submitted", user.kycsubmitted)}
      {renderBooleanBadge("KYC Approved", user.kycApproved)}
      {renderBooleanBadge("WhatsApp Approved", user.isWhatsappApproved)}
    </div>
  );
};

export default UserStatusBadges;
