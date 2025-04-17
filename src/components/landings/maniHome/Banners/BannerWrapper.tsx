// import { cn } from "@/lib/utils";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import React, { useState } from "react";
// interface IBannerWrapperProps {
//   children: React.ReactNode;
//   className?: string;
//   prevBtnClass?: string;
//   nextBtnClass?: string;
//   btnClass?: string;
//   isActive?: boolean;
// }

// const BannerWrapper: React.FC<IBannerWrapperProps> = ({
//   children,
//   className,
//   prevBtnClass,
//   nextBtnClass,
//   btnClass,
//   isActive,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex + 1) % React.Children.count(children)
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className={cn(`relative flex flex-col items-center`, className)}>
//       <div className="w-full">
//         {React.Children.toArray(children)[currentIndex]}
//       </div>
//       {isActive && (
//         <div
//           className={cn(
//             `absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between mx-4`,
//             btnClass
//           )}
//         >
//           <button
//             onClick={handlePrev}
//             className={cn(
//               "bg-white text-black px-2 py-2 rounded-md",
//               prevBtnClass
//             )}
//           >
//             <Icon icon="material-symbols-light:keyboard-arrow-left" />
//           </button>
//           <button
//             onClick={handleNext}
//             className={cn(
//               "bg-white text-black px-2 py-2 rounded-md",
//               nextBtnClass
//             )}
//           >
//             <Icon icon="material-symbols-light:keyboard-arrow-right" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BannerWrapper;

// ==================================================
import React, { useEffect } from "react";
import Slider from "react-slick";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IBannerWrapperProps {
  children: React.ReactNode;
  className?: string;
  prevBtnClass?: string;
  nextBtnClass?: string;
  btnClass?: string;
  isActive?: boolean;
  isAutoFlow?: boolean;
  iconSize?: number;
  initialSlide?: number;
  setCurrentImageIndex?: (index: number) => void;
}

const BannerWrapper: React.FC<IBannerWrapperProps> = ({
  children,
  className,
  prevBtnClass,
  nextBtnClass,
  btnClass,
  isActive,
  isAutoFlow = true,
  iconSize = 20,
  initialSlide = 0,
  setCurrentImageIndex
}) => {
  const slider = React.useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: isAutoFlow? true : false,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlide,
    nextArrow: undefined, 
    prevArrow: undefined, 
    afterChange: (index: number) => {
      if (setCurrentImageIndex) {
        setCurrentImageIndex(index);
      }
      pauseAllVideos();
    }
  };

  useEffect(() => {
    if (slider.current) {
      slider.current.slickGoTo(initialSlide); // Update the slide if initialSlide changes
    }
  }, [initialSlide]);
    // Function to pause all video elements within the slider
    const pauseAllVideos = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => video.pause());
    };

  return (
    <div className={cn(`relative`, className)}>
    <Slider ref={slider} {...settings}>
      {React.Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </Slider>

    {isActive && (
      <div
        className={cn(
          `absolute flex justify-between mx-4`,
          btnClass
        )}
      >
        <button
          onClick={() => slider?.current?.slickPrev()}
          className={cn(
            "bg-white text-black px-2 py-2 rounded-md",
            prevBtnClass
          )}
        >
          <Icon fontSize={iconSize} icon="material-symbols-light:keyboard-arrow-left" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className={cn(
            "bg-white text-black px-2 py-2 rounded-md",
            nextBtnClass
          )}
        >
          <Icon fontSize={iconSize} icon="material-symbols-light:keyboard-arrow-right" />
        </button>
      </div>
    )}
  </div>
  );
};

export default BannerWrapper;
