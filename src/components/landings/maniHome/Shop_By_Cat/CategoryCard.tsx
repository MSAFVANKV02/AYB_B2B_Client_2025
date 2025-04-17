import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hook";
import { IGetAllFilterKey } from "@/services/user_side_api/products/route";

export default function CategoryCard() {
//   const [width, height] = useWindowSize();
  const [showAll, setShowAll] = useState(false);
  const categories = useAppSelector((state) => state.category.categories);

  // console.log(categories,'categories');
  


  // const categoryCard = [
  //   { name: "Shirts", image: "img/cards/image 102.png" },
  //   { name: "Pants", image: "img/cards/image 103.png" },
  //   { name: "Lingaries", image: "img/cards/image 104.png" },
  //   { name: "Toys", image: "img/cards/image 105.png" },
  //   { name: "Jeans", image: "img/cards/image 103.png" },
  //   { name: "Leggings", image: "img/cards/image 102.png" },
  //   { name: "Jeggings", image: "img/cards/image 105.png" },
  //   { name: "Featured", image: "img/cards/image 102.png" },
  //   { name: "Shorts", image: "img/cards/image 102.png" },
  //   // Add more categories as needed...
  // ];

  // Corrected fadeIn function
  const fadeIn = (direction:string, delay:number) => {
    return {
      hidden: {
        y: direction === 'up' ? 30 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 0.1,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };

  const visibleCards = showAll ? categories : categories.slice(0, 8);

  return (
    <div className="space-y- section_container_cards">
      <div className="flex justify-between items-center">
        <h4>Shop by category</h4>
        {
          visibleCards.length > 8 && (
              <small
          className="text-gray-400 cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "View all categories"} {">"}
        </small>
          )
        }
      
      </div>

      {/* Cards section */}
      <motion.div
        className="overflow-x-auto  scrollbar-none"
        initial={{ height: 0 }}
        animate={{ height: showAll  ? "auto" : "" }} // Adjust height for 6 cards
        transition={{ duration: 0.1, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.7 }}
      >
        <ul className="flex md:grid xl:grid-cols-8 pt-3 ml-0 sm:grid-cols-4 grid-cols-3 gap-2 md:gap-4 snap-x snap-mandatory">
          {visibleCards.map((item, index) => (
            <Link
              to={`/page/${"category" as IGetAllFilterKey}/${item.slug}`}
              key={index}
              className="text-gray-600 hover:text-textMain"
            >
              <motion.li
                variants={fadeIn('up', index * 0.1)} // Apply fadeIn animation
                initial="hidden"
                animate="show"
                className="flex justify-center cursor-pointer flex-col rounded-xl shadow-sm hover:scale-105 snap-center duration-300 transition-all 
                h-24 w-40 md:h-40 md:w-auto border items-center p-2 gap-3 "
              >
                <img
                  src={item.iconImage??""}
                  alt={item.name}
                  loading="lazy"
                  className="w-8 md:h-auto md:w-auto object-cover rounded-md"
                />
                <p className="truncate w-full text-center">{item.name}</p>
              </motion.li>
            </Link>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
