// import AyButton from "@/components/myUi/AyButton";
// import { useNavigate } from "react-router-dom";
// import AngledDivMUI from "./KycHomeChilds/Angle_Div";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { getKycStatusContent } from "./KycHomeChilds/Kyc-Status-banner";
// import { useMemo } from "react";
// import { makeToast } from "@/utils/toaster";
// import Cookies from "js-cookie";
// import { logoutUser } from "@/redux/userSide/UserAuthSlice";
// import { clearKycDetails } from "@/redux/userSide/KycSlice";
// import FashionGallery from "./KycHomeChilds/Kyc_Card_Gellery";

// export default function KycHome() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { user, userKyc } = useAppSelector((state) => state.auth);
//   // console.log(userKyc,'user kyc');
  

//   const handleKycDetailsClick = () => {
//     if(user?.kycStatus==="approved"){
//       navigate("/login");
//       makeToast("Your account has been approved. Please login with credentials")
//       dispatch(logoutUser());
//       dispatch(clearKycDetails());
//       Cookies.remove('us_tkn_kyc')
//       return;
//     }
//     navigate("/kyc/details");
//   };

//   const kycBtnShow = useMemo(() => {
//     return !user?.kycsubmitted;
//   }, [user]);

//   const kycContent = getKycStatusContent(
//     user?.kycStatus || "unknown",
//     handleKycDetailsClick
//   );

//   const PromoteCards = [
//     { title: "5 Lakh+", subtitle: "of products" },
//     {
//       title: "150 +",
//       subtitle: "Varieties of Categories",
//     },
//     {
//       title: "1000+",
//       subtitle: "of Customers",
//     },
//   ];

//   const kycCards = [
//     {
//       id: 1,
//       title: "WOMEN",
//       src: "/img/kyc/Rectangle 587.png",
//     },
//     {
//       id: 2,
//       title: "MEN",
//       src: "/img/kyc/Rectangle 588.png",
//     },
//     {
//       id: 3,
//       title: "BOY",
//       src: "/img/kyc/Rectangle 588.png",
//     },
//     {
//       id: 4,
//       title: "Girls",
//       src: "/img/kyc/Rectangle 591.png",
//     },
//     {
//       id: 5,
//       title: "Infant",
//       src: "/img/kyc/Rectangle 594.png",
//     },
//   ];

//   return (
//     <div className=" md:space-y-10 space-y-5  select-none pb-10">
//       {/*-------- Section 1 ====== */}

//       {/* <div className="w-full relative">
//         <img
//           src="/img/kyc/banner.webp"
//           draggable={false}
//           alt=""
//           className="w-full md:block hidden"
//         />
//         <img
//           src="/img/kyc/krc_responsive_banner01.svg"
//           draggable={false}
//           alt=""
//           className="w-full md:hidden block"
//         />
//         =====  Button Image ======= 
//         <img
//           onClick={handleKycDetailsClick}
//            show={kycBtnShow}
//           src="/img/kyc/button complete kyc.webp"
//           draggable={false}
//           className="absolute  md:top-1/2 top-[45%] md:w-[10%] w-[20%] -translate-y-1/2 left-1/2 md:-translate-x-[72%] -translate-x-[35%] active:scale-95 duration-300 transition-all cursor-pointer"
//           alt=""
//         />
       
//       </div> */}

//       <div className="w-full bg-gray-50 lg:py-0 py-5 lg:h-[400px] lg:justify-around h-fit sm:px-14 px-2 lg:gap-16 gap-5 flex lg:flex-row flex-col">
//         <img
//           src="/kycPage/kycSec_01.png"
//           alt="cart image"
//           className="lg:h-[400px] lg:w-[400px] h-[150px] w-[150px] lg:mx-0 mx-auto"
//           draggable={false}
//         />
//         <div className="flex flex-col justify-around lg:items-start items-center">
//           <div className="flex flex-col lg:items-start items-center mb-5">
//             {/* ===== */}
//             <h1 className="text-textMain uppercase font-bold text-center">
//               Hello, Shop Owners!
//             </h1>
//             <span className="text-[#4A2E71] text-xl mb-4">
//               We're Glad to Have You Here.
//             </span>
//             <AyButton
          
//               title="Complete KYC"
//               sx={{
//                 bgcolor: "#8817EC",
//                 py: "12px",
//                 px: "12px",
//                 borderRadius: "12px",
//               }}
//               show={kycBtnShow}
//               onClick={handleKycDetailsClick}
//             />
//           </div>
//           {/* ======= */}
//           <div className="bg-white w-full p-5 rounded-xl shadow-md">
//             <ul className="grid grid-cols-3">
//               {PromoteCards.map((card, index) => (
//                 <li
//                   key={index}
//                   className={`flex flex-col text-center ${index !== PromoteCards.length - 1 ? " border-r" : ""}`}
//                 >
//                   <span className="text-2xl font-bold text-textSec">
//                     {card.title}
//                   </span>
//                   <span>{card.subtitle}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="section_container">
//         <AngledDivMUI
//           titleColorOne={kycContent.titleColorOne}
//           titleColorTwo={kycContent.titleColorTwo}
//           title={kycContent.title}
//           description={kycContent.description}
//           subtitle={userKyc?.kycFeedback || "For any queries, please contact support."}
//           btnColor={kycContent.btnColor}
//           bgColor={kycContent.bgColor}
//           onClick={handleKycDetailsClick}

//           //  sideImg="/img/kyc/kyc-status.png"
//         />
//       </div>

//       {/*-------- Section 2 ====== */}

//       <div className="section_container_dash relative">
//         <img
//           src="/img/kyc/banner1.webp"
//           draggable={false}
//           alt=""
//           className="w-full md:block hidden"
//         />
//         <img
//           src="/img/kyc/krc_responsive_banner02.svg"
//           draggable={false}
//           alt=""
//           className="w-full md:hidden block"
//         />
//         {/* =====  Button Image =======  */}
//         {
//           kycBtnShow && (
//             <img
//             onClick={handleKycDetailsClick}
//             src="/img/kyc/button complete kyc.webp"
//             draggable={false}
//             className="absolute md:block hidden sm:rounded-2xl rounded-lsm lg:bottom-10 sm:bottom-5 bottom-2 w-[15%] xl:translate-x-16 md:translate-x-10 sm:translate-x-6 translate-x-3
//              active:scale-95 duration-300 transition-all cursor-pointer"
//             alt=""
//           />
//           )
//         }
        
//         {/* =====  Button Image =======  */}
//       </div>

//       {/*-------- Section 3 ====== */}

//       <div className="w-full relative">
//         <img
//           src="/img/kyc/banner2.webp"
//           draggable={false}
//           alt=""
//           className="w-full md:block hidden"
//         />
//         <img
//           src="/img/kyc/krc_responsive_banner03.svg"
//           draggable={false}
//           alt=""
//           className="w-full md:hidden block"
//         />
//         {/* =====  Button Image =======  */}
//         {
//           kycBtnShow && (
//              <img
//           onClick={handleKycDetailsClick}
//           src="/img/kyc/button complete kyc.webp"
//           draggable={false}
//           className="absolute  md:top-3/4 top-[50%] rounded-2xl md:w-[13%] w-[40%]  left-1/2 md:-translate-x-[55%] -translate-x-[10%] active:scale-95 duration-300 transition-all cursor-pointer"
//           alt=""
//         />
//           )
//         }
       
//         {/* =====  Button Image =======  */}
//         {/* =====  Button Image 2 =======  */}
//         <img
//           onClick={handleKycDetailsClick}
//           src="/img/kyc/button upload kyc.webp"
//           draggable={false}
//           className="absolute  md:top-1/2 top-[80%] rounded-2xl md:w-[13%] w-[40%]  right-10 md:-translate-x-[55%] -translate-x-[10%] -translate-y-1/2  active:scale-95 duration-300 transition-all cursor-pointer"
//           alt=""
//         />
//         {/* =====  Button Image 2 =======  */}
//       </div>

//       {/*-------- Section 4 ====== */}

//       <div className="section_container_dash text-center flex justify-center relative items-center border-b-2  border-[#5F08B1] pb-10">
//         <div className=" xl:w-[60%] sm:w-[80%]  space-y-3">
//           <div className="">
//             <h4>To see wholesale prices & buy products </h4>
//             <h3 className="text-textMain font-bold">COMPLETE SHOP'S KYC</h3>
//           </div>
//           {/* ========== */}

//           <h3 className="">
//             KYC is needed so that only shop owners like you can see wholesale
//             prices and not your shop's customers
//           </h3>
//           {/* ========== */}

//           <div className="flex flex-col">
//             <span className="underline text-textMain">
//               Upload ANY ONE of the following documents
//             </span>
//             <span>
//               Udyam Aadhar | GST | Cancelled current account cheque | Shop &
//               Establishment Licence
//             </span>
//           </div>
//         </div>

//         <button
//           onClick={handleKycDetailsClick}
//           type="button"
//           className="md:px-10 md:py-3 px-4 py-1  absolute left-1/2 bottom-0 translate-y-1/2 
//         border border-[#5F08B1] active:scale-95 duration-300 transition-all 
//         cursor-pointer bg-white rounded-3xl act -translate-x-1/2"
//         >
//           Upload Kyc
//         </button>
//       </div>

//       <div className="w-full text-center px-8 ">
//         <p className=" text-gray-400 ">
//           Government mandates all businesses to get their Shop KYC done
//         </p>
//       </div>

//       {/*-------- Section 5 ====== */}

//       <div className="sm:p-6 p-2 leading-6 section_container_dash bg-gray-100 w-3/4 rounded-3xl  text-center">
//         <span className=" sm:text-2xl text-sm text-black">
//           TOP CATEGORIES FROM TOP BRANDS
//         </span>
//       </div>

//       {/*-------- Section 6 ====== */}

//       {/* <div className="section_container_dash">
//         <img
//           src="/img/banners/Banner5.png"
//           draggable={false}
//           alt=""
//           className="w-full md:block hidden"
//         />
//         <img
//           src="/img/kyc/krc_responsive_banner04.svg"
//           draggable={false}
//           alt=""
//           className="w-full md:hidden block"
//         />
//       </div> */}

//       {/*-------- Section 7 ====== */}

//       {/* <div className="grid mb xl:grid-cols-5 sm:grid-cols-3  sm:gap-3 grid-cols-2 section_container_dash">
//         {
//           kycCards.map((card) => (
//             <div
//               key={card.id}
//               className=" shadow-md rounded-xl bg-bgSoft text-center hover:scale-105 scale-95 cursor-pointer duration-300 transform transition-all"
//             >
//               <img src={card.src} alt={card.title} className="w-full" />
//               <h4 className="font-bold text-gray-600 py-5 text-textMain">
//                 {card.title}
//               </h4>
//             </div>
//           ))
//           //  .reverse() // reverse the order to display the cards in reverse order for aesthetic reasons
//         }
//       </div> */}
//       <FashionGallery />

//       {/* kyc home 1 */}
//       {/* <KycHome_c1/> */}
//     </div>
//   );
// }
