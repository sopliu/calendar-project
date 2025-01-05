"use client";

import {
  Box,
  CSSObject,
  ListItemButton,
  ListItemIcon,
  styled,
  Theme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

const drawerWidth = 240;

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const NavListItemButton = styled(ListItemButton)({
  minHeight: 48,
  px: 2.5,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

interface ActiveNavIndicatorProps {
  isActive?: boolean;
}
export const ActiveNavBarIndicator = styled(Box)<ActiveNavIndicatorProps>(
  ({ isActive = true, theme }) => ({
    position: "absolute",
    height: `${isActive ? "80%" : 0}`,
    width: "5%",
    backgroundColor: theme.palette.primary.main,
    left: 3,
    borderRadius: "30px",
    transition: "height 0.3s ease-out",
  })
);

export const NavIcon = styled(ListItemIcon)<ActiveNavIndicatorProps>(
  ({ isActive = true, theme }) => ({
    minWidth: 0,
    justifyContent: "center",
    marginTop: 1,
    transition: "color 0.3s ease-out",
    color: `${
      isActive ? theme.palette.primary.main : theme.palette.text.secondary
    }`,
  })
);
