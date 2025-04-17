// import { CardContainer } from "../Cards/CardContainer";
// import { motion, useInView } from "framer-motion";
// import {
//   containerVariants,
//   itemVariants,
// } from "../navbar_Sec/Header_Anim_Varients";
// import { useRef } from "react";

// function HomeSec2() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
//   const cardContentList = [
//     {
//       id: 1,
//       title: "Women",
//       image: "img/Hero Images/women.png",
//       slug: "/login",
//       description:
//         "Dresses, Tops, Bottoms,  Outerwear, Active wear, Footwear, Accessories, Beauty, etc.",
//     },
//     {
//       id: 2,
//       title: "Girl",
//       image: "img/Hero Images/girl.png",
//       slug: "/login",
//       description:
//         "T-Shirts, Blouses, Sweaters, Jeans, Skirts, Leggings, Casual Dresses, Party Dresses, Formal Dresses, etc.",
//     },
//     {
//       id: 3,
//       title: "Boy",
//       image: "img/Hero Images/boy.png",
//       slug: "/login",
//       description:
//         "T-Shirts, Polo Shirts, Hoodies & Sweatshirts, Jeans, Shorts, Trousers, Casual Shirts, Suits, etc.",
//     },
//     {
//       id: 4,
//       title: "Men",
//       image: "img/Hero Images/men.png",
//       slug: "/login",
//       description:
//         "T-Shirts, Polo Shirts, Dress Shirts, Sweaters & Hoodies, Jeans, Chinos, Trousers, Shorts, etc.",
//     },
//     {
//       id: 5,
//       title: "Infant",
//       image: "img/Hero Images/infant.png",
//       slug: "/login",
//       description:
//         "Bodysuits, T-Shirts, Onesies, Sweatshirts, Pants, Shorts, Leggings, Overalls, Booties, Casual Dresses, etc.",
//     },
//   ];
//   return (
//     <motion.section
//       className=" section_container h py-32 space-y-5 "
//       initial="hidden"
//       whileInView="visible"
//       // viewport={{ once: true }}
//       variants={containerVariants}
//     >
//       <div className="flex justify-center items-center flex-col space-y-3">
//         <motion.span
//           className="px-14 shadow-sm py-1 bg-combined-gradients text-textMain rounded-tl-3xl rounded-br-3xl"
//           variants={itemVariants}
//         >
//           Categories
//         </motion.span>
//         {/* <span className="px-14 shadow-sm py-1 bg-combined-gradients text-textMain rounded-tl-3xl rounded-br-3xl">
//           Categories
//         </span> */}
//         <motion.h2
//           className="text-3xl font-semibold text-gray-800"
//           variants={itemVariants}
//         >
//           Our large selection of products
//         </motion.h2>
//         {/* <h4 className="capitalize font-bold">
//           Our large selection of products
//         </h4> */}
//       </div>
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
//         {cardContentList.map((item, index) => (
//           <motion.div variants={itemVariants} key={item.id}>
//             <CardContainer
//               slug={item.slug}
//               title={item.title}
//               image={item.image}
//               description={item.description}
//               isTrue={index > 2}
//               index={index}
//               className={index === 4 ? "col-span-1 md:col-span-2 " : ""}
//             />
//           </motion.div>
//         ))}
//       </section>
//     </motion.section>
//   );
// }

// export default HomeSec2;
import { CardContainer } from "../Cards/CardContainer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  containerVariants,
  itemVariants,
} from "../navbar_Sec/Header_Anim_Varients";

function HomeSec2() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const cardContentList = [
    {
      id: 1,
      title: "Women",
      image: "img/Hero Images/women.png",
      slug: "/login",
      description:
        "Dresses, Tops, Bottoms,  Outerwear, Active wear, Footwear, Accessories, Beauty, etc.",
    },
    {
      id: 2,
      title: "Girl",
      image: "img/Hero Images/girl.png",
      slug: "/login",
      description:
        "T-Shirts, Blouses, Sweaters, Jeans, Skirts, Leggings, Casual Dresses, Party Dresses, Formal Dresses, etc.",
    },
    {
      id: 3,
      title: "Boy",
      image: "img/Hero Images/boy.png",
      slug: "/login",
      description:
        "T-Shirts, Polo Shirts, Hoodies & Sweatshirts, Jeans, Shorts, Trousers, Casual Shirts, Suits, etc.",
    },
    {
      id: 4,
      title: "Men",
      image: "img/Hero Images/men.png",
      slug: "/login",
      description:
        "T-Shirts, Polo Shirts, Dress Shirts, Sweaters & Hoodies, Jeans, Chinos, Trousers, Shorts, etc.",
    },
    {
      id: 5,
      title: "Infant",
      image: "img/Hero Images/infant.png",
      slug: "/login",
      description:
        "Bodysuits, T-Shirts, Onesies, Sweatshirts, Pants, Shorts, Leggings, Overalls, Booties, Casual Dresses, etc.",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="section_container py-32 space-y-5"
    >
      <motion.div 
        className="flex justify-center items-center flex-col space-y-3"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.span
          className="px-14 shadow-sm py-1 bg-combined-gradients text-textMain rounded-tl-3xl rounded-br-3xl"
          variants={itemVariants}
        >
          Categories
        </motion.span>
        <motion.h2
          className="text-3xl font-semibold text-gray-800"
          variants={itemVariants}
        >
          Our large selection of products
        </motion.h2>
      </motion.div>

      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {cardContentList.map((item, index) => (
          <motion.div 
            key={item.id}
            variants={itemVariants} 
            className={index === 4 ? "col-span-1 md:col-span-2" : ""}
          >
            <CardContainer
              slug={item.slug}
              title={item.title}
              image={item.image}
              description={item.description}
              isTrue={index > 2}
              index={index}
            />
          </motion.div>
        ))}
      </motion.section>
    </section>
  );
}

export default HomeSec2;