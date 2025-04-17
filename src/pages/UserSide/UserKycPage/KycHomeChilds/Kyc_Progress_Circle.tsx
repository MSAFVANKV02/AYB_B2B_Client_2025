// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const steps = [
//   {
//     id: 1,
//     label: "Complete KYC Details",
//     icon: "/kycPage/kyc_progress_icon_01.svg",
//     percentage: 20,
//   },
//   {
//     id: 2,
//     label: "KYC Document Selection",
//     icon: "/kycPage/kyc_progress_icon_02.svg",

//     percentage: 50,
//   },
//   {
//     id: 3,
//     label: "KYC Document Upload",
//     icon: "/kycPage/kyc_progress_icon_03.svg",

//     percentage: 75,
//   },
//   {
//     id: 4,
//     label: "KYC Verification",
//     icon: "/kycPage/kyc_progress_icon_04.svg",

//     percentage: 96,
//   },
// ];

// const KYCProgress = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     setTimeout(() => setProgress(90), 500); // Animate from 0 to 90%
//   }, []);

//   return (
//     <div className="bg-gradient-to-r from-[#EDEDED] to-[#D5C6FD] p-6 min-h-[200px] py-14 rounded-xl shadow-md
//      flex flex-col md:flex-row items-center justify-around w-full">
//       <div className="text-left mb-4 md:mb-0 w-[30%]">
//         <h2 className="text-4xl font-bold text-purple-800">
//           KYC COMPLETION PROCESS
//         </h2>
//         <p className="text-lg text-gray-600">
//           Ensure all documents are clear and valid to speed up the process.
//         </p>
//       </div>
//       {/* step section == starts == */}
//       <div className="flex justify-evenly space-x-6">
//         {steps.map((step) => (
//           <div
//             key={step.id}
//             className="flex md:flex-row flex-col gap-2 items-center"
//           >
//             <div className="relative w-24 h-24 flex items-center justify-center">
//               <motion.svg
//                 width="100"
//                 height="100"
//                 viewBox="0 0 100 100"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   stroke="#D5C6FD"
//                   strokeWidth="6"
//                   fill="transparent"
//                 />
//                 <motion.circle
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   stroke="#6b46c1"
//                   strokeWidth="6"
//                   fill="transparent"
//                   strokeDasharray="251"
//                   strokeDashoffset={251 - (progress / 100) * 251}
//                   strokeLinecap="round"
//                   initial={{ strokeDashoffset: 251 }}
//                   animate={{
//                     strokeDashoffset: 251 - (step.percentage / 100) * 251,
//                   }}
//                   transition={{ duration: 1.5, ease: "easeInOut" }}
//                 />
//               </motion.svg>
//               <span className="absolute text-2xl  font-semibold rounded-full border border-[#AF61CC] flex items-center justify-center w-[65%] h-[65%] text-purple-800 ">
//                 {step.id}
//               </span>
//             </div>
//             <div className="flex flex-col gap-1">
//               <img src={step.icon} alt="" width={30} />
//               <p className="text-sm  sm:w-3/4 text-start text-gray-700 mt-2 text-textMain font-bold">
//                 {step.label}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default KYCProgress;
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    id: 1,
    label: "Complete KYC Details",
    icon: "/kycPage/kyc_progress_icon_01.svg",
    percentage: 20,
  },
  {
    id: 2,
    label: "KYC Document Selection",
    icon: "/kycPage/kyc_progress_icon_02.svg",
    percentage: 50,
  },
  {
    id: 3,
    label: "KYC Document Upload",
    icon: "/kycPage/kyc_progress_icon_03.svg",
    percentage: 75,
  },
  {
    id: 4,
    label: "KYC Verification",
    icon: "/kycPage/kyc_progress_icon_04.svg",
    percentage: 96,
  },
];

const KYCProgress = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-r from-[#EDEDED] to-[#D5C6FD] p-6 min-h-[200px] py-14 sm:rounded-xl shadow-md flex flex-col lg:flex-row items-center justify-around w-full"
    >
      <div className="text-left mb-4 md:mb-0 lg:w-[30%]">
        <h2 className="text-4xl font-bold lg:text-start text-center text-[#4A2E71]">
          KYC COMPLETION PROCESS
        </h2>
        <p className="text-lg text-gray-600 lg:text-start text-center">
          Ensure all documents are clear and valid to speed up the process.
        </p>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 space-x-6"> 
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex lg:flex-row flex-col justify-center gap-2 items-center"
          >
            <div className="relative w-24 h-24 flex items-center lg:flex-row flex-col justify-center">
              <motion.svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#D5C6FD"
                  strokeWidth="6"
                  fill="transparent"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#6b46c1"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="251"
                  strokeDashoffset={251}
                  strokeLinecap="round"
                  animate={
                    isInView
                      ? {
                          strokeDashoffset: 251 - (step.percentage / 100) * 251,
                        }
                      : { strokeDashoffset: 251 }
                  }
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
              <span className="absolute text-2xl font-semibold rounded-full border border-[#AF61CC] flex items-center justify-center w-[65%] h-[65%] text-purple-800 ">
                {step.id}
              </span>
            </div>
            <div className="flex flex-col justify-center lg:items-start items-center gap-1">
              <img src={step.icon} alt="" width={30} />
              <p className="text-sm lg:w-3/4 lg:text-start text-center text-[#2F2F2F] mt-2  font-bold">
                {step.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KYCProgress;


