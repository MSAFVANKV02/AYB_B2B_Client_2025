

// // import { cn } from "@/lib/utils";
// // import PdfFile from "@/pages/UserSide/UserKycPage/KycDetails/PdfFile";
// // import { Icon } from "@iconify/react/dist/iconify.js";

// // type Props = {
// //     value: string;
// //     className?: string;
// // };

// // export default function MyPdf({
// //     value,
// //     className
// // }: Props) {
// //   return (
// //    <div className="w-fit">
// //      <a
// //       href={value}
// //       target="_blank"
// //       rel="noopener noreferrer"
// //       className="relative w-fit"
// //     >
// //       <PdfFile fileURL={value} className={cn(`w-16 h-24`,className)} />
// //       <div className={cn(`absolute w-16 h-24 bg-black/50 top-0 rounded-md flex items-center justify-center`,className)}>
// //         <Icon icon="solar:eye-bold" fontSize={20} color="#fff" />
// //       </div>
// //     </a>
// //    </div>
// //   );
// // }
// // =================================================================

// import { cn } from "@/lib/utils";

// import { Icon } from "@iconify/react/dist/iconify.js";
// import { Link } from "react-router-dom";
// import PdfFile from "./PdfFile";

// type Props = {
//     value: string ;
//     className?: string;
//     isPdfShown?: boolean;
//     selectedData?: string; 
    
// };

// export default function MyPdf({
//     value,
//     className,
//     isPdfShown = false,
//     selectedData 
// }: Props) {
//   return (
//    <div className="w-fit">
//     {
//       isPdfShown ? (
//         <Link
//         to={value}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="relative w-fit"
//       >
//         <PdfFile fileURL={value} className={cn(`h-16 w-16`,className)} />
//         <div className={cn(`absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center`,className)}>
//           <Icon icon="solar:eye-bold" fontSize={20} color="#fff" />
//         </div>
//       </Link>
//       ):(
//         <Link
//         to={value}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="relative w-fit text-xs text-blue-500 underline"
//       >
//         {selectedData}
//       </Link>
//       )
//     }
    
//    </div>
//   );
// }
// ==============

import { cn } from "@/lib/utils";
import PdfFile from "./PdfFile";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { memo } from "react";

type Props = {
    value: string ;
    className?: string;
    isPdfShown?: boolean;
    selectedData?: string; 
    
};

function MyPdf({
    value,
    className,
    isPdfShown = false,
    selectedData 
}: Props) {
  return (
   <div className="w-fit">
    {
      isPdfShown ? (
        <Link
        to={value}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-fit"
      >
        <PdfFile fileURL={value} className={cn(`h-16 w-16`,className)} />
        <div className={cn(`absolute h-16 w-16 bg-black/50 top-0 rounded-md flex items-center justify-center`,className)}>
          <Icon icon="solar:eye-bold" fontSize={20} color="#fff" />
        </div>
      </Link>
      ):(
        <Link
        to={value}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-fit text-xs text-blue-500 underline"
      >
        {selectedData}
      </Link>
      )
    }
    
   </div>
  );
}

export default memo(MyPdf)