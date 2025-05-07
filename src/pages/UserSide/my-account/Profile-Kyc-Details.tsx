import { useAppSelector } from "@/providers/redux/hook";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ProfileKycDetails() {
  const { userKyc, user } = useAppSelector((state) => state.auth);

  // const BD = [
  //   {
  //     businessName: "Haash",
  //     GST_Number: "34534",
  //     Address: {
  //       details: "Malayamma, NIT Campus, +919846012078, support@ayaboo.in",
  //       phone: "+919846012078",
  //     },
  //     pinCode: "24372",
  //     contactNumber: "+919846012078",
  //   },
  // ];

  return (
    <div className="bg-bgHardSoft h-full w-full rounded-lg p-3 space-y-3">
      {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
      <div
        className={`
    flex gap-2 items-center justify-center rounded-lg p-2
    ${
      user?.isDeleted
        ? "bg-red-500"
        : user?.isBlocked
          ? "bg-gray-500"
          : "bg-bgGreen"
    }
  `}
      >
        <Icon icon="si:shield-verified-fill" className="text-white text-lg" />

        <span className="text-white capitalize">
          {user?.isDeleted
            ? "Your account has been deleted"
            : user?.isBlocked
              ? "Your account is temporarily blocked"
              : "Your account is verified"}
        </span>
      </div>

      {/* <UserStatusBadges user={user} /> */}

      {/* Details staring here */}
      <div
        // key={userKyc?.buildingName}
        className="space-y-3 flex flex-col"
      >
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex flex-col">
            <h6 className="text-textGray">Business Name:</h6>
            <p className="text-sm">{userKyc?.businessName}</p>
          </div>

          {/*  */}
          <div className="flex flex-col">
            <h6 className="text-textGray">GST Number:</h6>
            <p className="text-sm">{userKyc?.gstNumber}</p>
          </div>
          {/*  */}

          <div className="flex flex-col">
            <h6 className="text-textGray">Address:</h6>
            <div className="flex gap-1 flex-wrap">
              <p className="text-sm">{userKyc?.street}</p>,
              {/* <p className="text-sm"><b>Phone Number:</b> {user?.mobile}</p> */}
              <p className="text-sm"> {userKyc?.state}</p>,
              <p className="text-sm"> {userKyc?.country}</p>
            </div>
          </div>

          {/*  */}
          <div className="flex flex-col">
            <h6 className="text-textGray">Pin Code:</h6>
            <p className="text-sm">{userKyc?.pinCode}</p>
          </div>

          {/*  */}
          <div className="flex flex-col">
            <h6 className="text-textGray">Contact Number:</h6>
            <p className="text-sm">{user?.mobile}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
