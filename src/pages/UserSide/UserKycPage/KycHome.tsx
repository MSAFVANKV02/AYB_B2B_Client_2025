import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getKycStatusContent } from "./KycHomeChilds/Kyc-Status-banner";

import { makeToast } from "@/utils/toaster";
import Cookies from "js-cookie";
import { logoutUser } from "@/redux/userSide/UserAuthSlice";
import { clearKycDetails } from "@/redux/userSide/KycSlice";
import FashionGallery from "./KycHomeChilds/Kyc_Card_Gellery";
import KycUserReviewSec from "./KycHomeChilds/Kyc_Review_Sec";
import KYCProgress from "./KycHomeChilds/Kyc_Progress_Circle";

export default function KycHome() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, userKyc } = useAppSelector((state) => state.auth);
  // console.log(userKyc,'user kyc');

  const handleKycDetailsClick = () => {
    if (user?.kycStatus === "approved") {
      navigate("/login");
      makeToast(
        "Your account has been approved. Please login with credentials"
      );
      dispatch(logoutUser());
      dispatch(clearKycDetails());
      Cookies.remove("us_tkn_kyc");
      return;
    }
    navigate("/kyc/details");
  };

  const PromoteCards = [
    { title: "5 Lakh+", subtitle: "of products" },
    {
      title: "150 +",
      subtitle: "Varieties of Categories",
    },
    {
      title: "1000+",
      subtitle: "of Customers",
    },
  ];

  const kycContent = getKycStatusContent(
    user?.kycStatus || "unknown",
    handleKycDetailsClick
  );

  return (
    <div className=" md:space-y-10 space-y-5  select-none pb-10">
      {/*-------- Section 1 ====== */}

      <div className="">
        {userKyc ? (
          <KycUserReviewSec
            titleColorOne={kycContent.titleColorOne}
            titleColorTwo={kycContent.titleColorTwo}
            title={kycContent.title}
            description={kycContent.description}
            subtitle={
              kycContent?.kycFeedback ||
              "For any queries, please contact [support email or hotline]."
            }
            btnColor={kycContent.btnColor}
            bgColor={kycContent.bgColor}
            onClick={handleKycDetailsClick}
            subHeading={kycContent?.subHeading}
            sideImg={kycContent?.sideImg}
          />
        ) : (
          <div className="w-full bg-gray-50 lg:py-0 py-5 lg:h-[400px] lg:justify-around h-fit sm:px-14 px-2 lg:gap-16 gap-5 flex lg:flex-row flex-col">
            <img
              src="/kycPage/kycSec_01.png"
              alt="cart image"
              className="lg:h-[400px] lg:w-[400px] h-[150px] w-[150px] lg:mx-0 mx-auto"
              draggable={false}
            />
            <div className="flex flex-col justify-around lg:items-start items-center">
              <div className="flex flex-col lg:items-start items-center mb-5">
                {/* ===== */}
                <h1 className="text-textMain uppercase font-bold text-center">
                  Hello, Shop Owners!
                </h1>
                <span className="text-[#4A2E71] text-xl mb-4">
                  We're Glad to Have You Here.
                </span>
              </div>
              {/* ======= */}
              <div className="bg-white w-full p-5 rounded-xl shadow-md">
                <ul className="grid grid-cols-3">
                  {PromoteCards.map((card, index) => (
                    <li
                      key={index}
                      className={`flex flex-col text-center ${index !== PromoteCards.length - 1 ? " border-r" : ""}`}
                    >
                      <span className="text-2xl font-bold text-textSec">
                        {card.title}
                      </span>
                      <span>{card.subtitle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className="w-full bg-gradient-to-r from-[#EDEDED] to-[#D5C6FD] h-[150px] rounded-md p-6">
        
      </div> */}
      <KYCProgress />

      {/*-------- Section 4 ====== */}

      <div className="section_container_dash text-center flex justify-center relative items-center border-b-2  border-[#5F08B1] pb-10">
        <div className=" xl:w-[60%] sm:w-[80%]  space-y-3">
          <div className="">
            <h4>To see wholesale prices & buy products </h4>
            <h3 className="text-textMain font-bold text-[32px]">
              COMPLETE SHOP'S KYC
            </h3>
          </div>
          {/* ========== */}

          <span className="text-[24px] font-[400] text-black">
            KYC is needed so that only shop owners like you can see wholesale
            prices and not your shop's customers
          </span>
          {/* ========== */}

          <div className="flex flex-col gap-2">
            <span className="underline text-textMain  text-[20px] font-semibold cursor-pointer" 
             onClick={handleKycDetailsClick}
            
            >
              Upload ANY ONE of the following documents
            </span>
            <span className="text-[16px] " >
              Udyam Aadhar | GST | Cancelled current account cheque | Shop &
              Establishment Licence
            </span>
          </div>
        </div>

        <button
          onClick={handleKycDetailsClick}
          type="button"
          className="md:px-10 md:py-3 px-4 py-1  absolute left-1/2 bottom-0 translate-y-1/2 
        border border-[#5F08B1] active:scale-95 duration-300 transition-all 
        cursor-pointer bg-white rounded-3xl act -translate-x-1/2"
        >
          Upload Kyc
        </button>
      </div>

      <div className="w-full text-center px-8 ">
        <p className=" text-gray-400 ">
          Government mandates all businesses to get their Shop KYC done
        </p>
      </div>

      {/*-------- Section 5 ====== */}

      <div className="sm:p-6 p-2 leading-6 section_container_dash bg-gray-100 w-3/4 rounded-3xl  text-center">
        <span className=" sm:text-2xl text-sm text-black">
          TOP CATEGORIES FROM TOP BRANDS
        </span>
      </div>

      {/*-------- Section 6 ====== */}

      <FashionGallery />

      {/* kyc home 1 */}
      {/* <KycHome_c1/> */}
    </div>
  );
}
