import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useNavigateClicks from "@/hooks/useClicks.ts"



function AboutSec2() {
  const {handleClick} = useNavigateClicks()
  return (
    <div className="space-y-6">
      <img src="/img/Background Images/AboutMain.png" alt="" />
      <div className="text-center flex flex-col justify-center items-center">
        <div className=" sm:w-3/4 ">
          <h5>What We Have</h5>
          <small className="text-gray-400 ">
            Ayaboo, proudly operated by Haash India Exports Pvt. Ltd., is a
            dynamic B2B e-commerce platform designed to showcase and distribute
            our exclusive range of branded products. Our platform offers a
            streamlined and efficient solution for businesses to access and
            purchase high-quality products with ease. By leveraging cutting-edge
            technology and industry expertise, Ayaboo ensures a user-friendly
            experience, personalized support, and reliable service. Our mission
            is to facilitate seamless transactions, foster strong business
            relationships, and deliver exceptional value to our clients, all
            while reflecting the commitment to excellence and innovation upheld
            by Haash India Exports Pvt. Ltd.
          </small>
        </div>
      </div>
      {/* ``------------------------ */}
      <div className=" overflow-hidden relative my-4 text-white ">
        <div className="grid md:grid-cols-6 grid-cols-2 gap-3  overflow-hidden">
          {/* card .1 */}
          <div className=" bg-combined-gradients2 rounded-2xl ">
            <div className="border border-white m-1 p-3 rounded-xl  relative hide-cnt">
              <img
                src="img/Background Images/Layer 1 1.png"
                alt=""
                className="ml-auto  w-24 h-24"
              />
              <div className="text-white z-50">
                <h4>100+</h4>
                <p>Different Brand</p>
              </div>
            </div>
          </div>

          {/* card 2 */}

          <div className=" bg-combined-gradients2 rounded-2xl md:col-span-2 h-fit mt-auto">
            <div className="border border-white m-1 p-3 rounded-xl  relative hide-cnt  flex">
              <div className="text-white z-50">
                <h4>1000+</h4>
                <p>Trusted Customers</p>
              </div>
              <img
                src="img/Background Images/Layer 2 1.png"
                alt=""
                className="ml-auto  w-24 h-24 z-40"
              />
            </div>
          </div>

          {/* card 3 */}
          <div className=" bg-combined-gradients2 rounded-2xl md:col-span-2 h-fit mt-auto">
            <div className="border border-white m-1 p-3 rounded-xl  relative hide-cnt  flex">
              <div className="text-white z-50">
                <h4>10 yr+</h4>
                <p>DYears of Experience</p>
              </div>
              <img
                src="img/Background Images/Layer 5 2.png"
                alt=""
                className="ml-auto  w-24 h-24 z-40"
              />
            </div>
          </div>
          {/* card 4 */}
          <div className=" bg-combined-gradients2 rounded-2xl ">
            <div className="border border-white m-1 p-3 rounded-xl  ">
              <img
                src="img/Background Images/Layer 6 1.png"
                alt=""
                className="ml-auto  w-24 h-24"
              />
              <div className="text-white z-50">
                <h4>1000+</h4>
                <p>DVarieties Products</p>
              </div>
            </div>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1400 250"
          className="absolute bottom-0 md:block hidden  pointer-events-none opacity-40 left-0 right-0 rounded-xl"
        >
          <path
            fill="#8F29E9"
            fillOpacity="0.35"
            className="filter backdrop-blur-md"
            d="M0,64L40,101.3C80,139,160,213,240,240C320,267,400,245,480,213.3C560,181,640,139,720,138.7C800,139,880,181,960,218.7C1040,256,1120,288,1200,266.7C1280,245,1360,171,1400,133.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>

        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1400 200"
          className="absolute bottom-0  opacity-40 left-0 right-0 rounded-xl"
        >
          <path
            fill="#8F29E9"
            fillOpacity="1"
            className="filter backdrop-blur-md"
            d="M0,96L48,122.7C96,149,192,203,288,192C384,181,480,107,576,96C672,85,768,139,864,154.7C960,171,1056,149,1152,165.3C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg> */}
      </div>
      {/* -------------------------- */}
      <div className="text-center flex flex-col justify-center items-center ">
        <div className=" sm:w-3/4 ">
          <h5>Why choose Ayaboo?</h5>
          <small className="text-gray-400">
            As the B2B e-commerce platform operated by Haash India Exports Pvt.
            Ltd., Ayaboo offers a unique blend of advantages that set us apart.
            We provide access to an exclusive range of premium branded products,
            ensuring your business benefits from high-quality and distinctive
            offerings. Our platform is designed for a seamless, user-friendly
            experience, making it easy to navigate and place orders efficiently.
            With our commitment to personalized support, you’ll receive
            dedicated service tailored to your specific needs, backed by the
            trusted expertise of Haash India Exports Pvt. Ltd. Our focus on
            innovative technology ensures a secure and streamlined process,
            while our dedication to excellence fosters strong, lasting
            partnerships. Choose Ayaboo for an exceptional e-commerce experience
            that drives growth and success for your business.
          </small>
        </div>
      </div>
      {/* ----------  #The Ayaboo Team ---------------- */}

      <div className="bg-black rounded-xl p-5 flex md:flex-row flex-col gap-6">
        <img src="img/Background Images/AyabooTeam.png" alt="" />
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-white font-semibold">The Ayaboo Team</h3>
          <small className="text-gray-400">
            As the B2B e-commerce platform operated by Haash India Exports Pvt.
            Ltd., Ayaboo offers a unique blend of advantages that set us apart.
            We provide access to an exclusive range of premium branded products,
            ensuring your business benefits from high-quality and distinctive
            offerings. Our platform is designed for a seamless, user-friendly
            experience, making it easy to navigate and place orders efficiently.
            With our commitment to personalized support, you’ll receive
            dedicated service tailored to your specific needs, backed by the
            trusted expertise of Haash India Exports Pvt. Ltd. Our focus on
            innovative technology ensures a secure and streamlined process,
            while our dedication to excellence fosters strong, lasting
            partnerships. Choose Ayaboo for an exceptional e-commerce experience
            that drives growth and success for your business.
          </small>
          <div className="flex gap-3 flex-wrap mt-auto">
            <div className="w-24 h-fit p-2 rounded-lg bg-[#333333] text-center">
              <h4 className="text-textSec">100+</h4>
              <span className="text-white text-sm">Skilled Members</span>
            </div>
            {/* 2 */}
            <div className="w-24 h-fit p-2 rounded-lg bg-[#333333] text-center">
              <h4 className="text-textSec">100+</h4>
              <span className="text-white text-sm">Skilled Members</span>
            </div>
            {/* 3 */}
            <div className="w-24 h-fit p-2 rounded-lg bg-[#333333] text-center">
              <h4 className="text-textSec">100+</h4>
              <span className="text-white text-sm">Skilled Members</span>
            </div>
          </div>
          {/* button */}
          <div className="md:mx-0 mx-auto">
               <Button variant="b2bStyle" 
               onClick={()=>{
                handleClick("/register")
               }}
               >
            Join Now <ArrowRight />
          </Button>
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default AboutSec2;
