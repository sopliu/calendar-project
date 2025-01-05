"use client";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { Drawer, NavListItemButton } from "./styles";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Box, Typography } from "@mui/material";
import { MainPages, NavItemsType } from "./types";

const navItems: NavItemsType[] = [
  {
    name: "dashboard",
    label: "Dashboard",
    inactiveIcon: <DashboardOutlinedIcon sx={{ fontSize: "28px" }} />,
    activeIcon: <DashboardRoundedIcon sx={{ fontSize: "28px" }} />,
    action: (router: AppRouterInstance) => router.push("/main/dashboard"),
  },
  {
    name: "chat",
    label: "Chat",
    inactiveIcon: <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "28px" }} />,
    activeIcon: <ChatBubbleOutlinedIcon sx={{ fontSize: "28px" }} />,
    action: (router: AppRouterInstance) => router.push("/main/chat"),
  },
  {
    name: "calendar",
    label: "Calendar",
    inactiveIcon: <CalendarMonthOutlinedIcon sx={{ fontSize: "28px" }} />,
    activeIcon: <CalendarMonthRoundedIcon sx={{ fontSize: "28px" }} />,
    action: (router: AppRouterInstance) => router.push("/main/calendar"),
  },
];

interface SideNavbarProps {
  activePage?: MainPages;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ activePage }) => {
  const router = useRouter();
  return (
    <Drawer variant="permanent" sx={{ zIndex: 0 }}>
      <Divider sx={{ margin: "30px 0" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} sx={{ minWidth: 0, padding: "5px 0" }}>
            <NavListItemButton onClick={() => item.action(router)}>
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                    marginTop: 1,
                  },
                  activePage === item.name && { color: "primary.main" },
                ]}
              >
                {activePage === item.name ? item.activeIcon : item.inactiveIcon}
              </ListItemIcon>
              <Typography
                fontSize="9px"
                sx={[activePage === item.name && { color: "primary.main" }]}
              >
                {item.label}
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  height: `${activePage === item.name ? "80%" : 0}`,
                  width: "5%",
                  bgcolor: "primary.main",
                  left: 3,
                  borderRadius: "30px",
                  transition: "height 0.3s ease-out",
                }}
              />
            </NavListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavbar;
