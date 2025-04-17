import { ICart } from "@/types/cartTypes";
import { useTheme } from "@mui/material/styles";
import { Checkbox, Collapse, IconButton, Stack } from "@mui/material";
import { useWindowWidth } from "@react-hook/window-size";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useState } from "react";

type Props = {
  details: ICart[];
  title: string | number;
  isCollapsible?: boolean;
  isAllSelect?: boolean;
};

export default function CartDetails({
  details,
  title,
  isCollapsible = false,
  isAllSelect = false,
}: Props) {
  const onlyWidth = useWindowWidth();

  const theme = useTheme();
  // Initialize all items as not collapsed initially (showing all items by default)
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
    new Array(details.length).fill(false) // All items are expanded by default
  );
  //   const [checkedVariants, setCheckedVariants] = useState<boolean[]>(
  //     new Array(details.length).fill(false) // Initialize checkedVariants to false
  //   );

  const mobileWidth = onlyWidth <= 768;
  // Handle checkbox change for product variants
  //   const handleVariantChange = (index: number) => {
  //     setCheckedVariants((prevState) =>
  //       prevState.map((checked, i) => (i === index ? !checked : checked))
  //     );
  //   };

  // Handle collapse/expand of product variants
  const toggleCollapse = () => {
    // Toggle the collapse state for all items
    setIsCollapsed((prevState) => prevState.map((collapsed) => !collapsed));
  };

  const handleAddClick = () => {
    // Trigger a prompt to ask for input
    const userInput = prompt("Enter the quantity to add:");

    if (userInput !== null) {
      // If the user provides a value, show it in an alert
      alert(`You have added ${userInput} items.`);
    }
  };

  return (
    <div className=" ">
      <div className="flex items-start md:justify-between space-x-4 mb-4 ">
        <div className="flex items-center gap-3">
          {isAllSelect && (
            <Checkbox
              color="default"
              sx={{
                "&.Mui-checked": {
                  color: "#5F08B1", // Custom color when checked
                },
              }}
            />
          )}

          <img
            src= "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product"
            className="w-20 h-20 object-cover"
          />
          <div className="">
            <p
              className="text-gray-800 xl:max-w-[450px]  md:max-w-[300px] sm:max-w-[100px] max-w-[90px] truncate"
              //    style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              Oversized 100% Cotton 190GSM 240GSM Plain White T Shirt
            </p>
            <p className="text-sm text-gray-500">Min. order: 10.0 pieces</p>
          </div>
        </div>

        <IconButton className="ml-auto">
          <DeleteIcon />
        </IconButton>
      </div>

      {/* Product Variants ======== = == = ====== ======= = === */}
      <div className="">
        {/* Collapse/Expand Button */}
        {isCollapsible && (
          <div className="flex items-center justify-end mb-4">
            <span className="text-sm text-gray-400">{title}</span>
            <IconButton onClick={toggleCollapse}>
              {isCollapsed.every((collapsed) => collapsed) ? (
                <KeyboardArrowDownOutlinedIcon />
              ) : (
                <KeyboardArrowUpOutlinedIcon />
              )}
            </IconButton>
          </div>
        )}

        {details.map((variant, index) => (
          <div className="" key={index}>
            <Collapse in={!isCollapsed[index]} timeout="auto" unmountOnExit>
              <div className={`flex items-center justify-between gap- md:p-4 p-1 md:border rounded-lg mb-3 ${window.location.pathname !== "/cart/checkout" && "md:ml-7"} `}>
                <div className="flex items-center md:space-x-4  bg0">
                  <div className="flex items-center">
                    {/* <Checkbox
                  color="default"
                  checked={checkedVariants[index]} // Check state based on array value
                  onChange={() => handleVariantChange(index)}
                  sx={{
                    "&.Mui-checked": {
                      color: "#5F08B1", // Custom color when checked
                    },
                  }}
                /> */}
                    <img
                      src={variant.image}
                      alt="Variant"
                      className="sm:w-12 sm:h-12 w-9 h-9 object-cover"
                    />
                  </div>
                  <div className="ml-1">
                    <p className="sm:text-sm text-xs font-medium">
                      Size: {variant.size}; Color: {variant.color}
                    </p>
                    <p className="sm:text-sm text-xs text-gray-600">
                      {variant.price} / piece
                    </p>
                  </div>
                </div>

                {/* Quantity Control ======== = == = ====== ======= = ===*/}
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    border: "1px solid #d0c7c7",
                    borderRadius: "5px",
                    width: "auto",
                    padding: "3px", // general padding
                    display: "flex",
                    flexWrap: "nowrap", // ensures items are in one row by default
                    [theme.breakpoints.down("sm")]: {
                      // Use theme.breakpoints correctly
                      width: "auto",
                      padding: "1px", // Adjust padding for mobile
                    },
                  }}
                >
                  <IconButton
                    size="small"
                    style={{
                      margin: !mobileWidth ? 0 : 0,
                      border: "1px solid #F0F0F0",
                      borderRadius: "5px",
                      cursor: "pointer",
                      padding: 5,
                    }}
                  >
                    <RemoveIcon
                      sx={{
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "small",
                          padding: "0",
                        },
                        color: "#5F08B1",
                      }}
                    />
                  </IconButton>
                  <span
                    onClick={handleAddClick}
                    style={{
                      margin: !mobileWidth ? "0px 0px 0px 8px" : 0,
                    }}
                    className="sm:text-sm text-xs cursor-pointer"
                  >
                    1
                  </span>
                  <IconButton
                    size="small"
                    color="primary"
                    style={{
                      margin: !mobileWidth ? "0px 0px 0px 8px" : 0,
                      border: "1px solid #F0F0F0",
                      borderRadius: "5px",
                      cursor: "pointer",
                      padding: 5,
                      marginLeft: !mobileWidth ? "8px" : 0,
                    }}
                  >
                    <AddIcon
                      sx={{
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "small",
                          padding: "0",
                        },
                        color: "#5F08B1",
                      }}
                    />
                  </IconButton>
                </Stack>

                {/* <div className="flex items-center p-1 border">
                <IconButton size="small" color="primary">
                  <RemoveIcon />
                </IconButton>
                <TextField
                  variant="outlined"
                  size="small"
                  value="1"
                  slotProps={{
                    htmlInput: {
                      style: { textAlign: "center" },
                    },
                  }}
                  sx={{
                    width:mobileWidth ? 20 : 50,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Remove border
                      },
                      "&.Mui-focused fieldset": {
                        border: "none", // Remove border on focus
                      },
                    },
                  }}
                />

                <IconButton size="small" color="primary">
                  <AddIcon />
                </IconButton>
              </div> */}

                {/* Price and Delete ======== = == = ====== ======= = ===*/}
                <p className="text-gray-800 font-semibold">$4.69</p>

                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
}
