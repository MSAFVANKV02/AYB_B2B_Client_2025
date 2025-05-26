import { Store } from "@/types/final-product-types";
import { Link, useNavigate } from "react-router-dom";
import Image from "../image";
import My_Icon from "@/components/icons/My_Icon";
import { getSimpleRelativeTime } from "@/utils/date-calculator";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";

type Props = {
  version?: "v1" | "v2";
};

function VerifiedLabel({ avatar, name, createdAt, version="v1" }: Store & Props) {

  const navigate = useNavigate()

  const IconBadge = [
    {
      id: 1,
      title: "Ranking",
      icon: "stash:shield-check",
      className:
        " bg-[#FFDD80] ",
      iconClass: "sm:text-sm text-[12px] ",
      titleClass:"sm:text-xs text-[10px] ",
      onClick: () => {},
    },
    {
      id: 2,
      title: "Verified Manufacture",
      icon: "stash:shield-check",
      className: "bg-textSoft",
      iconClass: "sm:text-sm text-[12px] ",
      titleClass:"sm:text-xs text-[10px] ",
      onClick: () => {},
    },
    {
      id: 1,
      title: "Chat Now",
      icon: "carbon:chat-bot",
      className:
        "border border-textMain overflow-hidden bg-white cursor-pointer group hover:bg-textSoft",
      iconClass: "sm:text-sm text-[12px] text-black group-hover:text-textMain",
      titleClass:"sm:text-xs text-[10px] text-black group-hover:text-textMain",
      onClick: () => {
        navigate("/my-account/chat")
      },
    },
  ];

  return (
    <>
      {version === "v1" ? (
        <Link to={``} className=" flex items-center group gap-3  text-xs p-1">
          <Image
            disableLink
            src={avatar}
            className="h-10 w-10 rounded-md border"
            classNameImg="object-cover w-full h-full "
          />
          <div className="flex items-center gap-1">
            <span className="group-hover:underline">{name}</span>
            <div className="font-bold flex items-center gap-1  text-blue-500">
              <My_Icon color="green" fontSize={15} />
              Verified
            </div>
            <span className="f">Manufacturer .</span>
            <span className="text-gray-400 ">
              {getSimpleRelativeTime(createdAt)}
            </span>
          </div>
          {/* <pre>
    {JSON.stringify(stock.store,null,4)}
    </pre> */}
        </Link>
      ) : (
        <div className="flex lg:flex-row flex-col lg:items-center sm:gap-4 gap-1 h-fit">
          <span className="sm:text-base text-xs text-black uppercase">{name}</span>

          <div className="flex sm:gap-4 gap-1 flex-wrap">
          {IconBadge.map((item, index) => (
            <div
              className={cn(
                "flex items-center gap-2  sm:h-7 h-5 w-fit sm:px-3 px-1.5 rounded-full",
                item.className
              )}
              key={index}
              onClick={item.onClick}
            >
              <Icon
                icon={item.icon}
                className={cn("text-textMain", item.iconClass)}
              />

              <span
                className={cn("text-textMain", item.titleClass)}
                style={{
                  padding: 0,
                }}
              >
                {item.title}
              </span>
            </div>
          ))}
          </div>
        </div>
      )}
    </>
  );
}

export default VerifiedLabel;
