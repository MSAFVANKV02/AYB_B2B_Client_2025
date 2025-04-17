import AyButton from "@/components/myUi/AyButton";
import { Box, Typography } from "@mui/material";

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
  subHeading?: string;
};

const KycUserReviewSec = ({
  title,
  titleColorOne,
  // titleColorTwo,
  subtitle,
  description,
  bgColor,
  onClick,
  btnColor,
  sideImg,
  subHeading,
}: Props) => {
  // const [firstPart, secondPart] = title.split("-");
  return (
    <Box
      display={{ md: "flex" }}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        // maxWidth: "900px",
        margin: "50px auto",
        // height:{sm: "500px"},
        // border: "1px solid #ddd",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: bgColor,
      }}
    >
      {/* Left Section with Angled Background */}
      <Box
        sx={{
          width: { md: "50%", xs: "100%" },
          height: "100%",
          backgroundColor: bgColor, // light red
          // maxWidth:"90%",
          // padding: "30px 100px 30px 30px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: { md: "start", xs: "center" },
          alignItems: { md: "start", xs: "center" },

          // clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)", // Custom angle
        }}
      >
        <Box
          sx={{
            width: {
              sm: "80%",
              xs: "100%",
            },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: { md: "start", xs: "center" },
            alignItems: { md: "start", xs: "center" },
            gap: { md: "40px", sm: "20px", xs: "10px" },
            // justifyContent: "space-between",
          }}
        >
          {/* 1. main heading */}
          {/* <Box display="flex" gap="5px">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "400",
                color: titleColorOne,
                textTransform: "capitalize",
              }}
            >
              {firstPart}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "400",
                color: titleColorTwo,
                textTransform: "capitalize",
              }}
            >
              {secondPart}
            </Typography>
          </Box> */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "400",
              color: titleColorOne,
              textTransform: "capitalize",
              textAlign: { md: "start", xs: "center" },
            }}
          >
            {title}
          </Typography>
          {/* 2. */}
          <Typography
            sx={{ fontSize: "14px", textAlign: { md: "start", xs: "center" } }}
          >
            {description}
          </Typography>
          {/* 3. */}
          {subHeading && (
            <Typography
              sx={{ fontSize: "30px", color: "#5F08B1", fontWeight: 300 }}
            >
              {subHeading}
            </Typography>
          )}

          <Typography sx={{ fontSize: "14px" }}>{subtitle}</Typography>

          <Box
            sx={{
              width: "fit-content",
              mx: { md: "0", xs: "auto" },
            }}
          >
            <AyButton
              title=""
              variant="contained"
              icon="stash:arrow-right-light"
              iconSize={25}
              sx={{
                backgroundColor: btnColor,
                flexDirection: "row-reverse",
                width: "219px",
                borderRadius: "12px",
                color: "white",
                height: "53px",

                // marginTop: "15px",
                ":hover": { backgroundColor: btnColor },
              }}
              onClick={onClick}
            >
              REVIEW YOUR KYC
            </AyButton>
          </Box>
        </Box>
      </Box>

      {/* Right Section with Image */}
      <Box
        sx={{
          width: { md: "50%", xs: "100%" },
          height: "100%",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // bgcolor: "#F7F7F7",

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

export default KycUserReviewSec;
