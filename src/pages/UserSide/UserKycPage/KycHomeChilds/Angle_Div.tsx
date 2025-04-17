
import { Box, Button, Typography } from "@mui/material";

type Props = {
  title: string;
  titleColorOne: string;
  subtitle: string;
  description: string;
  bgColor: string;
  onClick?: () => void;
  btnColor: string;
  sideImg?: string;
  titleColorTwo?: string;
};

const AngledDivMUI = ({
  title,
  titleColorOne,
  titleColorTwo,
  subtitle,
  description,
  bgColor,
  onClick,
  btnColor,
  sideImg,
}: Props) => {
  const [firstPart, secondPart] = title.split("-");
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        // maxWidth: "900px",
        margin: "50px auto",
        height: "330px",
        // border: "1px solid #ddd",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* Left Section with Angled Background */}
      <Box
        sx={{
          width: "60%",
          height: "100%",
          backgroundColor: bgColor, // light red

          // maxWidth:"90%",
          // padding: "30px 100px 30px 30px",
          padding: "30px",
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)", // Custom angle
        }}
      >
        <Box
          sx={{
            width: {
              sm: "50%",
              xs: "90%",
            },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
          display="flex"
          gap="5px"
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: titleColorOne }}
            >
              {firstPart}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: titleColorTwo }}
            >
              {secondPart}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>
            {description}
          </Typography>
          <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>
            {subtitle}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: btnColor,
              width: "fit-content",
              color: "white",
              // marginTop: "15px",
              ":hover": { backgroundColor: btnColor },
            }}
            onClick={onClick}
          >
            REVIEW YOUR KYC
          </Button>
        </Box>
      </Box>

      {/* Right Section with Image */}
      <Box
        sx={{
          width: "35%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   padding: "20px",
        }}
      >
        <img
          src={sideImg ? sideImg : "https://via.placeholder.com/200"}
          alt={title}
          style={{ borderRadius: "8px", maxWidth: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default AngledDivMUI;
