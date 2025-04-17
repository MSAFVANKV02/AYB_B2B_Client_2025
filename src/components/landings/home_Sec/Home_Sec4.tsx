/* eslint-disable no-irregular-whitespace */
// import { CheckCheck } from "lucide-react";

// function HomeSec4() {
//   const cardContentList = [
//     {
//       id: 1,
//       title: "Great wholesale prices",
//       description: "Avail best prices on 5 Lakh+ top quality products",
//     },
//     {
//       id: 2,
//       title: "Smart returns",
//       description: "Enjoy simple & hassle-free returns process",
//     },
//     {
//       id: 3,
//       title: "Wide range from top brands",
//       description: "Shop from top brands across India",
//     },
//     {
//       id: 4,
//       title: "Quickdoorstep delivery",
//       description: "Get delivery of your orders at your doorstep",
//     },
//   ];
//   return (
//     <div className="section_container h-full pb-32">
//       <div className="flex gap-14 md:flex-row flex-col">
//         <div className="flex-shrink flex justify-center items-center">
//           <img src="img/Hero Images/Seamless.png" alt="" className="2xl:w-80 2xl:h-80 w-[17rem] h-[17rem] "/>
//         </div>
//         <div className="flex-grow flex flex-col justify-between">
//           <div className="">
//             <h4>Seamless Stock</h4>
//             <h4>
//               Purchases for <span className="text-textMain">Your Store</span>
//             </h4>
//           </div>
//           <div className="grid sm:grid-cols-2 grid-cols-1 gap-0 mt-auto sm:gap-3">
//             {cardContentList.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex gap-3 sm:items-start sm:mt-0 mt-4 sm:text-center"
//               >
//                    <CheckCheck className=" text-textSec" size={20}/>
//                    <div className="flex flex-col items-start">
//                        <h5>{item.title}</h5>
//                 <p className="text-gray-400 text-xs">{item.description}</p>
//                    </div>

//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeSec4;
import "@/assets/css/home.css";
import {  CheckCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function HomeSec4() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const cardContentList = [
    {
      id: 1,
      title: "Great wholesale prices",
      description: "Avail best prices on 5 Lakh+ top quality products",
    },
    {
      id: 2,
      title: "Smart returns",
      description: "Enjoy simple & hassle-free returns process",
    },
    {
      id: 3,
      title: "Wide range from top brands",
      description: "Shop from top brands across India",
    },
    {
      id: 4,
      title: "Quick doorstep delivery",
      description: "Get delivery of your orders at your doorstep",
    },
  ];

  return (
    <section ref={sectionRef} className="section_container h-full pb-32">
      <motion.div
        className="flex gap-14 md:flex-row flex-col"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="flex-shrink flex justify-center items-center"
          variants={itemVariants}
        >
          <motion.img
            src="img/Hero Images/Seamless.png"
            alt="Seamless Stock"
            className="2xl:w-[455px] 2xl:h-[419px] w-[17rem] h-[17rem]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        <motion.div
          className="flex-grow flex flex-col justify-between gap-"
          variants={itemVariants}
        >
          <div className="">
            <motion.h2 variants={itemVariants}>Seamless Stock</motion.h2>
            <div className="flex items-center gap-2">
              <motion.h2 variants={itemVariants}>Purchases for</motion.h2>
              <motion.h2 className="text-textMain">Your Store</motion.h2>
            </div>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 grid-cols-1 gap-0 mt-aut sm:gap-3"
            variants={containerVariants}
          >
            {cardContentList.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-3 sm:items-start sm:mt-0 mt-4 sm:text-center"
                variants={itemVariants}
                custom={index}
              >
                <CheckCheck className="text-textSec mt-2" size={20} />
                <div className="flex flex-col items-start">
                  <motion.h4  variants={itemVariants}>{item.title}</motion.h4>
                  <motion.p  variants={itemVariants} className="text-gray-400 text-[16px]">{item.description}</motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center justify-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="b2bStyle">
                <Link
                  to={"/login"}
                  className="h-full w-full flex items-center justify-center gap-2 text-sm font-normal"
                >
                  Join Now <ArrowRight />
                </Link>
              </Button>
            </motion.div> */}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HomeSec4;
