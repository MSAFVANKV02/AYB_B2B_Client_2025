import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

import "@/assets/css/preloader.css"
function PreloaderPage() {
  return (
    <div className="fixed top-0 left-0  bg-white/50 backdrop-blur-sm h-screen w-full z-[10003] flex justify-center items-center">
      <Link className="flex gap-2 group items-center select-none" to={`/`}>
        <div className="h-10 relative w-10 rounded-2xl bg-textMain flex items-center justify-center overflow-hidden">
          {/* Image slides continuously */}
          <img
            src="/img/logo/flower_ayaboo.png"
            alt="navbar logo"
            className="absolute w-[50%] animate-slideImage"
          />

          {/* Icon slides in from the right continuously */}
          <Icon
            icon="fluent:home-28-filled"
            fontSize={20}
            color="#ffff"
            className="absolute animate-slideIcon"
          />
        </div>
        {/* <h4 className="font-bold">Ayaboo</h4> */}
      </Link>
    </div>
  );
}

export default PreloaderPage;
