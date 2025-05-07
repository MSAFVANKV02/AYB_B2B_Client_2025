
import { Store } from "@/types/final-product-types"
import { Link } from "react-router-dom"
import Image from "../image"
import My_Icon from "@/components/icons/My_Icon"
import { getSimpleRelativeTime } from "@/utils/date-calculator"




function VerifiedLabel({avatar,name,createdAt}: Store) {
  return (
    <Link
    to={``}
    className=" flex items-center group gap-3  text-xs p-1"
  >
    <Image
      disableLink
      src={avatar}
      className="h-10 w-10 rounded-md border"
      classNameImg="object-cover w-full h-full "
    />
    <div className="flex items-center gap-1">
      <span className="group-hover:underline">
        {name}
      </span>
      <div className="font-bold flex items-center gap-1  text-blue-500">
        <My_Icon  color="green"fontSize={15} />
        Verified</div>
      <span className="f">Manufacturer .</span>
      <span className="text-gray-400 ">
      {getSimpleRelativeTime(createdAt)}
      </span>
    </div>
    {/* <pre>
{JSON.stringify(stock.store,null,4)}
</pre> */}
  </Link>
  )
}

export default VerifiedLabel