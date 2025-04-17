// // import React from "react";
// import "@/assets/css/home.css";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";

// function HomeSec3() {
//   const cardContentList = [
//     {
//       id: 1,
//       title: "Create an account",
//       image: "img/Hero Images/CreateAccount.png",
//       description:
//         "Register using your mobile number. Enter your Name, Shop name and Pincode.",
//     },
//     {
//       id: 2,
//       title: "Complete shop KYC",
//       image: "img/Hero Images/CompleteShopKYC.png",
//       description:
//         "Upload any one of shop's KYC documents like GSTIN, Shop & Establishment Licence",
//     },
//     {
//       id: 3,
//       title: "Start Ordering",
//       image: "img/Hero Images/StratOrdering.png",
//       description:
//         "Browse and order products for your shop from top sellers & brands",
//     },
//   ];
//   return (
//     <div className="section_container h-full pb-32">
//       <div className="flex justify-center items-center flex-col space-y-3">
//         <span className="text-black font-semibold">Kickstart trading in</span>
//         <h6 className="capitalize font-bold text-textMain">3 quick steps</h6>
//       </div>
//       {/* ===== card starts ===== */}
//       <ul className="grid place-items-center md:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-14">
//         {cardContentList.map((item, index) => (
//           <li key={index} className="card-flow">
//             <div className="">
//               <div className="flex justify-center items-center">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="object-center 2xl:w-60  2xl:h-60  md:w-44 md:h-44 w-32 h-32"
//                 />
//               </div>
//               <div className="flex items-center space-y-2 flex-col justify-center text-center">
//                 <h6 className="font-semibold">{item.title}</h6>
//                 <p className="text-gray-400 text-xs">{item.description}</p>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="flex items-center justify-center">
//         <Button variant="b2bStyle" className="f">
//           <Link to={"/login"} className="h-full w-full flex items-center justify-center gap-2 text-sm font-normal">
//             Join Now  <ArrowRight />
//           </Link>
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default HomeSec3;
// =================================================================
import "@/assets/css/home.css";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AyButton from "@/components/myUi/AyButton";
import useNavigateClicks from "@/hooks/useClicks";

function HomeSec3() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const {handleClick} = useNavigateClicks()
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const cardContentList = [
    {
      id: 1,
      title: "Create an account",
      image: "img/Hero Images/CreateAccount.png",
      description:
        "Register using your mobile number. Enter your Name, Shop name and Pincode.",
    },
    {
      id: 2,
      title: "Complete shop KYC",
      image: "img/Hero Images/CompleteShopKYC.png",
      description:
        "Upload any one of shop's KYC documents like GSTIN, Shop & Establishment Licence",
    },
    {
      id: 3,
      title: "Start Ordering",
      image: "img/Hero Images/StratOrdering.png",
      description:
        "Browse and order products for your shop from top sellers & brands",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="section_container h-full pb-32"
    >
      <motion.div 
        className="flex justify-center items-center flex-col space-y-1"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h3 
          className="text-black font-semibold"
          variants={itemVariants}
        >
          Kickstart trading in
        </motion.h3>
        <motion.h3 
          className="capitalize font-semibold text-textMain"
          variants={itemVariants}
        >
          3 quick steps
        </motion.h3>
      </motion.div>
      
      {/* ===== card starts ===== */}
      <motion.ul 
        className="grid place-items-center md:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-14"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {cardContentList.map((item, index) => (
          <motion.li 
            key={index} 
            className="card-flow"
            variants={itemVariants}
            custom={index}
          >
            <div className="">
              <motion.div 
                className="flex justify-center items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-center 2xl:w-60 2xl:h-60 md:w-44 md:h-44 w-32 h-32"
                />
              </motion.div>
              <div className="flex items-center space-y-2 flex-col justify-center text-center">
                
              <motion.h4  variants={itemVariants}>{item.title}</motion.h4>
                <p className="text-gray-400 text-sm ">{item.description}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      
      <motion.div 
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
       
          <AyButton 
          iconSize={35}
          title="Join Now"
          icon="stash:arrow-right-light"
          sx={{
            height:"53px",
            width:"180px",
            borderRadius:"10px",
            bgcolor:"#8817EC",
            flexDirection:"row-reverse",
            justifyContent:"center",
            gap:"10px"
          }}
          onClick={()=>{
            handleClick("/login")
          }}
          />
            {/* <ArrowRight /> */}
          {/* <Button variant="b2bStyle" className="f">
            <Link to={"/login"} className="h-full w-full flex items-center justify-center gap-2 text-sm font-normal">
               <ArrowRight />
            </Link>
          </Button> */}
   
      </motion.div>
    </section>
  );
}

export default HomeSec3;