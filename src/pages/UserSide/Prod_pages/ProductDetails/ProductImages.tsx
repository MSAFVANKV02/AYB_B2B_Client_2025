import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

function ProductImages({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
  //   );
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
  //   );
  // };
  const handlePrev = () =>
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  const handleNext = () =>
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

  const handleThumbnailClick = (index:number) => {
    setCurrentIndex(index);
  };

  // const productImages = [
  //   "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRzaGlydHxlbnwwfHx8fDE2NzgyODUyNDY&ixlib=rb-1.2.1&q=80&w=400",
  //   "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fHRzaGlydHxlbnwwfHx8fDE2NzgyODUyNDY&ixlib=rb-1.2.1&q=80&w=400",
  //   "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRzaGlydHxlbnwwfHx8fDE2NzgyODUyNDY&ixlib=rb-1.2.1&q=80&w=400",
  //   "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fHRzaGlydHxlbnwwfHx8fDE2NzgyODUyNDY&ixlib=rb-1.2.1&q=80&w=400",
  // ];

  return (
    <div className="h-full p-2">
      <div className="flex flex-col gap- h-full">
        {/* Main Image */}
        <div className="relative  flex items-center  justify-center h-[50vh] md:h-[65vh]">
          <div className="w-[70%] h-[70%] ">
            <img
            src={images[currentIndex]}
            alt={`Product Image ${currentIndex + 1}`}
            className="object-cover m-auto h-full"
          />
          </div>
          
          <button
            onClick={handlePrev}
            className="absolute -left-0 top-1/2 transform -translate-y-1/2 text-black hover:scale-75 duration-300"
          >
            <Icon
              icon="material-symbols-light:navigate-next"
              fontSize={30}
              color="#000"
              className="rotate-180"
            />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-0 top-1/2 transform -translate-y-1/2 text-black hover:scale-75 duration-300"
          >
              <Icon
              icon="material-symbols-light:navigate-next"
              fontSize={30}
              color="#000"
              className=""
            />
          </button>
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 w-full justify-center ">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-12 h-12 object-cover cursor-pointer rounded ${
                currentIndex === index ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductImages;
