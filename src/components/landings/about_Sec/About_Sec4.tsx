import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

function AboutSec4() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/login"); // Navigate to the login route
  };
  return (
    <div className=" w-full bg-black h-full">
      <div
        className=" w-full py-10 "
        style={{
          backgroundImage: `url('img/Background Images/bg-cloth-particles.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="section_container flex ">
          <div className="md:w-1/2 w-full h-full space-y-11">
            {/* ------- */}
            <div className=" h-full">
              <h4 className="text-white">Contact Us</h4>
              <div className="text-white">
                <h3>We're Here to Help</h3>
                <h3>Reach Out for Support </h3>
                <h3>and Solutions</h3>
              </div>
            </div>
            {/* ===== */}
            <div className="mt-auto h-full flex flex-col text-white">
              <a href="tel:974488444" className="flex items-center gap-3">
                <img src="img/icons/Phone_icon.svg" alt="" /> 974488444
              </a>
              <a href="tel:974488444" className="flex items-center gap-3">
                <img src="img/icons/logos_whatsapp-icon.svg" alt="" /> 974488444
              </a>
            </div>
          </div>
          {/* second half */}
          <div className="md:w-1/2 w-full mt-auto">
            <div className="border-l pl-3">
              <div className="flex lg:flex-row flex-col justify-between">
                <span>Merchant Legal entity name:</span>
                <span className="lg:w-3/4 text-white">
                  HAASH INDIA EXPORTS PRIVATE LIMITED
                </span>
              </div>
              {/*  */}
              <div className="flex lg:flex-row flex-col justify-between">
                <span>Registered Address: </span>
                <span className="lg:w-3/4 text-white">
                  Ground Floor, 45/J, Cee Pee's Building, Ambala Mukku,
                  Malayamma Kozhikode KERALA 673601
                </span>
              </div>
              {/*  */}
              <div className="flex lg:flex-row flex-col justify-between">
                <span>Operational Address: </span>
                <span className="lg:w-3/4 text-white">
                  Ground Floor, 45/J, Cee Pee's Building, Ambala Mukku,
                  Malayamma Kozhikode KERALA 673601
                </span>
              </div>
              {/*  */}
              <div className="flex lg:flex-row flex-col justify-between">
                <span>Telephone No: </span>
                <span className="lg:w-3/4 text-white">9846012078</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ======= */}
      <div className="h-fit py-3 bg-combined-gradients flex md:flex-row flex-col space-y-3 justify-between 2xl:px-24 xl:px-20 md:px-14 sm:px-10 px-5 mx-auto items-center">
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold capitalize">Download</h4>
          <h4 className="font-semibold capitalize">ODIO App Now!</h4>
          <div className="flex gap-3">
            <img
              src="img/icons/Appstore.png"
              alt="appStore | Odio"
              className="w-28"
            />
            <img
              src="img/icons/PlayStore.png"
              alt="playStore | Odio"
              className="w-28"
            />
          </div>
        </div>
        <div className="md:block hidden">
          <Button variant="b2bStyle" onClick={handleRegisterClick}>
            Join Now <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AboutSec4;
