import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import useNavigateClicks from "@/hooks/useClicks";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@/providers/redux/hook";
import { isAuthenticated_4_Kyc } from "@/middlewares/IsAuthenticated";
import { Logout_User_Api } from "@/services/user_side_api/auth/route_url";
import { makeToast, makeToastError } from "@/utils/toaster";
import { clearKycDetails } from "@/providers/redux/userSide/KycSlice";
import { logoutUser } from "@/providers/redux/userSide/UserAuthSlice";
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { handleClick: navigate } = useNavigateClicks();
  const dispatch = useAppDispatch();
  // const { handleLogout } = useAuth();
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.products);
  const isKycUser = React.useMemo(() => isAuthenticated_4_Kyc(), []);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  // console.log(cart, "cart length");

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCloseAndNavigate = React.useCallback(
    (to: string) => {
      setAnchorEl(null);
      navigate(to);
    },
    [navigate]
  );

  // const logout = () => {
  //   Cookies.remove("us_b2b_tkn");
  //   window.location.reload();
  //   Cookies.remove("us_b2b_kyc");

  //   navigate("/");
  // };

  const handleLogout = React.useCallback(async () => {
    try {
      const response = await Logout_User_Api();

      if (response.status === 200) {
        makeToast(response.data.message);
        dispatch(clearKycDetails());
        navigate("/");
        dispatch(logoutUser());
        window.location.reload();
      }
    } catch (error: any) {
      makeToastError("An error occurred while logging out.");
      console.error(error);
    }
  }, [dispatch]);

  const userInitial = React.useMemo(
    () => (user?.name ? user.name.slice(0, 1) : ""),
    [user]
  );
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <div className="">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  textTransform: "capitalize",
                  bgcolor: "black",
                  margin: "auto",
                }}
              >
                {userInitial}
              </Avatar>
            </IconButton>
          </div>
        </Tooltip>
        {/* =====  Notification ====== */}
        {!isKycUser && (
          <>
            <Tooltip title="My Notifications">
              <IconButton
                onClick={() =>
                  handleCloseAndNavigate("/my-account/notifications")
                }
                size="small"
                sx={{ ml: 0 }}
              >
                <Avatar
                  sx={{ width: 32, height: 32, backgroundColor: "transparent" }}
                >
                  {" "}
                  <Icon
                    icon={`ph:bell-light`}
                    fontSize={25}
                    className="text-black"
                  />
                </Avatar>
                
              </IconButton>
            </Tooltip>

            {/* =====  Cart ====== */}
            <Tooltip title="My Cart">
              <IconButton
                onClick={() => handleCloseAndNavigate("/cart")}
                size="small"
                sx={{ ml: 0, position: "relative" }}
              >
                <Avatar
                  sx={{ width: 32, height: 32, backgroundColor: "transparent" }}
                >
                  {" "}
                  <Icon
                    icon={`mynaui:cart`}
                    fontSize={25}
                    className="text-black"
                  />
                </Avatar>
                {cart && cart?.items.length > 0 && (
                  <span className="absolute -top-0 -right-1 text-xs bg-[#6A0DAD] text-white rounded-full flex items-center 
                  justify-center  h-[21px] w-[21px]">
                    {cart?.totalItems > 9 ? `9+`:cart?.totalItems}
                  </span>
                )}
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              minWidth: "350px", // Minimum width of the menu
              overflow: "visible",
              mt: 1.5,
              px: 1.5,
              py: 1,
              borderRadius: "12px",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.3)",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem
          disabled
          sx={{
            fontWeight: "bold",
            color: "#5F08B1",
            mb: 1,
            userSelect: "none",
          }}
        >
          Hi, {user?.name}
        </MenuItem>
        {/* <Divider sx={{ my: 1 }} /> */}
        <MenuItem
          onClick={() => handleCloseAndNavigate("/my-account")}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              bgcolor: "#F8F8F8", // Background color on hover
            },
            border: "1px solid #ede6e6",
            padding: "10px",
            borderRadius: 2,
            mb: 1,
          }}
          //   className="border border-black p-7"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountCircleOutlinedIcon sx={{ color: "black", mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Account
            </Typography>
          </Box>
          <EastOutlinedIcon sx={{ fontSize: 16, color: "#6A0DAD" }} />
        </MenuItem>
        <MenuItem
          onClick={() => handleCloseAndNavigate("/my-account/my-orders")}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              bgcolor: "#F8F8F8", // Background color on hover
            },
            border: "1px solid #ede6e6",
            padding: "10px",
            borderRadius: 2,
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ShoppingBagOutlinedIcon sx={{ color: "black", mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Order
            </Typography>
          </Box>
          <EastOutlinedIcon sx={{ fontSize: 16, color: "#6A0DAD" }} />
        </MenuItem>
        <MenuItem
          onClick={() => handleCloseAndNavigate("/my-account/my-wishlist")}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              bgcolor: "#F8F8F8", // Background color on hover
            },
            border: "1px solid #ede6e6",
            padding: "10px",
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FavoriteBorderIcon sx={{ color: "black", mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Wishlist
            </Typography>
          </Box>
          <EastOutlinedIcon sx={{ fontSize: 16, color: "#6A0DAD" }} />
        </MenuItem>
        {/* <Divider sx={{ my: 1 }} /> */}
        <MenuItem
          onClick={() => {
            // logout();
            handleLogout();
            handleCloseAndNavigate("/");
          }}
          sx={{
            justifyContent: "center",
            fontWeight: "bold",
            color: "#A9A9A9",
            "&:hover": {
              bgcolor: "#F8F8F8", // Background color on hover
            },
            border: "1px solid #ede6e6",
            padding: "10px",
            borderRadius: 2,
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
