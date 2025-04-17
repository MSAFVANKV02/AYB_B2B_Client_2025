import { useEffect, useRef, useState } from "react";

export default function KycBanner() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [
    {
      id: 1,
      src: "/img/banners/kyc_curosal1.webp",
    },
    {
      id: 2,
      src: "/img/banners/kyc_curosal2.webp",
    },
    {
      id: 3,
      src: "/img/banners/kyc_curosal2.webp",
    },
  ];

  const handleScroll = () => {
    const scrollLeft = scrollContainerRef.current?.scrollLeft || 0;
    const itemWidth = scrollContainerRef.current?.offsetWidth || 1;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const itemWidth = scrollContainer.offsetWidth;
      const scrollPosition = itemWidth * index;
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setActiveIndex(index); // Update the active index
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Functions for scrolling left and right
  const scrollLeft = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const scrollRight = () => {
    if (activeIndex < banners.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Banner Scroll Area */}
      <div
        className="flex overflow-x-auto flex-nowrap snap-x snap-mandatory scrollbar-none"
        ref={scrollContainerRef}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-[100%] h-full relative snap-center">
            <img src={banner.src} alt="" className="w-full h-full object-cover rounded-xl" />
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white  text-black p-2 rounded-md md:h-10 h-6 md:w-10 w-6 flex justify-center items-center ${
          activeIndex === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={scrollLeft}
        disabled={activeIndex === 0}
      >
        &lt;
      </button>

      {/* Right Button */}
      <button
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white  text-black p-2 rounded-md md:h-10 h-6 md:w-10 w-6 flex justify-center items-center ${
          activeIndex === banners.length - 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={scrollRight}
        disabled={activeIndex === banners.length - 1}
      >
        &gt;
      </button>

      {/* Bottom Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {banners.map((_, index) => (
          <div
            key={index}
            className={` rounded-full cursor-pointer transition-all duration-300 ${
              activeIndex === index ? "bg-white w-5 h-2" : "bg-gray-300 w-2 h-2"
            }`}
            onClick={() => scrollToIndex(index)} // Added onClick to scroll to the corresponding banner
          />
        ))}
      </div>
    </div>
  );
}
