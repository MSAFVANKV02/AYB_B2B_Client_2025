
import { Button, SxProps, Theme } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/assets/css/preloader.css";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  onClick?: () => void;
  title?: string;
  sx?: SxProps<Theme>;
  variant?: "contained" | "outlined" | "cancel" | "delete";
  className?:string
  outLineColor?: string;
  icon?: string;
  iconSize?: number;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
  children?: React.ReactNode;
  // reverse?: boolean; 
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
  // reverse=false,
  className
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
    <div className={cn("flex items-center",className) }>
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
    </div>
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
