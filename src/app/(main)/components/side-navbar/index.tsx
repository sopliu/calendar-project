"use client";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import {
  ActiveNavBarIndicator,
  Drawer,
  NavIcon,
  NavListItemButton,
} from "./styles";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Badge, Typography } from "@mui/material";
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
    // TODO: chat notifications
    inactiveIcon: (
      <Badge color="secondary" badgeContent={1}>
        <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "28px" }} />
      </Badge>
    ),
    activeIcon: (
      <Badge color="secondary" badgeContent={1}>
        <ChatBubbleOutlinedIcon sx={{ fontSize: "28px" }} />
      </Badge>
    ),
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
        {navItems.map((item) => {
          const isActive = activePage === item.name;
          return (
            <ListItem key={item.label} sx={{ minWidth: 0, padding: "5px 0" }}>
              <NavListItemButton onClick={() => item.action(router)}>
                <NavIcon isActive={isActive}>
                  {isActive ? item.activeIcon : item.inactiveIcon}
                </NavIcon>
                <Typography
                  fontSize="9px"
                  sx={[isActive && { color: "primary.main" }]}
                >
                  {item.label}
                </Typography>
                <ActiveNavBarIndicator isActive={isActive} />
              </NavListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideNavbar;
