// import { Button, SxProps, Theme } from "@mui/material";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import "@/assets/css/preloader.css";
// import { motion } from "framer-motion";


// type Props = {
//   onClick?: () => void; // Function to call when the button is clicked
//   title?: string; // The title of the button
//   sx?: SxProps<Theme>; // Allow overriding styles
//   variant?: "contained" | "outlined" | "cancel" |"delete"; // Add variants
//   outLineColor?: string;
//   icon?: string; //
//   iconSize?: number; // Font size for the icon
//   type?: "submit" | "reset" | "button";
//   loading?: boolean;
//   disabled?: boolean; 
//   show?: boolean; 
//   children?: React.ReactNode; 
// };

// export default function AyButton({
//   onClick,
//   title,
//   sx,
//   variant = "contained", // Default variant is "contained"
//   outLineColor,
//   icon,
//   iconSize,
//   type = "button",
//   loading,
//   disabled = false,
//   show = true, 
//   children
// }: Props) {
//   return (
//    <>
//    {
//     show && (
//       <div className="">
//         {
//           !disabled ? 
//           (
//             <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//        <Button
//             onClick={onClick}
//             type={type}
//             disabled={disabled}
//             sx={{
//               ...(variant === "contained"
//                 ? {
//                     bgcolor: disabled ? "#d3d3d3" : "var(--mainColor)", // Default background color
//                     color: disabled ? "#a0a0a0" : "#fff",// Default text color for contrast
//                     "&:hover": {
//                       bgcolor: disabled ? "#d3d3d3" : "var(--primaryVariant)", // No hover effect when disabled
//                     },
//                     textTransform: "capitalize",
//                   }
//                 : variant === "outlined"
//                 ? {
//                     border: `1px solid ${outLineColor}`, // Border for "outlined"
//                     color: disabled
//                     ? "#a0a0a0"
//                     : `${outLineColor ? "black" : " var(--mainColor)"}`,  // Text color for "outlined"
//                     bgcolor: "transparent", // Transparent background
//                     "&:hover": {
//                       bgcolor: "rgba(0, 123, 255, 0.1)", // Subtle hover background
//                     },
//                   }
//                 :  variant === "cancel" ?{
//                     border: `1px solid ${outLineColor}`, // Border for "outlined"
//                     color: disabled ? "#a0a0a0" : "white",  // Text color for "outlined"
//                     bgcolor: disabled ? "#d3d3d3" : "black",  // Transparent background
//                     "&:hover": {
//                       bgcolor: "rgba(34, 32, 32, 0.9)", // Subtle hover background
//                     },
//                   }:{
//                     border: `1px solid ${outLineColor}`, // Border for "outlined"
//                     color: disabled ? "#a0a0a0" : "white",  // Text color for "outlined"
//                     bgcolor: disabled ? "#d3d3d3" : "red",  // Transparent background
//                     "&:hover": {
//                       bgcolor: "rgba(201, 32, 32, 0.9)", // Subtle hover background
//                     },
//                   }
                
//                 ),
//               textTransform: "capitalize", // Avoid uppercase text
//               width: "150px",
//               ...sx, // Allow overriding styles via `sx` prop
//             }}
//           >
//             {!disabled && loading ? (
//               <div className="flex items-center">
//                 <span className="loader mr-2 text-white font-semibold space-x-1 ">
//                   Processing
//                   <span className="ms-1">.</span>
//                   <span>.</span>
//                   <span>.</span>
//                 </span>
//                 {/* Replace with your spinner */}
//               </div>
//             ) : (
//               <>
//                 <Icon icon={`${icon}`} fontSize={iconSize} className="mr-2" /> {title}
//               </>
//             )}
//             {children}
//             {/* <Icon icon={`${icon}`} fontSize={iconSize} /> {title} */}
//           </Button>
//           </motion.div>
//           ):(
//             <Button
//             onClick={onClick}
//             type={type}
//             disabled={disabled}
//             sx={{
//               ...(variant === "contained"
//                 ? {
//                     bgcolor: disabled ? "#d3d3d3" : "var(--mainColor)", // Default background color
//                     color: disabled ? "#a0a0a0" : "#fff",// Default text color for contrast
//                     "&:hover": {
//                       bgcolor: disabled ? "#d3d3d3" : "var(--primaryVariant)", // No hover effect when disabled
//                     },
//                     textTransform: "capitalize",
//                   }
//                 : variant === "outlined"
//                 ? {
//                     border: `1px solid ${outLineColor}`, // Border for "outlined"
//                     color: disabled
//                     ? "#a0a0a0"
//                     : `${outLineColor ? "black" : " var(--mainColor)"}`,  // Text color for "outlined"
//                     bgcolor: "transparent", // Transparent background
//                     "&:hover": {
//                       bgcolor: "rgba(0, 123, 255, 0.1)", // Subtle hover background
//                     },
//                   }
//                 :  variant === "cancel" ?{
//                     border: `1px solid ${outLineColor}`, // Border for "outlined"
//                     color: disabled ? "#a0a0a0" : "white",  // Text color for "outlined"
//                     bgcolor: disabled ? "#d3d3d3" : "black",  // Transparent background
//                     "&:hover": {
//                       bgcolor: "rgba(34, 32, 32, 0.9)", // Subtle hover background
//                     },
//                   }:{
//                     border: `1px solid ${outLineColor}`, // Border for "outlined"
//                     color: disabled ? "#a0a0a0" : "white",  // Text color for "outlined"
//                     bgcolor: disabled ? "#d3d3d3" : "red",  // Transparent background
//                     "&:hover": {
//                       bgcolor: "rgba(201, 32, 32, 0.9)", // Subtle hover background
//                     },
//                   }
                
//                 ),
//               textTransform: "capitalize", // Avoid uppercase text
//               width: "150px",
//               ...sx, // Allow overriding styles via `sx` prop
//             }}
//           >
//             {!disabled && loading ? (
//               <div className="flex items-center">
//                 <span className="loader mr-2 text-white font-semibold space-x-1 ">
//                   Processing
//                   <span className="ms-1">.</span>
//                   <span>.</span>
//                   <span>.</span>
//                 </span>
//                 {/* Replace with your spinner */}
//               </div>
//             ) : (
//               <>
//                 <Icon icon={`${icon}`} fontSize={iconSize} className="mr-2" /> {title}
//               </>
//             )}
//             {children}
//             {/* <Icon icon={`${icon}`} fontSize={iconSize} /> {title} */}
//           </Button>
//           )
//         }
//       </div>
    
    
//     )
//    }
//    </>
//   );
// }
import { Button, SxProps, Theme } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/assets/css/preloader.css";
import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
  title?: string;
  sx?: SxProps<Theme>;
  variant?: "contained" | "outlined" | "cancel" | "delete";
  outLineColor?: string;
  icon?: string;
  iconSize?: number;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
  children?: React.ReactNode;
};

export default function AyButton({
  onClick,
  title,
  sx,
  variant = "contained",
  outLineColor,
  icon,
  iconSize,
  type = "button",
  loading,
  disabled = false,
  show = true,
  children,
}: Props) {
  const buttonStyles: SxProps<Theme> = {
    textTransform: "capitalize",
    width: "100% !important", 
    ...(variant === "contained"
      ? {
          bgcolor: disabled ? "#d3d3d3" : "var(--primaryVariant)",
          color: disabled ? "#a0a0a0" : "#fff",
          "&:hover": {
            bgcolor: disabled ? "#d3d3d3" : "var(--mainColor)",
          },
        }
      : variant === "outlined"
      ? {
          border: `1px solid ${outLineColor}`,
          color: disabled ? "#a0a0a0" : `${outLineColor || "var(--mainColor)"}`,
          bgcolor: "transparent",
          "&:hover": {
            bgcolor: "rgba(0, 123, 255, 0.1)",
          },
        }
      : variant === "cancel"
      ? {
          border: `1px solid ${outLineColor}`,
          color: disabled ? "#a0a0a0" : "white",
          bgcolor: disabled ? "#d3d3d3" : "black",
          "&:hover": {
            bgcolor: "rgba(34, 32, 32, 0.9)",
          },
        }
      : {
          border: `1px solid ${outLineColor}`,
          color: disabled ? "#a0a0a0" : "white",
          bgcolor: disabled ? "#d3d3d3" : "red",
          "&:hover": {
            bgcolor: "rgba(201, 32, 32, 0.9)",
          },
        }),
    ...sx, // Merge additional styles passed via `sx`
  };

  const content = (
    <>
      {!disabled && loading ? (
        <div className="flex items-center">
          <span className="loader mr-2 text-white font-semibold space-x-1">
            Processing
            <span className="ms-1">.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      ) : (
        <>
          <Icon icon={`${icon}`} fontSize={iconSize} className="mr-2" /> {title}
        </>
      )}
      {children}
    </>
  );

  return show ? (
    disabled ? (
      <Button onClick={onClick} type={type} disabled sx={buttonStyles}>
        {content}
      </Button>
    ) : (
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button onClick={onClick} type={type} disabled={disabled} sx={buttonStyles}>
          {content}
        </Button>
      </motion.div>
    )
  ) : null;
}
