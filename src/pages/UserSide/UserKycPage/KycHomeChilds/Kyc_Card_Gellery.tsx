import { motion } from "framer-motion";

const galleryCards = [
  {
    id: "men",
    title: "MEN",
    image: "/src/assets/images/Fashion_Cards/fashion_card_01.svg",
    classes: "col-span-2 sm:col-span-2 md:col-span-4 row-span-6",
    textClasses: "text-outline text-4xl sm:text-5xl md:text-6xl left-4 sm:left-6 bottom-4 sm:bottom-6 rotate-0",
  },
  {
    id: "boys",
    title: "BOYS",
    image: "/src/assets/images/Fashion_Cards/fashion_card_02.svg",
    classes: "col-span-2 sm:col-span-4 md:col-span-4 row-span-3",
    textClasses: "text-outline text-3xl sm:text-4xl right-4 sm:right-6 bottom-4 sm:bottom-6 rotate-0",
  },
  {
    id: "women",
    title: "WOMEN",
    image: "/src/assets/images/Fashion_Cards/fashion_card_03.svg",
    classes: "col-span-2 sm:col-span-4 md:col-span-4 row-span-3",
    textClasses: "text-outline text-2xl sm:text-3xl right-2 sm:right-4 top-1/2 -translate-y-1/2 rotate-90",
  },
  {
    id: "girls",
    title: "GIRLS",
    image: "/src/assets/images/Fashion_Cards/fashion_card_04.svg",
    classes: "col-span-2 sm:col-span-2 md:col-span-5 row-span-3",
    textClasses: "text-outline text-4xl sm:text-5xl right-4 sm:right-6 bottom-4 sm:bottom-6 rotate-0",
  },
  {
    id: "infant",
    title: "INFANT",
    image: "/src/assets/images/Fashion_Cards/fashion_card_05.svg",
    classes: "col-span-2 sm:col-span-4 md:col-span-3 row-span-3",
    textClasses: "text-outline text-lg sm:text-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  },
];

const FashionGallery = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-12 md:grid-rows- gap-5 sm:h-scree h-fit n sm:max-h-[700px]">
        {galleryCards.map(({ id, title, image, classes }) => (
          <motion.div
            key={id}
            className={`relative overflow-hidden rounded-lg cursor-pointer ${classes}`}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            {/* <h2
              className={`absolute font-bold text-white tracking-wider ${textClasses}`}
            >
              {title}
            </h2> */}
          </motion.div>
        ))}
      </div>
   

    </div>
  );
};

export default FashionGallery;
