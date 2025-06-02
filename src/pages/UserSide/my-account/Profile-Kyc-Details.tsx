import { useAppSelector } from "@/providers/redux/hook";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ProfileKycDetails() {
  const { userKyc, user } = useAppSelector((state) => state.auth);

  // const loopKycEntries = () => {
  //   return Object.entries(userKyc || {}).map(([key, value]) => (
  //     <div key={key} className="flex justify-between text-sm  py-1">
  //       <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span>
  //       <span className="text-gray-700">{String(value)}</span>
  //     </div>
  //   ));
  // };

  // const loopKycEntries = (keysToInclude: string[]) => {
  //   return Object.entries(userKyc || {})
  //     .filter(([key]) => keysToInclude.includes(key))
  //     .map(([key, value]) => (
  //       <div key={key} className="flex flex-col text-sm  py-1">
  //         <span className="capitalize font-medium">
  //           {key.replace(/([A-Z])/g, " $1")}:
  //         </span>
  //         <span className="text-gray-700">{String(value)}</span>
  //       </div>
  //     ));
  // };
  const loopKycEntries = (keysToInclude: string[]) => {
    return keysToInclude.map((key) => {
      if (key === "address") {
        return (
          <div key={key} className="flex flex-col text-sm  py-1">
            <h6 className="text-textGray">Address:</h6>
            <div className="flex gap-1 flex-wrap">
              <p className="text-sm">{userKyc?.street}</p>,
              <p className="text-sm">{userKyc?.state}</p>,
              <p className="text-sm">{userKyc?.country}</p>
            </div>
          </div>
        );
      }

      // Handle mobile from `user` instead of `userKyc`
      if (key === "mobile") {
        return (
          <div key={key} className="flex flex-col text-sm  py-1">
            <span className="capitalize font-medium">Mobile:</span>
            <span className="text-gray-700">{user?.mobile}</span>
          </div>
        );
      }

      // Default key-value rendering
      const value = userKyc?.[key as keyof typeof userKyc];

      return (
        <div key={key} className="flex flex-col text-sm  py-1">
          <span className="capitalize font-medium">
            {key.replace(/([A-Z])/g, " $1")}:
          </span>
          <span className="text-gray-700">{String(value ?? "")}</span>
        </div>
      );
    });
  };

  return (
    <div className="bg-bgHardSoft h-full w-full rounded-lg p-3 space-y-3 shadow-main border ">
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

      <div className="flex flex-col gap-1">
        {loopKycEntries([
          "businessName",
          "gstNumber",
          "pinCode",
          "mobile",
          "country",
          "address",
        ])}
      </div>

      {/* <UserStatusBadges user={user} /> */}

      {/* Details staring here */}
    </div>
  );
}
