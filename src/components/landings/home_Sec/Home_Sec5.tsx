import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShinyButton } from "@/components/magicui/shiny-button";
import AyButton from "@/components/myUi/AyButton";
import useNavigateClicks from "@/hooks/useClicks";
import { Icon } from "@iconify/react/dist/iconify.js";

function HomeSec5() {
  const { handleClick } = useNavigateClicks();

  return (
    <div className="w-full bg-black ">
      <div
        className="min-h-[300px]  w-full flex justify-center items-center flex-col space-y-6"
        style={{
          backgroundImage: `url('img/Background Images/bg-cloth-particles.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <span className="text-white text-lg">Trendsetting fashion gems</span>
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex flex-col text-center">
            <div className="flex items-center gap-2">
              <NumberTicker
                value={5}
                className="whitespace-pre-wrap font-medium tracking-tighter text-textSec text-4xl"
              />
              <h3 className="text-textSec"> Lakh+ </h3>
            </div>
            {/* ====== */}
            <p className="text-white text-sm">of products</p>
          </div>
          {/* 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <NumberTicker
                value={150}
                className="whitespace-pre-wrap font-medium tracking-tighter text-textSec text-4xl"
              />
              <h3 className="text-textSec">+</h3>
            </div>
            <p className="text-white text-sm">Varieties of Categories</p>
          </div>
          {/* 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <NumberTicker
                value={1000}
                className="whitespace-pre-wrap font-medium tracking-tighter text-textSec text-4xl"
              />
              <h3 className="text-textSec">+</h3>
            </div>
            <p className="text-white text-sm">of Customers</p>
          </div>
        </div>

        <AyButton
          iconSize={35}
          title="Join Now"
          icon="stash:arrow-right-light"
          sx={{
            height: "53px",
            width: "160px",
            borderRadius: "10px",
            bgcolor: "#8817EC",
            flexDirection: "row-reverse",
            justifyContent: "center",
            gap: "10px",
          }}
          onClick={() => {
            handleClick("/login");
          }}
        />
      </div>
      {/* ======= */}
      <div className="h-fit py-10 bg-combined-gradients ">
        <div className="section_container  flex md:flex-row flex-col space-y-3 justify-between items-center ">
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold capitalize">Download</h4>
            <h4 className="font-semibold capitalize">ODIO App Now!</h4>
            <div className="flex gap-3">
              <ShinyButton className="p-0 overflow-hidden shadow-lg border">
                <div className="flex items-center p-3 bg- gap-3">
                  <Icon
                    icon={"mingcute:appstore-fill"}
                    color="black"
                    fontSize={30}
                  />{" "}
                  <span className="text-black">App Store</span>
                </div>
              </ShinyButton>
              <ShinyButton className="p-0 overflow-hidden shadow-lg border">
                <div className="flex items-center p-3 bg- gap-3">
                  <Icon
                    icon={"mage:playstore"}
                    color="black"
                    fontSize={30}
                  />{" "}
                  <span className="text-black">Play Store</span>
                </div>
              </ShinyButton>

              {/* <img
                src="img/icons/Appstore.png"
                alt="appStore | Odio"
                className="w-28"
              />
              <img
                src="img/icons/PlayStore.png"
                alt="playStore | Odio"
                className="w-28"
              /> */}
            </div>
            {/* <Android  
            // height={400}
            className="size-full h-[500px]"
             videoSrc="https://videos.pexels.com/video-files/14993748/14993748-uhd_1296_2304_30fps.mp4"
            /> */}
            {/* <Iphone15Pro
              className="size-full h-[500px]"
              videoSrc="https://videos.pexels.com/video-files/14993748/14993748-uhd_1296_2304_30fps.mp4"
            /> */}
          </div>
          <div className="md:block hidden">
            <AyButton
              iconSize={35}
              title="Join Now"
              icon="stash:arrow-right-light"
              sx={{
                // height: "53px",
                // width: "160px",
                borderRadius: "10px",
                bgcolor: "#8817EC",
                flexDirection: "row-reverse",
                justifyContent: "center",
                gap: "10px",
              }}
              onClick={() => {
                handleClick("/login");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSec5;
