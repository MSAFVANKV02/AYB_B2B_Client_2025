import { AllAvailableColors } from "@/action/product/productData";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

// interface ColorItem {
//   colorCode: string;
//   label: string;
// }

// const colors: ColorItem[] = [
//   { colorCode: "#f7c6b7", label: "Shirts" },
//   { colorCode: "#899399", label: "Shirts" },
//   { colorCode: "#7c9954", label: "Shirts" },
//   { colorCode: "#d08c43", label: "Shirts" },
//   { colorCode: "#eb77b3", label: "Shirts" },
//   { colorCode: "#8fd89d", label: "Shirts" },
//   { colorCode: "#e8d49b", label: "Shirts" },
//   { colorCode: "#e99591", label: "Shirts" },
//   { colorCode: "#d14a6b", label: "Shirts" },
//   { colorCode: "#d4da4c", label: "Shirts" },
//   { colorCode: "#7eb8e6", label: "Shirts" },
//   { colorCode: "#55a6a7", label: "Shirts" },
//   { colorCode: "#4970a7", label: "Shirts" },
//   { colorCode: "#a0dfdf", label: "Shirts" },
//   { colorCode: "#f7c6b7", label: "Shirts" },
//   { colorCode: "#899399", label: "Shirts" },
//   { colorCode: "#7c9954", label: "Shirts" },
//   { colorCode: "#d08c43", label: "Shirts" },
//   { colorCode: "#eb77b3", label: "Shirts" },
//   { colorCode: "#8fd89d", label: "Shirts" },
//   { colorCode: "#eb77b3", label: "Shirts" },
//   { colorCode: "#f7c6b7", label: "Shirts" },
//   { colorCode: "#eb77b3", label: "Shirts" },
//   { colorCode: "#8fd89d", label: "Shirts" },
// ];

export default function ColorGrid() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { products } = AllAvailableColors();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: isMobile ? "nowrap" : "wrap",
        flexDirection: "row",
        overflowX: isMobile ? "auto" : "visible",
        gap: 2,
        padding: 2,
        width: "100%", // Ensures the container is full width
      }}
    >
      {products.map((color, index) => (
        <Link to={`/page/color/${color.colorName}`} key={index}>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: isMobile ? "64px" : "auto", // Set minWidth for horizontal scroll
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: color.colorCode,
                borderRadius: "12px",
                marginBottom: "8px",
              }}
            />
            <Typography variant="body2" textAlign="center">
              {color.colorName}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
