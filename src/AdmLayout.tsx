// // my code
// import * as React from "react";
// import Box from "@mui/material/Box";
// import { createTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import DescriptionIcon from "@mui/icons-material/Description";
// import LayersIcon from "@mui/icons-material/Layers";
// import { AppProvider, NavigationItem } from "@toolpad/core/AppProvider";
// // import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import CustomDashboardLayout from "./components/adminSection/DashboardLayout/CustomDashboardLayout";

// export const NAVIGATION: NavigationItem[] = [
//   {
//     kind: "header",
//     title: "Main items",
//   },
//   {
//     kind: "page", // Explicitly mark navigable items as "page"
//     segment: "admin/dashboard",
//     title: "Dashboard",
//     icon: <DashboardIcon />, // Icon as valid JSX element
//   },
//   {
//     kind: "page",
//     segment: "admin/orders",
//     title: "Orders",
//     icon: <ShoppingCartIcon />,
//   },
//   {
//     kind: "divider", // Divider between sections
//   },
//   {
//     kind: "header",
//     title: "Analytics",
//   },
//   {
//     kind: "page",
//     segment: "reports",
//     title: "Reports",
//     icon: <BarChartIcon />,
//     children: [
//       {
//         kind: "page",
//         segment: "reports/sales",
//         title: "Sales",
//         icon: <DescriptionIcon />,
//       },
//       {
//         kind: "page",
//         segment: "reports/traffic",
//         title: "Traffic",
//         icon: <DescriptionIcon />,
//       },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "admin/integrations",
//     title: "Integrations",
//     icon: <LayersIcon />,
//   },
// ];

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: "data-toolpad-color-scheme",
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// // function AdminPageContent({ pathname }: { pathname: string }) {
// function AdminPageContent() {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         px: 4,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "",
//         textAlign: "",
//       }}
//     >
//       <Outlet />
//     </Box>
//   );
// }

// export default function AdmLayout() {
//   const navigate = useNavigate(); // React Router hook for navigation
//   const location = useLocation(); // React Router hook to access the current pathname

//   const [pathname, setPathname] = React.useState(location.pathname);

//   // Update pathname when the URL changes
//   React.useEffect(() => {
//     setPathname(location.pathname);
//   }, [location.pathname]);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(location.search), // Pass in current search params
//       navigate: (url: string | URL) => {
//         // Use navigate function properly
//         navigate(url instanceof URL ? url.toString() : url);
//       },
//     };
//   }, [pathname, navigate]);

//   return (
//     <>
//       <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
//         <CustomDashboardLayout>
//           {/* <AdminPageContent pathname={pathname} /> */}
//           <AdminPageContent />
//         </CustomDashboardLayout>
//       </AppProvider>
//     </>
//     // <AppProvider
//     //   navigation={NAVIGATION}
//     //   router={router}
//     //   theme={demoTheme}
//     // >
//     //   <DashboardLayout >
//     //     <AdminPageContent pathname={pathname} />
//     //   </DashboardLayout>
//     // </AppProvider>
//   );
// }
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Collapse from "@mui/material/Collapse"; // Import Collapse
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import ExpandLess from "@mui/icons-material/ExpandLess"; // Collapse icon
import ExpandMore from "@mui/icons-material/ExpandMore"; // Expand icon
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react/dist/iconify.js";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0, // Set width to 0 when collapsed
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "1rem", // equivalent to py-4 in Tailwind
  paddingBottom: "1rem", // equivalent to py-4 in Tailwind
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none", // Remove the shadow here
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#000", // Black background
      color: "#fff", // White text color (optional)
    },
    "& .MuiListItemIcon-root": {
      color: "#AF61CC", // Icon color
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#000", // Black background
      color: "#fff", // White text color (optional)
    },
    "& .MuiListItemIcon-root": {
      color: "#AF61CC", // Icon color
    },
  }),
}));

const NAVIGATION = [
  {
    kind: "page",
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "page",
    segment: "products",
    title: "Orders",
    icon: <ShoppingCartIcon />,
    isChild: true,
    children: [
      { title: "Pending Orders", segment: "products/add" },
      { title: "All products", segment: "products/all" },
      { title: "Category", segment: "products/category" },
      { title: "Size Guide", segment: "products/size-guide" },
    ],
  },
  {
    kind: "page",
    segment: "reports",
    title: "Reports",
    isChild: true,
    icon: <BarChartIcon />,
    children: [
      { title: "Pending Orders", segment: "report/pending" },
      { title: "Completed Orders", segment: "report/completed" },
    ],
  },
  {
    kind: "page",
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [collapseStates, setCollapseStates] = React.useState<{
    [key: number]: boolean;
  }>({}); // Track collapse state
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const pathname = location.pathname.replace("/admin/", "");

  //   alert(pathname)

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setCollapseStates({});
  };

  const handleCollapseToggle = (index: number) => {
    setOpen(true);

    setCollapseStates((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle collapse state for this index
    }));
  };

  const handleNavigation = (segment: string | undefined) => {
    if (segment) {
      navigate(segment); // Navigate to the specified segment
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        sx={{ boxShadow: "none" }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* <img src={MyLogo} alt="My Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1E1E1E", // Black background
            color: "#fff", // White text color (optional)
          },
          "& .MuiListItemIcon-root": {
            color: "#AF61CC", // Icon color
          },
        }}
      >
        <DrawerHeader className="py-7">
          {open && (
            <>
              <Link
                className="flex gap-2 group items-center select-none"
                to="/"
              >
                <div className="h-10 relative w-10  rounded-2xl bg-textMain flex items-center justify-center overflow-hidden">
                  {/* Image slides to the left */}
                  <img
                    src="img/logo/flower_ayaboo.png"
                    alt="navbar logo"
                    className="absolute w-[50%]  group-hover:w-0 group-hover:translate-x-[-150%] transition-all duration-300 ease-in"
                  />

                  {/* Icon slides in from the right */}
                  <Icon
                    icon="fluent:home-28-filled"
                    fontSize={20}
                    color="#ffff"
                    className="absolute translate-x-[150%] group-hover:translate-x-0 transition-all duration-500 ease-in-out"
                  />
                </div>
                <h4 className="font-bold">Ayaboo</h4>
              </Link>

              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon className="text-white" />
                )}
              </IconButton>
            </>
          )}
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          {NAVIGATION.map((item, index) => {
            if (item.isChild) {
              return (
                <React.Fragment key={index}>
                  <ListItemButton onClick={() => handleCollapseToggle(index)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                    {collapseStates[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={collapseStates[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children?.map((child, childIndex) => (
                        <ListItemButton
                          key={childIndex}
                          sx={{ pl: 4 }}
                          onClick={() => handleNavigation(child.segment)}
                        >
                          {child.segment === pathname ? (
                            <label className="radio-button">
                              <input
                                id={`option-${childIndex}`} // Use unique IDs for each input
                                name="radio-group"
                                type="radio"
                                checked
                              />
                              <span className="radio-checkmark"></span>
                            </label>
                          ) : (
                            <label className="radio-button">
                              <input
                                id={`option-${childIndex}`} // Use unique IDs for each input
                                name="radio-group"
                                type="radio"
                              />
                              <span className="radio-checkmark"></span>
                            </label>
                          )}

                          <ListItemText
                            primaryTypographyProps={{ fontSize: "0.75rem" }}
                            primary={child.title}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            } else {
              return (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    backgroundColor:
                      item.segment === pathname ? "#818080cc" : undefined,opacity: 0.8,  // Use undefined instead of false
                  }}
                >
                  <ListItemButton
                    onClick={() => handleNavigation(item.segment)}
                  >
                    <ListItemIcon
                      sx={{ display: open || isLargeScreen ? "block" : "none" }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ display: open || isLargeScreen ? "block" : "none" }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            }
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
