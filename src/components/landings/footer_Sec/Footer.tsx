import AyButton from "@/components/myUi/AyButton";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="bg-black "
      style={{
        backgroundImage: `url('img/Background Images/bg-cloth-particles.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Footer container */}
      <div className="min-h-[300px] w-full flex flex-col px-24 py-14 section_container">
        <div className="">
          <img src="/img/logo/Logo_white.svg" alt="Logo" />
        </div>
        <div className="flex md:flex-row flex-col h-full mt-auto justify-between ">
          <div className="grid md:grid-cols-3 gap-5 sm:text-sm text-xs md:py-0 py-6 grid-cols-1 text-white text-start">
            <div className="flex flex-col mt-auto md:gap-0 gap-2">
              <Link to="/careers" className="hover:text-textMain">
                Careers
              </Link>
              <Link to="/about" className="hover:text-textMain">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-textMain">
                Contact Us
              </Link>
              <Link
                to="/become/seller/register"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-textMain"
              >
                Become Seller
              </Link>
              <Link
                to="/become/store/register"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-textMain"
              >
                Become a Stockist
              </Link>
            </div>

            <div className="flex flex-col mt-auto md:gap-0 gap-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>

            <div className="flex flex-col mt-auto md:gap-0 gap-2">
              <Link to="/terms">Terms of Use</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
          {/* Contact Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-textSec">Get in touch!</h3>
            <p className="text-white">We can help you, Send your queries.</p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Email"
                className="w-[314px] h-full p-2 rounded-[10px] text-black text-xs "
              />
              <AyButton
                iconSize={20}
                title="Subscribe"
                icon="mdi:send"
                sx={{
                  height: "53px",
                  // width: "160px",
                  borderRadius: "10px",
                  bgcolor: "#8817EC",
                  // flexDirection: "row-reverse",
                  justifyContent: "center",
                  gap: "10px",
                }}
              />
              {/* <AyButton icon="mdi:send" title="Send" /> */}
              {/* <Button className="text-white bg-purple-500 hover:bg-purple-600 space-x-4">
                <Icon icon="mdi:send" /> 
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
